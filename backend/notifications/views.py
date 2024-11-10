from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import EmailNotification
from .services import NotificationService
from django.utils import timezone

class NotificationViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'])
    def test_email(self, request):
        """Send a test email to verify email settings."""
        try:
            NotificationService.send_test_email(request.user)
            return Response({'message': 'Test email sent successfully'})
        except Exception as e:
            return Response({'error': str(e)}, status=400)

    @action(detail=False, methods=['get'])
    def settings(self, request):
        """Get user's notification preferences."""
        user = request.user
        return Response({
            'emi_reminders': user.notifications_enabled,
            'transaction_alerts': user.notifications_enabled,
            'monthly_reports': user.notifications_enabled
        })

    @action(detail=False, methods=['post'])
    def update_settings(self, request):
        """Update user's notification preferences."""
        user = request.user
        user.notifications_enabled = request.data.get('notifications_enabled', True)
        user.save()
        return Response({'message': 'Settings updated successfully'})