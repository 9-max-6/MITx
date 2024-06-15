from django.urls import path
from .views import DashboardView
from .views import LogoutView

urlpatterns = [
    path('protected/', DashboardView.as_view(), name='protected_view'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
