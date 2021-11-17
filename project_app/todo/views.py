from django.shortcuts import render, redirect
from django.views.decorators.http import require_POST

from .models import Todo, Tasks, Subtasks
from .forms import TodoForm

from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render, HttpResponse, \
    HttpResponseRedirect
from rest_framework.authentication import SessionAuthentication, \
    BasicAuthentication

import json
import datetime
import re
import sys
import base64
from django.conf import settings

from PIL import Image, ImageFile


class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening


def redirectIndex(request):
	return HttpResponseRedirect("/projects")


def index(request):
	try:
		project_list = Todo.objects.all()
		project_list = list(project_list)
		final_project_list = []
	
		for project in project_list:
		
			date = project.date
			date = date.strftime('%d-%m-%Y')

			final_project_list.append({"projectname": str(project.name),
	        	"priority": project.priority,
	        	"description": project.description,
	        	"date": date,
	        	"duration": project.duration,
	        	"pk": project.pk,
	        	})
	        

		form = TodoForm()

		context = {'projects_list' : final_project_list, 'form' : form}

		return render(request, 'todo/index.html', context)
	except Exception as e:
		print(e)

def EditProjects(request, pk):
	try:
		project = Todo.objects.get(pk=pk)
		date = project.date
		date = date.strftime('%Y-%m-%d')
		tasks = Tasks.objects.filter(project=project)
		context = {'projectname' : project.name, 'priority' : project.priority, 'duration': project.duration, 'date': str(date), 'description': project.description, 'project_pk': project.pk, 'task_list': tasks}

		return render(request, 'todo/edit_project.html', context)
	except Exception as e:
		print(e)

def EditTasks(request, pk, task_pk):
	try:
		project = Todo.objects.get(pk=pk)
		task = Tasks.objects.get(pk=task_pk)
		start_date = task.start_date
		start_date = start_date.strftime('%Y-%m-%d')

		end_date = task.end_date
		end_date = end_date.strftime('%Y-%m-%d')

		subtasks = Subtasks.objects.filter(tasks=task)

		context = {'taskname' : task.name, 'start_date': str(start_date), 'end_date': str(end_date), 'description': task.description, 'project_pk': pk, 'task_pk': task_pk, 'subtask_list': subtasks}

		return render(request, 'todo/edit_task.html', context)
	except Exception as e:
		print(e)


def EditSubTasks(request, pk, task_pk, subtask_pk):
	try:
		project = Todo.objects.get(pk=pk)
		task = Tasks.objects.get(pk=task_pk)
		subtask = Subtasks.objects.get(pk=subtask_pk)
		start_date = subtask.start_date
		start_date = start_date.strftime('%Y-%m-%d')

		end_date = subtask.end_date
		end_date = end_date.strftime('%Y-%m-%d')


		context = {'subtaskname' : subtask.name, 'start_date': str(start_date), 'end_date': str(end_date), 'description': subtask.description, 'project_pk': pk, 'task_pk': task_pk, 'subtask_pk': subtask_pk}
		return render(request, 'todo/edit_subtasks.html', context)
	except Exception as e:
		print(e)

@require_POST
def addTodo(request):
	form = TodoForm(request.POST)

	if form.is_valid():
			new_todo = Todo(text=request.POST['text'])
			new_todo.save()

	return redirect('index')

def completeTodo(request, todo_id):
	todo = Todo.objects.get(pk=todo_id)
	todo.complete = True
	todo.save()

	return redirect('index')

def deleteCompleted(request):
	Todo.objects.filter(complete__exact=True).delete()

	return redirect('index')

def deleteAll(request):
	Todo.objects.all().delete()

	return redirect('projects')


class CreateProjectAPI(APIView):

    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)

    def post(self, request, *args, **kwargs):

        response = {}
        response['status'] = 500
  
        try:
        	data = request.data
        	response['status'] = 200

        	date_format = "%Y-%m-%d"
        	
        	data = json.loads(json.dumps(data["json_string"]))
        	
        	data = json.loads(data)

        	datetime_start = datetime.datetime.strptime(str(data["date"]), date_format).date()

        	if data['project_pk'] == -1:
        		project_obj = Todo.objects.create(name=str(data["project_name"]), priority=str(data["priority"]), description=str(data["description"]), date=datetime_start, duration=data["duration"])
        		response["message"] = "Created Successfully"
        	else:
        		project_obj = Todo.objects.filter(pk=data['project_pk'])
        		if len(project_obj):
        			project_obj[0].name = str(data["project_name"])
        			project_obj[0].priority = str(data["priority"])
        			project_obj[0].description = str(data["description"])
        			project_obj[0].date = datetime_start
        			project_obj[0].duration = data["duration"]
        			project_obj[0].save()
        			response["message"] = "Updated Successfully"


        	return Response(data=response)
        except Exception as e:
        	print(str(e))


class DeleteProjectAPI(APIView):

    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)

    def post(self, request, *args, **kwargs):

        response = {}
        response['status'] = 500
  
        try:

        	data = request.data
        	response['status'] = 200
        	date_format = "%Y-%m-%d"
        	
        	data = json.loads(json.dumps(data["json_string"]))
        	
        	data = json.loads(data)
        
        	project_pk = data["project_pk"]
        	if project_pk > -1:
        		project_obj = Todo.objects.get(pk=project_pk).delete()
        	
        	return Response(data=response)
        except Exception as e:
        	print(str(e))


