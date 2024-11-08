from django.contrib import admin
from .models import SavingsGoal

@admin.register(SavingsGoal)
class SavingsGoalAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'target_amount', 'current_amount', 'status')
    list_filter = ('status', 'start_date', 'target_date')
    search_fields = ('title',)
    date_hierarchy = 'target_date' 