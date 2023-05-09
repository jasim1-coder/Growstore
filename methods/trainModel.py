import pandas
from sklearn.model_selection import train_test_split
from tensorflow import keras
import math

from db import reviewsModel


def trainCFModel(epoch=5):
    epoch = int(epoch)
    reviews = reviewsModel.find(
        {}, {"ProductID": 1, "UserID": 1, "Rating": 1, "Time": 1})
    ratings_df = pandas.DataFrame(reviews)
    ratings_df.pop("_id")

    # encoding UserID and ProductID to simple integers to improve computation effeciency

    user_ids = ratings_df["UserID"].unique().tolist()
    user2user_encoded = {x: i for i, x in enumerate(user_ids)}

    product_ids = ratings_df["ProductID"].unique().tolist()
    product2product_encoded = {x: i for i, x in enumerate(product_ids)}

    ratings_df["user"] = ratings_df["UserID"].map(user2user_encoded)
    ratings_df["product_id"] = ratings_df["ProductID"].map(
        product2product_encoded)

    ratings_df_train = ratings_df.copy()
    min_rating = min(ratings_df_train['Rating'])
    max_rating = max(ratings_df_train['Rating'])
    ratings_df_train["Rating"] = ratings_df_train["Rating"].apply(
        lambda x: (x - min_rating) / (max_rating - min_rating))

    Xtrain, Xtest = train_test_split(
        ratings_df_train, test_size=0.2, random_state=42)

    nproduct_id = ratings_df_train.product_id.nunique()
    nuser_id = ratings_df_train.user.nunique()

    EMBEDDING_SIZE = 40

    # Product Layers
    input_products = keras.layers.Input(shape=[1], name='product_input')
    embedding_products = keras.layers.Embedding(
        nproduct_id + 1, EMBEDDING_SIZE, name='product_embedding')(input_products)
    flatten_products = keras.layers.Flatten(
        name='product_flat')(embedding_products)

    # User layers
    input_users = keras.layers.Input(shape=[1], name='user_input')
    embedding_users = keras.layers.Embedding(
        nuser_id + 1, EMBEDDING_SIZE, name='user_embedding')(input_users)
    flatten_users = keras.layers.Flatten(name='user_flat')(embedding_users)

    concat_layer = keras.layers.concatenate([flatten_products, flatten_users])

    dense_layer_1 = keras.layers.Dense(
        256, activation='relu', name='dense_layer_1')(concat_layer)
    dense_layer_2 = keras.layers.Dense(
        128, activation='relu', name='dense_layer_2')(dense_layer_1)
    dense_layer_3 = keras.layers.Dense(
        64, activation='relu', name='dense_layer_3')(dense_layer_2)

    output_layer = keras.layers.Dense(
        1, activation='relu', name='output_layer')(dense_layer_3)

    model = keras.models.Model(
        inputs=[input_products, input_users], outputs=output_layer)
    opt = keras.optimizers.Adam(learning_rate=0.001)
    model.compile(optimizer=opt, loss='mean_squared_error',
                  metrics=['mean_absolute_error', 'accuracy'])

    model.fit([Xtrain.product_id, Xtrain.user], Xtrain.Rating,
              batch_size=64,
              epochs=epoch,
              verbose=2)

    MSE, MAE, accuracy = model.evaluate(
        [Xtest.product_id, Xtest.user], Xtest.Rating, verbose=2)
    RMSE = math.sqrt(MSE)

    print(f"accuracy of the model: ", accuracy)
    print(f"Mean Absolute Error: ", MAE)
    print(f"Mean Squared Error: ", MSE)
    print(f"Root Mean Squared Error: ", RMSE)

    # save the model
    model.save('trainedModels/neuralNetwork.h5')

    ratings_df.to_csv('dataset/cleanedRatings.csv',
                      encoding='utf-8', index=False)

    return RMSE, MSE, MAE, accuracy
