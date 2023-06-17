from db import productsModel


def getProductData(productIds):
    products = productsModel.aggregate([
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
    ])
    return list(products)
