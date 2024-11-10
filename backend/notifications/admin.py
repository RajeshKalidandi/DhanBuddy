from django.contrib import admin
from .models import EmailNotification

@admin.register(EmailNotification)
class EmailNotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'notification_type', 'subject', 'is_sent', 'sent_at')
    list_filter = ('notification_type', 'is_sent', 'sent_at')
    search_fields = ('user__email', 'subject', 'message')
    readonly_fields = ('sent_at',)
    ordering = ('-sent_at',)