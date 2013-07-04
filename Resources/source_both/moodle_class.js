Ti.include("model/api.js");
var row_data = []
var win = Titanium.UI.currentWindow;

var bar = Ti.UI.createView({
				backgroundColor:'#46a546',
				width:Ti.UI.Size,
				height: 44,
				left:0,
				top:0,
			});
			var border = Ti.UI.createView({
				backgroundColor:"black",
				height:1,
				bottom:0,
				width:Ti.UI.Size
			});
			bar.add(border);
win.add(bar);
	
var winModal = Ti.UI.createWindow({
        backgroundColor : '#B0000000',
        visible: false
    });
        	var win_height = 380;
   		var win_width = Ti.Platform.displayCaps.platformWidth * .85;
 
    	var view = Ti.UI.createView({
        	backgroundColor : '#e2e7ed',
        	borderColor : '#A5A5A5',
        	box: true,
        	borderRadius : 15,
        	top: 50,
        	layout: 'vertical',
        	borderWidth : 2,
        	width : win_width,
        	height : win_height
   		 });
   		 var modalTableView = Titanium.UI.createTableView({
			backgroundColor:'#e2e7ed',
			box: true
		});
		
		modalTableView.addEventListener('click', function(e){			
			xhr = postNotificationMarkAsRead(Titanium.App.Properties.getString("mmat"),e.source.notification_id);
			xhr.onload = function(){
			var response = this.responseText;

			if(e.source.type == "Post")
			{
				var win1 = Titanium.UI.createWindow({  
    			url:'post.js',
    			backgroundColor:'#ecfaff',
    			barColor: '#46a546',
    			notModal: winModal
			});
			win1.postid = e.source.id;
			win1.fullname = Titanium.App.Properties.getString("name");
			win1.photo_url = Titanium.App.Properties.getString("photo_url");
			winModal.hide();
			win1.open();
			} else if (e.source.type == "Topic"){
				Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:7, class_id: e.source.id});
			}
	}
	xhr.send();
		
});


		   		 var labelTitle = Titanium.UI.createLabel({
    			text:Titanium.App.Properties.getString("name"),
    			font:{fontSize:16,fontWeight:'bold'},
    			color:'#000',
    			box: true,
   				width:'auto',
    			textAlign:'center',
    			top: -37,
    			left: 55,
 
			});
			var labelTitle2 = Titanium.UI.createLabel({
    			text:'Notifications',
    			font:{fontSize:12},
    			color:'#000',
    			box: true,
   				width:'auto',
    			textAlign:'center',
    			left: 55,
 
			});
		var seperatorPhone = Ti.UI.createView({
				backgroundColor: "#808080",
				width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 10,
				top: 7,
				box: true,
				height:2,
			});
			var pict = Titanium.UI.createImageView({
				image: Titanium.App.Properties.getString("photo_url"),
				top: 10,
				left: 10,
				box:true,
				height:40,
				width:40,
			});
			 view.add(pict);
		 view.add(labelTitle);
		 view.add(labelTitle2);
		 view.add(seperatorPhone);
		 view.add(modalTableView);
   		 winModal.add(view);
var grades_button =  Titanium.UI.createButton({
	title:'Grades',
	height: 30,
    width:'auto',
	backgroundColor:'#347235',
	borderWidth: 1,
	borderColor: 'black',
	borderRadius: 2,
	right: 10
});
var regex = /course\/view\.php\?id=(\d+)/;
gradesid = regex.exec(win.Moodurl);

//bar.add(grades_button);

