from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, TransactionViewSet

router = DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('transactions', TransactionViewSet, basename='transaction')

urlpatterns = [
    path('', include(router.urls)),
] 