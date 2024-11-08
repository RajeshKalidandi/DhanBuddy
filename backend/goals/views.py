from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import SavingsGoal
from .serializers import SavingsGoalSerializer
from drf_yasg.utils import swagger_auto_schema

class SavingsGoalViewSet(viewsets.ModelViewSet):
    serializer_class = SavingsGoalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):  # for schema generation
            return SavingsGoal.objects.none()
        return SavingsGoal.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user) 