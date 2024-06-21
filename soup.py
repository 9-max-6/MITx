import requests
from bs4 import BeautifulSoup
import time

def recursive_scraper(url=None, next_page=None, count=0, tenders=None):
    """A function to recursively scrape a website"""
    if tenders is None:
        tenders = []
    
    print(f'iteration {count}')
    
    if count == 2:
        return tenders
    
    if next_page:
        url = next_page
    
    response = requests.get(url, allow_redirects=False)
    html_content = response.text
    soup = BeautifulSoup(html_content, 'html.parser')
    
    main = soup.find(class_='searchResults color-alternate')
    if not main:
        return tenders
    
    results = main.find_all(class_='result-item')
    next_page = soup.find(class_='result-index-navigation')
    
    next_page_url = next_page.find('a') if next_page else None
    next_page_actual_url = 'https://www.gtai.de' + next_page_url['href'] if next_page_url else None
    
    tender_details = {}
    for result in results:
        if 'Tender Notice' in result.get_text():
            content = result.find(class_='content')
            if content:
                url = content.find('a')['href'] if content.find('a') else None
                title = content.find('h3').get_text().strip() if content.find('h3') else None
                country = result.find(class_='country').get_text().strip() if result.find(class_='country') else None
                date = result.find(class_='overline__text date').get_text().strip() if result.find(class_='overline__text date') else None
                
                tender_details["title"] = title
                tender_details["url"] = 'https://www.gtai.de' + url if url else None
                tender_details["date"] = date
                tender_details["country"] = country

                tenders.append(tender_details)
    
    count += 1
    return recursive_scraper(url, next_page_actual_url, count, tenders)

def get_details(tenders):
    """A function to now scrape the actual tender information"""
    tender_details = []
    for tender in tenders:
        time.sleep(10)
        tender_info = {}
        tender_info["title"] = tender.get('title')
        tender_info["link"] = tender.get('url')
        tender_info["country"] = tender.get('country')
        main_content = ''
        with requests.get(tender.get('url')) as resp:
            if resp.status_code == 200:
                html_content = resp.text
                soup = BeautifulSoup(html_content, 'html.parser')
                main_content = soup.find(class_='article')
        tender_info["html"] = main_content
        tender_details.append(tender_info)
        print(tender_details)
    return tender_details

tenders = recursive_scraper('https://www.gtai.de/en/meta/search')
for tender in tenders:
    print(tender)
print(len(tenders))

tender_info = get_details(tenders)
