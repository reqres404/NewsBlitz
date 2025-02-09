import json
import os
import time
import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from newspaper import Article
import nltk
import newspaper.settings
from datetime import datetime, timedelta
import re
nltk.download('punkt')

newspaper.settings.DATA_DIRECTORY = os.path.join(os.getcwd(), 'newspaper_cache')

# DeepSeek R1 API settings
OLLAMA_API_URL = "http://localhost:11434/api/generate"  # Adjust if running on a different port
MODEL_NAME = "deepseek-r1:1.5b"  # Update if your model has a different name in Ollama

topics = {
    "india": 'https://www.google.com/search?q=international&num=100&sca_esv=361f429e8db713bc&sca_upv=1&gl=us&tbm=nws&sxsrf=ADLYWIJ2Ap-o7gm-0qFWxEEsiApjuPzPAg%3A1718289373162&ei=3QNrZq3ECaCnseMP0fu0kQQ&ved=0ahUKEwjtptXd5tiGAxWgU2wGHdE9LUIQ4dUDCA0&uact=5&oq=international&gs_lp=Egxnd3Mtd2l6LW5ld3MiDWludGVybmF0aW9uYWwyERAAGIAEGJECGLEDGIMBGIoFMgsQABiABBiRAhiKBTIKEAAYgAQYQxiKBTIKEAAYgAQYQxiKBTINEAAYgAQYsQMYQxiKBTILEAAYgAQYsQMYgwEyDRAAGIAEGLEDGEMYigUyDhAAGIAEGLEDGIMBGIoFMg4QABiABBixAxiDARiKBTILEAAYgAQYsQMYgwFI9EZQ1QxY2DVwAHgAkAEAmAHJAaAB2RGqAQYwLjE0LjG4AQPIAQD4AQGYAg-gAsUSwgIQEAAYgAQYsQMYQxiDARiKBcICBRAAGIAEwgIIEAAYgAQYsQOYAwCIBgGSBwYwLjEzLjKgB_Zc&sclient=gws-wiz-news',
    "health": 'https://www.google.com/search?q=india+health&num=100&sca_esv=361f429e8db713bc&sca_upv=1&gl=us&tbm=nws&sxsrf=ADLYWILHgXefVMkf7U_q4jVXsRTBVYT1yw%3A1718289342451&ei=vgNrZpL5GvDiseMP_uuFwAY&ved=0ahUKEwiS0ILP5tiGAxVwcWwGHf51AWgQ4dUDCA0&uact=5&oq=india+health&gs_lp=Egxnd3Mtd2l6LW5ld3MiDGluZGlhIGhlYWx0aDILEAAYgAQYsQMYgwEyCxAAGIAEGLEDGIMBMgsQABiABBixAxiDATILEAAYgAQYsQMYgwEyCBAAGIAEGLEDMgsQABiABBixAxiDATIFEAAYgAQyCxAAGIAEGLEDGIMBMgUQABiABDIFEAAYgARI_h5QxBVYgxxwA3gAkAEAmAG3AqABuQyqAQcwLjcuMS4xuAEDyAEA-AEBmAIMoAKrDcICEBAAGIAEGLEDGEMYgwEYigXCAgoQABiABBhDGIoFwgIREAAYgAQYkQIYsQMYgwEYigXCAgsQABiABBixAxiDAcICCBAAGIAEGLEDwgIOEAAYgAQYsQMYgwEYigWYAwCIBgGSBwczLjcuMS4xoAeNMw&sclient=gws-wiz-news',
    "sports": 'https://www.google.com/search?q=india+sports&num=100&sca_esv=361f429e8db713bc&sca_upv=1&gl=us&tbm=nws&sxsrf=ADLYWIJhFySp6FcLyvQi_RR_eHWYExjrdA%3A1718289304723&ei=mANrZrzgK-iUseMPn66duA4&ved=0ahUKEwi8jIS95tiGAxVoSmwGHR9XB-cQ4dUDCA0&uact=5&oq=india+sports&gs_lp=Egxnd3Mtd2l6LW5ld3MiDGluZGlhIHNwb3J0czILEAAYgAQYsQMYgwEyCxAAGIAEGLEDGIMBMgsQABiABBixAxiDATIFEAAYgAQyBRAAGIAEMgsQABiABBixAxiDATIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgARI3A9QhwVY4AxwAHgAkAEAmAGTAqABjAqqAQUwLjcuMbgBA8gBAPgBAZgCCKAC0QrCAhAQABiABBixAxhDGIMBGIoFwgILEAAYgAQYkQIYigXCAg4QABiABBiRAhixAxiKBcICERAAGIAEGJECGLEDGIMBGIoFwgIOEAAYgAQYsQMYgwEYigXCAggQABiABBixA8ICBBAAGAOYAwCIBgGSBwUwLjcuMaAHzCw&sclient=gws-wiz-news',
    "finance": 'https://www.google.com/search?q=india+finance&num=100&sca_esv=361f429e8db713bc&sca_upv=1&gl=us&tbm=nws&sxsrf=ADLYWIK9Vsy8IIUE_j5kQF2QGAqlep7BSw%3A1718289219171&ei=QwNrZpv9CZzXseMP4q2hoAU&ved=0ahUKEwjbqp6U5tiGAxWca2wGHeJWCFQQ4dUDCA0&uact=5&oq=india+finance&gs_lp=Egxnd3Mtd2l6LW5ld3MiDWluZGlhIGZpbmFuY2UyERAAGIAEGJECGLEDGIMBGIoFMgUQABiABDILEAAYgAQYsQMYgwEyCxAAGIAEGLEDGIMBMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABEjrL1D9C1jSIXAAeACQAQCYAZwCoAGCD6oBBTAuNi40uAEDyAEA-AEBmAIKoALqD8ICEBAAGIAEGLEDGEMYgwEYigXCAg4QABiABBixAxiDARiKBcICChAAGIAEGEMYigXCAgsQABiABBixAxiDAcICCBAAGIAEGLEDwgIREAAYgAQYkQIYsQMYgwEYigXCAg4QABiABBiRAhixAxiKBcICCxAAGIAEGJECGIoFmAMAiAYBkgcFMC42LjSgB8w6&sclient=gws-wiz-news',
    "politics": 'https://www.google.com/search?q=india+politics&num=100&sca_esv=361f429e8db713bc&sca_upv=1&gl=us&tbm=nws&sxsrf=ADLYWILSSxKpnF2FV0lalcGQRUQbn4evOw%3A1718289209337&ei=OQNrZv39E4C5seMPv_miyAo&ved=0ahUKEwi9_sWP5tiGAxWAXGwGHb-8CKkQ4dUDCA0&uact=5&oq=india+politics&gs_lp=Egxnd3Mtd2l6LW5ld3MiDmluZGlhIHBvbGl0aWNzMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABEjrL1D9C1jSIXAAeACQAQCYAZwCoAGCD6oBBTAuNi40uAEDyAEA-AEBmAIKoALqD8ICEBAAGIAEGLEDGEMYgwEYigXCAg4QABiABBixAxiDARiKBcICChAAGIAEGEMYigXCAgsQABiABBixAxiDAcICCBAAGIAEGLEDwgIOEAAYgAQYsQMYgwEYigWYAwCIBgGSBwUwLjcuMaAHzCw&sclient=gws-wiz-news',
}

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument(
    "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36"
)

