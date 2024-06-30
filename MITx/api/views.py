# The decorators are for use with functions but the super classes are for use with classes.
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from .serializers import UserSerializer, OpportunitySerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime
from .models import Opportunity
from .models import User


class JWTAuthentication:
    __user = None
    __payload = None

    @property
    def user(self):
        """user getter"""
        try:
            self.__user = User.objects.get(pk=1)
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
            self.__payload = jwt.decode(token, 'secret', algorithms=['HS256'])
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
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        response =  Response()
        response.set_cookie(key='jwt', value=token, httponly=True, samesite='None')
        response.data = {
            'name': user.name
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
        opportunities = Opportunity.objects.all()
        serializer = OpportunitySerializer(opportunities, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class HotOpportunitView(APIView, JWTAuthentication):
    """a class for recommendations"""
    def get(self, request, *args, **kwargs):
        """A function that returns the hot opportunities"""
        self.payload = request
        opportunities = Opportunity.objects.all()[:20]
        data_list = []
        for opportunity in opportunities:
            data = {} 
            data[f"_{opportunity.id}"] = opportunity.id
            data["title"] = opportunity.title
            data["country"] = opportunity.country
            data["deadline"] = opportunity.deadline
            data["website_link"] = opportunity.website_link
            data["date_created"] = opportunity.date_created
            data["website_name"] = opportunity.website_name
            data["size"] = opportunity.size
            data["rel_score"] = opportunity.rel_score
            data["ref_number"] = opportunity.ref_number
            data["page"] = opportunity.page
            data_list.append(data)

        return Response(data_list, status=status.HTTP_200_OK)


class BidView(APIView, JWTAuthentication):
    """A class to return the views of a user"""
    
    def get(self, request):
        """A function to get the bids of a user"""
        self.payload = request
        if not self.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
    
        else:
            data_list = []
            opportunities = self.user.opportunities.all()
            if opportunities:
                for opportunity in opportunities:
                    data = {}
                    data["id"] = opportunity.id
                    data["title"] = opportunity.title
                    data["country"] = opportunity.country
                    data["deadline"] = opportunity.deadline
                    data["website_link"] = opportunity.website_link
                    data["date_created"] = opportunity.date_created
                    data["website_name"] = opportunity.website_name
                    data["size"] = opportunity.size
                    data["rel_score"] = opportunity.rel_score
                    data["ref_number"] = opportunity.ref_number
                    data["page"] = opportunity.page
                    data_list.append(data)
            return Response(data_list, status=status.HTTP_200_OK)
    
    def put(self, request, *args, **kwargs):
        """A function to add an opportunity to a specific user"""
        self.payload = request
        if not self.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        opportunity_id = kwargs.get('pk')
        try:
            opportunity = Opportunity.objects.get(pk=opportunity_id)
            self.user.opportunities.add(opportunity)
        except Opportunity.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        """A function to add an opportunity to a specific user"""
        self.payload = request
        opportunity_id = kwargs.get('pk')
        try:
            opportunity = Opportunity.objects.get(pk=opportunity_id)
            self.user.opportunities.remove(opportunity)
        except Opportunity.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_200_OK)
