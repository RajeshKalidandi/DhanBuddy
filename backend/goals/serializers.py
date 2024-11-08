from rest_framework import serializers
from .models import SavingsGoal

class SavingsGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavingsGoal
        fields = ('id', 'user', 'title', 'target_amount', 'current_amount', 
                 'start_date', 'target_date', 'status')
        read_only_fields = ('id',)