function edit_specific_subtask(subtask_pk, task_pk) {
	create_new_subtask(subtask_pk, task_pk)
}


function create_new_subtask(subtask_pk, task_pk) {

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
		subtask_pk: parseInt(subtask_pk)
	})
	var params = 'json_string=' + json_string

	var xhttp = new XMLHttpRequest();
 
    xhttp.open("POST", "/create-subtask/", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            alert("Updated Successfully")
            window.location.reload()
         	
        }
    }
    xhttp.send(params);

}

function back_subtasks(project_pk, task_pk) {
	window.location.href = window.location.origin + '/projects/'+project_pk+'/tasks/'+task_pk
}

function delete_subtasks(project_pk, task_pk, subtask_pk) {
	
	json_string = JSON.stringify({
		subtask_pk: parseInt(subtask_pk),
	})
	var params = 'json_string=' + json_string

	var xhttp = new XMLHttpRequest();
 
    xhttp.open("POST", "/delete-subtask/", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            alert("Deleted Task Successfully")
         	window.location = '/projects/'+ project_pk + '/tasks/' +task_pk
        }
    }
    xhttp.send(params);
}