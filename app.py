from flask import Flask, jsonify, request
import os
import sys
import csv
import pandas as pd
import numpy as np
import pickle
import tensorflow as tf
import json
from dotenv import load_dotenv, find_dotenv
from pymongo import MongoClient
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS

load_dotenv(find_dotenv())

database_url = os.environ.get("DATABASE_URL")
app = Flask(__name__)
CORS(app)

client = MongoClient(database_url)
db = client.MainDB
reviewsModel = db.reviews
productsModel = db.products

products_df = pd.read_csv('dataset/cleanedMetaData.csv')
ratings_df = pd.read_csv('dataset/cleanedRatings.csv')
with open('trainedModels/svdModel.pkl', 'rb') as f:
    svdModel = pickle.load(f)


neuralModel = tf.keras.models.load_model(
    'trainedModels/neuralNetwork.h5', compile=False)
neuralModel.compile(
    optimizer=tf.optimizers.Adam(
        learning_rate=0.001),
    loss='mean_squared_error')
product_len = products_df.shape[0]


def weighted_rating(row, m, C):
    # v -> average rating for each item (float)
    v = row['Number of Rating']
    # R -> average rating for the item (pd.Series)
    R = row['Mean Rating']
    return ((v / (v + m)) * R) + ((m / (v + m)) * C)


def listen_for_insert():
    pipeline = [{'$match': {'operationType': 'insert'}}]
    with reviewsModel.watch(pipeline) as stream:
        for change in stream:
            doc = change['fullDocument']

            # Write the document to the CSV file
            with open('dataset/newRatings.csv', mode='a', newline='') as file:
                writer = csv.writer(file)
                print("Writer called")
                writer.writerow([doc['ProductID'], doc['UserID'],
                                 doc['Rating'], doc['Time'], "12", "100"])
                file.close()
            print("New row Inserted successfully")

# Function to calculate the fuzzy match score


def get_match_score(string, string2):
    """
    Computes a similarity score between two strings using the Levenshtein distance algorithm.
    Returns a float between 0 and 1, where 0 means the strings are completely different and 1 means
    they are identical.
    """
    # Initialize the distance matrix with zeros
    string = string.lower()
    string2 = string2.lower()
    strings = string.split()
    final_score = -99999

    for string1 in strings:

        d = [[0] * (len(string2) + 1) for _ in range(len(string1) + 1)]

        # Populate the matrix with Levenshtein distances
        for i in range(len(string1) + 1):
            for j in range(len(string2) + 1):
                if i == 0:
                    d[i][j] = j
                elif j == 0:
                    d[i][j] = i
                elif string1[i - 1] == string2[j - 1]:
                    d[i][j] = d[i - 1][j - 1]
                else:
                    d[i][j] = 1 + min(d[i][j - 1],        # Insertion
                                      d[i - 1][j],        # Deletion
                                      d[i - 1][j - 1])    # Substitution

        # Compute the Levenshtein distance and normalize by the maximum length
        distance = d[-1][-1]
        max_length = max(len(string1), len(string2))
        score = 1 - (distance / max_length)
        if (score > final_score):
            final_score = score

    return final_score


@app.route('/')
def hello_world():
    return 'Welcome to GrowComers backend'


