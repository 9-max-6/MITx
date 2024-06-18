from django.db import models
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
    title  = models.CharField(
        "Opportunity's title",
        max_length='200',

    )
    ref_number  = models.CharField(
        "Opportunity's ref_number",
        max_length='200',

    )
    insights_exp  = models.TextField(
        "Opportunity's experience insights",
        max_length='200',
    )
    insights_scp = models.TextField(
        "Opportunity's scope insights",
        max_length='200',
    )
    insights_rel = models.TextField(
        "Opportunity's scope insights",
        max_length='200',
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
    size = models.IntegerField(
        "Opportunity's size",
        blank=False
    )

class Chats(models.Model):
    """A class to represent the chats that are stored in
    the DB"""
    pass

class Messages(models.Model):
    """A class to represent the messages
    that are stored in the db"""
    pass

