Ti.include("model/api.js");



Titanium.API.info('********************************************************************');
Titanium.API.info('APPLICATION STARTED - FEED');
Titanium.API.info('*******************************************************************');




var AWS = require('modules/amazon').load();
var row_data = [];
var offset = 0;
var videoUri = null;
var data = [];
var f;
var openWindowsToClose = [];
var currentFile = '';
var win = Titanium.UI.currentWindow;



var win_height = 380;
var win_width = Ti.Platform.displayCaps.platformWidth * .85;





//static things, buttons labels and tabs
//***********************************************************************************************
var bar = Ti.UI.createView({
	backgroundColor:'#46a546',
	width:Ti.UI.Size,
	height: '44dp',
	left:0,
	top:0,
});


var border = Ti.UI.createView({
	backgroundColor:"black",
	height:'1dp',
	bottom:0,
	width: Ti.UI.Size
});

var btnShare = Titanium.UI.createButton({
	title:'Share',
	height: '36dp',
	width:'60dp',
	color: '#ffffff',
	backgroundColor:'#347235',
	borderWidth: 1,
	borderColor: 'black',
	borderRadius: 2,
	right: '5dp'
});

var btnMoodle = Titanium.UI.createButton({
	title:'Moodle',
	height: '36dp',
	width:'auto',
 	color: '#ffffff',
	backgroundColor:'#347235',
	borderWidth: 1,
	borderColor: 'black',
	borderRadius: 2,
	right: '65dp'
});

var menuButton = Ti.UI.createImageView({
    image:'/images/Paragraph-Justify.png',
	toggle:false,
	height: '36dp',
	width:'36dp',
	backgroundColor:'#347235',
	borderWidth: 1,
	borderColor: 'black',
	borderRadius: 2,
	left: 10
});


//not sure
var loadView = Ti.UI.createWindow({
	backgroundColor: 'black',
    opacity: .90,
    height: Ti.Platform.displayCaps.platformHeight,
    width: Ti.Platform.displayCaps.platformWidth
});
 
 
var loadIndicator = Ti.UI.createActivityIndicator({
    style: Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN,
    message: 'Loading Moodle...',
	font : 'Arial',
	color: '#FFF'
});

var shareModal = Ti.UI.createWindow(
{
	backgroundColor : '#B0000000',
	modal: true
});

var shareWhoModal = Ti.UI.createWindow(
{
    backgroundColor : '#B0000000',
    zIndex: 1
});


var view = Ti.UI.createView(
{
	backgroundColor : '#e2e7ed',
	borderColor : '#A5A5A5',
	box: true,
	borderRadius : 15,
	top: 0,
	layout: 'vertical',
    borderWidth : 2,
    width : win_width,
    height : win_height
});
var messageButton = Ti.UI.createButton(
{
	title: 'Status',
	toggle:false,
	font:{fontSize:18,fontWeight:'bold'},
	height:'50dp',
    width:200,
	top: 10
});

var photoButton = Ti.UI.createButton({
    title: 'Photo',
	toggle:false,
	font:{fontSize:18,fontWeight:'bold'},
	height:'50dp',
    width:200,
    top: 10
});

//video and button 
var videoButton = Ti.UI.createButton(
{
    title: 'Video',
	toggle:false,
	font:{fontSize:18,fontWeight:'bold'},
	height:'50dp',
    width:200,
	top: 10
});





var finishButton = Ti.UI.createButton({
	title: 'Finish',
	toggle:false,
	font:{fontSize:18,fontWeight:'bold'},
	height:'37dp',
	width:200,
	box: true,
	top: 10
});


var labelTitle2 = Titanium.UI.createLabel({
	text:'Add a message and share',
	font:{fontSize:12},
	color:'#000',
	box: true,
	width:'auto',
	textAlign:'center',
	left: 55
});
var seperatorPhone = Ti.UI.createView({
	backgroundColor: "#808080",
	width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 10,
	top: 7,
	box: true,
	height:2,
});




var voiceButton = Ti.UI.createButton({
	title: 'Voice',
	toggle:false,
	height: 30,
	width:200,
	top: 10
});

var winModal = Ti.UI.createWindow({
    backgroundColor : '#B0000000',
    visible: false
});

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


var notificationButton = Ti.UI.createButton({
	backgroundImage:'../images/bell-light.png',
	height:'30dp',
	width:'30dp',
});
	
	
	
var border = Ti.UI.createView({
	backgroundColor:"#576c89",
	height:2,
	bottom:0
});

var tableHeader = Ti.UI.createView({
	backgroundColor:"#e2e7ed",
	width:320,
	height:60
});
var arrow = Ti.UI.createView({
	backgroundImage:"../images/whiteArrow.png",
	width:23,
	height:60,
	bottom:10,
	left:20
});
 
//***********************************************************************************************
//static things, buttons labels and tabs






bar.add(border);		
win.add(bar);



Titanium.API.warn('black bar added to window');	


bar.add(menuButton);
Titanium.API.warn('menu button added to bar');	



menuButton.addEventListener('click', function(e){
    Titanium.App.fireEvent('nav-menu-button',{data:e.source.toggle});
});




