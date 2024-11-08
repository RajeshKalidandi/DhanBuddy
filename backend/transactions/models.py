from django.db import models
from django.conf import settings

class Category(models.Model):
    name = models.CharField(max_length=50)
    type = models.CharField(
        max_length=10,
        choices=[('INCOME', 'Income'), ('EXPENSE', 'Expense')]
    )
    icon = models.CharField(max_length=50)
    color = models.CharField(max_length=7)  # For hex color codes

    class Meta:
        verbose_name_plural = 'categories'

    def __str__(self):
        return f"{self.name} ({self.type})"

class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('EXPENSE', 'Expense'),
        ('INCOME', 'Income'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    transaction_type = models.CharField(max_length=7, choices=TRANSACTION_TYPES)
    category = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email}'s {self.transaction_type}: ₹{self.amount}"

    class Meta:
        ordering = ['-date', '-created_at']