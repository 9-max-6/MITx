# The decorators are for use with functions but the super classes are for use with classes.
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from .serializers import UserSerializer, OpportunitySerializer, StatsSerializer, StatsScraperSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime
from .models import Opportunity, StatsModel
from .models import User
import uuid
import os

class JWTAuthentication:
    __user = None
    __payload = None

    @property
    def user(self):
        """user getter"""
        try:
            self.__user = User.objects.get(pk=self.payload.get('id'))
        except AttributeError:
            self.__user = None
        return self.__user
    
    @property
    def payload(self):
        """A function to get the payload"""
        return self.__payload
    
    @payload.setter
    def payload(self, request):
        """A function to set the payload"""
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        try:
            self.__payload = jwt.decode(token, os.getenv("SECRET"), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Authentication")
        return self.__payload 


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)
    
class LoginView(APIView):

    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]

        user = User.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed("user not found")

        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect password")
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=1000)
        }
        token = jwt.encode(payload, os.getenv("SECRET"), algorithm='HS256')
        response =  Response()
        response.set_cookie(key='jwt', value=token, httponly=True, samesite='None', secure=True)
        response.data = {
            'name': user.name,
            'id': user.id
        }

        return response


class UserView(APIView, JWTAuthentication):
    def get(self, request):
        self.payload = request
        serializer = UserSerializer(self.user)
        
        return Response(serializer.data)
    
class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }

        return response


    
class OpportunityView(APIView, JWTAuthentication):
    """A class to serve opportunities"""
    def get(self, request, *args, **kwargs):
        """A function to handle serving opportunity objects"""
        self.payload = request
        if 'pk' in kwargs:
            return self.get_opp_by_id(request, *args, **kwargs)
        else:
            return self.get_all_opp(request, *args, **kwargs)

    def get_opp_by_id(self, request, *args, **kwargs):
        """A function to get a specific opportunity"""
        pk = kwargs.get('pk')
        try:
            opportunity = Opportunity.objects.get(pk=pk)
            serializer = OpportunitySerializer(opportunity)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Opportunity.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get_all_opp(self, request, *args, **kwargs):
        """Function to get all args."""
        opportunities = Opportunity.objects.all().order_by('-date_created')
        serializer = OpportunitySerializer(opportunities, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class FilteredOpportunityView(APIView, JWTAuthentication):
    """class to handle filters"""
    regions = {
    "northern_africa": ['algeria', 'egypt', 'libya', 'morocco', 'sudan', 'tunisia'],
    "western_africa": ['benin', 'burkina_faso', 'cape_verde', 'cote_d_ivoire', 'gambia', 'ghana', 'guinea', 'guinea-bissau', 'liberia', 'mali', 'mauritania', 'niger', 'nigeria', 'senegal', 'sierra_leone', 'togo'],
    "central_africa": ['angola', 'cameroon', 'central_african_republic', 'chad', 'democratic_republic_of_the_congo', 'republic_of_the_congo', 'equatorial_guinea', 'gabon', 'sao_tome_and_principe'],
    "eastern_africa": ['burundi', 'comoros', 'djibouti', 'eritrea', 'ethiopia', 'kenya', 'madagascar', 'malawi', 'mauritius', 'mozambique', 'rwanda', 'seychelles', 'somalia', 'south_sudan', 'tanzania', 'uganda', 'zambia', 'zimbabwe'],
    "southern_africa": ['botswana', 'eswatini', 'lesotho', 'namibia', 'south_africa'],
    "eastern_europe": ['belarus', 'moldova', 'russia', 'ukraine'],
    "central_europe": ['czech_republic', 'hungary', 'poland', 'slovakia'],
    "southeastern_europe": ['albania', 'bosnia_and_herzegovina', 'bulgaria', 'croatia', 'greece', 'kosovo', 'montenegro', 'north_macedonia', 'romania', 'serbia', 'slovenia'],
    "caucasus": ['armenia', 'azerbaijan', 'georgia']
}

    def get(self, request, *args, **kwargs):
        """for the get request"""
        self.payload = request
        delim = kwargs.get('delim')
        opportunities = Opportunity.objects.all().order_by('-date_created')
        region_set = self.regions.get(delim, None)
        if region_set:
            data_list = self.get_datalist(opportunities, region_set)
            serializer = OpportunitySerializer(data_list, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get_datalist(self, opportunities, region_set):
        """a function to collect opportunities by region"""
        data_list = []
        for opportunity in opportunities:
            if opportunity.country:
                if opportunity.country.lower() in region_set:
                    data_list.append(opportunity)
        return data_list


class HotOpportunitView(APIView, JWTAuthentication):
    """a class for recommendations"""
    def get(self, request, *args, **kwargs):
        """A function that returns the hot opportunities"""
        self.payload = request
        opportunities = Opportunity.objects.all().order_by('-date_created')[:10]
        serializer = OpportunitySerializer(opportunities, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class BidView(APIView, JWTAuthentication):
    """A class to return the views of a user"""
    
    def get(self, request):
        """A function to get the bids of a user"""
        self.payload = request
        if not self.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
    
        else:
            opportunities = self.user.opportunities.all()
            serializer = OpportunitySerializer(opportunities, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        """A function to add an opportunity to a specific user"""
        self.payload = request
        if not self.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        opportunity_id = request.data.get('pk')
        try:
            opportunity = Opportunity.objects.get(pk=opportunity_id)
            self.user.opportunities.add(opportunity)
        except Opportunity.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        """A function to add an opportunity to a specific user"""
        self.payload = request
        opportunity_id = request.data.get('pk')
        try:
            opportunity = Opportunity.objects.get(pk=opportunity_id)
            self.user.opportunities.remove(opportunity)
        except Opportunity.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_200_OK)

class StatsView(APIView, JWTAuthentication):
    """a class to represent database state"""
    def get(self, request, **kwargs):
        """the getter"""
        self.payload = request
        if not self.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        else:
            view = kwargs.get('view')
            if view == "dist":
                stats = StatsModel.objects.order_by('-date_created').first()
                serializer = StatsSerializer(stats)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                if view == "scpx":
                    proc_stats = StatsModel.objects.order_by('-date_created')[:20]
                    serializer = StatsScraperSerializer(proc_stats, many=True)
                    return Response(serializer.data, status=status.HTTP_200_OK)


        

                    

        