if (win.topic_id != null)
{
	if (win.moodle != null){
	    Titanium.API.warn('moodle and share added to bar');	
		bar.add(btnShare);
		bar.add(btnMoodle);
	} else {
		bar.add(btnShare);
	    Titanium.API.warn('share added to bar');			
	}
	btnShare.addEventListener('click', function(e) {
		shareModal.open();
		shareModal.visible = true;
	});
	
	
	
	
//************MOODLE************************************************
   btnMoodle.addEventListener('click', function(e) {
   	if (Titanium.App.Properties.hasProperty('moodle-user-' + win.entity_id) == false || Titanium.App.Properties.hasProperty('moodle-user-' + win.entity_id) == null || Titanium.App.Properties.hasProperty('moodle-pass-' + win.entity_id) == false || Titanium.App.Properties.hasProperty('moodle-pass-' + win.entity_id) == null)
  	{
   		Titanium.App.fireEvent('loadMoodleAccount');
  	} else {
		loadView.add(loadIndicator);
		loadView.open();
		loadIndicator.show();
		if (win.entity_id == 2)
		{
			var postData = {username: Titanium.App.Properties.getString('moodle-user-' + win.entity_id), password: Titanium.App.Properties.getString('moodle-pass-' + win.entity_id)};	
	  		xhr = postLoginToMoodle(win.moodle,postData);
			xhr.onload = function(){
			var response = this.responseText;
			var regexSess = /Your\ssession\shas/i;
			var regexSess2 = /your\slogin\ssession/i;
			var regexLog = /Invalid\slogin/i;
			if(response.match(regexSess2)) 
			{
				xhr = postLoginToMoodle(win.moodle,postData);
				xhr.onload = function()
				{
					var response2 = this.responseText;
					redirectToMoodle(response2);
				};
				xhr.send(postData);
			} else if(response.match(regexLog)) {
				alert('These are not valid credentials.  Please correct them.');
			} else {
				redirectToMoodle(response);
			}
		}
		xhr.send(postData);
		
	} else {
		xhr = getMoodle2EnrolledCourses(Titanium.App.Properties.getString("moodle_url_" + win.entity_id),Titanium.App.Properties.getString("moodle-token-" + win.entity_id),Titanium.App.Properties.getString("moodle-userid-" + win.entity_id));
		xhr.onload = function()
		{
			var response = this.responseText;
			var courses = JSON.parse(response);
			for(c=0;c<courses.length;c++)
			{
				if (courses[c].shortname == win.class_number)
				{
					var win1 = Titanium.UI.createWindow({  
    					url:'moodle_class.js',
    					modal:true,
    					backgroundColor:'#ecfaff',
    					barColor: '#46a546'
					});
					win1.class_id = courses[c].id;
					win1.entity_id = win.entity_id;
					win1.open();
				}
			}
			loadView.close();
			//alert("No Moodle Course found for this discussion.  Make sure course Numbers between MindsMesh.com and Moodle match exactly, and that you are a part of the class on your schools Moodle.");
		}
		xhr.send();
	}
	}
 });
//win.setRightNavButton(btnBar);


} else {
	
	btnShare.addEventListener('click', function(e){
		shareModal.open();
		shareModal.visible = true;
	});
	bar.add(btnShare);
}


shareWhoModal.addEventListener('click', function(e)
{
	if(e.source.box != true)
	{
		var dlg = Titanium.UI.createAlertDialog(
		{
			box: true,
    		message:'If you exit your content will be lost from this post, is that ok?', 
    		buttonNames: ['Yes','Cancel']
  		});
   		dlg.addEventListener('click', function(ev) 
   		{
   			if (ev.index == 0)
   			{ 
   				shareWhoModal.close();
   			} else if (ev.index == 1) { // clicked "No"
				dlg.hide();
   			}
 		});
 		dlg.show();
 	}
});

shareModal.addEventListener('click', function(e)
{
	if(e.source.box != true)
	{
 		shareModal.close();
 	}
});

messageButton.addEventListener('click', function(e)
{
	if(win.topic_id != null)
	{
		var title = win.class_number;
	} else if (win.group_id != null) {		
		var title = win.group_name;
	} else {					
		var title = "Status";
	}
	var win1 = Titanium.UI.createWindow(
	{  
		title: title,
    	url:'make_post.js',
    	topic_id: win.topic_id,
    	group_id: win.group_id,
    	backgroundColor:'#ecfaff',
    	modal:true,
    	barColor: '#46a546',
    });
    win1.open();
});

