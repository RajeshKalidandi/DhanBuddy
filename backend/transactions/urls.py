from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'transactions', views.TransactionViewSet, basename='transaction')
router.register(r'categories', views.CategoryViewSet, basename='category')
router.register(r'emis', views.EMIViewSet, basename='emi')

urlpatterns = [
    path('', include(router.urls)),
    path('stats/', views.TransactionViewSet.as_view({'get': 'stats'}), name='transaction-stats'),
    path('stats/expense-summary/', views.TransactionViewSet.as_view({'get': 'expense_summary'}), name='expense-summary'),
] 