import json
import requests
from bs4 import BeautifulSoup
 
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