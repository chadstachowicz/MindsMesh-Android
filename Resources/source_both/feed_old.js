Ti.include("model/api.js");
var row_data = [];
var offset = 0;
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
	left:0,
	top:44,
});
var menuButton = Ti.UI.createButton({
    image:'../images/Paragraph-Justify.png',
    toggle:false,
    height: 30,
    width:30,
	backgroundColor:'#347235',
	borderWidth: 1,
	borderColor: 'black',
	borderRadius: 2,
	left: 10

});
bar.add(menuButton);

menuButton.addEventListener('click', function(e){
	if(menuButton.toggle == false)
	{
		tableView.scrollable = false;
	} else {
		tableView.scrollable = true;
	}
    Titanium.App.fireEvent('nav-menu-button',{data:e.source.toggle});
});
Titanium.App.addEventListener('nav-menu-button-toggle', function(e)
{
	
	menuButton.toggle = e.toggle;
});
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


//var fontawesome = IconicFont({ fontfamily: "FontAwesome", ligature: false });
//var fontawesomeLabel = Ti.UI.createLabel({ font: { fontFamily: fontawesome.fontfamily() }, text: fontawesome.icon('bell') });


        tableView.addEventListener('click', function(e)
		{
			if(menuButton.toggle == true){
				Titanium.App.fireEvent('nav-menu-button',{data:true});
				tableView.scrollable = true;
			} else {
				var win1 = Titanium.UI.createWindow({  
    			url:'post.js',
  				backgroundColor:'#fff',
  				barColor: '#46a546',
  				modal:true
				});
				win1.postid = e.rowData.result;
				win1.fullname = e.rowData.fullname;
				win1.photo_url = e.rowData.photo_url;
				win1.open();
			}
		
		});
var brainlabel = [];

var btnPost = Titanium.UI.createButton({
	title:'Post',
	height: 30,
    width:'auto',
	backgroundColor:'#347235',
	borderWidth: 1,
	borderColor: 'black',
	borderRadius: 2,
	right: 10
});

bar.add(btnPost);


btnPost.addEventListener('click', function(e){
	var win1 = Titanium.UI.createWindow({  
    	title:'Got a Question?',
   	 	url:'make_post.js',
   	 	backgroundColor:'#ecfaff',
   	 	source: 'feed',
   	 	layout:'absolute',
   	 	barColor: '#46a546',
   	 	modal: true
	});
	win1.open();

});
var lastRow = 0;

var border = Ti.UI.createView({
	backgroundColor:"#576c89",
	height:2,
	bottom:0,
	width: Titanium.Platform.displayCaps.platformWidth
});

