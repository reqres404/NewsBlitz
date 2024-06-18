import nltk
import json
import os
from newspaper import Article
import requests
from bs4 import BeautifulSoup

# Download necessary NLTK data
nltk.download('punkt')

# URLs for different topics
topics = {
    "india": 'https://www.google.com/search?q=india&num=100&sca_esv=6dc0ae32fc817d32&sca_upv=1&gl=us&tbm=nws&sxsrf=ADLYWIIacKjqsDULdbvQJeq4SIYV-BON9g%3A1716923053018&ei=rSpWZpNl5dWx4w-omIbwCA&oq=ind&gs_lp=Egxnd3Mtd2l6LW5ld3MiA2luZCoCCAgyChAAGIAEGEMYigUyChAAGIAEGEMYigUyCxAAGIAEGJECGIoFMgoQABiABBhDGIoFMgoQABiABBhDGIoFMhAQABiABBixAxhDGIMBGIoFMgoQABiABBhDGIoFMgoQABiABBhDGIoFMhAQABiABBixAxhDGIMBGIoFMgUQABiABEiUaVDcEViaGXAAeACQAQCYAZ8BoAGrBaoBAzAuNbgBAcgBAPgBAZgCBaAC0gXCAgsQABiABBixAxiDAcICBxAAGIAEGArCAggQABiABBixA8ICDhAAGIAEGLEDGIMBGIoFmAMAiAYBkgcDMC41oAfSHA&sclient=gws-wiz-news',
    "health": 'https://www.google.com/search?q=health&num=100&sca_esv=6dc0ae32fc817d32&sca_upv=1&gl=us&tbm=nws&sxsrf=ADLYWIJGqlw0-XTNhuUjMBchs5gZ0nNMFA%3A1717274272748&ei=oIZbZtmsLc_C4-EPqeW9uA0&ved=0ahUKEwjZ_IiYobuGAxVP4TgGHalyD9cQ4dUDCA4&uact=5&oq=health&gs_lp=Egxnd3Mtd2l6LW5ld3MiBmhlYWx0aDIQEAAYgAQYsQMYQxiDARiKBTINEAAYgAQYsQMYQxiKBTIKEAAYgAQYQxiKBTINEAAYgAQYsQMYQxiKBTINEAAYgAQYsQMYQxiKBTIKEAAYgAQYQxiKBTILEAAYgAQYsQMYgwEyCBAAGIAEGLEDMgsQABiABBixAxiDATIIEAAYgAQYsQNIzhdQ5AZY6xBwAHgAkAEAmAHcAaABvQmqAQUwLjcuMbgBA8gBAPgBAZgCCKACgQrCAgQQABgDwgILEAAYgAQYsQMYigXCAg4QABiABBixAxiDARiKBcICERAAGIAEGJECGLEDGIMBGIoFwgIFEAAYgASYAwCIBgGSBwUwLjYuMqAH4Co&sclient=gws-wiz-news',
    "sports": 'https://www.google.com/search?q=sports&num=100&sca_esv=6dc0ae32fc817d32&sca_upv=1&gl=us&tbm=nws&sxsrf=ADLYWIJGuVcKYEPIM27q0ICh_zd6BA0q-w%3A1717274328613&ei=2IZbZvSIJc3a4-EPzc3R-Qg&ved=0ahUKEwj01NqyobuGAxVN7TgGHc1mNI8Q4dUDCA4&uact=5&oq=sports&gs_lp=Egxnd3Mtd2l6LW5ld3MiBnNwb3J0czIQEAAYgAQYsQMYQxiDARiKBTILEAAYgAQYsQMYgwEyCxAAGIAEGLEDGIMBMg0QABiABBixAxhDGIoFMggQABiABBixAzIIEAAYgAQYsQMyCBAAGIAEGLEDMgsQABiABBixAxiDATIIEAAYgAQYsQMyDhAAGIAEGLEDGIMBGIoFSNAOUJQFWOgLcAB4AJABAJgBjgGgAf0HqgEDMC44uAEDyAEA-AEBmAIIoALOCMICChAAGIAEGEMYigWYAwCIBgGSBwMwLjigB-Up&sclient=gws-wiz-news',
    "finance": 'https://www.google.com/search?q=finance&num=100&sca_esv=6dc0ae32fc817d32&sca_upv=1&gl=us&tbm=nws&sxsrf=ADLYWIKwkYJ2KZ5wMgfgdUOywI4vrJCsRg%3A1717274265968&ei=mYZbZsjjOpqb4-EPwc2c6As&ved=0ahUKEwiIlOuUobuGAxWazTgGHcEmB70Q4dUDCA4&uact=5&oq=finance&gs_lp=Egxnd3Mtd2l6LW5ld3MiB2ZpbmFuY2UyDRAAGIAEGLEDGEMYigUyDRAAGIAEGLEDGEMYigUyDRAAGIAEGLEDGEMYigUyChAAGIAEGEMYigUyChAAGIAEGEMYigUyDRAAGIAEGLEDGEMYigUyChAAGIAEGEMYigUyBBAAGAMyCBAAGIAEGLEDMggQABiABBixA0jgHVCZC1jnF3AAeACQAQCYAb8BoAH_CKoBAzAuObgBA8gBAPgBAZgCCaACswnCAhAQABiABBixAxhDGIMBGIoFwgIOEAAYgAQYsQMYgwEYigXCAgsQABiABBixAxiDAZgDAIgGAZIHAzAuOaAHpTQ&sclient=gws-wiz-news',
    "politics": 'https://www.google.com/search?q=politics&num=100&sca_esv=6dc0ae32fc817d32&sca_upv=1&gl=us&tbm=nws&sxsrf=ADLYWILUGAq0ZiH65IbZ24qLMeatcN3CCw%3A1717274349222&ei=7YZbZoqeDbuv4-EP3-2P4A4&ved=0ahUKEwjKyMS8obuGAxW71zgGHd_2A-wQ4dUDCA4&uact=5&oq=politics&gs_lp=Egxnd3Mtd2l6LW5ld3MiCHBvbGl0aWNzMhAQABiABBixAxhDGIMBGIoFMhAQABiABBixAxhDGIMBGIoFMggQABiABBixAzIKEAAYgAQYQxiKBTIIEAAYgAQYsQMyCxAAGIAEGLEDGIMBMggQABiABBixAzIIEAAYgAQYsQMyBRAAGIAEMgsQABiABBixAxiDAUiVFFDTBViUEnAAeACQAQCYAZABoAGeCqoBBDAuMTC4AQPIAQD4AQGYAgqgAvsKwgIREAAYgAQYkQIYsQMYgwEYigXCAg4QABiABBiRAhixAxiKBcICDhAAGIAEGLEDGIMBGIoFwgINEAAYgAQYsQMYQxiKBZgDAIgGAZIHBDAuMTCgB7Y2&sclient=gws-wiz-news',
}

