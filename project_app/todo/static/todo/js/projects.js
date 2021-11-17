
(function ($) {
    $(function () {
       var projects_list = window.projects_list
       var html = ''
       for(var i=0; i < projects_list.length; i++)
       {
       	if(projects_list[i].priority == "high")
       	{  
       		
       		html = '<div class="task high task-high" style="cursor: pointer" onclick="edit_project('+ projects_list[i].pk + ')">\
					<div class="desc">\
						<div class="title">'
						+ projects_list[i].projectname +
						'</div>\
						<div>' + projects_list[i].description +
						'</div>\
					</div>\
					<div class="time">\
						<div class="date">' + projects_list[i].date + '</div>\
						<span>'+ projects_list[i].duration  +' days</span>\
					</div>\
				</div>'

			$( ".high-priority" ).append(html);

       	} else if (projects_list[i].priority == "medium")
       	{
       		html = '<div class="task medium task-medium " style="cursor: pointer" onclick="edit_project('+ projects_list[i].pk + ')">\
					<div class="desc">\
						<div class="title">'
						+ projects_list[i].projectname +
						'</div>\
						<div>' + projects_list[i].description +
						'</div>\
					</div>\
					<div class="time">\
						<div class="date">' + projects_list[i].date + '</div>\
						<span>'+ projects_list[i].duration  +' days</span>\
					</div>\
				</div>'

			$( ".medium-priority" ).append(html);
       	}
       	else if (projects_list[i].priority == "low")
       	{
       		html = '<div class="task low task-low" style="cursor: pointer" onclick="edit_project('+ projects_list[i].pk + ')">\
					<div class="desc">\
						<div class="title">'
						+ projects_list[i].projectname +
						'</div>\
						<div>' + projects_list[i].description +
						'</div>\
					</div>\
					<div class="time">\
						<div class="date">' + projects_list[i].date + '</div>\
						<span>'+ projects_list[i].duration  +' days</span>\
					</div>\
				</div>'

			$( ".low-priority" ).append(html);
       	}
       }
    }); // end of document ready
})(jQuery); // end of jQuery name space

var uploaded_file = []
function get_csrf_token() {
    return $('input[name="csrfmiddlewaretoken"]').val();
}

function create_project() {

	var project_name = document.getElementById("projectname").value
	var priority = document.getElementById("priority").value
	var description = document.getElementById("description").value
	var date = document.getElementById("dateofproject").value
	// var avatar = document.getElementById("avatar").files[0]
	var duration = document.getElementById("duration").value
	// var reader = new FileReader();
 //    reader.readAsDataURL(avatar);
 //    reader.onload = function() {

 //        base64_str = reader.result.split(",")[1];
 //        console.log(base64_str)
 //        uploaded_file = [];
 //        uploaded_file.push({
 //            "filename": avatar.name,
 //            "base64_file": base64_str,
 //        });

 //        upload_bot_image();
 //    };

 //    reader.onerror = function(error) {
 //        console.log('Error: ', error);
 //    };


	if (project_name.trim() == "") {
		return;
	}

	if (priority.trim() == "") {
		return;
	}

	if (description.trim() == "") {
		return;
	}

	if (date.trim() == "") {
		return;
	}

	if (duration.trim() == "") {
		return;
	}

	json_string = JSON.stringify({
		duration: duration,
		project_name: project_name,
		priority: priority,
		description: description,
		date: date.toString(),
		project_pk: -1
	})
	csrf_token = get_csrf_token()
	var params = 'json_string=' + json_string

	var xhttp = new XMLHttpRequest();
 
    xhttp.open("POST", "/create-project/", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            window.location = "/projects/"
        }
    }
    xhttp.send(params);

}

$("#project-form").submit(function(event){

   event.preventDefault()
})

function upload_image() {
    return new Promise(function(resolve, reject) {
        var json_string = JSON.stringify(uploaded_file)


	var params = 'json_string=' + json_string

	var xhttp = new XMLHttpRequest();
 
    xhttp.open("POST", "/upload-image/", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
          
        }
    }
    xhttp.send(params);
    //     $.ajax({
    //         url: "/upload-image/",
    //         type: "POST",
    //         contentType: "application/json",
    //         data: params,
    //         processData: false,
    //         success: function(response) {
    //             response = custom_decrypt(response)
    //             response = JSON.parse(response);
    //             if (response.status == 200) {
    //                 resolve(response);
    //             } else if (response.status == 300) {
    //                 M.toast({
    //                     "html": "File format is Invalid"
    //                 }, 2000)
    //             } else {
    //                 M.toast({
    //                     "html": "Internal Server Error. Please try again later."
    //                 }, 2000)
    //             }
    //         },
    //         error: function(xhr, textstatus, errorthrown) {
    //             console.log("Please report this error: " + errorthrown + xhr.status + xhr.responseText);
    //         }
    //     });
    })
}

async function upload_bot_image() {
    var response = await upload_image();
    	
    // if (response && response.status == 200) {
    //     src = window.location.origin + response.src
    //     var json_string = JSON.stringify({
    //         src: response.src,
    //         bot_id: window.location.href.split("=").pop(),
    //     })
    //     json_string = EncryptVariable(json_string);
    //     json_string = encodeURIComponent(json_string);
    //     var params = 'json_string=' + json_string
    //     $.ajax({
    //         url: "/chat/save-bot-image/",
    //         type: "POST",
    //         data: params,
    //         success: function(response) {
    //             response = custom_decrypt(response)
    //             response = JSON.parse(response);
    //             if (response.status == 200) {
    //                 document.getElementById('input_upload_bot_image2').value = "";
    //                 M.toast({
    //                     "html": "Image Uploaded Successfully."
    //                 }, 2000)
    //                 window.location.reload();
    //             } else {
    //                 M.toast({
    //                     "html": "File format is Invalid"
    //                 }, 2000)
    //             }
    //         },
    //         error: function(xhr, textstatus, errorthrown) {}
    //     });
    // }
}


function edit_project(project_pk) {
	
	window.location = '/projects/'+project_pk
}
