# Create fresh environment
python -m venv news_env
# source news_env/bin/activate  # Linux/Mac
news_env\Scripts\activate   # Windows

# Install core dependencies
pip install --upgrade pip
pip install selenium==4.21.0 newspaper4k==0.1.9.8 python-dateutil==2.9.0.post0
pip install tenacity==8.2.3 lxml==5.2.1 beautifulsoup4==4.12.3 pytz==2024.1

# Install ChromeDriver (match your Chrome version)
# Download from https://chromedriver.chromium.org/
# Place chromedriver.exe in project root