# Generated by Django 5.1.3 on 2024-11-08 12:18

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('type', models.CharField(choices=[('INCOME', 'Income'), ('EXPENSE', 'Expense')], max_length=10)),
                ('icon', models.CharField(max_length=50)),
                ('color', models.CharField(max_length=7)),
            ],
            options={
                'verbose_name_plural': 'categories',
            },
        ),
        migrations.CreateModel(
            name='EMI',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('loan_type', models.CharField(choices=[('HOME', 'Home Loan'), ('CAR', 'Car Loan'), ('PERSONAL', 'Personal Loan'), ('EDUCATION', 'Education Loan'), ('BUSINESS', 'Business Loan')], max_length=20)),
                ('loan_amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('interest_rate', models.DecimalField(decimal_places=2, max_digits=5)),
                ('tenure_years', models.IntegerField()),
                ('emi_amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('total_interest', models.DecimalField(decimal_places=2, max_digits=12)),
                ('total_amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('start_date', models.DateField()),
                ('next_payment_date', models.DateField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'EMI',
                'verbose_name_plural': 'EMIs',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('transaction_type', models.CharField(choices=[('EXPENSE', 'Expense'), ('INCOME', 'Income')], max_length=7)),
                ('description', models.TextField(blank=True)),
                ('date', models.DateField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='transactions.category')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-date', '-created_at'],
            },
        ),
    ]
