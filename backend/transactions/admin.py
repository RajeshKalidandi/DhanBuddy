from django.contrib import admin
from .models import Category, Transaction, EMI

@admin.register(EMI)
class EMIAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'loan_type', 'emi_amount', 'next_payment_date', 'progress_percentage')
    list_filter = ('loan_type', 'created_at')
    search_fields = ('name', 'user__email')
    readonly_fields = ('created_at', 'updated_at')

    def progress_percentage(self, obj):
        total_payments = obj.tenure_years * 12
        months_passed = ((obj.next_payment_date.year - obj.start_date.year) * 12 +
                        obj.next_payment_date.month - obj.start_date.month)
        progress = (months_passed / total_payments) * 100
        return f"{progress:.1f}%"
    
    progress_percentage.short_description = "Progress"

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'icon', 'color')
    list_filter = ('type',)
    search_fields = ('name',)

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'transaction_type', 'category', 'date')
    list_filter = ('transaction_type', 'date', 'created_at')
    search_fields = ('description', 'user__email')
    readonly_fields = ('created_at', 'updated_at')