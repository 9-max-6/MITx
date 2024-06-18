import requests
from bs4 import BeautifulSoup

# URL to fetch HTML content from
url = 'https://agra.org/opportunities/procurement-notices/'  # Replace with the URL you want to fetch

# Fetch the HTML content
response = requests.get(url, allow_redirects=False)

print(response.headers)
html_content = response.text

# Check if the request was successful

# Create a BeautifulSoup object
soup = BeautifulSoup(html_content, 'html.parser')
print(soup)
    # Find all <a> tags with href attribute

    # Extract and print all href values

print(f"Failed to retrieve the page. Status code: {response.status_code}")