class DeleteTaskAPI(APIView):

    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)

    def post(self, request, *args, **kwargs):

        response = {}
        response['status'] = 500
  
        try:

        	data = request.data
        	response['status'] = 200
        	date_format = "%Y-%m-%d"
        	
        	data = json.loads(json.dumps(data["json_string"]))
        	
        	data = json.loads(data)
        
        	task_pk = data["task_pk"]
        	if task_pk > -1:
        		task_obj = Tasks.objects.get(pk=task_pk).delete()
        	
        	return Response(data=response)
        except Exception as e:
        	print(str(e))


class DeleteSubTaskAPI(APIView):

    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)

    def post(self, request, *args, **kwargs):

        response = {}
        response['status'] = 500
  
        try:

        	data = request.data
        	response['status'] = 200
        	date_format = "%Y-%m-%d"
        	
        	data = json.loads(json.dumps(data["json_string"]))
        	
        	data = json.loads(data)
        
        	subtask_pk = data["subtask_pk"]
        	if subtask_pk > -1:
        		task_obj = Subtasks.objects.get(pk=subtask_pk).delete()
        	
        	return Response(data=response)
        except Exception as e:
        	print(str(e))



class UploadImageAPI(APIView):

    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)

    def post(self, request, *args, **kwargs):
        response = {}
        response["status"] = 500
        try:
        	
        	data = request.data
        	data = json.loads(json.dumps(data["json_string"]))
        	data = json.loads(data)
        	ImageFile.LOAD_TRUNCATED_IMAGES = True
        	
        	uploaded_file = data[0]
        	file_name = uploaded_file["filename"]
        	regex_cleaner = re.compile('<.*?>')
        	cleaned_raw_str = re.sub(regex_cleaner, '', str(file_name))
        	file_name = cleaned_raw_str.strip()
        	file_name = file_name[0:5]        	
        	base64_content = uploaded_file["base64_file"]
        	file_extention = file_name.split(".")[-1]
        	file_extention = file_extention.lower()
        	file_path = settings.MEDIA_ROOT + file_name
        	fh = open(file_path, "wb")
       
        	fh.write(base64.b64decode(base64_content))
        	fh.close()

        	original_file = Image.open(settings.MEDIA_ROOT + file_name)
        	original_file.thumbnail((512, 512))
        	original_file.save(settings.MEDIA_ROOT + file_name)
        	response["compressed_image_path"] = "/images/" + file_name
        	response["src"] = "/images/" + file_name
        	response["status"] = 200

        except Exception as e:  # noqa: F841
        	print(e)

        return Response(data=response)


class CreateTaskAPI(APIView):

    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)

    def post(self, request, *args, **kwargs):

        response = {}
        response['status'] = 500
  
        try:
        	
        	data = request.data
        	response['status'] = 200

        	date_format = "%Y-%m-%d"
        	
        	data = json.loads(json.dumps(data["json_string"]))
        	
        	data = json.loads(data)

        	start_date = datetime.datetime.strptime(str(data["start_date"]), date_format).date()

        	end_date = datetime.datetime.strptime(str(data["end_date"]), date_format).date()

        	if data['task_pk'] == -1:
        		task_obj = Tasks.objects.create(project=Todo.objects.get(pk=data['project_pk']), name=str(data["task_name"]), description=str(data["description"]), start_date=start_date, end_date=end_date)
        		response["message"] = "Task Created Successfully"
        	else:
        		task_obj = Tasks.objects.filter(pk=data['task_pk'])
        		if len(task_obj):
        			task_obj[0].name = str(data["task_name"])
        			task_obj[0].description = str(data["description"])
        			task_obj[0].start_date = start_date
        			task_obj[0].end_date = end_date
        			task_obj[0].save()
        			response["message"] = "Updated Successfully"


        	return Response(data=response)
        except Exception as e:
        	print(str(e))


class CreateSubTaskAPI(APIView):

    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)

    def post(self, request, *args, **kwargs):

        response = {}
        response['status'] = 500
  
        try:
        	
        	data = request.data
        	response['status'] = 200

        	date_format = "%Y-%m-%d"
        	
        	data = json.loads(json.dumps(data["json_string"]))
        	
        	data = json.loads(data)

        	start_date = datetime.datetime.strptime(str(data["start_date"]), date_format).date()

        	end_date = datetime.datetime.strptime(str(data["end_date"]), date_format).date()

        	if data['subtask_pk'] == -1:
        		subtask_obj = Subtasks.objects.create(tasks=Tasks.objects.get(pk=data['task_pk']), name=str(data["subtask_name"]), description=str(data["description"]), start_date=start_date, end_date=end_date)
        		response["message"] = "Task Created Successfully"
        	else:
        		subtask_obj = Subtasks.objects.filter(pk=data['subtask_pk'])
        		if len(subtask_obj):
        			subtask_obj[0].name = str(data["subtask_name"])
        			subtask_obj[0].description = str(data["description"])
        			subtask_obj[0].start_date = start_date
        			subtask_obj[0].end_date = end_date
        			subtask_obj[0].save()
        			response["message"] = "Updated Successfully"


        	return Response(data=response)
        except Exception as e:
        	print(str(e))
