from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from .models import EmailNotification
from datetime import datetime, timedelta

class NotificationService:
    @staticmethod
    def send_emi_reminder(user, emi):
        subject = f"EMI Payment Reminder - {emi.name}"
        context = {
            'user': user,
            'emi': emi,
            'due_date': emi.next_payment_date,
            'amount': emi.emi_amount,
        }
        html_message = render_to_string('notifications/emi_reminder.html', context)
        text_message = render_to_string('notifications/emi_reminder.txt', context)

        try:
            send_mail(
                subject=subject,
                message=text_message,
                html_message=html_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
            )
            
            EmailNotification.objects.create(
                user=user,
                notification_type='EMI_REMINDER',
                subject=subject,
                message=text_message,
                is_sent=True
            )
        except Exception as e:
            EmailNotification.objects.create(
                user=user,
                notification_type='EMI_REMINDER',
                subject=subject,
                message=text_message,
                is_sent=False,
                error_message=str(e)
            )
            raise e

    @staticmethod
    def send_transaction_alert(user, transaction):
        subject = f"New {transaction.transaction_type.title()} Alert"
        context = {
            'user': user,
            'transaction': transaction,
            'amount': transaction.amount,
            'category': transaction.category.name if transaction.category else 'Uncategorized',
            'date': transaction.date,
        }
        html_message = render_to_string('notifications/transaction_alert.html', context)
        text_message = render_to_string('notifications/transaction_alert.txt', context)

        try:
            send_mail(
                subject=subject,
                message=text_message,
                html_message=html_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
            )
            
            EmailNotification.objects.create(
                user=user,
                notification_type='TRANSACTION_ALERT',
                subject=subject,
                message=text_message,
                is_sent=True
            )
        except Exception as e:
            EmailNotification.objects.create(
                user=user,
                notification_type='TRANSACTION_ALERT',
                subject=subject,
                message=text_message,
                is_sent=False,
                error_message=str(e)
            )
            raise e

    @staticmethod
    def send_monthly_report(user, stats):
        subject = f"Your Monthly Financial Report - {datetime.now().strftime('%B %Y')}"
        context = {
            'user': user,
            'stats': stats,
            'month': datetime.now().strftime('%B %Y'),
        }
        html_message = render_to_string('notifications/monthly_report.html', context)
        text_message = render_to_string('notifications/monthly_report.txt', context)

        try:
            send_mail(
                subject=subject,
                message=text_message,
                html_message=html_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
            )
            
            EmailNotification.objects.create(
                user=user,
                notification_type='MONTHLY_REPORT',
                subject=subject,
                message=text_message,
                is_sent=True
            )
        except Exception as e:
            EmailNotification.objects.create(
                user=user,
                notification_type='MONTHLY_REPORT',
                subject=subject,
                message=text_message,
                is_sent=False,
                error_message=str(e)
            )
            raise e