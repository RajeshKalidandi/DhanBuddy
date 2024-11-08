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
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='transactions'
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name='transactions'
    )
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    description = models.CharField(max_length=200)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date', '-created_at']

    def __str__(self):
        return f"{self.category.name}: ₹{self.amount} on {self.date}"