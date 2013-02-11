Ti.include("model/api.js");

var win = Titanium.UI.currentWindow;
var bar = Ti.UI.createView({
				backgroundColor:'#46a546',
				width:Titanium.Platform.displayCaps.platformWidth,
				height: 44,
				left:0,
				top:0,
			});
			var border = Ti.UI.createView({
				backgroundColor:"black",
				height:1,
				bottom:0,
				width: Titanium.Platform.displayCaps.platformWidth
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
var refresh_button =  Titanium.UI.createButton({
	title:'Refresh',
	height: 30,
    width:'auto',
	backgroundColor:'#347235',
	borderWidth: 1,
	borderColor: 'black',
	borderRadius: 2,
	left: 10
});
var regex = /course\/view\.php\?id=(\d+)/;
gradesid = regex.exec(win.Moodurl);

bar.add(grades_button);

grades_button.addEventListener('click', function(e){
	var win1 = Titanium.UI.createWindow({  
    					url: 'grade_view.js',
   	 					backgroundColor:'#ecfaff',
   	 					barColor: '#46a546'
						});
   var postData = {username: Titanium.App.Properties.getString('moodle-user'), password: Titanium.App.Properties.getString('moodle-pass')};	
  	xhr = postLoginToMoodle(Titanium.App.Properties.getString("moodle_url"),postData);
  	xhr.autoRedirect = false;
  	xhr.clearCookies('uncc.edu');
	xhr.onload = function(){
	}
	xhr.onreadystatechange = function () {
		var regex = /MoodleSession/;
		found = regex.exec(xhr.getResponseHeader("Set-Cookie"));
		if (found != null){
					win1.url = 'http://moodle.uncc.edu/grade/report/index.php?id=' + gradesid[1];
					win1.cookie = xhr.getResponseHeader("Set-Cookie");
					win1.open();

					
				}
	}
	xhr.send(postData);
});
var tableview = Titanium.UI.createTableView({
	backgroundColor:'#ecfaff',
	editable: 'true',
	deleteButtonTitle: 'Leave class',
	top:44
});
win.add(tableview);



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
	win.setTitleControl(notificationButton);
	win.title = "Feed";
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
tableview.setData([]);
if ( Titanium.Network.online) {
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
} else {
	alert("Network problems.");
}
};
tableview.addEventListener('click', function(e)
{
	var win1 = Titanium.UI.createWindow({  
    					title:e.source.hiddenTitle,
   	 					backgroundColor:'#ecfaff',
   	 					layout:'absolute',
   	 					barColor: '#46a546',
   	 					modal:true
						});
						
					var regex = /(https:\/\/)(.+)/
					var hits = regex.exec(e.source.FileUrl);
					url2 = hits[1] + Titanium.App.Properties.getString("moodle-user") + ':' + Titanium.App.Properties.getString("moodle-pass") + '@' + hits[2];
					var xhr = Titanium.Network.createHTTPClient({enableKeepAlive:false, timeout:6000});
					xhr.retries = 0;
					xhr.open('GET',url2);
					xhr.onload = function(){
						try{
							var intent = Ti.Android.createIntent({
							action: Ti.Android.ACTION_VIEW,
							type: "application/pdf",
							data: this.responseData
							});	
							Ti.Android.currentActivity.startActivity(intent);
						} catch (err) {
							var alertDialog = Titanium.UI.createAlertDialog({
                			title: 'No PDF Viewer',
               				 message: 'We tried to open a PDF but failed. Do you want to search the marketplace for a PDF viewer?',
                			buttonNames: ['Yes','No'],
                			cancel: 1
            			});
            			alertDialog.show();
            			alertDialog.addEventListener('click', function(evt) {
                			if (evt.index == 0) {
                    			Ti.Platform.openURL('http://search?q=pdf');
                			}
            			});
            								}
						}
xhr.send();
				
					
			//		win1.add(webview);
				//	win1.open();
		
});
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


