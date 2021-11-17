function edit_specific_task(task_pk, project_pk) {
	create_new_task(task_pk, project_pk)
}


function create_new_task(task_pk, project_pk) {

	var task_name = document.getElementById("taskname").value
	var description = document.getElementById("description_task").value
	var start_date = document.getElementById("start_date").value
	var end_date = document.getElementById("end_date").value


	if (task_name.trim() == "") {
		alert("please add task name")
		return;
	}

	if (description.trim() == "") {
		alert("please add task description")
		return;
	}

	if (start_date.trim() == "") {
		alert("please add task start date")
		return;
	}

	if (end_date.trim() == "") {
		alert("please add task end date")
		return;
	}

	json_string = JSON.stringify({
		task_name: task_name,
		description: description,
		start_date: start_date.toString(),
		end_date: end_date.toString(),
		project_pk: parseInt(project_pk),
		task_pk: parseInt(task_pk)
	})
	var params = 'json_string=' + json_string

	var xhttp = new XMLHttpRequest();
 
    xhttp.open("POST", "/create-task/", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            window.location = '/projects/'+project_pk
         	
        }
    }
    xhttp.send(params);

}



function create_new_subtask(task_pk) {

	var subtask_name = document.getElementById("subtaskname").value
	var description = document.getElementById("description_subtask").value
	var start_date = document.getElementById("start_date_subtask").value
	var end_date = document.getElementById("end_date_subtask").value


	if (subtask_name.trim() == "") {
		alert("please add subtask name")
		return;
	}

	if (description.trim() == "") {
		alert("please add subtask description")
		return;
	}

	if (start_date.trim() == "") {
		alert("please add subtask start date")
		return;
	}

	if (end_date.trim() == "") {
		alert("please add subtask end date")
		return;
	}

	json_string = JSON.stringify({
		subtask_name: subtask_name,
		description: description,
		start_date: start_date.toString(),
		end_date: end_date.toString(),
		task_pk: parseInt(task_pk),
		subtask_pk: -1
	})
	var params = 'json_string=' + json_string

	var xhttp = new XMLHttpRequest();
 
    xhttp.open("POST", "/create-subtask/", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            window.location.reload()
         	
        }
    }
    xhttp.send(params);

}

function delete_task(project_pk, task_pk) {

	json_string = JSON.stringify({
		task_pk: parseInt(task_pk),
	})
	var params = 'json_string=' + json_string

	var xhttp = new XMLHttpRequest();
 
    xhttp.open("POST", "/delete-task/", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            alert("Deleted Task Successfully")
         	window.location = '/projects/'+ project_pk
        }
    }
    xhttp.send(params);

}

function edit_subtask_page(subtask_pk) {
	window.location = window.location.href + '/subtasks/' + subtask_pk
}


function back_task(pk) {
	window.location = '/projects/'+pk
}