from django.apps import AppConfig

class GoalsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'goals'

    def ready(self):
        pass  # Remove comment and add proper indentation