import json
import requests
from bs4 import BeautifulSoup
from ...models import Opportunity
from django.core.management.base import BaseCommand
from api.models import Opportunity
from langserve import RemoteRunnable


class Page():
    """A class to define a page dataclass"""
    __summary = ""
    __main = "" 
    __procedure = []
    __size = "" 
    __country = ""
    __org = ""
    __ref_number = ""
    __date_published = ""
    __deadline = ""
    __relevant_links = []

    def __init__(self, **kwargs):
        self.summary = kwargs.get("summary")
        self.main = kwargs.get("main")
        self.procedure = kwargs.get("procedure")
        self.size = kwargs.get("size")
        self.country = kwargs.get("country")
        self.org = kwargs.get("org")
        self.ref_number = kwargs.get("ref_number")
        self.date_published = kwargs.get("date_published")
        self.deadline = kwargs.get("deadline")
        self.relevant_links = kwargs.get("relevant_links")

    @property
    def summary(self):
        """A summary getter"""
        return self.__summary
    
  
    @property
    def main(self):
        """A main getter"""
        return self.__main

    @property
    def procedure(self):
        """A procedure getter"""
        return self.__procedure
    
    @property
    def size(self):
        """A size getter"""
        return self.__size
    
    @property
    def country(self):
        """A country getter"""
        return self.__country
    
    @property
    def org(self):
        """An org getter"""
        return self.__org
    
    @property
    def ref_number(self):
        """A ref_number getter"""
        return self.__ref_number
    
    @property
    def date_published(self):
        """A date_published getter"""
        return self.__date_published
    
    @property
    def deadline(self):
        """A deadline getter"""
        return self.__deadline
    
    @property
    def relevant_links(self):
        """A relevant_links getter"""
        return self.__relevant_links
    
    @summary.setter
    def summary(self, value):
        """A summary setter"""
        if value:
            self.__summary = value


    @main.setter
    def main(self, value):
        """A main setter"""
        if value:
            self.__main = value

    @procedure.setter
    def procedure(self, value):
        """A procedure setter"""
        if value:
            self.__procedure = value
    
    @size.setter
    def size(self, value):
        """A size setter"""
        if value and value != 'None':
            int_size = value.split(" ")
            self.__size = int(int_size[1])
        else:
            self.__size = None
    
    @country.setter
    def country(self, value):
        """A country setter"""
        if value:
            self.__country = value
    
    @org.setter
    def org(self, value):
        """An org setter"""
        if value:
            self.__org = value
    
    @ref_number.setter
    def ref_number(self, value):
        """A ref_number setter"""
        if value:
            self.__ref_number = value
    
    @date_published.setter
    def date_published(self, value):
        """A date_published setter"""
        if value:
            self.__date_published = value
    
    @deadline.setter
    def deadline(self, value):
        """A deadline setter"""
        if value:
            self.__deadline = value
    
    @relevant_links.setter
    def relevant_links(self, value):
        """A relevant_links setter"""
        if value:
            self.__relevant_links = value
    
    def get_json(self):
        """A function to publish a json object"""
        page_object = {
            "summary": self.summary,
            "main": self.main,
            "procedure": self.procedure,
            "org": self.org,
            "date_published": self.date_published,
            "relevant_links": self.relevant_links,
        }
        return page_object


class BaseOpportunity():
    """A class to define a dataclass"""
    __title = ""
    __website_name = ""
    __page = None
    __website_link = ""
    __html = ""

    def __init__(self, **kwargs):
        self.title = kwargs.get("title")
        self.website_name = kwargs.get("website_name")
        self.website_link = kwargs.get("website_link")
        self.html = kwargs.get("html")

    def get_json(self):
        """A function to publish a json object"""
        opportunity_object = {
            "title": self.title,
            "ref_number": self.page.ref_number if self.page else None,
            "rel_score": self.get_relscore(),
            "country": self.page.country,
            "website_name": self.website_name,
            "size": self.page.size,
            "deadline": self.page.deadline,
            "website_link": self.website_link,
            "page": self.page.get_json() if self.page else None,
        }
        return opportunity_object

    def get_relscore(self):
        """A function to determine rel_score"""
        return 1

    @property
    def title(self):
        """A title getter"""
        return self.__title
    
    @property
    def website_name(self):
        """A website_name getter"""
        return self.__website_name
    
    @property
    def website_link(self):
        """A website_link getter"""
        return self.__website_link
    
    @property
    def title(self):
        """A title getter"""
        return self.__title

    @property
    def html(self):
        """An html getter"""
        return self.__html
    
    @property
    def page(self):
        """A page getter"""
        return self.__page
    
    @html.setter
    def html(self, value):
        """An html setter"""
        if value:
            self.__html = value
    
    @title.setter
    def title(self, value):
        """Setter for the title of an opportunity"""
        if value:
            self.__title = value
    
    @website_name.setter
    def website_name(self, value):
        """Setter for the website_name of an opportunity"""
        if value:
            self.__website_name = value

    @website_link.setter
    def website_link(self, value):
        """Setter for the website_link of an opportunity"""
        if value:
            self.__website_link = value

    @page.setter
    def page(self, value):
        """Setter for the page of an opportunity"""
        if value:
            self.__page = Page(**value)
    
    def __str__(self):
        """A function to be called when printing an opportunity"""
        return f"{self.title} - {self.website_name}"

