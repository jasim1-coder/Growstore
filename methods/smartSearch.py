import pandas as pd

from methods.getProductDB import getProductData


def getMatchScore(string, string2):
    """
    Computes a similarity score between two strings using the Levenshtein distance algorithm.
    Returns a float between 0 and 1, where 0 means the strings are completely different and 1 means
    they are identical.
    """
    # Initialize the distance matrix with zeros
    string = string.lower()
    string2 = string2.lower()
    strings = string.split()
    finalScore = -99999

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
        if (score > finalScore):
            finalScore = score

    return finalScore


def loadSmartSearchProducts(query):
    productsDF = pd.read_csv('dataset/cleanedMetaData.csv')

    productsDF['match_score'] = productsDF['title'].apply(
        lambda x: getMatchScore(x, query))

    # Sort the dataframe by the match score in descending order
    productsDF = productsDF.sort_values('match_score', ascending=False)

    products = productsDF[["title", "_id", "match_score"]].head(10)
    productIds = list(products._id)
    products = getProductData(productIds)

    return products
