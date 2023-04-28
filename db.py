import os
from pymongo import MongoClient
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

database_url = os.environ.get("DATABASE_URL")

client = MongoClient(database_url)
db = client.MainDB
reviewsModel = db.reviews
productsModel = db.products