photoButton.addEventListener('click', function(e)
{
	Titanium.Media.showCamera(
	{
		success:function(event)
  		{
  			
 				var view = Ti.UI.createView(
    			{
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
   		 		var btnDone = Ti.UI.createButton({title:'Done'});
   		 		var ta1 = Titanium.UI.createTextArea({
					editable: true,
					top:-95,
					left:77,
					box: true,
					height: 95,
					value: "Enter a message!",
					width: (Titanium.Platform.displayCaps.platformWidth - 130),
					color:'#000',
					textAlign:'left',
					appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,	
					suppressReturn:false,
					keyboardToolbar: [btnDone]
				});
   		 		btnDone.addEventListener('click', function(e)
   		 		{
   		 			ta1.blur();
   		 		});
				ta1._hintText = ta1.value;
				ta1.addEventListener('focus',function(e)
				{
    				if(e.source.value == e.source._hintText)
    				{
        				e.source.value = "";
    				}
				});
				ta1.addEventListener('blur',function(e)
				{
    				if(e.source.value=="")
    				{
        				e.source.value = e.source._hintText;
    				}
				});

				finishButton.addEventListener('click', function(e)
				{
					if (ta1.value == "Enter a message!")
					{
						ta1.value = "";
					}
					if(win.topic_id != null)
					{
						var postData = {'topic_id': win.topic_id, 'text': ta1.value, 'filename': 'post.png', 'content_type': currentFile.mimeType};
					} else if (win.group_id != null) {		
						var postData = {'group_id': win.group_id, 'text': ta1.value, 'filename': 'post.png', 'content_type': currentFile.mimeType};
					} else {					
						var postData = {'text': ta1.value, 'filename': 'post.png', 'content_type': currentFile.mimeType};
					}
							xhr = postPostCreate(Titanium.App.Properties.getString('mmat'),postData);
							/*var pb = Ti.UI.createProgressBar({
								zIndex:50,
								width:250,
    							height:'auto',
   					 			min:0,
   					 			max:1,
   				 				value:0,
   								top: 0,
   				 				message:'Uploading File',
    							color:'#333',
    							font:{fontSize:14, fontWeight:'bold'},
   				 				style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN
   				 			});
   				 			*/
   				 			
   				 			
   				 			var pb = Ti.UI.Android.createProgressIndicator({
							  message: 'Loading...',
							  location: Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
							  type: Ti.UI.Android.PROGRESS_INDICATOR_DETERMINANT,
							  cancelable: true,
							  min: 0,
							  max: 1,
							  zIndex:50,
								width:250,
								height:'auto'
							});
   				 			
   				 			
   				 			
							win.add(pb);
							pb.show();
							xhr.onload = function()
							{
								var post_id = JSON.parse(this.responseText).id;
								f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'post.png');
								if(f.exists() == true)
								{
									f.deleteFile();
								}
								var imageView = Titanium.UI.createImageView({
            						image:currentFile,
            						 width:480,
           							 height:640
        						});
        						image = imageView.toImage();
								f.write(currentFile);
								var env = 'development';
 								if(Ti.App.Properties.getString('production')=='true')
 								{
 									env = 'production'
 								}
 								var filnam = env + '/post_attachments/' + post_id + '/post.png';

								AWS.config(
								{
    								key: 'AKIAIKFVJ3EMAIBXELBQ',
    								secret: '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',
    								bucket: 'mindsmesh.com',
   									GSM:' -0700',
    								debug:true,
    								http: Titanium.Network.createHTTPClient(),
    								s3fileName: filnam,
    								timeout: (1000 * 60 * 4),
    								onsendstream: function(e) {pb.value = e.progress;},
   									error: function(e) {alert(e)},
   									success: function(e) 
   									{
   										f.deleteFile();
										pb.hide();	
   								
   									}
								});
								AWS.PUT('post.png');

							};
							xhr.send(postData);
							shareWhoModal.close();
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
				var picModal = Ti.UI.createWindow({
        			backgroundColor : 'black',
        			barColor: '#46a546',
        			modal: true,
        			title: 'Picture',
        			orientationModes:[Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT,Ti.UI.PORTRAIT,Ti.UI.UPSIDE_PORTRAIT]
				});
				picModal.addEventListener('close', function(e)
				{
					shareWhoModal.show();
				});
				currentFile = event.media;
    			var movPict = Titanium.UI.createImageView({
					image: currentFile,
					top: 5,
					left: 5,
					box: true,
					height: 95,
					width: 70,
				});
				var imgPic = Titanium.UI.createImageView({
					image: currentFile,
					box: true
				});
				movPict.addEventListener('click', function(e)
				{
					picModal.open();
					picModal.add(imgPic);
					shareWhoModal.hide();
				});
				view.add(movPict);
				view.add(ta1);
				view.add(finishButton);
   				shareWhoModal.add(view);
   				shareWhoModal.open();
  			
 
 
 
 
 
 
        	var cameraView = Ti.UI.createImageView({
            	width: 320,
            	height: 480,
            	top: 0,
            	left: 0,
            	image: event.media,
        	});
        	var imageNew = cameraView.toImage(function(e)
        	{
            //Save Image
            	var filename1 = Titanium.Filesystem.applicationDataDirectory + "/NAMEOFTHEPICTURE.png";
           		f = Titanium.Filesystem.getFile(filename1);
            	f.write(e.blob);
          		Titanium.Media.saveToPhotoGallery(f);
       		});
        	var thumbCameraView = Ti.UI.createImageView({
            	width: 150,
           	 	height: 225,
            	top: 0,
            	left: 0,
            	image: event.media,
        	});
      //  thumbCameraView.add(thumbOverImage);
      //  win.add(thumbCameraView);
  		},
  		cancel:function()
  		{
 		},
  		error:function(error)
  		{
    		var a = Titanium.UI.createAlertDialog({title:'Camera'});
    		if (error.code == Titanium.Media.NO_CAMERA)
    		{
      			a.setMessage('Sorry this device does not have a camera.');
   	 		}
    		else
    		{
      			a.setMessage('Error: ' + error.code);
    		}
    		a.show();
  		},
 		// overlay:overImage,
  		showControls:true,
  		mediaTypes:Ti.Media.MEDIA_TYPE_PHOTO,
    	saveToPhotoGallery:false,
    	allowEditing: true,
    	allowImageEditing:true,
	});
});







videoButton.addEventListener('click', function(e)
{
	var record = true
	if (record == false)
	{
		var activeMovie = Titanium.Media.createVideoPlayer(
		{
			backgroundColor:'#111',
			mediaControlStyle:Titanium.Media.VIDEO_CONTROL_DEFAULT,
			scalingMode:Titanium.Media.VIDEO_SCALING_ASPECT_FILL,
			//contentURL:movieFile.nativePath
			media:movieFile			// note you can use either contentURL to nativePath or the file object
		});
		activeMovie.play();
		activeMovie.addEventListener('complete', function()
		{
			movieFile.deleteFile();
			record = true;
		});
		win.add(activeMovie);
	}
	else
	{
		var intent = Titanium.Android.createIntent({ action: 'android.media.action.VIDEO_CAPTURE' });
    Titanium.Android.currentActivity.startActivityForResult(intent, function(e) {
        if (e.error) {
        	
        } else {
            if (e.resultCode === Titanium.Android.RESULT_OK) {
                videoUri = e.intent.data;

 				var view = Ti.UI.createView(
    			{
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
   		 		var btnDone = Ti.UI.createButton({title:'Done'});
   		 		var ta1 = Titanium.UI.createTextArea({
					editable: true,
					top:5,
					left:40,
					box: true,
					height: 95,
					value: "Enter a message!",
					width: (Titanium.Platform.displayCaps.platformWidth - 130),
					color:'#000',
					textAlign:'left',
					appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,	
					suppressReturn:false,
					keyboardToolbar: [btnDone]
				});
   		 		btnDone.addEventListener('click', function(e)
   		 		{
   		 			ta1.blur();
   		 		});
				ta1._hintText = ta1.value;
				ta1.addEventListener('focus',function(e)
				{
    				if(e.source.value == e.source._hintText)
    				{
        				e.source.value = "";
    				}
				});
				ta1.addEventListener('blur',function(e)
				{
    				if(e.source.value=="")
    				{
        				e.source.value = e.source._hintText;
    				}
				});
				var finishButton = Ti.UI.createButton({
    				title: 'Finish',
   			 		toggle:false,
    				height: '30dp',
    				width:200,
					box: true,
					top: 10
				});
				
				finishButton.addEventListener('click', function(e)
				{
					if (ta1.value == "Enter a message!")
					{
						ta1.value = "";
					}

					if(win.topic_id != null)
					{
						var postData = {'topic_id': win.topic_id, 'text': ta1.value, 'filename': 'post.mov', 'content_type': currentFile.mimeType};
					} else if (win.group_id != null) {		
						var postData = {'group_id': win.group_id, 'text': ta1.value, 'filename': 'post.mov', 'content_type': currentFile.mimeType};
					} else {					
						var postData = {'text': ta1.value, 'filename': 'post.mov', 'content_type': currentFile.mimeType};
					}
							xhr = postPostCreate(Titanium.App.Properties.getString('mmat'),postData);
							var pb = Ti.UI.createProgressBar({
								zIndex:50,
								width:250,
    							height:'auto',
   					 			min:0,
   					 			max:1,
   				 				value:0,
   								top: 0,
   				 				message:'Uploading File',
    							color:'#333',
    							font:{fontSize:14, fontWeight:'bold'},
   				 				style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN
   				 			});
							win.add(pb);
							pb.show();
							xhr.onload = function()
							{
								var post_id = JSON.parse(this.responseText).id;
								f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'post.mov');
								if(f.exists() == true)
								{
									f.deleteFile();
								}
								currentFile.copy(f.nativePath);
								var env = 'development';
 								if(Ti.App.Properties.getString('production')=='true')
 								{
 									env = 'production'
 								}
 								var filnam = env + '/post_attachments/' + post_id + '/post.mov';

								AWS.config(
								{
    								key: 'AKIAIKFVJ3EMAIBXELBQ',
    								secret: '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',
    								bucket: 'mindsmesh.com',
   									GSM:' -0700',
    								debug:true,
    								http: Titanium.Network.createHTTPClient(),
    								s3fileName: filnam,
    								timeout: (1000 * 60 * 4),
    								onsendstream: function(e) {pb.value = e.progress;},
   									error: function(e) {alert(e)},
   									success: function(e) 
   									{
   										f.deleteFile();
    									var postData = {'file': 'http://s3.amazonaws.com/mindsmesh.com/' + filnam};
										xhr2 = postEncodeVideo(Titanium.App.Properties.getString('mmat'),postData);
 										xhr2.onload = function()
 										{
											pb.hide();	
										};
										xhr2.send(JSON.stringify(postData));
   								
   									}
								});
								AWS.PUT('post.mov');

							};
							xhr.send(postData);
							shareWhoModal.close();
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
    				text:'Add a message and share',
    				font:{fontSize:12},
    				color:'#000',
    				box: true,
   					width:'auto',
    				textAlign:'center',
    				left: 55
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
				currentFile = Ti.Filesystem.getFile(videoUri);
				view.add(ta1);
				view.add(finishButton);
   				shareWhoModal.add(view);
   				shareWhoModal.open();
   				record = false;
            } else {

            }
        }
    });
	}
});
		


		   		 var labelTitle = Titanium.UI.createLabel({
    			text:Titanium.App.Properties.getString("name"),
    			font:{fontSize:'16dp',fontWeight:'bold'},
    			color:'#000',
    			box: true,
   				width:'auto',
    			textAlign:'center',
    			top: '-37dp',
    			left: '55dp',
 
			});
			var labelTitle2 = Titanium.UI.createLabel({
    			text:'Share something awesome',
    			font:{fontSize:'12dp'},
    			color:'#000',
    			box: true,
   				width:'auto',
    			textAlign:'center',
    			left: '55dp',
 
			});

			var pict = Titanium.UI.createImageView({
				image: Titanium.App.Properties.getString("photo_url"),
				top: 10,
				left: 10,
				box:true,
				height:'40dp',
				width:'40dp',
			});
			 view.add(pict);
		 view.add(labelTitle);
		 view.add(labelTitle2);
		 view.add(seperatorPhone);
		 view.add(messageButton);
		 view.add(photoButton);
		 view.add(videoButton);
	//	 view.add(voiceButton);
   		 shareModal.add(view);






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
    			fullscreen: true,
    			notModal: winModal
			});
			win1.postid = e.source.id;
			win1.fullname = Titanium.App.Properties.getString("name");
			win1.photo_url = Titanium.App.Properties.getString("photo_url");
			winModal.hide();
			win1.open();
			} else if (e.source.type == "Topic"){
				Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:7, topic_id: e.source.id});
			}
	}
	xhr.send();
		
});


		   		 var labelTitle = Titanium.UI.createLabel({
    			text:Titanium.App.Properties.getString("name"),
    			font:{fontSize:'16dp',fontWeight:'bold'},
    			color:'#000',
    			box: true,
   				width:'auto',
    			textAlign:'center',
    			top: '-37dp',
    			left: '55dp',
 
			});
			var labelTitle2 = Titanium.UI.createLabel({
    			text:'Notifications',
    			font:{fontSize:'12dp'},
    			color:'#000',
    			box: true,
   				width:'auto',
    			textAlign:'center',
    			left: '55dp',
 
			});

			var pict = Titanium.UI.createImageView({
				image: Titanium.App.Properties.getString("photo_url"),
				top: 10,
				left: 10,
				box:true,
				height:'40dp',
				width:'40dp',
			});
			 view.add(pict);
		 view.add(labelTitle);
		 view.add(labelTitle2);
		 view.add(seperatorPhone);
		 view.add(modalTableView);
   		 winModal.add(view);
        var loadingTemplate = {
		        	childTemplates: [
		        	{
			            type: 'Ti.UI.Label', // Use a label
			            bindId: 'loadingLabel',  // Bind ID for this label
			            properties: {        // Sets the Label.left property
		                left: 80,
		                top: 15,
		                textAlign:'left',
		                text: 'Loading',
		                backgroundColor:'#ecfaff',
						height:'auto',
		                color:'#46a546',
						font:{fontWeight:'bold',fontSize:20}
		            },
		        }
        	]
        }



		//FEED DATA, TEMPLATE
   		 var plainTemplate = {
    childTemplates: [
        {
            type: 'Ti.UI.Label', // Use a label
            bindId: 'listName',  // Bind ID for this label
            properties: {        // Sets the Label.left property
                left: '65dp',
                top: 15,
                right: 20,
                textAlign:'left',
                backgroundColor:'#ecfaff',
				height:'20dp',
                color:'#46a546',
				font:{fontWeight:'bold',fontSize:'18dp'}
            },
            events: { click : redirectToPost } 
        },
        {
            type: 'Ti.UI.Label', // Use a label
            bindId: 'attachText',  // Bind ID for this label
            properties: {        // Sets the Label.left property
                left: 57,
                bottom: 18,
                textAlign:'center',
				height:'auto',
                color:'#000000',
				font:{fontWeight:'bold',fontSize:14}
            },
            events: { click : redirectToPost } 
        },
        {
            type: 'Ti.UI.ImageView', // Use a label
            bindId: 'paperclip',  // Bind ID for this label
            properties: {        // Sets the Label.left property
				bottom: 10,
				height: 32,
				left: 20,
            },
            events: { click : redirectToPost }  
        },
        {
            type: 'Ti.UI.ImageView', // Use a label
            bindId: 'movPict',  // Bind ID for this label
            properties: {        // Sets the Label.left property
				bottom: 52,
            },
            events: { click : launchMovie }  
        },
        {
            type: 'Ti.UI.ImageView', // Use a label
            bindId: 'picPict',  // Bind ID for this label
            properties: {        // Sets the Label.left property
				bottom: 52,
            },
            events: { click : launchPic }  
        },
        {
            type: 'Ti.UI.Label', // Use a label
            bindId: 'commentCount',  // Bind ID for this label
            properties: {        // Sets the Label.left property
                bottom: 18,
           		right: 22,
           		color:'#000000',
				textAlign:'center',
				font:{fontWeight:'bold',fontSize:16}
            },
            events: { click : redirectToPost } 
        },
        {
            type: 'Ti.UI.Button', // Use a label
            bindId: 'replyButton',  // Bind ID for this label
            properties: {        // Sets the Label.left property
                width:32,
				height: 32,
				bottom: 10,
				right: 40,
				backgroundImage: '/images/comment_32.png'
            },
            events: { click : redirectToPost } 
        },
        {
            type: 'Ti.UI.ImageView', // Use a label
            bindId: 'picSquare',  // Bind ID for this label
            properties: {        // Sets the Label.left property
				top: 15,
				left: 23,
				height:'40dp',
				width:'40dp'
            },
            events: { click : redirectToPost } 
        },
        {
            type: 'Ti.UI.Label', // Use a label
            bindId: 'postTime',  // Bind ID for this label
            properties: {        // Sets the Label.left property
                backgroundColor:'#ecfaff',
				textAlign:'left',
				left:'65dp',
				top: '34dp',
				height:'auto',
				color:'#808080',
				font:{fontSize:'11dp'}
            },
            events: { click : redirectToPost } 
        },
        {
            type: 'Ti.UI.Label', // Use a label
            bindId: 'comment',  // Bind ID for this label
            properties: {        // Sets the Label.left property
                left: 25,
                right: 15,
                top: '65dp',
                textAlign:'left',
                backgroundColor:'#ecfaff',
				height:'auto',
                color:'#000000',
				font:{fontSize:'15dp'},
				bottom: 50,
            },
            events: { click : redirectToPost } 
        },
        {
            type: 'Ti.UI.ImageView', // Use a label
            bindId: 'playButton',  // Bind ID for this label
            properties: {        // Sets the Label.left property
                height: 32,
				bottom: 170,
				zIndex: 1,
            },
            events: { click : launchMovie } 
        },
        {
            type: 'Ti.UI.View', // Use a label
            bindId: 'commentBack',  // Bind ID for this label
            properties: {        // Sets the Label.left property
                backgroundColor:'#ecfaff',
				height:Ti.UI.Fill,
				width:Ti.UI.Fill,
				left: 15,
				right: 15,
				top: 5,
				bottom: 48,
				zIndex: -1,
            },
            events: { click : redirectToPost } 
        },
        {
            type: 'Ti.UI.View', // Use a label
            bindId: 'seperator',  // Bind ID for this label
            properties: {        // Sets the Label.left property
                backgroundColor:'#808080',
				height:1,
				width:Ti.UI.Fill,
				left: 15,
				right: 15,
				bottom: 47,
				zIndex: -1,
            },
            events: { click : redirectToPost } 
        },
        {
            type: 'Ti.UI.View', // Use a label
            bindId: 'backHold',  // Bind ID for this label
            properties: {        // Sets the Label.left property
                backgroundColor:'#e2e7ed',
				width:Ti.UI.Fill,
				left: 15,
				right: 15,
				height: 42,
				bottom: 5,
				zIndex: -1,
            },
            events: { click : redirectToPost } 
        }
    ]
};



