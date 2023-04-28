import csv

from db import reviewsModel


def loadDBListener():
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