class BaseScraper():
    """Base class for all scraper classes"""
    website_name = ""
    
    headers = {}
    existing_ref_nums = Opportunity.objects.values('ref_number')
    existing_titles = Opportunity.objects.filter(
        website_name='GTAI'
        ).values_list(
            'title', flat=True
            )

class GTAI(BaseScraper):
    """"A class to handle scraping from GTAI"""
    def __init__(self, *args, **kwargs):
        """The constructor function for the class GTAI"""
        self.website_name = "GTAI"
        self.baseurl = "https://www.gtai.de/en/meta/search"

    def recursive_scraper(self, url=None, next_page=None, count=0, tenders=None):
        """A function to recursively scrape a website"""
        if tenders is None:
            tenders = []

        if count == 100:
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
        next_page_actual_url_prefix = next_page_url['href'].split('?')[0] if next_page_url else None 
        next_page_actual_url = 'https://www.gtai.de' + next_page_actual_url_prefix + f"?page={count + 1}"
        print(next_page_actual_url)

        for result in results:
            if 'Tender Notice' in result.get_text():
                content = result.find(class_='content')
                if content:
                    url = content.find('a')['href'] if content.find('a') else None
                    title = content.find('h3').get_text().strip() if content.find('h3') else None
                    if title in self.existing_titles:
                        continue
                    else:
                        tender_details = BaseOpportunity()
                        tender_details.title = title
                        tender_details.website_link = 'https://www.gtai.de' + url if url else None

                        tenders.append(tender_details)

        count += 1
        return self.recursive_scraper(url, next_page_actual_url, count, tenders)

    def get_details(self, tenders):
        """A function to now scrape the actual tender information"""
        for tender in tenders:
            tender.website_name = self.website_name
            main_content = ''
            with requests.get(tender.website_link) as resp:
                print(f"Checking tender {tender.title}")
                if resp.status_code == 200:
                    html_content = resp.text
                    soup = BeautifulSoup(html_content, 'html.parser')
                    main_content = soup.find(class_='article')
            tender.html = main_content
        return tenders


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
        opportunities = self.existing_ref_nums
        new_ops = []
        for opp in opps.get('advertisementList', None):
            if opp and opp.get('procurementNumber') not in opportunities:
                new_ops.append(opp)

        return self.transform_ops(new_ops)
    
    def transform_ops(self, opps):
        """A function to make API calls to AI agent"""
        tender_details = []
        for opp in opps:
            tender_info = BaseOpportunity()
            tender_info.title = opp.get('procurementTitle')
            tender_info.website_link = f"https://wbgeprocure-rfxnow.worldbank.org/rfxnow/public/advertisement/{opp.get('id')}/view.html"
            tender_info.website_name = self.website_name
            deadline = opp.get('eoiDeadline', None)
            tender_number = opp.get('procurementNumber')
            published = opp.get('publicationDate', None)
            tender_json = {
                    "deadline": deadline,
                    "reference_number": tender_number,
                    "published": published,
            }
            tender_info.html = opp.get('text') + json.dumps(tender_json)
            print(str(tender_info))
            tender_details.append(tender_info)
        return tender_details

class Command(BaseCommand):
    """A class to ocherstrate scraping"""
    gtai = GTAI()
    rfx = RFXNow()
    opportunity_structure = {
        "title": "",
        "ref_number": "",
        "rel_score": None,
        "country": "",
        "size": None,
        "deadline": None,
        "website_name": "",
        "website_link": "",
        "page": {},
    }
    def handle(self, *args, **kwargs):
        """A function to scrape"""
        opportunities_gtai = self.gtai.recursive_scraper(self.gtai.baseurl)
        opportunities_rfx = self.rfx.rfx_scraper(self.rfx.baseurl)
        payload = opportunities_rfx + opportunities_gtai
        return self.query_batch(payload)
    
    def db_write(self, opportunity):
        """A function to save to the database"""
        new_opportunity = Opportunity(**opportunity)
        new_opportunity.save()

    def query_batch(self, payload):
        """A function to query the AI agent"""
        for opportunity in payload:
            # The extracted output must have the name page and be a single dictionary
            # of fields extracted from the html content 
            page = self.query_ai(opportunity.html)
            opportunity.page = page
            self.opportunity_structure.update(opportunity.get_json())
            print(self.opportunity_structure)
            self.db_write(self.opportunity_structure)

    def query_ai(self, html_content):
        """A function to query the AI agent"""
        remote_chain = RemoteRunnable("http://localhost:5000/chain/")
        json_response_raw = {
          "summary": "A summary of the opportunity...",
          "main": "The main content of the opportunity...",
          "procedure": "Application procedures...",
          "size": "$10000",
          "deadline": "2024-06-21",
          "org": "The World Bank Group",
          "country": "Burundi",
          "date_published": "2024-06-21" ,
          "relevant_links": {"name1": "link1", "name2": "link3"},
          "ref_number": "1234567890"
        }
        json_response = json.dumps(json_response_raw)

        result = remote_chain.invoke({
            "html_content": html_content,
            "json_response": json_response
            })
        result = remote_chain.invoke({"html_content": html_content})
        try:
            json_result = json.loads(result)
            # I can't predict the opportunity structure
            return json_result
        except ValueError:
            print("error")