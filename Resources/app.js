Ti.include("source_both/model/api.js");
var win = Titanium.UI.createWindow({  
    title:'Please Login to Minds Mesh',
    backgroundColor:'#ecfaff',
    className:'win',
    barColor: '#46a546'
});
Titanium.Facebook.appid = "391884850858794";
Titanium.Facebook.permissions = ['email'];

//// ---- Menu window, positioned on the left
var menuWindow = Ti.UI.createWindow({
    top:0,
    backgroundColor:"#e2e7ed",
    left:0,
    width:Titanium.Platform.displayCaps.platformWidth
});
//// ---- Menu Table
// Menu Titles
	

// Tableview
var menuTableView = Ti.UI.createTableView({
    backgroundColor:'#252525',
    separatorColor: '#000',
    width: 260,
    left:0
});

var menuMoodle = [];
var menuName = [];

function reopenLogin()	{
	win.open();
}
var menuTitles = [];
function reloadMenu(){
	menuWindow.add(menuTableView);
	menuWindow.open();
	menuTableView.data = [];
	xhr = getUserWithChildren(Titanium.App.Properties.getString('mmat'),Titanium.App.Properties.getString('userid'));
	xhr.onload = function(){
	var response = this.responseText;
	user = JSON.parse(response);
	var fbRow1 = Titanium.UI.createTableViewRow({
 	         	header:'Menu',
 	         	id: 1,
                backgroundColor:'#252525',
				height:40
            });
var labelTitle = Titanium.UI.createLabel({
    			text:'Feed',
    			id: 1,
    			font:{fontSize:16},
    			color:'#e2e7ed',
   				width:'auto',
    			textAlign:'left',
    			left: 45
			});
			var labelIcon = Titanium.UI.createImageView({
				image: Titanium.App.Properties.getString("photo_url"),
				id: 1,
				left: 4,
				top: 4,
				height:32,
				width:32,
			});
fbRow1.add(labelIcon);
fbRow1.add(labelTitle);
var fbRow6 = Titanium.UI.createTableViewRow({
				header:'Settings',
                backgroundColor:'#252525',
                id: 6,
				height:40
            });
var labelTitle = Titanium.UI.createLabel({
    			text:'Log Out',
    			font:{fontSize:16},
    			id: 6,
    			color:'#e2e7ed',
   				width:'auto',
    			textAlign:'left',
    			left: 45
			});
			var labelIcon = Titanium.UI.createImageView({
				image: 'images/exit.png',
				id: 6,
				left: 4,
				top: 4,
				height:32,
				width:32,
			});
fbRow6.add(labelIcon);
fbRow6.add(labelTitle);
var fbRow8 = Titanium.UI.createTableViewRow({
                backgroundColor:'#252525',
                id: 8,
				height:40
            });
var labelTitle = Titanium.UI.createLabel({
    			text:'Add Class....',
    			id: 8,
    			font:{fontSize:16},
    			color:'#e2e7ed',
   				width:'auto',
    			textAlign:'left',
    			left: 45
			});
			var labelIcon = Titanium.UI.createImageView({
				image: 'images/emblem_library.png',
				id: 8,
				left: 4,
				top: 4,
				height:32,
				width:32,
			});
fbRow8.add(labelIcon);
fbRow8.add(labelTitle);
var fbRow9 = Titanium.UI.createTableViewRow({
                backgroundColor:'#252525',
                id: 9,
				height:40
            });
var labelTitle = Titanium.UI.createLabel({
    			text:'Campus Map',
    			id: 9,
    			font:{fontSize:16},
    			color:'#e2e7ed',
   				width:'auto',
    			textAlign:'left',
    			left: 45
			});
			var labelIcon = Titanium.UI.createImageView({
				image: 'images/04_maps.png',
				id: 9,
				left: 4,
				top: 4,
				height:32,
				width:32,
			});
fbRow9.add(labelIcon);
fbRow9.add(labelTitle);
var fbRow10 = Titanium.UI.createTableViewRow({
                backgroundColor:'#252525',
                id: 10,
				height:40
            });
var labelTitle = Titanium.UI.createLabel({
    			text:'Moodle Account',
    			font:{fontSize:16},
    			id: 10,
    			color:'#e2e7ed',
   				width:'auto',
    			textAlign:'left',
    			left: 45
			});
var labelIcon = Titanium.UI.createImageView({
				image: 'images/run.png',
				id: 10,
				left: 4,
				top: 4,
				height:32,
				width:32,
			});
fbRow10.add(labelIcon);
fbRow10.add(labelTitle);
if(Titanium.App.Properties.getString("moodle_entity_id") == 2){
menuTitles = [fbRow1, fbRow9] } else{
	menuTitles = [fbRow1];
}
	for(c=0;c<user.topic_users.length;c++){
            var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#252525',
                id: 7,
				height:40,
				moodle: false,
				number: user.topic_users[c].topic.number,
				extraData: user.topic_users[c].topic.id
            });
            
            if (c==0){fbRow.header = 'Classes'}
			var labelTitle = Titanium.UI.createLabel({
    			text:user.topic_users[c].topic.number,
    			font:{fontSize:16},
    			id: 7,
    			color:'#e2e7ed',
   				width:'auto',
    			textAlign:'left',
    			left: 45,
    			moodle: false,
    			number:user.topic_users[c].topic.number,
                extraData: user.topic_users[c].topic.id
			});
			var labelIcon = Titanium.UI.createImageView({
				image: 'images/emblem_library.png',
				id: 7,
				left: 4,
				top: 4,
				height:32,
				width:32,
				moodle: false,
    			number:user.topic_users[c].topic.number,
                extraData: user.topic_users[c].topic.id
			});
			fbRow.add(labelIcon);
			fbRow.add(labelTitle);
			menuName[user.topic_users[c].topic.id] = user.topic_users[c].topic.number;
			if (user.topic_users[c].topic.entity_id == Titanium.App.Properties.getString("moodle_entity_id")){
				fbRow.moodle = true;
				labelTitle.moodle = true;
				labelIcon.moodle = true;
				menuMoodle[user.topic_users[c].topic.id] = true;
			}
			fbRow.add(labelTitle);
            menuTitles.push(fbRow);
        }
        menuTitles.push(fbRow8);
        menuTitles.push(fbRow6);
   if(Titanium.App.Properties.getString("moodle_entity_id") != null)
   {
		menuTitles.push(fbRow10);
		}
		menuTableView.data = menuTitles;
	}
	xhr.send();
}
function redirectAfterLogin() {
	
	if(Titanium.Platform.osname == 'iphone' || Titanium.Platform.osname == 'ipad'){
	Titanium.Network.registerForPushNotifications({
	   			 types: [
        			Titanium.Network.NOTIFICATION_TYPE_BADGE,
        			Titanium.Network.NOTIFICATION_TYPE_ALERT
   				 ],
    success:function(e)
    {
        var deviceToken = e.deviceToken;
        Ti.API.info("Push notification device token is: "+deviceToken);
        Ti.API.info("Push notification types: "+Titanium.Network.remoteNotificationTypes);
        Ti.API.info("Push notification enabled: "+Titanium.Network.remoteNotificationsEnabled);
 
        var request = Titanium.Network.createHTTPClient();
        request.onload = function()
        {
            
        };
        var postData = {'user_device': {'token': escape(e.deviceToken),
						'model' : escape(Titanium.Platform.model),
						'os': escape(Titanium.Platform.osname),
						'name': escape(Titanium.Platform.model)}
		};
		request = postRegisterDevice(Titanium.App.Properties.getString("mmat"),postData)
		request.send(JSON.stringify(postData));
	},
  		  error:function(e)
   			 {
   			     alert(e.error);
 
   			 },
  		  callback:function(e)
  			  {
        // called when a push notification is received.
        		  Titanium.UI.iPhone.appBadge = 0;
				  xhr = getNotification(Titanium.App.Properties.getString("mmat"),e.data.notification_id);
					xhr.onload = function(){
						var response = this.responseText;
						user = JSON.parse(response);
						var win1 = Titanium.UI.createWindow({  
    						title:'Single Post',
    						url:'source_both/post.js',
    						backgroundColor:'#ecfaff',
    						barColor: '#46a546'
						});
						win1.postid = user.target_id;
						win1.fullname = user.user.name;
						win1.photo_url = user.user.photo_url;
						win1.open();
					}
					xhr.send();
   			 }		
 
		});
}
	reloadMenu();
//// ---- Window with navigationGroup
var navWindow = Ti.UI.createWindow({
	//height:Titanium.Platform.displayCaps.platformHeight,
    width:Titanium.Platform.displayCaps.platformWidth, // Set the width of the sliding window to avoid cut out from animation
	backgroundColor:"#e2e7ed"
});


Ti.Gesture.addEventListener('orientationchange',function(e){
        navWindow.width = Titanium.Platform.displayCaps.platformWidth;
    });


var win1 = Titanium.UI.createWindow({  
    url:'source_both/feed.js',
    barColor: '#46a546',
    backgroundColor:"#e2e7ed",
    moving:false, // Custom property for movement
    axis:0 // Custom property for X axis
});
	var win4 = Titanium.UI.createWindow({  
    				title:'Confirm School Email',
   					url:'source_both/join_school.js',
    				barColor: '#46a546',
   	    			backgroundColor:"#e2e7ed",
       				moving:false, // Custom property for movement
       				axis:0 // Custom property for X axis
    			 });
    			 var win9 = Titanium.UI.createWindow({  
    				title:'Moodle Account',
   					url:'source_both/moodle_account.js',
    				barColor: '#46a546',
   	    			backgroundColor:"#e2e7ed",
       				moving:false, // Custom property for movement
       				axis:0 // Custom property for X axis
    			 });
if (Titanium.App.Properties.getString("num_entities") == 0){

navWindow = win4;

} else if (Titanium.App.Properties.getString("num_entities") > 0 && Titanium.App.Properties.getString("moodle_entity_id") != false && Titanium.App.Properties.getString("num_topics") == 0){
	
navWindow = win9;

} else {
navWindow = win1;
}

navWindow.open();
menuTableView.addEventListener('click', function(e)
{
	if (e.source.id == 1){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:1});
   } else if (e.source.id == 2){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:2});
   } else if (e.source.id == 4){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:4});
   } else if (e.source.id == 5){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:5});
   } else if (e.source.id == 6){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:6});
   } else if (e.source.id == 7){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:7, class_id: e.source.extraData});
   } else if (e.source.id == 8){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:8});
   } else if (e.source.id == 9){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:9});
   } else if (e.source.id == 10){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:10});
   }
});
Titanium.App.addEventListener('reloadMenu', function(e)
{   
	reloadMenu();
});
Titanium.App.addEventListener('loadFeed', function(e)
{   
	reloadMenu();
	var win2 = Titanium.UI.createWindow({  
   					url:'source_both/feed.js',
    				barColor: '#46a546',
   	    			backgroundColor:"#46a546",
       				moving:false, // Custom property for movement
       				axis:0 // Custom property for X axis
    			 });
    			Titanium.App.fireEvent('main-win-close');
        		win2.open();
        		navWindow = win2;
				
});
Titanium.App.addEventListener('loadTopic', function(e)
{   
	var win7 = Titanium.UI.createWindow({  
   	    		backgroundColor:'#46a546',
    			url:'source_both/topic_feed.js',
    			barColor: '#46a546',
    			moving:false, // Custom property for movement
       			axis:0 // Custom property for X axis
	});
	Titanium.App.fireEvent('main-win-close');
				win7.class_id = class_id;
				win7.moodle = moodle;
				win7.class_number = class_number;
				win7.open();
				navWindow = win7;
				
});
Titanium.App.addEventListener('touch-slide', function(e)
{   
	
	
	    navWindow.animate({
            left:e.cords,
            duration:20
        });
        // Defining coordinates as the final left position
        navWindow.left = e.cords;
});
Titanium.App.addEventListener('nav-menu-button', function(e)
{
        // If the menu is opened
    var menu_id = e.menu_id;
    var class_id = e.class_id;
    var moodle = menuMoodle[class_id];
    var class_number = menuName[class_id];
    if(e.data == true){
        var navAnimate = Ti.UI.createAnimation({
            left:0,
            duration:75,
            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        navAnimate.addEventListener('complete', function(e){
        	 if(menu_id == 1)
        	 {
        	 	var win2 = Titanium.UI.createWindow({  
   					url:'source_both/feed.js',
    				barColor: '#46a546',
   	    			backgroundColor:"#46a546",
       				moving:false, // Custom property for movement
       				axis:0 // Custom property for X axis
    			 });
				Titanium.App.fireEvent('main-win-close');
				win2.open();
				navWindow = win2;
			} else if(menu_id == 4) {
        	 	var win4 = Titanium.UI.createWindow({  
    				title:'Verify Email',
   					url:'source_both/join_school.js',
    				barColor: '#46a546',
   	    			backgroundColor:"#e2e7ed",
       				moving:false, // Custom property for movement
       				axis:0 // Custom property for X axis
    			 });
				Titanium.App.fireEvent('main-win-close');
				win4.open();
				navWindow = win4;
			} else if(menu_id == 5) {
        	 	var win5 = Titanium.UI.createWindow({  
    				title:'Moodle',
   					url:'source_both/moodle_account.js',
    				barColor: '#46a546',
   	    			backgroundColor:"#e2e7ed",
       				moving:false, // Custom property for movement
       				axis:0 // Custom property for X axis
    			 });
				Titanium.App.fireEvent('main-win-close');
				win5.open();
				navWindow = win5;
			} else if(menu_id == 6) {
				
				var dlg = Titanium.UI.createAlertDialog({
    			message:'Are you sure you want to logout', 
    			buttonNames: ['Logout','Cancel']
  			});
   			dlg.addEventListener('click', function(ev) {
   				 if (ev.index == 0) { 
   				 	Titanium.Facebook.logout();
				reopenLogin();
				menuWindow.close();
				Titanium.App.fireEvent('main-win-close');
				navWindow.close();
   				 } else if (ev.index == 1) { // clicked "No"
					dlg.hide();
   				 }
 			 });
 			 dlg.show();
			} else if(menu_id == 7) {
				var win7 = Titanium.UI.createWindow({  
   	    		backgroundColor:'#46a546',
    			url:'source_both/topic_feed.js',
    			barColor: '#46a546',
    			moving:false, // Custom property for movement
       			axis:0 // Custom property for X axis
				});
				Titanium.App.fireEvent('main-win-close');
				win7.class_id = class_id;
				win7.moodle = moodle;
				win7.class_number = class_number;
				win7.open();
				navWindow = win7;
			} else if(menu_id == 8) {
				var win8 = Titanium.UI.createWindow({  
    				title:'Search Classes',
   	 				url:'source_both/search_topics.js',
   	 				backgroundColor:'#ecfaff',
   	 				layout:'absolute',
   	 				barColor: '#46a546',
   	 				moving:false, // Custom property for movement
       				axis:0 // Custom property for X axis
				});
				Titanium.App.fireEvent('main-win-close');
				win8.open();
				navWindow = win8;
			} else if(menu_id == 9) {
				var win1 = Titanium.UI.createWindow({
   	 					url:'source_both/campus_map.js',
   	 					backgroundColor:'#ecfaff',
   	 					layout:'absolute',
   	 					barColor: '#46a546'
				});
				Titanium.App.fireEvent('main-win-close');
				win1.open();
				navWindow = win1;
			} else if(menu_id == 10) {
        	 	var win9 = Titanium.UI.createWindow({  
    				title:'Moodle Account',
   					url:'source_both/moodle_account.js',
    				barColor: '#46a546',
   	    			backgroundColor:"#e2e7ed",
       				moving:false, // Custom property for movement
       				axis:0 // Custom property for X axis
    			 });
				Titanium.App.fireEvent('main-win-close');
				win9.open();
				navWindow = win9;
			}
        });
        navWindow.animate(navAnimate);
        Titanium.App.fireEvent('nav-menu-button-toggle',{toggle:false});
    }
    // If the menu isn't opened
    else{
        navWindow.animate({
            left:260,
            duration:75,
            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
       Titanium.App.fireEvent('nav-menu-button-toggle',{toggle:true});
    }
});
win.close();
}

var user = '';
Titanium.Facebook.addEventListener('login', function(e) {
	    
		Titanium.App.Properties.setString("fbid",e.data["id"]);	
		xhr = postLogin(Titanium.Facebook.accessToken)
		xhr.onload = function(){
			var response = this.responseText;
			var user = JSON.parse(response);
			for (i=0;i<user.entity_users.length;i++){
				if (user.entity_users[i].entity.moodle_url != null)
				{
					Titanium.App.Properties.setString("moodle_entity_id",user.entity_users[i].entity.id);
					Titanium.App.Properties.setString("moodle_url",user.entity_users[i].entity.moodle_url);
					Titanium.App.Properties.setString("entity_user_id",user.entity_users[i].id);
				}	
			}
			Titanium.App.Properties.setString("name",user.name);
			Titanium.App.Properties.setString("num_entities",user.entity_users.length);
			Titanium.App.Properties.setString("num_topics",user.topic_users.length);
			Titanium.App.Properties.setString("userid",user.id);
			Titanium.App.Properties.setString("mmat", user.access_token);
			Titanium.App.Properties.setString("photo_url", user.photo_url);
			redirectAfterLogin();
			
		};
		xhr.send();
});
if (Titanium.Platform.osname == 'iphone')
{
var pict = Titanium.UI.createImageView({
				image: 'images/Mindsmesh_logo_highres.png',
				top: 50,
				height:200,
				width:300,
			});
} else {
	var pict = Titanium.UI.createImageView({
				image: 'images/Mindsmesh_logo_highres.png',
				top: 50,
				bottom: 50
			});
}
win.add(pict);
if(Titanium.Platform.osname == 'iphone'){
	win.add(Titanium.Facebook.createLoginButton({
		style:Ti.Facebook.BUTTON_STYLE_WIDE,
		bottom:30,
		width:'auto'
	}));
}
else{
	win.add(Titanium.Facebook.createLoginButton({
		style:Ti.Facebook.BUTTON_STYLE_WIDE,
		height:40,
		width: 'auto',
		bottom:50
	}));
}
if(Titanium.Facebook.loggedIn == true)
{
	redirectAfterLogin();
} else {
	win.open();
}

