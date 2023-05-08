import pandas as pd
import numpy as np
import pickle
import tensorflow as tf
from sklearn.metrics.pairwise import cosine_similarity

from methods.getProductDB import getProductData

productsDF = pd.read_csv('dataset/cleanedMetaData.csv')
ratingsDF = pd.read_csv('dataset/cleanedRatings.csv')

with open('trainedModels/svdModel.pkl', 'rb') as f:
    svdModel = pickle.load(f)

# neuralModel = tf.keras.models.load_model(
#     'trainedModels/neuralNetwork.h5', compile=False)
# neuralModel.compile(
#     optimizer=tf.optimizers.Adam(
#         learning_rate=0.001),
#     loss='mean_squared_error')

neuralModel = tf.keras.models.load_model('trainedModels/neuralNetwork.h5')


def weightedRating(row, m, C):
    # v -> average rating for each item (float)
    v = row['Number of Rating']
    # R -> average rating for the item (pd.Series)
    R = row['Mean Rating']
    return ((v / (v + m)) * R) + ((m / (v + m)) * C)


def loadPopularProducts():
    ratingsDFCopied = ratingsDF.copy()
    newRatingsDF = pd.read_csv('dataset/newRatings.csv')
    combinedRatingsDF = pd.concat([ratingsDFCopied, newRatingsDF])

    groupedRatingsDF = combinedRatingsDF.groupby("ProductID").agg({"UserID": "count", "Rating": "mean"}).rename(
        columns={"UserID": "Number of Rating", "Rating": "Mean Rating"}).reset_index()

    filteredRatingsDF = groupedRatingsDF[groupedRatingsDF['Number of Rating']
                                         > groupedRatingsDF['Number of Rating'].quantile(q=0.9)]

    C = groupedRatingsDF['Mean Rating'].mean()
    m = groupedRatingsDF['Number of Rating'].quantile(q=0.9)

    filteredRatingsDF['score'] = filteredRatingsDF.apply(
        weightedRating, m=m, C=C, axis=1)
    topRatingsDF = filteredRatingsDF.sort_values(
        by='score', ascending=False).head(10)

    productIds = list(topRatingsDF.ProductID)

    productData = getProductData(productIds)

    return productData


def loadRelatedProducts(productId, productText):
    # Transform the product data using the SVD model
    productTransformed = svdModel.transform([productText])

    # Calculate the cosine similarity between the product and all other
    # products in the dataset
    similarityMatrix = cosine_similarity(
        productTransformed, svdModel.transform(
            productsDF['title'] + ' ' + productsDF['description']))

    # Get the indices of the top similar products
    topProductIndices = similarityMatrix.argsort()[0][-5:][::-1]

    # Get the IDs similar products
    topProductIds = productsDF.loc[topProductIndices, '_id'].tolist()

    topProductIds = list(filter(lambda id: id != productId, topProductIds))

    productData = getProductData(topProductIds)

    return productData


def loadRecommendations(id):
    productLen = productsDF.shape[0]

    tempRatingsDF = ratingsDF[ratingsDF['UserID'].str.contains(id)]
    userId = tempRatingsDF.iloc[0].user

    productArray = np.arange(productLen)
    allUsers = np.array([int(userId) for _ in range(productLen)])

    pred = neuralModel.predict([productArray, allUsers])
    pred = pred.reshape([productLen])
    predIds = (-pred).argsort()[0:10]

    productIds = ratingsDF.loc[ratingsDF["product_id"].isin(
        predIds)].reset_index(drop=True)
    productIds = list(productIds.ProductID.unique())

    products = getProductData(productIds)

    return products
