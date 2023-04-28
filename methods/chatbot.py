import json
import random
import pickle
import tensorflow as tf
import numpy as np
import nltk

# nltk.download('punkt')
# nltk.download('wordnet')

lemmatizer = nltk.stem.WordNetLemmatizer()

with open('dataset/chatbot/chatWords.pkl', 'rb') as f:
    chatWords = pickle.load(f)

with open('dataset/chatbot/chatClasses.pkl', 'rb') as f:
    chatClasses = pickle.load(f)

chatIntents = json.loads(open('dataset/chatbot/intents.json').read())

chatbotModel = tf.keras.models.load_model(
    'trainedModels/chatbotModel.h5')


def cleanSentence(sentence):
    # tokenize the pattern - split words into array
    sentence_words = nltk.word_tokenize(sentence)
    # stem each word - create short form for word
    sentence_words = [lemmatizer.lemmatize(
        word.lower()) for word in sentence_words]
    return sentence_words


def bow(sentence, words, show_details=True):
    # tokenize the pattern
    sentence_words = cleanSentence(sentence)
    # bag of words - matrix of N words, vocabulary matrix
    bag = [0]*len(words)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                # assign 1 if current word is in the vocabulary position
                bag[i] = 1
                if show_details:
                    print("found in bag: %s" % w)
    return (np.array(bag))


def predictClass(sentence, model):
    # filter out predictions below a threshold
    p = bow(sentence, chatWords, show_details=False)
    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    # sort by strength of probability
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append(
            {"intent": chatClasses[r[0]], "probability": str(r[1])})
    return return_list


def getResponse(ints, intents_json):
    tag = ints[0]['intent']
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if (i['tag'] == tag):
            result = random.choice(i['responses'])
            break
    return result


def chatbotResponse(text):
    ints = predictClass(text, chatbotModel)
    res = getResponse(ints, chatIntents)
    return res