def get_news_data():
    start_time = time.time()
    news_failed_to_scrape_count = 0
    driver = webdriver.Chrome(options=chrome_options)

    def get_news_url(topic_url):
        driver.get(topic_url)
        try:
            WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.SoaBEf")))
        except Exception as e:
            print(f"Error loading page: {e}")
            return []

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
                        "source": el.find_element(By.CSS_SELECTOR, ".NUnG9d span").text,
                    }
                )
            except Exception as e:
                print(f"Error extracting news item: {e}")

        return news_results[:50]  

    all_news_data = {}
    for topic, url in topics.items():
        all_news_data[topic] = get_news_url(url)

    with open("gnews_url.json", "w") as f:
        json.dump(all_news_data, f, indent=2)

    api_folder_path = os.path.join(os.path.dirname(__file__), "..", "API")
    json_file_path = os.path.join(api_folder_path, "news.json")

    detailed_news_data = {}
    with open("gnews_url.json", "r") as file:
        url_data = json.load(file)

    for topic, articles in url_data.items():
        detailed_topic_data = []
        article_count = 0

        for item in articles:
            url = item["link"]
            article = Article(url)

            try:
                article.download()
                article.parse()

                if len(article.text) < 100:
                    continue

                news_item = {
                    "news_number": article_count,
                    "title": article.title,
                    "content": article.text,  
                    "url": article.url,
                    "imgURL": article.top_image,
                    "date": article.publish_date.isoformat() if article.publish_date else None,
                }

                detailed_topic_data.append(news_item)
                article_count += 1

                if article_count >= 30:
                    break

            except Exception as e:
                news_failed_to_scrape_count += 1
                print(e)
        detailed_news_data[topic] = detailed_topic_data

    with open(json_file_path, "w") as json_file:
        json.dump(detailed_news_data, json_file, indent=2)

    driver.quit()
    print(f"Scraping completed. Saved to {json_file_path}")
    
    summarize_news(json_file_path)  # Call summarization after scraping

def summarize_news(json_file_path):
    """
    Summarizes the content of `news.json` using DeepSeek R1 (Ollama) and saves it to `news_summarise.json`.
    """
    with open(json_file_path, "r") as file:
        news_data = json.load(file)

    for topic, articles in news_data.items():
        for article in articles:
            content = article["content"]
            if not content:
                continue  

            summary = get_summary_from_ollama(content)  
            if summary:
                article["content"] = summary  # Replace content with summary
                number = article["news_number"]
                print(f"article number ${number} of topic ${topic} summarised") 

    summarized_file_path = os.path.join(os.path.dirname(__file__), "..", "API", "news_summarise.json")
    with open(summarized_file_path, "w") as json_file:
        json.dump(news_data, json_file, indent=2)

    print(f"Summarization completed. Saved to {summarized_file_path}")

def get_summary_from_ollama(text):
    print("Sending text to Ollama's DeepSeek R1 for summarization.")

    payload = {
        "model": MODEL_NAME,
        "prompt": (
            "Summarize the following article while maintaining key details. "
            "Do not include any additional commentary, reasoning, or meta-text. "
            "Output should be clean and directly contain the summary between 100-150 words.:\n\n"
            f"{text}"
        ),
        "stream": False
    }

    try:
        response = requests.post(OLLAMA_API_URL, json=payload)
        response_data = response.json()
        response_text = response_data.get("response", "").strip()
        
        # Remove the <think>...</think> part
        cleaned_summary = re.sub(r"<think>.*?</think>\s*", "", response_text, flags=re.DOTALL)
        
        return cleaned_summary
    except Exception as e:
        print(f"Error communicating with Ollama: {e}")
        return None

while True:
    get_news_data()
    time.sleep(2700) # Time Interval for script to rerun.
