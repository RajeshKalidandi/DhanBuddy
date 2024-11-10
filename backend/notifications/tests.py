from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import EmailNotification
from .services import NotificationService
from transactions.models import EMI, Transaction
from datetime import date, timedelta

User = get_user_model()

class NotificationTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123',
            first_name='Test',
            last_name='User'
        )

    def test_emi_reminder_notification(self):
        emi = EMI.objects.create(
            user=self.user,
            name='Test EMI',
            loan_type='HOME',
            loan_amount=1000000,
            interest_rate=8.5,
            tenure_years=20,
            emi_amount=8697,
            total_interest=1087280,
            total_amount=2087280,
            start_date=date.today(),
            next_payment_date=date.today() + timedelta(days=30)
        )

        NotificationService.send_emi_reminder(self.user, emi)
        notification = EmailNotification.objects.filter(
            user=self.user,
            notification_type='EMI_REMINDER'
        ).first()

        self.assertIsNotNone(notification)
        self.assertTrue(notification.is_sent)

    def test_transaction_alert_notification(self):
        transaction = Transaction.objects.create(
            user=self.user,
            amount=1000,
            transaction_type='EXPENSE',
            description='Test Transaction',
            date=date.today()
        )

        NotificationService.send_transaction_alert(self.user, transaction)
        notification = EmailNotification.objects.filter(
            user=self.user,
            notification_type='TRANSACTION_ALERT'
        ).first()

        self.assertIsNotNone(notification)
        self.assertTrue(notification.is_sent)