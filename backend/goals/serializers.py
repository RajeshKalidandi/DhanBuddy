from rest_framework import serializers
from .models import SavingsGoal

class SavingsGoalSerializer(serializers.ModelSerializer):
    progress_percentage = serializers.SerializerMethodField()

    class Meta:
        model = SavingsGoal
        fields = [
            'id',
            'title',
            'target_amount',
            'current_amount',
            'target_date',
            'created_at',
            'updated_at',
            'progress_percentage'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def get_progress_percentage(self, obj):
        if obj.target_amount == 0:
            return 0
        return round((obj.current_amount / obj.target_amount) * 100, 2)