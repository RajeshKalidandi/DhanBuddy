from django.db import models
from accounts.models import User

class SavingsGoal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    target_amount = models.DecimalField(max_digits=12, decimal_places=2)
    current_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    start_date = models.DateField()
    target_date = models.DateField()
    status = models.CharField(
        max_length=20,
        choices=[
            ('ONGOING', 'Ongoing'),
            ('COMPLETED', 'Completed'),
            ('FAILED', 'Failed')
        ],
        default='ONGOING'
    )
    
    class Meta:
        db_table = 'savings_goals'