# Define headers for requests
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36"
}

# Function to get news data for a given topic URL
def get_news_data(topic_url):
    response = requests.get(topic_url, headers=headers)
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
    return news_results[:50]  # Limit to 50 articles

# Initialize dictionary to store all news data
all_news_data = {}

# Iterate over each topic and get news data
for topic, url in topics.items():
    all_news_data[topic] = get_news_data(url)

# Write the news data to a JSON file
with open("gnews_url.json", "w") as f:
    json.dump(all_news_data, f, indent=2)

# Path to save detailed news data
api_folder_path = os.path.join(os.path.dirname(__file__), '..', 'API')
json_file_path = os.path.join(api_folder_path, 'HKdata.json')

# Initialize dictionary to store detailed news data for all topics
detailed_news_data = {}

# Load the JSON data from the file
with open('gnews_url.json', 'r') as file:
    url_data = json.load(file)

# Iterate over each topic and scrape articles
for topic, articles in url_data.items():
    detailed_topic_data = []
    article_count = 0

    for item in articles:
        url = item['link']
        article = Article(url)

        try:
            article.download()
            article.parse()
            article.nlp()

            news_item = {
                "news_number": article_count,
                "title": article.title,
                "news": article.text,
                # "keywords": article.keywords,
                "url": article.url,
                "imgURL": article.top_image
            }

            detailed_topic_data.append(news_item)
            article_count += 1

            if article_count >= 50:  # Limit to 50 detailed articles
                break

        except Exception as e:
            print(f"Error scraping article from URL: {url}")
            print(e)

    detailed_news_data[topic] = detailed_topic_data

# Write detailed news data to a JSON file
with open(json_file_path, 'w') as json_file:
    json.dump(detailed_news_data, json_file, indent=2)
