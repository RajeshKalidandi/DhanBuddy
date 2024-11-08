from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SavingsGoalViewSet

router = DefaultRouter()
router.register('savings', SavingsGoalViewSet, basename='savings')

urlpatterns = [
    path('', include(router.urls)),
] 