from django.db.models.signals import post_save
from django.dispatch import receiver
from transactions.models import EMI, Transaction
from .services import NotificationService
from django.utils import timezone

@receiver(post_save, sender=EMI)
def send_emi_notifications(sender, instance, created, **kwargs):
    if created or instance.should_send_reminder():
        NotificationService.send_emi_reminder(instance.user, instance)
        instance.last_notification_sent = timezone.now().date()
        instance.save(update_fields=['last_notification_sent'])

@receiver(post_save, sender=Transaction)
def send_transaction_notifications(sender, instance, created, **kwargs):
    if created:
        NotificationService.send_transaction_alert(instance.user, instance)