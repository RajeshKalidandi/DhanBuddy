from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'', views.SavingsGoalViewSet, basename='savings-goals')

urlpatterns = [
    path('', include(router.urls)),
] 