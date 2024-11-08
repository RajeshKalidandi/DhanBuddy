from django.core.management.base import BaseCommand
from transactions.models import Category

class Command(BaseCommand):
    help = 'Creates initial transaction categories'

    def handle(self, *args, **kwargs):
        categories = [
            # Income categories
            {'name': 'Salary', 'type': 'INCOME', 'icon': 'Briefcase', 'color': '#4CAF50'},
            {'name': 'Investments', 'type': 'INCOME', 'icon': 'TrendingUp', 'color': '#2196F3'},
            {'name': 'Freelance', 'type': 'INCOME', 'icon': 'Laptop', 'color': '#9C27B0'},
            
            # Expense categories
            {'name': 'Food', 'type': 'EXPENSE', 'icon': 'Coffee', 'color': '#F44336'},
            {'name': 'Transport', 'type': 'EXPENSE', 'icon': 'Car', 'color': '#FF9800'},
            {'name': 'Shopping', 'type': 'EXPENSE', 'icon': 'ShoppingBag', 'color': '#E91E63'},
            {'name': 'Bills', 'type': 'EXPENSE', 'icon': 'FileText', 'color': '#795548'},
        ]

        for cat in categories:
            Category.objects.get_or_create(
                name=cat['name'],
                defaults={
                    'type': cat['type'],
                    'icon': cat['icon'],
                    'color': cat['color']
                }
            )
        
        self.stdout.write(self.style.SUCCESS('Successfully created categories')) 