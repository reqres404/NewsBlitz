import os
import json
from newsapi import NewsApiClient

# Initialize the NewsApiClient with your API key
newsapi = NewsApiClient(api_key='353fc8bcb62d4b1f90761db68103a6e2')

# Fetch news articles with a page size limit of 25
allNews = newsapi.get_everything(q='india', page_size=25)

# Construct the path to the API directory relative to the current script location
api_folder_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'API')

# Ensure the API directory exists
if not os.path.exists(api_folder_path):
    os.makedirs(api_folder_path)

# Path for the JSON file in the API folder
json_file_path = os.path.join(api_folder_path, 'newsAPIData.json')

# Write the news results to the JSON file inside the API folder
with open(json_file_path, 'w', encoding='utf-8') as f:
    json.dump(allNews, f, indent=2, ensure_ascii=False)

print(f"News data saved to {json_file_path}")
