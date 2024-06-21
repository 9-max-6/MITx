from django.db import models
from django.contrib.auth.models import User
import uuid

class Opportunity(models.Model):
    """A class to represent the opportunity table
    """
    id = models.UUIDField(
        "Opportunity's unique ID",
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    users = models.ManyToManyField(
        User,
        related_name='opportunities', 
        null=True
    )
    title  = models.CharField(
        "Opportunity's title",
        max_length=200,

    )
    org  = models.CharField(
        "Opportunity's org",
        max_length=200,

    )
    ref_number  = models.CharField(
        "Opportunity's ref_number",
        max_length=200,

    )
    rel_score = models.IntegerField(
        "Opportunity's relevance score",
        blank=False,
    )
    country = models.CharField(
        "Opportunity's country",
        blank=False,
        max_length=100
    )
    website_name = models.CharField(
        "Opportunity's country",
        blank=False,
        max_length=100
    )
    size = models.IntegerField(
        "Opportunity's size",
        blank=False
    )
    deadline = models.DateField(
        auto_now=False,
        auto_now_add=False
    )
    date_published = models.DateField(
        auto_now=False,
        auto_now_add=False
    )
    summary = models.TextField()
    website_link = models.URLField(null=True, blank=True)
    intro = models.TextField()
    main = models.TextField()
    conclusion = models.TextField()
    procedure = models.TextField()

    def __str__(self):
        """String rep of object"""
        return f"{self.title} - {self.org} - {self.country} - {self.deadline} - {self.summary} - {self.website_link} - {self.rel_score} - {self.size} - {self.website_name} - {self.intro} - {self.main} - {self.conclusion} - {self.procedure}"