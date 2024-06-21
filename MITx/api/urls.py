from django.urls import path
from .views import DashboardView
from .views import LogoutView
from .views import LoginView
from .views import HotOpportunitView
from .views import OpportunityView
from .views import PageView

urlpatterns = [
    path('protected/', DashboardView.as_view(), name='protected_view'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('login/', LoginView.as_view(), name='login'),
    path('opps/hot', HotOpportunitView.as_view(), name='login'),
    path('opps/', OpportunityView.as_view(), name="opportunities"),
    path('pages/', PageView.as_view(), name="pages")
]
