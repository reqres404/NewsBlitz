<!-- Using deepseek to summarise -->
Download ollama from https://ollama.com/
Install deepseek model with ollama ollama run deepseek-r1:1.5b
serve ollama on your local host with ollama serve deepseek-r1:1.5b
Now run the newsdata/test_main.py

<!-- dependencies required -->
pip install json5 requests selenium newspaper3k nltk


Code Flow
A[Start] --> B[Scrape Google News]
B --> C[Save URLs to gnews_url.json]
C --> D[Process Each URL]
D --> E[Article Download/Parse]
E --> F[Summary Generation]
F --> G[Save to headless_data.json]
G --> H[Repeat Every 45min]



<!-- Script: Main.py -->
<!-- news url path : gnews_url.json -->
<!-- news summarised path: API/headless_data.json -->


<!-- Under development script : test_main.py -->
<!-- under development news path: news_summarise.json -->

<!-- Very high time to summarise news 30+mins for 200 news. -->