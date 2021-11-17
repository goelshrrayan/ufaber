from django.urls import path
from . import views

from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('', views.redirectIndex, name='indexRedirect'),
    # path('index/', views.index, name='index'),
    url(r'^projects/$', views.index),
    path('add', views.addTodo, name='add'),
    path('complete/<todo_id>', views.completeTodo, name='complete'),
    path('deletecomplete', views.deleteCompleted, name='deletecomplete'),
    path('deleteall', views.deleteAll, name='deleteall'),

    # create-project
    url(r'^create-project/', views.CreateProjectAPI.as_view()),
    url(r'^upload-image/', views.UploadImageAPI.as_view()),

    #delete-project
    url(r'^delete-project/', views.DeleteProjectAPI.as_view()),

    #delete-task
    url(r'^delete-task/', views.DeleteTaskAPI.as_view()),

    #delete-subtask
    url(r'^delete-subtask/', views.DeleteSubTaskAPI.as_view()),

    #edit-project
    path('projects/<int:pk>/', views.EditProjects, name = "projects_edit"),

    #create-task
    url(r'^create-task/', views.CreateTaskAPI.as_view()),

    #create-subtask
    url(r'^create-subtask/', views.CreateSubTaskAPI.as_view()),

    #edit-project
    path('projects/<int:pk>/tasks/<int:task_pk>', views.EditTasks, name = "tasks_edit"),

    #edit-subtask
    path('projects/<int:pk>/tasks/<int:task_pk>/subtasks/<int:subtask_pk>', views.EditSubTasks, name = "subtasks_edit"),

]