var tableHeader = Ti.UI.createView({
	backgroundColor:"#e2e7ed",
	width: Titanium.Platform.displayCaps.platformWidth,
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
win.add(tableView);

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
	row_data = []; tableView.data = row_data;
	lastRow = 0;
	lastRowId = 1;
    xhr = getPostsWithFamily(Titanium.App.Properties.getString('mmat'));
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
  		tableView.setData([]);
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
tableView.addEventListener('scroll',function(evt)
{
	 if (!pulling && !updating && !reloading && (evt.totalItemCount < evt.firstVisibleItem + evt.visibleItemCount + 3) && (row.length>=10)) {
        beginUpdate();
    }
});

function beginUpdate()
{
	updating = true;
	tableView.appendRow(loadingRow);
	actInd2.show();
	
	// just mock out the reload
	setTimeout(endUpdate,2000);
}

function endUpdate()
{
	actInd2.hide();
	tableView.deleteRow(lastRow);
	xhr = getPostsWithFamily(Titanium.App.Properties.getString('mmat'),lastRowId);
	xhr.onload = function(){
    	onLoad(this.responseText);
    };
	xhr.send();

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
var backHolder = [];
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
		left: 5,
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

		comment[g] = Titanium.UI.createLabel({
                text: post.text,
                backgroundColor:'#ecfaff',
		textAlign:'left',
		left:15,
		top:5,
		width:comWidth - 60,
		height:Ti.UI.SIZE,
		font:{fontSize:16}
            });

        commentHolder[g] = Ti.UI.createView({
		backgroundColor: '#ecfaff',
		top: 15,
		left: 15,
		width:comWidth - 30,
		height:Ti.UI.SIZE,
		layout:'vertical'
	});
	
	
	
	var commentCount = Titanium.UI.createLabel({
           text: post.replies_count,
           bottom: 13,
           right: 0,
		textAlign:'center',
		font:{fontWeight:'bold',fontSize:16}
            });
            
             var tmpView = Ti.UI.createView({
 			width: 52,
			height: 42,
			right: 5
 				
 			})
            var givbutton = Titanium.UI.createButton({
            result: post.id,
            fullname: fullname,
            photo_url: picUrl,
            width:32,
			height: 32,
			left: 0,
			backgroundImage: '../images/comment_32.png',
			})
			tmpView.add(givbutton);
            tmpView.add(commentCount);
			
			
			var pict = Titanium.UI.createImageView({
				image: picUrl,
				top: 15,
				left: 15,
				height:50,
				width:50,
			});

			}
			commentHolder[g].add(pict);
            commentHolder[g].add(fbName);
            commentHolder[g].add(postTime);
            commentHolder[g].add(comment[g]);
            var commentSpacer = Ti.UI.createView({
				backgroundColor: '#ecfaff',
				width:comWidth - 30,
				height:20,
			});
			commentHolder[g].add(commentSpacer);
            if (Titanium.Platform.osname == "iphone"){
            backHolder = Ti.UI.createView({
				borderRadius: 2,
				backgroundColor:"#e2e7ed",
				width:Titanium.Platform.displayCaps.platformWidth - 10,
				height: 30,
				bottom: 6,
			});
			if (post.post_attachments.length > 0)
			{

					var attach = Titanium.UI.createLabel({
            		text: (post.post_attachments.length + ' file(s) attached'),
					height: 'auto',
					textAlign: 'center',
					left: 27,
					top: 7,
					font:{fontSize:11, color: '#fff'}
					});
					var paperclip = Titanium.UI.createImageView({
					image: '../images/paperclip_black_24.png',
					left: 10,
					top: 6,
					height:16,
					width:16,
				});
				backHolder.add(paperclip);
            	backHolder.add(attach);
			}
			seperatorPhone[g] = Ti.UI.createView({
				backgroundColor: "#808080",
				width:Titanium.Platform.displayCaps.platformWidth - 10,
				height:1,
			});
			} else {
			backHolder = Ti.UI.createView({
				borderRadius: 2,
				backgroundColor:"#e2e7ed",
				width:comWidth - 30,
				height: 42,
				left: 15,
				bottom: 6,
			});
			if (post.post_attachments.length > 0)
			{

					var attach = Titanium.UI.createLabel({
            		text: (post.post_attachments.length + ' file(s) attached'),
					height: 'auto',
					textAlign: 'center',
					left: 50,
					top: 10,
					font:{fontSize:14, color: '#fff'}
					});
					var paperclip = Titanium.UI.createImageView({
					image: '../images/paperclip4_black.png',
					left: 15,
					top: 6, 
					height:32,
					width:32,
				});
				backHolder.add(paperclip);
            	backHolder.add(attach);
			}
			seperatorPhone[g] = Ti.UI.createView({
				backgroundColor: "#808080",
				width:comWidth - 30,
				height:1,
			});
			}
            
			fbRow.add(commentHolder[g]);
            fbRow.add(seperatorPhone[g]);
            backHolder.add(tmpView);
            fbRow.add(backHolder);
            row_data[g] = fbRow;
            g++;


           
        }
        if (updating){
        	tableView.scrollToIndex(lastRow-(row.length - 1),{animated:true,position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM});
        }
        updating = false;
        reloading = false;
        tableView.setData(row_data);
   };
   Ti.Gesture.addEventListener('orientationchange',function(e){
        win.width = Titanium.Platform.displayCaps.platformWidth;
 //       if (Titanium.Platform.osname == "iphone"){
 //       for(c=0;c<g;c++){
 //       	commentHolder[c].width = Titanium.Platform.displayCaps.platformWidth - 10;
 //       	backHolder[c].width = Titanium.Platform.displayCaps.platformWidth - 10;
 //       	seperatorPhone[c].width = Titanium.Platform.displayCaps.platformWidth - 10;
  //      	comment[c].width = Titanium.Platform.displayCaps.platformWidth - 30;
 ///       }
  //      } else {
  //      	for(c=0;c<g;c++){
  //      	commentHolder[c].width = Titanium.Platform.displayCaps.platformWidth - 30;
  //      	backHolder[c].width = Titanium.Platform.displayCaps.platformWidth - 30;
   //     	seperatorPhone[c].width = Titanium.Platform.displayCaps.platformWidth - 30;
 //       	comment[c].width = Titanium.Platform.displayCaps.platformWidth - 60;
 //       }
 //       }
   });
