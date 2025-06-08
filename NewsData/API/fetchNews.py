from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


def load_data():
    try:
        news_data_file = os.path.join(
            os.path.dirname(__file__), "..", "Data/news_summarised.json"
        )
        print(news_data_file)
        with open(news_data_file, "r", encoding="utf-8") as file:
            news_data = json.load(file)
        print("Data Sent")
        return news_data
    except Exception as e:
        print(e)
        raise e


@app.route("/getAllNews", methods=["GET"])
def get_all_news():
    try:
        print("Does this work")
        news_data = load_data()
        return jsonify(news_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 404


@app.route("/testRoute", methods=["GET"])
def test_route():
    return jsonify({"message": "this works well"}), 200


if __name__ == "__main__":
    app.run(debug=True)
