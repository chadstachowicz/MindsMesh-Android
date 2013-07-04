Ti.include("model/api.js");
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
var btnBack = Titanium.UI.createButton({
	title:'Back',
	height: 30,
    width:'auto',
	backgroundColor:'#347235',
	borderWidth: 1,
	borderColor: 'black',
	borderRadius: 2,
	left: 10,
});
bar.add(btnBack);
btnBack.addEventListener('click', function(){
	win.close();
})
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
    			notModal: winModal,
    			modal: true
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
var tableView = Titanium.UI.createTableView({
	backgroundColor:'#46a546',
	separatorColor: 'transparent',
	top: 44,
	left:0
});

win.add(tableView);

Titanium.App.addEventListener('main-win-close', function(e)
{
	winModal.close();
	win.close();
});


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
	bar.add(notificationButton);
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

var brainlabel = [];
var replybrainlabel = [];
var btnPost = Titanium.UI.createButton({
	title:'Answer',
	height: 30,
    width:'auto',
	backgroundColor:'#347235',
	borderWidth: 1,
	borderColor: 'black',
	borderRadius: 2,
	right: 10
});

btnPost.addEventListener('click', function(e){
	var win1 = Titanium.UI.createWindow({  
    	title:'Answer',
   	 	url:'make_reply.js',
   	 	backgroundColor:'#ecfaff',
   	 	barColor: '#46a546',
   	 	layout:'absolute',
   	 	right:10,
   	 	modal: true
	});
	win1.postid = win.postid;
	win1.open();
});

bar.add(btnPost);

var updating = false;

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

// fake it til ya make it..  create a 2 pixel
// bottom border
tableHeader.add(border);

var arrow = Ti.UI.createView({
	backgroundImage:"../images/whiteArrow.png",
	width:23,
	height:60,
	bottom:10,
	left:20
});
 
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

tableHeader.add(arrow);
tableHeader.add(statusLabel);
tableHeader.add(lastUpdatedLabel);
tableHeader.add(actInd);

tableView.headerPullView = tableHeader;


var pulling = false;
var reloading = false;

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
	var rd = []; tableView.data = rd;