var section = Ti.UI.createListSection();

Titanium.App.addEventListener('nav-menu-button-toggle', function(e)
{
	
	menuButton.toggle = e.toggle;
});
Titanium.App.addEventListener('main-win-close', function(e)
{
	setTimeout(function(e){
	winModal.close();
	win.close();
	},500);
});


function reloadNotifications()
{
modalTableView.data = [];
xhr = getNotificationsGrouped(Titanium.App.Properties.getString("mmat"));
xhr.onload = function(){
	var response = this.responseText;
	user = JSON.parse(response);
	if(user.unread.length > 0){

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
	} 
	bar.add(notificationButton);
	win.title = "Feed";
		for (var i = 0; i < user.unread.length; ++i) {
			var classNumber = Titanium.UI.createLabel({
    			text:user.unread[i].actors_count + ' people ' + user.unread[i].action + ' to',
    			box:true,
    			notification_id: user.unread[i].id,
    			id:user.unread[i].target_id,
    			type: user.unread[i].target_type,
    			font:{fontSize:'16dp',fontWeight:'bold'},
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
    			font:{fontSize:'11dp'},
    			color:'#000',
    			height: '13dp',
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
				height:'24dp',
				width:'24dp',
			});
		var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#e2e7ed',
                box:true,
                notification_id: user.unread[i].id,
                id:user.unread[i].target_id,
                type: user.unread[i].target_type,
                layout: 'vertical',
                height: '42dp'
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
    			font:{fontSize:'16dp',fontWeight:'bold'},
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
    			font:{fontSize:'11dp'},
    			color:'#000',
    			height: '13dp',
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
                height: '42dp'
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
				} else {
					winModal.open();
				}
				winModal.visible = true;
			});
			
			