grades_button.addEventListener('click', function(e){
   var postData = {username: Titanium.App.Properties.getString('moodle-user'), password: Titanium.App.Properties.getString('moodle-pass')};	
  	xhr = postLoginToMoodle(Titanium.App.Properties.getString("moodle_url"),postData);
	xhr.onload = function(){
	}
	var passed = false;
	xhr.onreadystatechange = function () {
		var regex = /MoodleSession/;
		found = regex.exec(xhr.getResponseHeader("Set-Cookie"));
		if (found != null && passed == false){
			passed = true;
				var win1 = Titanium.UI.createWindow({  
    					url: 'grade_view.js',
   	 					backgroundColor:'#ecfaff',
						});
					win1.grade_url = 'http://moodle.uncc.edu/grade/report/index.php?id=' + gradesid[1];
					win1.cookie = xhr.getResponseHeader("Set-Cookie");
					win1.open();
				}
	}
	xhr.send(postData);
});
 var plainTemplate = {
    childTemplates: [
        {
            type: 'Ti.UI.Label', // Use a label
            bindId: 'fileName',  // Bind ID for this label
            properties: {        // Sets the Label.left property
                left: 52,
                top: 10,
                textAlign:'left',
                backgroundColor:'#ecfaff',
				height:'auto',
                color:'#000000',
				font:{fontWeight:'bold',fontSize:18}
            },
            events: { click : launchFile } 
        },
        {
            type: 'Ti.UI.ImageView', // Use a label
            bindId: 'fileIcon',  // Bind ID for this label
            properties: {        // Sets the Label.left property
				left: 10,
				height: 32,
				width: 32,
            },
            events: { click : launchFile }  
        }
    ]
};
var listView = Titanium.UI.createListView({
	backgroundColor:'#ecfaff',
	templates: { 'plain': plainTemplate},
	defaultItemTemplate: 'plain',
	top:44
});
var section = Ti.UI.createListSection();
win.add(listView);



function reloadNotifications()
{
modalTableView.data = [];
xhr = getNotificationsGrouped(Titanium.App.Properties.getString("mmat"));
xhr.onload = function(){
	var response = this.responseText;
	user = JSON.parse(response);
	if(user.unread.length > 0){
		var notificationButton = Ti.UI.createButton({
    		backgroundImage:'../images/bell-light.png',
    		height:27,
    		width:27,
		});
		var label = Ti.UI.createLabel({
    		text: user.unread.length,
    		textAlign: "center",
    		height: 'auto',
    		width: 11,
    		font: {
        		fontWeight: "bold",
        		fontSize: 12
    		},
    		backgroundColor: "red",
    		color: "white",
    		borderRadius: 3,
    		top: 0,
    		left: 15
    	});
    	notificationButton.add(label);
	} else {
		var notificationButton = Ti.UI.createButton({
    		backgroundImage:'../images/bell.png',
    		height:25,
    		width:25,
		});
	}
//	win.setTitleControl(notificationButton);
	bar.add(notificationButton);
//	win.title = "Feed";
		for (var i = 0; i < user.unread.length; ++i) {
			var classNumber = Titanium.UI.createLabel({
    			text:user.unread[i].actors_count + ' people ' + user.unread[i].action + ' to',
    			box:true,
    			notification_id: user.unread[i].id,
    			id:user.unread[i].target_id,
    			type: user.unread[i].target_type,
    			font:{fontSize:16,fontWeight:'bold'},
    			color:'#000',
   				width:'auto',
    			textAlign:'left',
    			left: 10
 
			});
			var classTitle = Titanium.UI.createLabel({
    			text:user.unread[i].text,
    			box:true,
    			notification_id: user.unread[i].id,
    			id:user.unread[i].target_id,
    			type: user.unread[i].target_type,
    			font:{fontSize:11},
    			color:'#000',
    			height: 12,
   				width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 45,
    			textAlign:'left',
    			left: 10
 
			});
			var flag = Titanium.UI.createImageView({
				image: '../images/flag_new_red.png',
				top: -27,
				right: 12,
				notification_id: user.unread[i].id,
				id:user.unread[i].target_id,
				type: user.unread[i].target_type,
				box:true,
				height:24,
				width:24,
			});
		var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#e2e7ed',
                box:true,
                notification_id: user.unread[i].id,
                id:user.unread[i].target_id,
                type: user.unread[i].target_type,
                layout: 'vertical',
                height: 40
          });
            fbRow.add(classNumber);
            fbRow.add(classTitle);
             fbRow.add(flag);
         modalTableView.appendRow(fbRow);
          }
          for (var i = 0; i < user.read.length; ++i) {
			var classNumber = Titanium.UI.createLabel({
    			text:user.read[i].actors_count + ' people ' + user.read[i].action + ' to',
    			box:true,
    			notification_id: user.read[i].id,
    			id:user.read[i].target_id,
    			type: user.read[i].target_type,
    			font:{fontSize:16,fontWeight:'bold'},
    			color:'#000',
   				width:'auto',
    			textAlign:'left',
    			left: 10
 
			});
			var classTitle = Titanium.UI.createLabel({
    			text:user.read[i].text,
    			box:true,
    			notification_id: user.read[i].id,
    			id:user.read[i].target_id,
    			type: user.read[i].target_type,
    			font:{fontSize:11},
    			color:'#000',
    			height: 12,
   				width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 45,
    			textAlign:'left',
    			left: 10
 
			});
		var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#e2e7ed',
                box:true,
                notification_id: user.read[i].id,
                id:user.read[i].target_id,
                type: user.read[i].target_type,
                layout: 'vertical',
                height: 40
          });
            fbRow.add(classNumber);
            fbRow.add(classTitle);
         modalTableView.appendRow(fbRow);
          }
			 winModal.addEventListener('click', function(e){
			 	if(e.source.box != true){
 				winModal.hide();}
 			})
			notificationButton.addEventListener('click', function(e){
				if (winModal.visible == true)
				{
					winModal.show();	
				}
				winModal.open();
				winModal.visible = true;
			});
			
			
