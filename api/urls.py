from django.urls import path
from .views import LogoutView, LoginView, UserView, RegisterView
from .views import HotOpportunitView, OpportunityView,  BidView

urlpatterns = [
    path('logout/', LogoutView.as_view()),
    path('login/', LoginView.as_view()),
    path('register/', RegisterView.as_view()),
    path('user/', UserView.as_view()),
    path('opps/', OpportunityView.as_view()),
    path('opps/<str:pk>', OpportunityView.as_view()),
    path('opps/hot/', HotOpportunitView.as_view()),
    path('bids/', BidView.as_view()),
]
