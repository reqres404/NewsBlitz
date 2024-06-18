import requests
from bs4 import BeautifulSoup
from newspaper import Article
from textblob import TextBlob
import nltk
import json
import os
nltk.download('punkt')

# Define the directory path for the API folder
api_folder_path = os.path.join(os.path.dirname(__file__), '..', 'API')

# Check if the API folder exists, if not, create it
if not os.path.exists(api_folder_path):
    os.makedirs(api_folder_path)

# Define the file path for data.json in the API folder
json_file_path = os.path.join(api_folder_path, 'data.json')
newsData = []
article_count = 0

# internationalheadlines


feed = "https://abcnews.go.com/abcnews/internationalheadlines"

response = requests.get(feed)
webpage = response.content
soup = BeautifulSoup(webpage, features='xml')

items = soup.find_all('item')

# extract the article link within each <item> tag and store in a separate list
articles = []
for item in items:
    link = item.find('link').text
    articles.append(link)

# extract the data from each article, perform sentiment analysis, and then print
for url in articles:
    article = Article(url)
    article.download()
    article.parse()
    article.nlp()

    
    title = article.title
    summary = article.summary
    keywords = article.keywords
    text = article.text
    url = article.url
    imgURL = article.top_image
    # # run sentiment analysis on the article text
    # # create a Textblob object and then get the sentiment values and store them
    # text_blob = TextBlob(text)
    # polarity = text_blob.polarity
    # subjectivity = text_blob.subjectivity

    newsDetails = {
        "News": article_count,
        "title": title,
        "summary": summary,
        # "text": text,
        "keywords":keywords,
        # "polarity":polarity,
        # "text_blob": text_blob,
        # "subjectivity": subjectivity,  
        "url":url ,
        "imgURL":imgURL
    }
    newsData.append(newsDetails)
    article_count+=1

    if article_count>=20:
        break   
             
with open(json_file_path, 'w') as json_file:
    json.dump(newsData, json_file)

print(newsData)