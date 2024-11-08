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
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    description = models.TextField(blank=True)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email}'s {self.transaction_type}: ₹{self.amount}"

    class Meta:
        ordering = ['-date', '-created_at']

class EMI(models.Model):
    LOAN_TYPES = [
        ('HOME', 'Home Loan'),
        ('CAR', 'Car Loan'),
        ('PERSONAL', 'Personal Loan'),
        ('EDUCATION', 'Education Loan'),
        ('BUSINESS', 'Business Loan'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    loan_type = models.CharField(max_length=20, choices=LOAN_TYPES)
    loan_amount = models.DecimalField(max_digits=12, decimal_places=2)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)
    tenure_years = models.IntegerField()
    emi_amount = models.DecimalField(max_digits=12, decimal_places=2)
    total_interest = models.DecimalField(max_digits=12, decimal_places=2)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    start_date = models.DateField()
    next_payment_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'EMI'
        verbose_name_plural = 'EMIs'

    def __str__(self):
        return f"{self.user.email}'s {self.loan_type} EMI: {self.name}"