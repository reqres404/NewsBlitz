import nltk
import json
import os
from newspaper import Article
import requests
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor, as_completed

# Download necessary NLTK data
nltk.download('punkt')

# URLs for different topics
topics = {
    "health": 'https://www.google.com/search?sca_esv=361416631b2a74db&sca_upv=1&rlz=1C1FKPE_en-GBIN1108IN1108&sxsrf=ADLYWIIx5tW7S36gl5LvM3xlhJsJL8KNKw:1717165906405&q=health&tbm=nws&source=lnms&prmd=invsmbtz&sa=X&ved=2ahUKEwj1jvy-jbiGAxX9rlYBHUOpAIMQ0pQJegQICxAB&biw=1536&bih=730&dpr=1.25',
    "sports": 'https://www.google.com/search?sca_esv=361416631b2a74db&sca_upv=1&rlz=1C1FKPE_en-GBIN1108IN1108&sxsrf=ADLYWILAEYnaOqGhjN5peYhtRcr9y2lYfg:1717165953052&q=sports&tbm=nws&source=lnms&prmd=insvmbtz&sa=X&ved=2ahUKEwjUk5vVjbiGAxUaslYBHfBPMXIQ0pQJegQIERAB&biw=1536&bih=730&dpr=1.25',
    "finance": 'https://www.google.com/search?sca_esv=361416631b2a74db&sca_upv=1&rlz=1C1FKPE_en-GBIN1108IN1108&sxsrf=ADLYWILUjbr_C68PA_uECfeN76FofGM4hw:1717165976169&q=finance&tbm=nws&source=lnms&prmd=invsmbtz&sa=X&ved=2ahUKEwinqJ7gjbiGAxW9slYBHaJaDDwQ0pQJegQIEBAB&biw=1536&bih=730&dpr=1.25',
    "politics": 'https://www.google.com/search?sca_esv=361416631b2a74db&sca_upv=1&rlz=1C1FKPE_en-GBIN1108IN1108&sxsrf=ADLYWIJjzDsE1nNgvhcjEDDIyHae1FuFEA:1717166008335&q=politics&tbm=nws&source=lnms&prmd=invsbmtz&sa=X&ved=2ahUKEwiJxcnvjbiGAxUrk1YBHTD2BkUQ0pQJegQIChAB&biw=1536&bih=730&dpr=1.25',
    "india": 'https://www.google.com/search?q=india&num=100&sca_esv=6dc0ae32fc817d32&sca_upv=1&gl=us&tbm=nws&sxsrf=ADLYWIIacKjqsDULdbvQJeq4SIYV-BON9g%3A1716923053018&ei=rSpWZpNl5dWx4w-omIbwCA&oq=ind&gs_lp=Egxnd3Mtd2l6LW5ld3MiA2luZCoCCAgyChAAGIAEGEMYigUyChAAGIAEGEMYigUyCxAAGIAEGJECGIoFMgoQABiABBhDGIoFMgoQABiABBhDGIoFMhAQABiABBixAxhDGIMBGIoFMgoQABiABBhDGIoFMhAQABiABBixAxhDGIMBGIoFMgUQABiABEiUaVDcEViaGXAAeACQAQCYAZ8BoAGrBaoBAzAuNbgBAcgBAPgBAZgCBaAC0gXCAgsQABiABBixAxiDAcICBxAAGIAEGArCAggQABiABBixA8ICDhAAGIAEGLEDGIMBGIoFmAMAiAYBkgcDMC41oAfSHA&sclient=gws-wiz-news'
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
    return news_results

# Function to scrape an article and extract detailed information
def scrape_article(item, article_count):
    url = item['link']
    article = Article(url)

    try:
        article.download()
        article.parse()
        article.nlp()

        news_item = {
            "news_number": article_count,
            "title": article.title,
            "summary": article.summary,
            "keywords": article.keywords,
            "url": article.url,
            "imgURL": article.top_image
        }
        return news_item
    except Exception as e:
        print(f"Error scraping article from URL: {url}")
        print(e)
        return None

# Initialize dictionary to store all news data
all_news_data = {}

# Iterate over each topic and get news data
for topic, url in topics.items():
    print(f"Fetching news data for topic: {topic}")
    all_news_data[topic] = get_news_data(url)
    print(f"Fetched {len(all_news_data[topic])} news items for topic: {topic}")

# Write the news data to a JSON file
with open("gnews_url.json", "w") as f:
    json.dump(all_news_data, f, indent=2)

# Path to save detailed news data
api_folder_path = os.path.join(os.path.dirname(__file__), '..', 'API')
json_file_path = os.path.join(api_folder_path, 'data.json')

# Initialize dictionary to store detailed news data for all topics
detailed_news_data = {}

# Load the JSON data from the file
with open('gnews_url.json', 'r') as file:
    url_data = json.load(file)

# Use ThreadPoolExecutor to scrape articles in parallel
with ThreadPoolExecutor(max_workers=10) as executor:
    for topic, articles in url_data.items():
        print(f"Processing articles for topic: {topic}")
        detailed_topic_data = []
        article_count = 0

        futures = [executor.submit(scrape_article, item, article_count) for article_count, item in enumerate(articles)]
        for future in as_completed(futures):
            news_item = future.result()
            if news_item:
                detailed_topic_data.append(news_item)

        detailed_news_data[topic] = detailed_topic_data
        print(f"Processed {len(detailed_topic_data)} articles for topic: {topic}")

# Write detailed news data to a JSON file
with open(json_file_path, 'w') as json_file:
    json.dump(detailed_news_data, json_file, indent=2)

print("All topics processed and data saved successfully.")
