import requests
from bs4 import BeautifulSoup
from ...models import Opportunity
import time
from django.core.management.base import BaseCommand
from api.models import Opportunity
from langserve import RemoteRunnable



class BaseScraper():
    """Base class for all scraper classes"""
    website_name = ""
    
    headers = {}
    ref_nums = Opportunity.objects.values('ref_number')
    titles = Opportunity.objects.filter(
        website_name='GTAI'
        ).values_list(
            'title', flat=True
            )
    def __init__(self, *args, **kwargs):
        """constructor"""
        pass

    def ai_opportunities(self, openai_feedback):
        """A celery shared task for updating opportunities"""
        pass

    def brush_up(self, open_ai_feedback):
        """A function to clean up opportunities"""


class GTAI(BaseScraper):
    """A class to handle scraping from GTAI"""

    def __init__(self, *args, **kwargs):
        """The constructor function for the class GTAI"""
        self.website_name = "GTAI"
        self.baseurl = "https://www.gtai.de/en/meta/search"
    def recursive_scraper(self, url=None, next_page=None, count=0, tenders=None):
        """A function to recursively scrape a website"""
        if tenders is None:
            tenders = []

        print(f'iteration {count}')

        if count == 2:
            return self.get_details(tenders)

        if next_page:
            url = next_page

        response = requests.get(url, allow_redirects=False)
        html_content = response.text
        soup = BeautifulSoup(html_content, 'html.parser')

        main = soup.find(class_='searchResults color-alternate')
        if not main:
            return self.get_details(tenders)

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
                    if title in self.titles:
                        continue
                    else:
                        tender_details["title"] = title
                        tender_details["url"] = 'https://www.gtai.de' + url if url else None
                        tender_details["date"] = date
                        tender_details["country"] = country

                        tenders.append(tender_details)

        count += 1
        return self.recursive_scraper(url, next_page_actual_url, count, tenders)

    def get_details(self, tenders):
        """A function to now scrape the actual tender information"""
        tender_details = []
        for tender in tenders:
            time.sleep(10)
            tender_info = {}
            tender_info["title"] = tender.get('title')
            tender_info["link"] = tender.get('url')
            tender_info["country"] = tender.get('country')
            tender_info["website_name"] = self.website_name
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


class RFXNow(BaseScraper):
    """class to handle scraping from rfx now"""
    baseurl = "https://wbgeprocure-rfxnow.worldbank.org/rfxnow/json/advertisement/activeAdvertisements.json"
    def __init__(self, *args, **kwargs):
        """constructor"""
        self.website_name = 'RFXNow'
    
    def rfx_scraper(self, url):
        """a function to get the json objects from RFXNow"""
        with requests.get(url, headers=self.headers) as resp:
            if resp.status_code == 200:
                json = resp.json()
                return self.check_opps(json)
            else:
                resp.raise_for_status()
    
    def check_opps(self, opps):
        """A function to check with opportunities are new"""
        opportunities = Opportunity.objects.values('ref_number')
        new_ops = []
        for opp in opps.get('advertisementList', None):
            if opp.get('procurementNumber') not in opportunities:
                if opp:
                    new_ops.append(opp)

        return self.transform_ops(new_ops)
    
    def transform_ops(self, opps):
        """A function to make API calls to AI agent"""
        tender_details = []
        for opp in opps:
            tender_info = {}
            tender_info["title"] = opp.get('procurementTitle')
            tender_info["website_link"] = f"https://wbgeprocure-rfxnow.worldbank.org/rfxnow/public/advertisement/{opp.get('id')}/view.html"
            tender_info["website_name"] = self.website_name
            tender_info["html"] = opp.get('text')
            tender_info['ref_number'] = opp.get('procurementNumber')
            tender_details.append(tender_info)
        return tender_details


class Command(BaseCommand):
    """A class to ocherstrate scraping"""
    gtai = GTAI()
    rfx = RFXNow()
    opportunity_structure = {
        "size": "",
        "title": "",
        "country": "",
        "org": "",
        "ref_number": "",
        "rel_score": None,
        "deadline": None,
        "summary": "",
        "website_name": "",
        "intro": "",
        "main": "",
        "conclusion": "",
        "procedure": "",
    }
    def handle(self, *args, **kwargs):
        """A function to scrape"""
        # opportunities_gtai = self.gtai.recursive_scraper(self.gtai.baseurl)

        opportunities_rfx = self.rfx.rfx_scraper(self.rfx.baseurl)
        payload = opportunities_rfx
        return self.query_batch(payload)
    
    def db_write(self, opportunity):
        """A function to save to the database"""
        print(opportunity)
        if self.validate(opportunity):
            del opportunity['html']
            new_opportunity = Opportunity(**opportunity)
            new_opportunity.save()
            print(opportunity)
        else:
            raise(ValueError)

    def validate(self, opportunity):
        """A function that returns true if an opportunity is well formatted"""
        
        for attribute in self.opportunity_structure.keys():
            if not opportunity.get(attribute, None):
                return False
            if attribute == 'size':
                if not isinstance(opportunity.get(attribute), int):
                    return False
        return True

    def query_batch(self, payload):
        """A function to query the AI agent"""
        # change so that updates for GTAI are not the same as those of RFXNow
        for opportunity in payload:
            extracted_output = self.query_ai(opportunity.get('html'), opportunity.get('website_name'))   
            self.opportunity_structure.update(extracted_output)
            self.opportunity_structure.update(opportunity)
            self.db_write(self.opportunity_structure)

    def query_ai(self, html_content, website_name=None):
        """A function to query the AI agent"""
        remote_chain = RemoteRunnable("http://localhost:8000/chain/")
        prompt = ""
        if website_name == "RFXNow":
            return {
            "intro": "Introduction to the opportunity",
            "main": "Main content of the opportunity",
            "conclusion": "The conclusion of the opportunity",
            "procedure": "Any relevant information about the opportunity's procedure",
            "size": 10000,
            "rel_score": 0.5,
            "ref_number": "1234",
            "deadline": "2022-12-12",
            "summary": "A summary of the opportunity",
            "org": "The organization offering the opportunity",
            "country": "Burundi",
            "date_published": "2022-12-12"
        }
        else:
            return {
                "intro": "Introduction to the opportunity",
                "main": "Main content of the opportunity",
                "conclusion": "The conclusion of the opportunity",
                "procedure": "Any relevant information about the opportunity's procedure",
                "size": "$10000",
                "rel_score": 0.5,
                "ref_number": "1234",
                "deadline": "2022-12-12",
                "summary": "A summary of the opportunity",
                "org": "The organization offering the opportunity",
            }