from django.contrib import admin
from .models import SavingsGoal

@admin.register(SavingsGoal)
class SavingsGoalAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'target_amount', 'current_amount', 'target_date', 'progress_percentage')
    list_filter = ('created_at', 'target_date')
    search_fields = ('title', 'user__email')
    readonly_fields = ('created_at', 'updated_at')

    def progress_percentage(self, obj):
        if obj.target_amount == 0:
            return "0%"
        progress = (obj.current_amount / obj.target_amount) * 100
        return f"{progress:.1f}%"
    
    progress_percentage.short_description = "Progress" 