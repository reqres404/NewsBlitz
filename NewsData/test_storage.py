from google.cloud import storage
import os

GCS_KEY_PATH = "./gcp-storage-key.json"
storage_client = storage.Client.from_service_account_json("./gcp-storage-key.json")
BUCKET_NAME = "newsblitz_test_bucket"

api_folder_path = os.path.join(os.path.dirname(__file__), ".", "Data")
json_file_path = os.path.join(api_folder_path, "news.json")


def upload_to_gcs(local_file_path,destination_blob_name):
    try:
        bucket = storage_client.bucket(BUCKET_NAME)
        blob = bucket.blob(destination_blob_name)
        blob.upload_from_filename(local_file_path)
        print(f"✅ File '{local_file_path}' uploaded to GCS as '{destination_blob_name}'")
    except Exception as e:
        print(f"❌ Failed to upload to GCS: {e}")
    
upload_to_gcs(json_file_path, "news_backup/news.json")
