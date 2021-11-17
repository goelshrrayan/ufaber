from django.db import models
import datetime

class Todo(models.Model):
	name = models.CharField(max_length=40, null=True)
	priority = models.CharField(default="high", max_length=6)
	description = models.CharField(max_length=200, null=True)
	date = models.DateField(default=datetime.date.today)
	duration = models.IntegerField(default=1)
	# avatar = models.ImageField(null=True, blank=True, upload_to="images/")

	def __str__(self):
		return str(self.name)

class Tasks(models.Model):
	project = models.ForeignKey(Todo, null=True, blank=True, on_delete=models.CASCADE, help_text="Tasks for projects")
	name = models.CharField(max_length=40, null=True)
	description = models.CharField(max_length=200, null=True)
	start_date = models.DateField(default=datetime.date.today)
	end_date = models.DateField(default=datetime.date.today)

	def __str__(self):
		return str(self.name)


class Subtasks(models.Model):
	tasks = models.ForeignKey(Tasks, null=True, blank=True, on_delete=models.CASCADE, help_text="Tasks for projects")
	name = models.CharField(max_length=40, null=True)
	description = models.CharField(max_length=200, null=True)
	start_date = models.DateField(default=datetime.date.today)
	end_date = models.DateField(default=datetime.date.today)

	def __str__(self):
		return str(self.name)