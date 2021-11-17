from django.contrib import admin
from .models import Todo, Tasks, Subtasks

admin.site.register(Todo)

admin.site.register(Tasks)

admin.site.register(Subtasks)
