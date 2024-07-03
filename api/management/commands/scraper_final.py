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

class Orchestrate():
    """A class to ocherstrate scraping
    """
    def orchestrate(self):
        """the main function of the class"""
        
    

class Command(BaseCommand):
    """A class to handle the scraper command"""
    help = 'Scrape the website for opportunities'

    def handle(self, *args, **kwargs):
        """A function to handle the scraper command"""
        Orchestrate.orchestrate()