@app.route('/product/popular', methods=['GET'])
def get_popular_products():
    try:
        # ratings = list(reviewsModel.aggregate([
        #     {
        #         "$project": {
        #             "ProductID": 1,
        #             "Rating": 1,
        #             "UserID": 1
        #         }
        #     }
        # ]))

        # df = pd.DataFrame.from_records(ratings)
        df_1 = ratings_df.copy()
        df_2 = pd.read_csv('dataset/newRatings.csv')
        df = pd.concat([df_1, df_2])

        df_rating = df.groupby("ProductID").agg({"UserID": "count", "Rating": "mean"}).rename(
            columns={"UserID": "Number of Rating", "Rating": "Mean Rating"}).reset_index()

        df_filtered = df_rating[df_rating['Number of Rating']
                                > df_rating['Number of Rating'].quantile(q=0.9)]

        C = df_rating['Mean Rating'].mean()
        m = df_rating['Number of Rating'].quantile(q=0.9)

        df_filtered['score'] = df_filtered.apply(
            weighted_rating, m=m, C=C, axis=1)
        df_highscore = df_filtered.sort_values(
            by='score', ascending=False).head(10)

        productIds = list(df_highscore.ProductID)

        products = list(productsModel.aggregate([
                        {
                            "$match": {
                                "_id": {"$in": productIds},
                                "active": True
                            },
                        },
                        {
                            "$addFields": {
                                "firstCategory": {
                                    "$first": "$categoryId",
                                },
                            },
                        },
                        {
                            "$lookup": {
                                "from": "brands",
                                "localField": "brandId",
                                "foreignField": "_id",
                                "as": "brandData",
                            },
                        },
                        {
                            "$lookup": {
                                "from": "categories",
                                "localField": "firstCategory",
                                "foreignField": "_id",
                                "as": "categoryData",
                            },
                        },
                        {
                            "$lookup": {
                                "from": "reviews",
                                "localField": "_id",
                                "foreignField": "ProductID",
                                "as": "reviews",
                            },
                        },
                        {
                            "$addFields": {
                                "imageUrl": {
                                    "$first": "$imageURLHighRes",
                                },
                                "brand": {
                                    "$first": "$brandData.title",
                                },
                                "category": {
                                    "$first": "$categoryData.title",
                                },
                                "rating": {
                                    "$avg": "$reviews.Rating",
                                },
                            },
                        },
                        {
                            "$project": {
                                "_id": 1,
                                "title": 1,
                                "brand": 1,
                                "price": {"$round": ["$price", 2]},
                                "MRP": {"$round": ["$MRP", 2]},
                                "imageUrl": 1,
                                "category": 1,
                                "rating": {"$round": ["$rating", 1]},
                            },
                        },
                        ]))

        return jsonify(data=products), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@app.route('/product/related', methods=['GET'])
def related_products():
    try:
        product_id = request.args.get('id')
        # Get the product's title, description

        if not product_id or product_id == "undefined":
            return jsonify({"message": "Product Id is required"}), 400

        productDetails = list(productsModel.find(
            {"_id": product_id}, {'title': 1, 'description': 1}))
        product_data = productDetails[0]

        if not product_data or product_data == "undefined":
            return jsonify({"message": "No product found"}), 400

        product_text = product_data['title'] + \
            ' ' + product_data['description']

        # Transform the product data using the SVD model
        product_transformed = svdModel.transform([product_text])

        # Calculate the cosine similarity between the product and all other
        # products in the dataset
        similarity_matrix = cosine_similarity(
            product_transformed, svdModel.transform(
                products_df['title'] + ' ' + products_df['description']))

        # Get the indices of the top similar products
        top_indices = similarity_matrix.argsort()[0][-5:][::-1]

        # Get the IDs similar products
        top_ids = products_df.loc[top_indices, '_id'].tolist()

        top_ids = list(filter(lambda id: id != product_id, top_ids))

        products = list(productsModel.aggregate([
                        {
                            "$match": {
                                "_id": {"$in": top_ids},
                                "active": True
                            },
                        },
                        {
                            "$addFields": {
                                "firstCategory": {
                                    "$first": "$categoryId",
                                },
                            },
                        },
                        {
                            "$lookup": {
                                "from": "brands",
                                "localField": "brandId",
                                "foreignField": "_id",
                                "as": "brandData",
                            },
                        },
                        {
                            "$lookup": {
                                "from": "categories",
                                "localField": "firstCategory",
                                "foreignField": "_id",
                                "as": "categoryData",
                            },
                        },
                        {
                            "$lookup": {
                                "from": "reviews",
                                "localField": "_id",
                                "foreignField": "ProductID",
                                "as": "reviews",
                            },
                        },
                        {
                            "$addFields": {
                                "imageUrl": {
                                    "$first": "$imageURLHighRes",
                                },
                                "brand": {
                                    "$first": "$brandData.title",
                                },
                                "category": {
                                    "$first": "$categoryData.title",
                                },
                                "rating": {
                                    "$avg": "$reviews.Rating",
                                },
                            },
                        },
                        {
                            "$project": {
                                "_id": 1,
                                "title": 1,
                                "brand": 1,
                                "price": {"$round": ["$price", 2]},
                                "MRP": {"$round": ["$MRP", 2]},
                                "imageUrl": 1,
                                "category": 1,
                                "rating": {"$round": ["$rating", 1]},
                            },
                        },
                        ]))

        # products = list(productsModel.find(
        #     {"_id": {"$in": top_ids}}, {"title": 1}))

        return jsonify(data=products), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


