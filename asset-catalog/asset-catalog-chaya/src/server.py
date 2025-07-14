import requests

url ="http://127.0.0.1:8080" 
data = {"key": "value"}

response = requests.post(url, data=data, timeout=100)

if response.status_code == 200:
    print("Request successful")
    print(response.text)
else:
    print("Request failed") 
