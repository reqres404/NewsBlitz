import json
import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from newspaper import Article
from apscheduler.schedulers.blocking import BlockingScheduler
import nltk
from concurrent.futures import ThreadPoolExecutor, as_completed

# Download necessary NLTK data
nltk.download('punkt')

# URLs for different topics
topics = {
    "india": 'https://www.google.com/search?q=india&num=100&gl=us&tbm=nws',
    "health": 'https://www.google.com/search?q=health&num=100&gl=us&tbm=nws',
    "sports": 'https://www.google.com/search?q=sports&num=100&gl=us&tbm=nws',
    "finance": 'https://www.google.com/search?q=finance&num=100&gl=us&tbm=nws',
    "politics": 'https://www.google.com/search?q=politics&num=100&gl=us&tbm=nws',
}

# Setup Selenium options
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36")

# Initialize scheduler
sched = BlockingScheduler()

def get_news_data():
    start_time = time.time()
    news_failed_to_scrape_count = 0
    driver = webdriver.Chrome(options=chrome_options)

    # Function to get news data for a given topic URL
    def get_news_url(topic_url):
        driver.get(topic_url)
        time.sleep(3)  # Wait for the page to load

        news_results = []
        elements = driver.find_elements(By.CSS_SELECTOR, "div.SoaBEf")
        
        for el in elements:
            try:
                news_results.append(
                    {
                        "link": el.find_element(By.TAG_NAME, "a").get_attribute("href"),
                        "title": el.find_element(By.CSS_SELECTOR, "div.MBeuO").text,
                        "snippet": el.find_element(By.CSS_SELECTOR, ".GI74Re").text,
                        "date": el.find_element(By.CSS_SELECTOR, ".LfVVr").text,
                        "source": el.find_element(By.CSS_SELECTOR, ".NUnG9d span").text
                    }
                )
            except Exception as e:
                print(f"Error extracting news item: {e}")

        return news_results[:50]  # Limit to 50 articles

    # Initialize dictionary to store all news data
    all_news_data = {}

    # Use ThreadPoolExecutor to scrape multiple pages concurrently
    with ThreadPoolExecutor(max_workers=5) as executor:
        future_to_topic = {executor.submit(get_news_url, url): topic for topic, url in topics.items()}
        for future in as_completed(future_to_topic):
            topic = future_to_topic[future]
            try:
                all_news_data[topic] = future.result()
            except Exception as e:
                print(f"Error scraping topic {topic}: {e}")

    # Write the news data to a JSON file
    with open("gnews_url.json", "w") as f:
        json.dump(all_news_data, f, indent=2)

    # Path to save detailed news data
    api_folder_path = os.path.join(os.path.dirname(__file__), '..', 'API')
    json_file_path = os.path.join(api_folder_path, 'headless_data.json')

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

                # Skip articles with "are you robot" in the title
                if "are you robot" in article.title.lower():
                    continue

                news_item = {
                    "news_number": article_count,
                    "title": article.title,
                    "summary": article.summary,
                    "url": article.url,
                    "imgURL": article.top_image
                }

                detailed_topic_data.append(news_item)
                article_count += 1

                if article_count >= 50:  # Limit to 50 detailed articles
                    break

            except Exception as e:
                news_failed_to_scrape_count += 1
                print(f"Error scraping article from URL: {url}")
                print(e)

        detailed_news_data[topic] = detailed_topic_data
    
    # Write detailed news data to a JSON file
    with open(json_file_path, 'w') as json_file:
        json.dump(detailed_news_data, json_file, indent=2)
    
    print("Number of news articles failed to scrape: " + str(news_failed_to_scrape_count))
    driver.quit()
    print("Time taken for execution: " + str(time.time() - start_time))

get_news_data()