//			
}
xhr.send()
}

win.add(listView);
var brainlabel = [];



var lastRow = 0;


// fake it til ya make it..  create a 2 pixel
// bottom border
tableHeader.add(border);


var statusLabel = Ti.UI.createLabel({
	text:"Pull to reload",
	left:55,
	width:200,
	bottom:30,
	height:"auto",
	color:"#576c89",
	textAlign:"center",
	font:{fontSize:13,fontWeight:"bold"},
	shadowColor:"#999",
	shadowOffset:{x:0,y:1}
});
 
var lastUpdatedLabel = Ti.UI.createLabel({
	text:"Last Updated: "+formatDate(),
	left:55,
	width:200,
	bottom:15,
	height:"auto",
	color:"#576c89",
	textAlign:"center",
	font:{fontSize:12},
	shadowColor:"#999",
	shadowOffset:{x:0,y:1}
});
var actInd = Titanium.UI.createActivityIndicator({
	left:20,
	bottom:13,
	width:30,
	height:30
});
var statusLabel2 = Ti.UI.createLabel({
	text:"Loading...",
	left:55,
	width:200,
	bottom:30,
	height:"auto",
	color:"#576c89",
	textAlign:"center",
	font:{fontSize:13,fontWeight:"bold"},
	shadowColor:"#999",
	shadowOffset:{x:0,y:1}
});



