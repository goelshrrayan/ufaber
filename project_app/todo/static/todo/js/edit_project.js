function edit_specific_project(pk) {

	create_project(pk)
}


function create_project(pk) {

	var project_name = document.getElementById("projectname").value
	var priority = document.getElementById("priority").value
	var description = document.getElementById("description").value
	var date = document.getElementById("dateofproject").value
	var duration = document.getElementById("duration").value


	if (project_name.trim() == "") {
		alert("please add project name")
		return;
	}

	if (priority.trim() == "") {
		alert("please add project priority")
		return;
	}

	if (description.trim() == "") {
		alert("please add project description")
		return;
	}

	if (date.trim() == "") {
		alert("please add project description")
		return;
	}

	if (duration.trim() == "") {
		alert("please add project duration")
		return;
	}

	json_string = JSON.stringify({
		duration: duration,
		project_name: project_name,
		priority: priority,
		description: description,
		date: date.toString(),
		project_pk: parseInt(pk),
	})
	var params = 'json_string=' + json_string

	var xhttp = new XMLHttpRequest();
 
    xhttp.open("POST", "/create-project/", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
         	window.location = '/projects/'
        }
    }
    xhttp.send(params);

}

function delete_project(pk) {

	json_string = JSON.stringify({
		project_pk: parseInt(pk),
	})
	var params = 'json_string=' + json_string

	var xhttp = new XMLHttpRequest();
 
    xhttp.open("POST", "/delete-project/", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            alert("Deleted Project Successfully")
         	window.location = '/projects/'
        }
    }
    xhttp.send(params);

}

function create_new_task(pk) {

	var task_name = document.getElementById("taskname").value
	var description = document.getElementById("description_task").value
	var start_date = document.getElementById("start_date").value
	var end_date = document.getElementById("end_date").value


	if (task_name.trim() == "") {
		return;
	}

	if (description.trim() == "") {
		return;
	}

	if (start_date.trim() == "") {
		return;
	}

	if (end_date.trim() == "") {
		return;
	}

	json_string = JSON.stringify({
		task_name: task_name,
		description: description,
		start_date: start_date.toString(),
		end_date: end_date.toString(),
		project_pk: parseInt(pk),
		task_pk: -1
	})
	var params = 'json_string=' + json_string

	var xhttp = new XMLHttpRequest();
 
    xhttp.open("POST", "/create-task/", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            window.location.reload()
         	
        }
    }
    xhttp.send(params);

}

function edit_task_page(task_pk) {
	window.location = window.location.href + 'tasks/' + task_pk
}

function back_project() {
	window.location = '/projects/'
}