if ( Titanium.Network.online) {
xhr = getPostWithFamily(Titanium.App.Properties.getString('mmat'),win.postid)
xhr.onload = function(){
	var d = new Date();
	var response = this.responseText;
	var post = JSON.parse(response);
	 var fullname = post.user.name
	 var picUrl = post.user.photo_url
            var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#46a546',
                height:Ti.UI.SIZE,
                selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
                layout:'vertical'

            });
	
           var fbName = Titanium.UI.createLabel({
                text: fullname,
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
		top: 10,
		height:'auto',
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
	var comment = Titanium.UI.createLabel({
                text: post.text,
                backgroundColor:'#ecfaff',
		textAlign:'left',
		width: comWidth - 60,
		left:15,
		top:5,
		height:Ti.UI.SIZE,
		color:'#000000',
		font:{fontSize:13},
            });
	var commentHolder = Ti.UI.createView({
		backgroundColor: '#ecfaff',
		top: 15,
		width:comWidth - 30,
		height:Ti.UI.SIZE,
		layout:'vertical'
	});
			
			var pict = Titanium.UI.createImageView({
				image: picUrl,
				top: 15,
				left: 15,
				height:50,
				width:50,
			});
			commentHolder.add(pict);
            commentHolder.add(fbName);
            commentHolder.add(postTime);
            commentHolder.add(comment);
            if (post.post_attachments.length > 0)
			{
				
				var myRegEx = /\.png$/i;
				var myRegEx2 = /\.jpg$/i;
				var myRegEx3 = /\.jpeg$/i;
			if(post.post_attachments[0].name == "post.mov")
			{
				var url = post.post_attachments[0].url;
				var pieces = url.substring(0, url.length - 8);
  	 			var movPict = Titanium.UI.createImageView({
					image: (pieces + "frame_0000.png"),
					box: true,
					height: 260,
					bottom: 15
				});
				var playButton = Titanium.UI.createImageView({
					image: '../images/LH2-Play-icon-2.png',
					top: -120,
					height: 32,
					zIndex: 1,
					box: true,
					width: 32,
				});
				
				movPict.addEventListener('click', function(e){
					launchMovie(url);
				});
				playButton.addEventListener('click', function(e){
					launchMovie(url);
				});
				commentHolder.add(movPict);
				commentHolder.add(playButton);
			} else if (post.post_attachments[0].name.match(myRegEx) || post.post_attachments[0].name.match(myRegEx2) || post.post_attachments[0].name.match(myRegEx3)) {
				   	
				
				
				var picModal = Ti.UI.createWindow({
        			backgroundColor : 'black',
        			barColor: '#46a546',
        			title: 'Picture',
        			orientationModes:[Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT,Ti.UI.PORTRAIT,Ti.UI.UPSIDE_PORTRAIT]
				});
				var imgPic = Titanium.UI.createImageView({
					image: post.post_attachments[0].url,
					box: true,
					height: 'auto',
					width: 200,
					bottom: 20
				});
				imgPic.addEventListener('click', function(e){
					var picModal2 = Ti.UI.createWindow({
        			backgroundColor : 'black',
        			modal: true,
        			barColor: '#46a546',
        			title: 'Picture',
        			orientationModes:[Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT,Ti.UI.PORTRAIT,Ti.UI.UPSIDE_PORTRAIT]
				});
				var imgPic2 = Titanium.UI.createImageView({
					image: post.post_attachments[0].url,
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
				});
				commentHolder.add(imgPic);
				
			} else {
					var attach = Titanium.UI.createLabel({
            		text: (post.post_attachments.length + ' file(s) attached'),
					height: 'auto',
					textAlign: 'center',
					color: '#000000',
					left: 50,
					top: -29,
					font:{fontSize:14, color: '#fff'}
					});
					var paperclip = Titanium.UI.createImageView({
					image: '/images/paperclip4_black.png',
					left: 15,
					top: 5,
					height:32,
					bottom: 10,
					width:32,
				});
				commentHolder.add(paperclip);
            	commentHolder.add(attach);
            	paperclip.addEventListener('click', function(e){
    				openFiles(post);
            	});
            	attach.addEventListener('click', function(e){
    				openFiles(post);
            	});
            }
			}
			fbRow.add(commentHolder);
			var seperatorPhone = Ti.UI.createView({
				backgroundColor: "#808080",
				width:Titanium.Platform.displayCaps.platformWidth - 30,
				height:1,
			});
            tableView.appendRow(fbRow);
       for(c=0;c<post.replies.length;c++){
                        var reply = post.replies[c];
            var fullname = reply.user.name;
            var picUrl = reply.user.photo_url;
            var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#46a546',
                height:Ti.UI.SIZE,
                selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
                layout:'vertical'
            });
        	var fbName = Titanium.UI.createLabel({
                text: fullname,
                backgroundColor:"#e2e7ed",
				textAlign:'left',
				left:80,
				height:'auto',
				top: -55,
				color:'#46a546',
				font:{fontWeight:'bold',fontSize:13}
			});
			var timetext = timeDifference(d,reply.created_at);
			var postTime = Titanium.UI.createLabel({
                text: timetext,
                backgroundColor:"#e2e7ed",
				textAlign:'left',
		left:80,
		height:'auto',
		top: 10,
		color:'#808080',
		font:{fontSize:11}
		});
		           var w = Titanium.Platform.displayCaps.platformWidth;
    var h = Titanium.Platform.displayCaps.platformHeight;
    var comWidth = 0;
    if( w > h){
        comWidth = Titanium.Platform.displayCaps.platformHeight;
    }else{
        comWidth = Titanium.Platform.displayCaps.platformWidth;
    }
	var comment = Titanium.UI.createLabel({
                text: reply.text,
                backgroundColor:"#e2e7ed",
		textAlign:'left',
		width: comWidth - 120,
		left:80,
		top:5,
		height:Ti.UI.SIZE,
		color:'#000000',
				font:{fontSize:13},
            });
	var commentHolder = Ti.UI.createView({
		backgroundColor: "#e2e7ed",
		width:comWidth - 30,
		height:Ti.UI.SIZE,
		layout:'vertical'
	});
			var pict = Titanium.UI.createImageView({
				image: picUrl,
				top: 15,
				left: 15,
				height:50,
				width:50,
			});
			
			commentHolder.add(pict);
            commentHolder.add(fbName);
            commentHolder.add(comment);
            commentHolder.add(postTime);
            var seperatorPhone = Ti.UI.createView({
				backgroundColor: "#808080",
				width:comWidth - 30,
				height:1,
			});
            fbRow.add(seperatorPhone);
            fbRow.add(commentHolder);
            tableView.appendRow(fbRow);
           
        }
 
   };
	xhr.send();
} else {
	alert("Network problems.");
}
	// when you're done, just reset
//	tableView.setContentInsets({top:0},{animated:true});
	reloading = false;
	lastUpdatedLabel.text = "Last Updated: "+formatDate();
	statusLabel.text = "Pull down to refresh...";
	actInd.hide();
	arrow.show();
}

var lastDistance = 0;

