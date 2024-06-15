from rest_framework.decorators import api_view, permission_classes
# The decorators are for use with functions but the super classes are for use with classes.
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
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