# COLLABORATIVE FILTERING ENDPOINT
@app.route('/user/recommend', methods=['GET'])
def recommend():
    try:
        _id = request.args.get('id')

        if not _id or _id == "undefined":
            return jsonify({"message": "User ID is required"}), 400

        temp_df = ratings_df[ratings_df['UserID'].str.contains(_id)]
        user_id = temp_df.iloc[0].user
        product_arr = np.arange(product_len)
        user = np.array([int(user_id) for _ in range(product_len)])
        pred = neuralModel.predict([product_arr, user])
        pred = pred.reshape([product_len])
        pred_ids = (-pred).argsort()[0:10]
        prediction_actual_id = ratings_df.loc[ratings_df["product_id"].isin(
            pred_ids)].reset_index(drop=True)
        prediction_actual_id_list = list(
            prediction_actual_id.ProductID.unique())
        products = list(productsModel.aggregate([
                        {
                            "$match": {
                                "_id": {"$in": prediction_actual_id_list},
                                "active": True
                            },
                        },
                        # {
                        #     "$sample": {"size": 4},
                        # },
                        {
                            "$addFields": {
                                "firstCategory": {
                                    "$first": "$categoryId",
                                },
                            },
                        },
                        {
                            "$lookup": {
                                "from": "brands",
                                "localField": "brandId",
                                "foreignField": "_id",
                                "as": "brandData",
                            },
                        },
                        {
                            "$lookup": {
                                "from": "categories",
                                "localField": "firstCategory",
                                "foreignField": "_id",
                                "as": "categoryData",
                            },
                        },
                        {
                            "$lookup": {
                                "from": "reviews",
                                "localField": "_id",
                                "foreignField": "ProductID",
                                "as": "reviews",
                            },
                        },
                        {
                            "$addFields": {
                                "imageUrl": {
                                    "$first": "$imageURLHighRes",
                                },
                                "brand": {
                                    "$first": "$brandData.title",
                                },
                                "category": {
                                    "$first": "$categoryData.title",
                                },
                                "rating": {
                                    "$avg": "$reviews.Rating",
                                },
                            },
                        },
                        {
                            "$project": {
                                "_id": 1,
                                "title": 1,
                                "brand": 1,
                                "price": {"$round": ["$price", 2]},
                                "MRP": {"$round": ["$MRP", 2]},
                                "imageUrl": 1,
                                "category": 1,
                                "rating": {"$round": ["$rating", 1]},
                            },
                        },
                        ]))
        # products = list(productsModel.find({"_id": {"$in": prediction_actual_id_list}}, {"title": 1}))

        return jsonify(data=products), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@app.route('/product/search', methods=['GET'])
def searchProduct():
    try:
        query = request.args.get('query')
        new_df = products_df.copy()

        new_df['match_score'] = new_df['title'].apply(
            lambda x: get_match_score(x, query))

        # Sort the dataframe by the match score in descending order
        new_df = new_df.sort_values('match_score', ascending=False)

        products = new_df[["title", "_id", "match_score"]].head(10)
        product_ids = list(products._id)
        products = list(productsModel.aggregate([
                        {
                            "$match": {
                                "_id": {"$in": product_ids},
                                "active": True
                            },
                        },
                        {
                            "$lookup": {
                                "from": "reviews",
                                "localField": "_id",
                                "foreignField": "ProductID",
                                "as": "reviews",
                            },
                        },
                        {
                            "$addFields": {
                                "imageUrl": {
                                    "$first": "$imageURLHighRes",
                                },
                                "category": {
                                    "$first": "$category",
                                },
                                "rating": {
                                    "$avg": "$reviews.Rating",
                                },
                            },
                        },
                        {
                            "$project": {
                                "_id": 1,
                                "title": 1,
                                "brand": 1,
                                "price": {"$round": ["$price", 2]},
                                "MRP": {"$round": ["$MRP", 2]},
                                "imageUrl": 1,
                                "category": 1,
                                "rating": {"$round": ["$rating", 1]},
                            },
                        },
                        ]))

        return jsonify(data=products), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@app.route('/listen')
def listen():
    listen_for_insert()
    return 'Listening to MongoDB collection...'


if __name__ == "__main__":
    app.run(port=4002, debug=True)