tableView.addEventListener('scroll',function(e)
{
	var offset = e.contentOffset.y;
	var offset = e.contentOffset.y;
	
	if (offset < -65.0 && !pulling && !reloading)
	{
		var t = Ti.UI.create2DMatrix();
		t = t.rotate(-180);
		pulling = true;
		arrow.animate({transform:t,duration:180});
		statusLabel.text = "Release to refresh...";
	}
	else if((offset > -65.0 && offset < 0 ) && pulling && !reloading)
	{
		pulling = false;
		var t = Ti.UI.create2DMatrix();
		arrow.animate({transform:t,duration:180});
		statusLabel.text = "Pull down to refresh...";
	}    
});
tableView.addEventListener('dragEnd', function()
{	
	if(pulling && !reloading)
	{
		reloading = true;
		pulling = false;
		arrow.hide();
		actInd.show();
		statusLabel.text = "Reloading...";
	//	tableView.setContentInsets({top:60},{animated:true});
		tableView.scrollToTop(-60,true);
		arrow.transform=Ti.UI.create2DMatrix();
		beginReloading();
		reloadNotifications();
	}
});
 
function likeButton(postid, labelid)
{
	var xhr = Titanium.Network.createHTTPClient({enableKeepAlive:false});
	xhr.setTimeout = 20000;
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
function likeButtonReply(replyid, labelid)
{
	var xhr = Titanium.Network.createHTTPClient({enableKeepAlive:false});
	xhr.setTimeout = 20000;
	var apiUrl2 = 'https://mindsmesh.com/api/v1/replies/' + replyid + '/like?access_token=' + Titanium.App.Properties.getString('mmat');
	var likeres;
	xhr.open('POST', apiUrl2);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onerror = function(e){
		alert('HTTP ERR'+e.error);
	}
	xhr.onload = function(){
		var response = this.responseText;
		likeres = JSON.parse(response);
		replybrainlabel[labelid].text = likeres.likes_count;
	}
	xhr.send();

}
win.addEventListener('focus', function() 
{
  if ( Titanium.Network.networkType != Titanium.Network.NETWORK_NONE ) {
  	tableView.setData([]);
    endReloading();
    reloadNotifications();
  }else{
    var alertDialog = Titanium.UI.createAlertDialog({
    title: 'Attention',
    message: 'No Internet Connectity!',
    buttonNames: ['OK']
    });
    alertDialog.show(); 
}  
});
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
function openFiles(post)
{
var winModalFiles = Ti.UI.createWindow({
        				backgroundColor : '#B0000000'
    				});
        			var win_height = 380;
   					var win_width = Ti.Platform.displayCaps.platformWidth * .85;
 
    				var viewFiles = Ti.UI.createView({
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
   		 			var modalTableViewFiles = Titanium.UI.createTableView({
						backgroundColor:'#e2e7ed',
						box: true
					});
		modalTableViewFiles.addEventListener('click', function(e){			
			openFile(e.source.text, e.source.url);
		
			});

		   		 var labelTitleFiles = Titanium.UI.createLabel({
    			text:'Files',
    			font:{fontSize:16,fontWeight:'bold'},
    			color:'#000',
    			box: true,
   				width:Ti.UI.Size,
    			textAlign:'center',
    			top: 5,
 
			});
		var seperatorPhoneFiles = Ti.UI.createView({
				backgroundColor: "#808080",
				width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 10,
				top: 5,
				box: true,
				height:2,
			});
		 viewFiles.add(labelTitleFiles);
		 viewFiles.add(seperatorPhoneFiles);
		 viewFiles.add(modalTableViewFiles);
   		 winModalFiles.add(viewFiles);
   		 for (c=0;c<post.post_attachments.length;c++)
		{
   		 var classNumber = Titanium.UI.createLabel({
    			text:post.post_attachments[c].name,
    			url: post.post_attachments[c].url,
    			font:{fontSize:14,fontWeight:'bold'},
    			color:'#000',
   				width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 10,
   				height: '36',
   				top: 2,
   				box:true,
    			textAlign:'left',
    			left: 10
 
			});
		var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#e2e7ed',
                text:post.post_attachments[c].name,
    			url: post.post_attachments[c].url,
                layout: 'vertical',
                box:true,
                height: 40
          });
            fbRow.add(classNumber);
         modalTableViewFiles.appendRow(fbRow);
        }
        winModalFiles.open();
            		winModalFiles.addEventListener('click', function(e){
			 		if(e.source.box != true){
 						winModalFiles.close();}
 					})
}
function openFile(name,url){
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
	url2 = url;
	var xhr = Titanium.Network.createHTTPClient({enableKeepAlive:false, timeout:6000});
	xhr.retries = 0;
	xhr.open('GET',url2);
	xhr.onerror = function(){
		loadView.close();
	}
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

   function launchMovie(url){
   	var movieModal2 = Ti.UI.createWindow({
        		 	backgroundColor : '#00000000',
        			barColor: '#46a546',
        			title: 'Video',
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

