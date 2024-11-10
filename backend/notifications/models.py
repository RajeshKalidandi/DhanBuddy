from django.db import models
from django.conf import settings

class EmailNotification(models.Model):
    NOTIFICATION_TYPES = [
        ('EMI_REMINDER', 'EMI Payment Reminder'),
        ('TRANSACTION_ALERT', 'Transaction Alert'),
        ('MONTHLY_REPORT', 'Monthly Financial Report'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    is_sent = models.BooleanField(default=False)
    error_message = models.TextField(blank=True, null=True)

    class Meta:
        app_label = 'notifications'
        ordering = ['-sent_at']

    def __str__(self):
        return f"{self.notification_type} for {self.user.email}"
