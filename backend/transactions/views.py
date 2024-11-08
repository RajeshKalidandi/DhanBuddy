from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Sum, Q
from django.utils import timezone
from datetime import datetime, timedelta
from django_filters import rest_framework as filters
from .models import Transaction, Category, EMI
from .serializers import TransactionSerializer, CategorySerializer, EMISerializer
from drf_yasg.utils import swagger_auto_schema

class TransactionFilter(filters.FilterSet):
    min_amount = filters.NumberFilter(field_name="amount", lookup_expr='gte')
    max_amount = filters.NumberFilter(field_name="amount", lookup_expr='lte')
    date_from = filters.DateFilter(field_name="date", lookup_expr='gte')
    date_to = filters.DateFilter(field_name="date", lookup_expr='lte')
    
    class Meta:
        model = Transaction
        fields = ['transaction_type', 'category', 'date']

class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_class = TransactionFilter
    search_fields = ['description', 'category']
    ordering_fields = ['date', 'amount', 'created_at']
    ordering = ['-date']

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):  # for schema generation
            return Transaction.objects.none()
        return Transaction.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get transaction statistics for the current user."""
        try:
            today = timezone.now()
            start_of_month = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
            
            # Get monthly stats
            monthly_stats = Transaction.objects.filter(
                user=request.user,
                date__gte=start_of_month
            ).aggregate(
                income=Sum('amount', filter=Q(transaction_type='INCOME')),
                expense=Sum('amount', filter=Q(transaction_type='EXPENSE'))
            )

            # Calculate total balance
            total_transactions = Transaction.objects.filter(
                user=request.user
            ).aggregate(
                income=Sum('amount', filter=Q(transaction_type='INCOME')),
                expense=Sum('amount', filter=Q(transaction_type='EXPENSE'))
            )

            # Handle None values
            monthly_income = monthly_stats['income'] or 0
            monthly_expense = monthly_stats['expense'] or 0
            total_income = total_transactions['income'] or 0
            total_expense = total_transactions['expense'] or 0

            return Response({
                'total_balance': float(total_income - total_expense),
                'monthly_income': float(monthly_income),
                'monthly_expense': float(monthly_expense),
                'monthly_savings': float(monthly_income - monthly_expense)
            })
        except Exception as e:
            print(f"Error in stats endpoint: {str(e)}")  # Debug print
            return Response(
                {'error': 'Failed to fetch statistics'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['get'])
    def expense_summary(self, request):
        """Get expense summary by category for the current user."""
        try:
            today = timezone.now()
            start_of_month = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
            
            expenses = Transaction.objects.filter(
                user=request.user,
                transaction_type='EXPENSE',
                date__gte=start_of_month
            ).values('category__name').annotate(
                amount=Sum('amount')
            ).order_by('-amount')

            # Add colors for visualization
            colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']
            summary = []
            
            for idx, expense in enumerate(expenses):
                summary.append({
                    'category': expense['category__name'] or 'Uncategorized',
                    'amount': float(expense['amount']),
                    'color': colors[idx % len(colors)]
                })

            return Response(summary)
        except Exception as e:
            print(f"Error in expense_summary endpoint: {str(e)}")  # Debug print
            return Response(
                {'error': 'Failed to fetch expense summary'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

class EMIViewSet(viewsets.ModelViewSet):
    serializer_class = EMISerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return EMI.objects.none()
        return EMI.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)