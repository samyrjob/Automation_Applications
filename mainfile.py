import openai
import pandas as pd

from dotenv import load_dotenv
import os

load_dotenv()  # Load variables from .env



# Step 1: Read the .txt file
with open("input.txt", "r") as file:
    text_content = file.read()

# Step 2: Send to AI for analysis
openai.api_key = os.getenv("api_openai_key") # Replace with your OpenAI key

response = openai.ChatCompletion.create(
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
print("AI Analysis Result:", ai_output)  # Debug (optional)

# Step 3: Parse AI output (assuming JSON)
import json
try:
    data = json.loads(ai_output)  # Convert AI response to dict
except:
    data = {"Position": "N/A", "Company": "N/A", "Main Skills": "N/A", "Location": "N/A"}  # Fallback

# Step 4: Save to Excel
df = pd.DataFrame([data])  # Create DataFrame from AI output
df.to_excel("output.xlsx", index=True)

print("Excel file created successfully!")