var actInd2 = Titanium.UI.createActivityIndicator({
	left:20,
	bottom:13,
	width:30,
	height:30
});

tableHeader.add(arrow);
tableHeader.add(statusLabel);
tableHeader.add(lastUpdatedLabel);
tableHeader.add(actInd);


var reloading = false;
var updating = false;
var loadingRow = Ti.UI.createTableViewRow({backgroundColor:'#e2e7ed'});
loadingRow.add(statusLabel2);
loadingRow.add(actInd2);
var lastRowId = 1;
var row = '';
var pulling = false;
endReloading();
function formatDate()
{
	var d = new Date;
	var datestr = d.getMonth()+'/'+d.getDate()+'/'+d.getFullYear();
	if (d.getHours()>=12)
	{
           datestr+=' '+(d.getHours()==12 ? 
              d.getHours() : d.getHours()-12)+':'+
              d.getMinutes()+' PM';
	}
	else
	{
		datestr+=' '+d.getHours()+':'+d.getMinutes()+' AM';
	}
	return datestr;
}
function beginReloading()
{
	// just mock out the reload
	setTimeout(endReloading,2000);
}

function endReloading()
{
	row_data = []; 
	lastRow = 0;
	lastRowId = 1;
	if(win.topic_id != null){
		xhr = getTopicPostsWithFamily(Titanium.App.Properties.getString("mmat"),win.topic_id)
	} else if(win.group_id != null){
		xhr = getGroupPostsWithFamily(Titanium.App.Properties.getString("mmat"),win.group_id)
	} else {
		xhr = getPostsWithFamily(Titanium.App.Properties.getString('mmat'));
	}
    xhr.onload = function(){
    	onLoad(this.responseText);
    	
    };
	xhr.send();

	// when you're done, just reset
	if(Titanium.Platform.name == 'iPhone OS'){
		
	tableView.setContentInsets({top:0},{animated:true});
	
	}
	lastUpdatedLabel.text = "Last Updated: "+formatDate();
	statusLabel.text = "Pull down to refresh...";
	lastDistance = 0;
	actInd.hide();
	arrow.show();
}

win.addEventListener('focus', function() 
{
  if ( Titanium.Network.online) {
  	if (win.passedData == 'posted'){
  		reloading = true;
  		row_data = [];
    	beginReloading();
   } else {
   	 reloadNotifications();
   }
   win.passedData = null;
  }else{
    var alertDialog = Titanium.UI.createAlertDialog({
    title: 'Attention',
    message: 'No Internet Connectity!',
    buttonNames: ['OK']
    });
    alertDialog.show(); 
}  
});

var lastDistance = 0;



listView.addEventListener('scroll',function(evt)
{
	
	Titanium.API.info('scroll');

	 if (!pulling && !updating && !reloading && (evt.totalItemCount < evt.firstVisibleItem + evt.visibleItemCount + 3) && (row.length>=10)) {
	 	Titanium.API.info('update');
        beginUpdate();
	}else{
		
		Titanium.API.info('pulling: ' + pulling.toString());
		Titanium.API.info('updating: ' + updating.toString());    		
		Titanium.API.info('reloading: ' + (evt.totalItemCount < evt.firstVisibleItem + evt.visibleItemCount + 3).toString());    		
		Titanium.API.info('(row.length>=10): ' + (row.length>=10).toString());    		
		
		
		
	}
});

Titanium.API.info('SCROLL LISTENER ADDED*******************');



function beginUpdate()
{
	updating = true;
	section.appendItems({
            	template: 'loading',
            	properties : {
            		itemId: 'row',
            		accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE,
            		backgroundColor: '#808080',
            	
           		}
            });
	//tableView.appendRow(loadingRow);
	//actInd2.show();
	
	// just mock out the reload
	setTimeout(endUpdate,2000);
}

