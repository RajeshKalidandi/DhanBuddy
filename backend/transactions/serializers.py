from rest_framework import serializers
from .models import Category, Transaction, EMI
from datetime import date

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'type', 'icon', 'color')

class TransactionSerializer(serializers.ModelSerializer):
    category_details = CategorySerializer(source='category', read_only=True)
    category_name = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Transaction
        fields = [
            'id',
            'amount',
            'transaction_type',
            'category',
            'category_name',
            'category_details',
            'description',
            'date',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at', 'category']

    def create(self, validated_data):
        category_name = validated_data.pop('category_name')
        category, _ = Category.objects.get_or_create(
            name=category_name,
            type=validated_data['transaction_type'],
            defaults={
                'icon': 'default',
                'color': '#000000'
            }
        )
        validated_data['category'] = category
        return super().create(validated_data)

class EMISerializer(serializers.ModelSerializer):
    next_payment_in_days = serializers.SerializerMethodField()
    progress_percentage = serializers.SerializerMethodField()

    class Meta:
        model = EMI
        fields = [
            'id', 'name', 'loan_type', 'loan_amount', 'interest_rate',
            'tenure_years', 'emi_amount', 'total_interest', 'total_amount',
            'start_date', 'next_payment_date', 'next_payment_in_days',
            'progress_percentage', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def get_next_payment_in_days(self, obj):
        delta = obj.next_payment_date - date.today()
        return delta.days

    def get_progress_percentage(self, obj):
        total_payments = obj.tenure_years * 12
        months_passed = ((date.today().year - obj.start_date.year) * 12 +
                        date.today().month - obj.start_date.month)
        return round((months_passed / total_payments) * 100, 2)