//			
}
xhr.send()
}


var user = ''; 
function beginReloading(){
row_data = [];
if ( Titanium.Network.online) {
if (win.class_id != null){
		xhr = getMoodle2CourseContents(Titanium.App.Properties.getString("moodle_url_" + win.entity_id),Titanium.App.Properties.getString("moodle-token-" + win.entity_id),win.class_id);
		xhr.onload = function()
		{
			var response = this.responseText;
			var course = JSON.parse(response);
			for (var i = 0; i < course.length; i++)
			{
				if (course[i].modules.length > 0)
				{	
					Ti.API.info(course[i]);
					for (var j = 0; j < course[i].modules.length; j++)
					{
						if (course[i].modules[j].modname == "resource")
						{
							var fileurl = course[i].modules[j].contents[0].fileurl + '&token=' + Titanium.App.Properties.getString("moodle-token-" + win.entity_id);
							var filename = course[i].modules[j].contents[0].filename;
							var leftImage = Titanium.UI.createImageView({
								image: course[i].modules[j].modicon,
								hiddenTitle: course[i].modules[j].name,
                				FileUrl: fileurl,
                				FileName: filename,
								height: 'auto',
								left: 2
							});
							var labelTitle = Titanium.UI.createLabel({
    							text:course[i].modules[j].name,
    							hiddenTitle: course[i].modules[j].name,
                				FileUrl: fileurl,
                				FileName: filename,
    							font:{fontSize:16,fontWeight:'bold'},
    							color:'#000',
   								width:'auto',
    							textAlign:'left',
    							left: 20
							});
							if (j == 0){
								var fbRow = Titanium.UI.createTableViewRow({
 	         					header:course[i].name,
               					 backgroundColor:'#ecfaff',
                				hiddenTitle: course[i].modules[j].name,
                				FileUrl: fileurl,
                				FileName: filename,
								hasDetail:true,
								height:40
            				});
						} else {
            				var fbRow = Titanium.UI.createTableViewRow({
                				backgroundColor:'#ecfaff',
                				hiddenTitle: course[i].modules[j].name,
               	 				FileUrl: fileurl,
               	 				FileName: filename,
								hasDetail:true,
								height:40
            				});
        				}
        				fbRow.add(leftImage);
        				fbRow.add(labelTitle);
        				row_data.push({
            	
            			fileName : {text: course[i].modules[j].name, FileUrl: fileurl, FileName: filename},
            			fileIcon : {image: course[i].modules[j].modicon, FileUrl: fileurl, FileName: filename},
            			properties : {
            				itemId: 'row',
            				accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
           				}
            		});
						}
					}
				}
			}
			section.setItems(row_data);
	   		listView.sections = [section];
		}
		xhr.send();
	} else {	
	xhr = getDataFromMoodle(win.Moodurl);
	xhr.onload = function(){
	var response = this.responseText;
	var regex = /href=.+(http.+mod\/resource\/view\.php\?id=\d+).+<img src="(https.+gif)".+<span>(.+)<span/ig;
	var c = 0
	while((hits = regex.exec(response)) !== null) {
		var leftImage = Titanium.UI.createImageView({
				image: hits[2],
				hiddenTitle: hits[3],
                FileUrl: hits[1],
				height: 'auto',
				left: 2
			});
			var labelTitle = Titanium.UI.createLabel({
    			text:hits[3],
    			hiddenTitle: hits[3],
                FileUrl: hits[1],
    			font:{fontSize:16,fontWeight:'bold'},
    			color:'#000',
   				width:'auto',
    			textAlign:'left',
    			left: 20
			});
		if (c == 0){
			var fbRow = Titanium.UI.createTableViewRow({
 	         	header:'File Attachments',
                backgroundColor:'#ecfaff',
                hiddenTitle: hits[3],
                FileUrl: hits[1],
				hasDetail:true,
				height:40
            });
		} else {
            var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#ecfaff',
                hiddenTitle: hits[3],
                FileUrl: hits[1],
				hasDetail:true,
				height:40
            });
        }
        c++;
        fbRow.add(leftImage);
        fbRow.add(labelTitle);
        tableview.appendRow(fbRow);
	}
	var regex = /(http.+quiz\/view\.php\?id=\d+).+<img src="(https.+gif)".+<span>(.+)<span/ig;
	var c = 0;
	while((hits = regex.exec(response)) !== null) {
		var leftImage = Titanium.UI.createImageView({
				image: hits[2],
				hiddenTitle: hits[3],
                FileUrl: hits[1],
				height: 'auto',
				left: 2
			});
			var labelTitle = Titanium.UI.createLabel({
    			text:hits[3],
    			hiddenTitle: hits[3],
                FileUrl: hits[1],
    			font:{fontSize:16,fontWeight:'bold'},
    			color:'#000',
   				width:'auto',
    			textAlign:'left',
    			left: 20
 
			});
		if (c == 0){
			var fbRow = Titanium.UI.createTableViewRow({
 	         	header:'Homework',
                backgroundColor:'#ecfaff',
                hiddenTitle: hits[3],
                FileUrl: hits[1],
				hasDetail:true,
				height:40
            });
		} else {
            var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#ecfaff',
                hiddenTitle: hits[3],
                FileUrl: hits[1],
				hasDetail:true,
				height:40
            });
        }
        c++;
        fbRow.add(leftImage);
        fbRow.add(labelTitle);
        tableview.appendRow(fbRow);
	}
}
xhr.send();
}
} else {
	alert("Network problems.");
}
};
function launchFile(e){
	var loadView = Ti.UI.createWindow({
    	backgroundColor: 'black',
    	opacity: .90,
    	height: Ti.Platform.displayCaps.platformHeight,
    	width: Ti.Platform.displayCaps.platformWidth
	});
 
	var loadIndicator = Ti.UI.createActivityIndicator({
    	style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
    	message: 'Downloading File...',
    	font : 'Arial',
    	color: '#FFF'
	});
	loadView.add(loadIndicator);
	loadView.open();
	loadIndicator.show();
   	var url = e.section.getItemAt(e.itemIndex).fileName.FileUrl;
   	var name = e.section.getItemAt(e.itemIndex).fileName.FileName;		
					url2 = url;
					var xhr = Titanium.Network.createHTTPClient({enableKeepAlive:false, timeout:6000});
					xhr.retries = 0;
					xhr.open('GET',url2);
					xhr.onload = function(){
						loadView.close();
						try{
							filename = name;
							var ending = filename.split(".");
							  if (this.responseData.type == 1)
							  {
   								 var f = Ti.Filesystem.getFile(
              					 this.responseData.nativePath);
    							var dest = Ti.Filesystem.getFile(
                 				 Ti.Filesystem.getExternalStorageDirectory(),
                 					 filename);
  						  if (dest.exists)
      						dest.deleteFile();
    						f.copy(dest.nativePath);
  							}
  							else
  						{
   								 var f = Ti.Filesystem.getFile(
               						Ti.Filesystem.getExternalStorageDirectory(),
             						  filename);
   								 f.write(this.responseData);
   								 
  						}
  							var mimeType = this.responseData.mimeType;
							var intent = Ti.Android.createIntent({
							action: Ti.Android.ACTION_VIEW,
							type: mimeType,
							data: f.getNativePath()
							});	
							Ti.Android.currentActivity.startActivity(intent);
						} catch (err) {
							
							alert("We we unable to open " + filename + " automatically.  You can find the file on your storage device under com.mindsmesh.mobile.")

                							}
						}
xhr.send();
		
}
win.addEventListener('focus', function() 
{
  if ( Titanium.Network.networkType != Titanium.Network.NETWORK_NONE ) {
    beginReloading();
    reloadNotifications()
  }else{
    var alertDialog = Titanium.UI.createAlertDialog({
    title: 'Attention',
    message: 'No Internet Connectity!',
    buttonNames: ['OK']
    });
    alertDialog.show(); 
}  
});


