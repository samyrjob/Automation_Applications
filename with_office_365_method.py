import openai
import pandas as pd
import json
from dotenv import load_dotenv
import os
from office365.runtime.auth.authentication_context import AuthenticationContext
from office365.sharepoint.client_context import ClientContext
from office365.sharepoint.files.file import File
from io import BytesIO

# Load environment variables
load_dotenv()

# Step 1: Read the .txt file
with open("input.txt", "r") as file:
    text_content = file.read()

# # Step 2: Send to AI for analysis
# openai.api_key = os.getenv("api_openai_key")



# Initialize OpenAI client with your API key
client = openai.OpenAI(api_key=os.getenv("api_openai_key"))

response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {
            "role": "system",
            "content": "Extract from the given text the following fields: position name, company name, main skills required, and location. Return in JSON format. The headers should be 'Position', 'Company', 'Main Skills', 'Location'."
        },
        {
            "role": "user",
            "content": text_content
        }
    ]
)

# Extract AI's response
ai_output = response.choices[0].message.content
print("AI Analysis Result:", ai_output)

# Step 3: Parse AI output
try:
    cleaned_output = ai_output.strip().replace('```json', '').replace('```', '')
    data = json.loads(cleaned_output)
except json.JSONDecodeError as e:
    print(f"Failed to parse JSON: {e}")
    print("Raw AI output:", ai_output)
    data = {"Position": "N/A", "Company": "N/A", "Main Skills": "N/A", "Location": "N/A"}

# Ensure data is in correct format
if not isinstance(data, dict):
    data = {"Position": "N/A", "Company": "N/A", "Main Skills": "N/A", "Location": "N/A"}

# Step 4: Save to OneDrive/SharePoint Excel
def update_onedrive_excel(new_data):
    # Configuration - Update these with your details
    SHAREPOINT_URL = "https://outlooklivechesterac-my.sharepoint.com/"
    SITE_PATH = "/personal/2427448_chester_ac_uk"
    FILE_PATH = "/Documents/Test_Applications_automation.xlsx"  # Adjust path as needed
    
    USERNAME = os.getenv("SHAREPOINT_USERNAME")  # Store in .env
    PASSWORD = os.getenv("SHAREPOINT_PASSWORD")  # Store in .env
    
    try:
        # Authenticate
        ctx_auth = AuthenticationContext(SHAREPOINT_URL + SITE_PATH)
        if ctx_auth.acquire_token_for_user(USERNAME, PASSWORD):
            ctx = ClientContext(SHAREPOINT_URL + SITE_PATH, ctx_auth)
            
            # Download current file
            response = File.open_binary(ctx, FILE_PATH)
            excel_data = BytesIO(response.content)
            
            # Read existing data
            existing_df = pd.read_excel(excel_data)
            
            # Append new data with index=True
            new_df = pd.DataFrame([new_data])
            updated_df = pd.concat([existing_df, new_df], ignore_index=True)
            
            # Prepare to upload
            output = BytesIO()
            updated_df.to_excel(output, index=True)  # index=True as requested
            output.seek(0)
            
            # Upload back to OneDrive/SharePoint
            File.save_binary(ctx, FILE_PATH, output.read())
            print("Successfully updated Excel file in OneDrive/SharePoint!")
            return True
        else:
            print("Failed to authenticate with SharePoint")
            return False
    except Exception as e:
        print(f"Error updating file: {e}")
        # Fallback to local save
        local_path = "local_backup.xlsx"
        if os.path.exists(local_path):
            existing_df = pd.read_excel(local_path)
            updated_df = pd.concat([existing_df, pd.DataFrame([new_data])], ignore_index=True)
        else:
            updated_df = pd.DataFrame([new_data])
        
        updated_df.to_excel(local_path, index=True)
        print(f"Saved to local backup file: {local_path}")
        return False

# Update the Excel file in OneDrive
update_onedrive_excel(data)