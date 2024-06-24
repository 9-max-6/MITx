# The decorators are for use with functions but the super classes are for use with classes.
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import render
from .models import Opportunity
from rest_framework import status

class DashboardView(APIView):
    """Class to retrieve dashboard view"""
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        """A function to handle post requests"""
        return Response({'message': 'This is a protected view.'})


class LogoutView(APIView):
    """A class to handle the logout request from the user"""
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        """A function to logout the user"""
        request.user.auth_token.delete()
        print("Logging out")
        return Response(status=status.HTTP_200_OK)


class LoginView(APIView):
    """A class to server the login page."""
    def get(self, request):
        """A function to handle all login requests"""
        context = {}
        return render(request, 'api/login.html', context)
    
    def post(self, request):
        """A function to server the frontend if the user has the right tokens"""
        return render('index.html')
    
class OpportunityView(APIView):
    """A class to serve opportunities"""
    permission_classes = (IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        """A function to handle serving opportunity objects"""
        if 'pk' in kwargs:
            return self.get_opp_by_id(request, *args, **kwargs)
        else:
            return self.get_all_opp(request, *args, **kwargs)

    def get_opp_by_id(self, request, *args, **kwargs):
        """A function to get a specific opportunity"""
        pk = kwargs.get('pk')
        try:
            opportunity = Opportunity.objects.get(pk=pk)
            data = {} 
            data[f"_{opportunity.id}"] = opportunity.id
            data["title"] = opportunity.title
            data["country"] = opportunity.country
            data["org"] = opportunity.org
            data["deadline"] = opportunity.deadline
            data["summary"] = opportunity.summary
            data["website_link"] = opportunity.website_link
            return Response(data, status=status.HTTP_200_OK)
        except Opportunity.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get_all_opp(self, request, *args, **kwargs):
        """Function to get all args."""
        opportunities = Opportunity.objects.all()
        data = {}
        for opportunity in opportunities:
            data[f"_{opportunity.id}"] = opportunity.id
            data["title"] = opportunity.title
            data["country"] = opportunity.country
            data["org"] = opportunity.org
            data["deadline"] = opportunity.deadline
            data["summary"] = opportunity.summary
            data["website_link"] = opportunity.website_link

        return Response(data, status=status.HTTP_200_OK)

class HotOpportunitView(APIView):
    """a class for recommendations"""
    permission_classes = (IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        """A function that returns the hot opportunities"""
        opportunities = Opportunity.objects.all()[:20]
        data = {}
        for opportunity in opportunities:
            data[f"_{opportunity.id}"] = opportunity.id
            data["title"] = opportunity.title
            data["country"] = opportunity.country
            data["org"] = opportunity.org
            data["deadline"] = opportunity.deadline
            data["summary"] = opportunity.summary
            data["website_link"] = opportunity.website_link

        return Response(data, status=status.HTTP_200_OK)


class BidView(APIView):
    """A class to return the views of a user"""
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        """A function to get the bids of a user"""
        user = request.user
        if isinstance(user, AnonymousUser):
            return Response(status=status.HTTP_403_FORBIDDEN)
    
        else:
            data = []
            bids = User.objects.opportunities
            for bid in bids:
                data.append(bid.id)
            return Response(data, status=status.HTTP_200_OK)
    
    def put(self, request, *args, **kwargs):
        """A function to add an opportunity to a specific user"""
        user = request.user
        opportunity_id = args.kwargs('opp_id')
        try:
            opportunity = Opportunity.objects.get(pk=opportunity_id)
            user.opportunities.add(opportunity)
        except Opportunity.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        """A function to add an opportunity to a specific user"""
        user = request.user
        opportunity_id = args.kwargs('opp_id')
        try:
            opportunity = Opportunity.objects.get(pk=opportunity_id)
            user.opportunities.remove(opportunity)
        except Opportunity.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_200_OK)

class PageView(APIView):
    """A class to handle sending pages"""
    permission_classes = (IsAuthenticated,)
    
    def get(self, request, *args, **kwargs):
        """A function to get page views"""
        pk = kwargs.get('pk')
        try:
            opp = Opportunity.objects.get(pk=pk)
            page = {}
            page["intro"] = opp.intro
            page["main"] = opp.main
            page["conclusion"] = opp.conclusion
            page["procedure"] = opp.procedure
        except Opportunity.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