function endUpdate()
{
	//actInd2.hide();
	//tableView.deleteRow(lastRow,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE});
	if(win.topic_id != null){
		xhr = getTopicPostsWithFamily(Titanium.App.Properties.getString("mmat"),win.topic_id,lastRowId)
	} else if(win.group_id != null){
		xhr = getGroupPostsWithFamily(Titanium.App.Properties.getString("mmat"),win.group_id,lastRowId)
	} else {
		xhr = getPostsWithFamily(Titanium.App.Properties.getString('mmat'),lastRowId);
	}
	xhr.onload = function(){
    	onLoad(this.responseText);
    };
	xhr.send();
//	 just scroll down a bit to the new rows to bring them into view
//	tableView.scrollToIndex(lastRow-1,{animated:true,position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM});

}
function likeButton(postid, labelid)
{
	var apiUrl2 = 'https://mindsmesh.com/api/v1/posts/' + postid + '/like?access_token=' + Titanium.App.Properties.getString('mmat');
	var likeres;
	xhr.open('POST', apiUrl2);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onerror = function(e){
		alert('HTTP ERR'+e.error);
	}
	xhr.onload = function(){
		var response = this.responseText;
		likeres = JSON.parse(response);
		brainlabel[labelid].text = likeres.likes_count;
	}
	xhr.send();

}
function timeDifference(current, previous) {
	var prev = new Date(previous);
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - prev;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'about ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'about ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'about ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}
Titanium.App.addEventListener('event_one', function(e)
{
    win.passedData = e.data;
});
var commentHolder = [];
var backHolder = []
var seperatorPhone  = [];
var comment  = [];
var g = 0;



function onLoad(response){
	var d = new Date();
	row = JSON.parse(response);
	if(reloading == true){
		g = 0;
	}
	if (lastRow == 0){
		
		
		
		
		
		//FEED DATA
	lastRow = (row.length);} else  {lastRow += row.length;}
       for(c=0;c<row.length;c++){
       		var post = row[c];
       		if (c == (row.length - 1))
       		{
       			lastRowId = post.id
       		}
            var fullname = post.user.name;
          	var picUrl = post.user.photo_url;
            var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#46a546',
                height:Ti.UI.SIZE,
                result: post.id,
                fullname: fullname,
                photo_url: picUrl,
                layout:'vertical'

            });
            var rowtext = "";
			if(post.topic != null){
				rowtext = fullname + " asked " + post.topic.number;
			} else if(post.group != null){
				rowtext = fullname + " posted in " + post.group.name;
			} else {
				rowtext = fullname;
			}
if (Titanium.Platform.osname == "iphone"){
            var fbName = Titanium.UI.createLabel({
                text: rowtext,
                backgroundColor:'#ecfaff',
				textAlign:'left',
				left:55,
				height:'auto',
				top: -41,
				color:'#46a546',
				font:{fontWeight:'bold',fontSize:13}
			});
			var timetext = timeDifference(d,post.created_at);
			var postTime = Titanium.UI.createLabel({
                text: timetext,
                backgroundColor:'#ecfaff',
				textAlign:'left',
		left:55,
		top: 5,
		height:'auto',
		color:'#808080',
		font:{fontSize:11}
		});
	comment[g] = Titanium.UI.createLabel({
                text: post.text,
                backgroundColor:'#ecfaff',
		textAlign:'left',
		width: Titanium.Platform.displayCaps.platformWidth - 30,
		top:15,
		height:Ti.UI.SIZE,
		font:{fontSize:12}
            });
	commentHolder[g] = Ti.UI.createView({
		backgroundColor: '#ecfaff',
		top: 6,
		width:Titanium.Platform.displayCaps.platformWidth - 10,
		height:Ti.UI.SIZE,
		layout:'vertical'
	});
           var commentCount = Titanium.UI.createLabel({
           text: post.replies_count,
           bottom: 10,
           right: 0,
		textAlign:'center',
		font:{fontWeight:'bold',fontSize:11}
            });
            
             var tmpView = Ti.UI.createView({
 			width: 30,
			height: 30,
			right: 5
 				
 			})
            var givbutton = Titanium.UI.createButton({
            result: post.id,
            fullname: fullname,
            photo_url: picUrl,
            width: 16,
			height: 16,
			left: 0,
			backgroundImage: '../images/comment.png',
			})
			tmpView.add(givbutton);
            tmpView.add(commentCount);


			var pict = Titanium.UI.createImageView({
				image: picUrl,
				top: 10,
				left: 10,
				height:40,
				width:40,
			});

			} else {
				var fbName = Titanium.UI.createLabel({
                text: rowtext,
                backgroundColor:'#ecfaff',
		textAlign:'left',
		left:80,
		height:'auto',
		top: -55,
		color:'#46a546',
		font:{fontWeight:'bold',fontSize:20}
		});
		var timetext = timeDifference(d,post.created_at);
		var postTime = Titanium.UI.createLabel({
                text: timetext,
                backgroundColor:'#ecfaff',
		textAlign:'left',
		left:80,
		height:'auto',
		top: 10,
		color:'#808080',
		font:{fontSize:14}
		});
		    var w = Titanium.Platform.displayCaps.platformWidth;
    var h = Titanium.Platform.displayCaps.platformHeight;
    var comWidth = 0;
    if( w > h){
        comWidth = Titanium.Platform.displayCaps.platformHeight;
    }else{
        comWidth = Titanium.Platform.displayCaps.platformWidth;
    }

		


			}

            
			backHolder = Ti.UI.createView({
				backgroundColor:"#e2e7ed",
				width:comWidth - 30,
				height:'auto',
				height: 42,
				bottom: 6,
			});
			if (post.post_attachments.length > 0)
			{
				var myRegEx = /\.png$/i;
				var myRegEx2 = /\.jpg$/i;
				var myRegEx3 = /\.jpeg$/i;
				if(post.post_attachments[0].name == "post.mov")
				{
					var url = post.post_attachments[0].url;
					var pieces = url.substring(0, url.length - 8);
					row_data.push({
            	
            			listName : {text: rowtext, postid: post.id},
            			comment: {text: post.text, bottom: 348, postid: post.id},
            			picSquare: {image: picUrl, postid: post.id},
            			movPict: {url: url, image: (pieces + "frame_0000.png"), height: 265},
            			playButton: {image: '/images/LH2-Play-icon-2.png'},
            			postTime: {text: timetext, postid: post.id},
            			commentCount: {text: post.replies_count, postid: post.id},
            			replyButton: {result: post.id, postid: post.id},
            			properties : {
            				itemId: url,
            				accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
           				}
            		});
  	 				
				} else if (post.post_attachments[0].name.match(myRegEx) || post.post_attachments[0].name.match(myRegEx2) || post.post_attachments[0].name.match(myRegEx3)) {
					var url = post.post_attachments[0].url;	
					row_data.push({
            	
            			listName : {text: rowtext, postid: post.id},
            			comment: {text: post.text, bottom: 348, postid: post.id},
            			picSquare: {image: picUrl, postid: post.id},
            			picPict: {url: url, image: url, height: 265},
            			postTime: {text: timetext, postid: post.id},
            			commentCount: {text: post.replies_count, postid: post.id},
            			replyButton: {postid: post.id},
            			properties : {
            				itemId: url,
            				accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
           				}
            		});
			} else {
				row_data.push({
            	
            			listName : {text: rowtext, postid: post.id},
            			comment: {text: post.text, postid: post.id},
            			picSquare: {image: picUrl, postid: post.id},
            			postTime: {text: timetext, postid: post.id},
            			commentCount: {text: post.replies_count, postid: post.id},
            			replyButton: {postid: post.id},
            			paperclip: {image: '/images/paperclip4_black.png', postid: post.id},
            			attachText: {text: (post.post_attachments.length + ' file(s) attached'), postid: post.id},
            			properties : {
            				itemId: url,
            				accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
           				}
            		});
            }
			} else {


			//FEED DATA
            row_data.push({
            	
            	listName : {text: rowtext, postid: post.id},
            	comment: {text: post.text, postid: post.id},
            	picSquare: {image: picUrl, postid: post.id},
            	postTime: {text: timetext, postid: post.id},
            	commentCount: {text: post.replies_count, postid: post.id},
            	replyButton: {postid: post.id},
            	properties : {
            		itemId: 'row',
            		accessoryType: Ti.UI.LIST_ACCESSORY_TYPE_NONE
           		}
            });
           }
            	
            g++;


           
        }
      
       section.setItems(row_data);
	   listView.sections = [section];
        if (updating){
      //  	tableView.scrollToIndex(lastRow-(row.length - 1),{animated:true,position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM});
        }
        updating = false;
        reloading = false;
   };
   
   
   Ti.Gesture.addEventListener('orientationchange',function(e){
        win.width = Titanium.Platform.displayCaps.platformWidth;

   });
   function redirectToPost(e)
   {
   		var win1 = Titanium.UI.createWindow({  
    			url:'post.js',
  				backgroundColor:'#fff',
  				barColor: '#46a546',
  				fullscreen: true,
				});
		win1.postid = e.section.getItemAt(e.itemIndex).comment.postid;
		win1.open();
   }
   
   
   
   function launchPic(e){
   	var url = e.section.getItemAt(e.itemIndex).picPict.url;
   	var picModal2 = Ti.UI.createWindow({
        			backgroundColor : 'black',
        			modal: true,
        			barColor: '#46a546',
        			title: 'Picture',
        			orientationModes:[Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT,Ti.UI.PORTRAIT,Ti.UI.UPSIDE_PORTRAIT]
				});
				var imgPic2 = Titanium.UI.createImageView({
					image: url,
				});
					picModal2.open();
					picModal2.add(imgPic2);
					var closeButton = Ti.UI.createButton({
        title : "Exit Picture",
        top : "0dp",
        height : "35dp",
        left : "10dp",
        right : "10dp"
    });

    closeButton.addEventListener('click', function() {
        picModal2.close();
    });
    picModal2.add(closeButton);
   }
   function launchMovie(e){
   	var url = e.section.getItemAt(e.itemIndex).movPict.url;
   	var movieModal2 = Ti.UI.createWindow({
        		 	backgroundColor : '#00000000',
        			barColor: '#46a546',
        			title: 'Video',
        			fullscreen:true,
        			orientationModes:[Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT,Ti.UI.PORTRAIT,Ti.UI.UPSIDE_PORTRAIT]

				});
				var activeMovie = Ti.Media.createVideoPlayer({
    				backgroundColor: '#000',
    				scalingMode: Titanium.Media.VIDEO_SCALING_ASPECT_FIT,
    				mediaControlMode: Titanium.Media.VIDEO_CONTROL_DEFAULT,
    				url: url,
    				autoplay: true
				});
				var closeButton = Ti.UI.createButton({
        title : "Exit Video",
        top : "0dp",
        height : "35dp",
        left : "10dp",
        right : "10dp"
    });

    closeButton.addEventListener('click', function() {
        activeMovie.hide();
        activeMovie.release();
        activeMovie = null;
        movieModal2.close();
    });
    
    activeMovie.add(closeButton);
					movieModal2.open();
					movieModal2.add(activeMovie);
					activeMovie.addEventListener('fullscreen', function(e){
       				 		movieModal2.close();
					});
   }
   
   function redirectToMoodle(response){
	var regex = /TreeNode\('([\w\d\s:-]+)'.+(http.+course\/view\.php\?id=\d+)/ig;
	var totalFound = []
	var totalURL = [];
	while((hits = regex.exec(response)) !== null) {
		var regex2 = /([a-zA-Z]+)-([\d\w]+)/i;
    	var found = regex2.exec(hits[1]);
    	if( found != null){	
        	if ((found[1] + ' ' + found[2]) == win.class_number){
        		totalFound.push(found);
        		totalURL.push(hits[2]);
        	}
       }
    }
	loadView.close();
    if (totalFound.length == 0) {
		alert("No Moodle Course found for this discussion.  Make sure course Numbers between MindsMesh.com and Moodle match exactly, and that you are a part of the class on your schools Moodle.");
	} else if ( totalFound.length == 1){
		var win1 = Titanium.UI.createWindow({  
    			url:'moodle_class.js',
    			backgroundColor:'#ecfaff',
    			barColor: '#46a546'
			});
			win1.Moodurl = totalURL[0];
			win1.open();
	} else {

	}
};			