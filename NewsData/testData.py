import nltk
import json
import os
from newspaper import Article
import requests
from bs4 import BeautifulSoup

nltk.download('punkt')

def getNewsData():
    headers = {
        "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36"
    }
    response = requests.get(
        "https://www.google.com/search?q=india&num=100&sca_esv=6dc0ae32fc817d32&sca_upv=1&gl=us&tbm=nws&sxsrf=ADLYWIIacKjqsDULdbvQJeq4SIYV-BON9g%3A1716923053018&ei=rSpWZpNl5dWx4w-omIbwCA&oq=ind&gs_lp=Egxnd3Mtd2l6LW5ld3MiA2luZCoCCAgyChAAGIAEGEMYigUyChAAGIAEGEMYigUyCxAAGIAEGJECGIoFMgoQABiABBhDGIoFMgoQABiABBhDGIoFMhAQABiABBixAxhDGIMBGIoFMgoQABiABBhDGIoFMgoQABiABBhDGIoFMhAQABiABBixAxhDGIMBGIoFMgUQABiABEiUaVDcEViaGXAAeACQAQCYAZ8BoAGrBaoBAzAuNbgBAcgBAPgBAZgCBaAC0gXCAgsQABiABBixAxiDAcICBxAAGIAEGArCAggQABiABBixA8ICDhAAGIAEGLEDGIMBGIoFmAMAiAYBkgcDMC41oAfSHA&sclient=gws-wiz-news", headers=headers
    )
    soup = BeautifulSoup(response.content, "html.parser")
    news_results = []
 
    for el in soup.select("div.SoaBEf"):
        news_results.append(
            {
                "link": el.find("a")["href"],
                "title": el.select_one("div.MBeuO").get_text(),
                "snippet": el.select_one(".GI74Re").get_text(),
                "date": el.select_one(".LfVVr").get_text(),
                "source": el.select_one(".NUnG9d span").get_text()
            }
        )
      # Writing the data to a JSON file
    with open("gnews_url.json", "w") as f:
        json.dump(news_results, f, indent=2)

getNewsData()
api_folder_path = os.path.join(os.path.dirname(__file__), '..', 'API')
json_file_path = os.path.join(api_folder_path, 'data.json')
article_count = 0

# Load the JSON data from the file
with open('gnews_url.json', 'r') as file:
    data = json.load(file)

# List to store scraped news data
news_data = []

# Iterate over each item in the JSON data
for item in data:
    url = item['link']  # Extract the link from the item
    article = Article(url)
    
    try:
        # Download and parse the article
        article.download()
        article.parse()
        article.nlp()
        # Extract relevant information
        title = article.title
        summary = article.summary
        keywords = article.keywords
        text = article.text
        url = article.url
        imgURL = article.top_image        
        # Store data in dictionary
        news_item = {
        "news_number":article_count,
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
        
        # Append to list only if scraping was successful
        news_data.append(news_item)
        article_count+=1
    except Exception as e:
        # Print error message if any error occurs
        print("Error scraping article from URL:", url)
        print(e)

# Dump news data into a JSON file
with open(json_file_path, 'w') as json_file:
    json.dump(news_data, json_file)

print(news_data)