Ti.include("source_both/model/api.js");
var win = Titanium.UI.createWindow({  
    title:'Please Login to Minds Mesh',
    backgroundColor:'#ecfaff',
    className:'win',
    barColor: '#46a546'
});
 var fb = require('facebook');
 fb.appid = "391884850858794";
 fb.permissions = ['email'];

//// ---- Menu window, positioned on the left
var menuWindow = Ti.UI.createWindow({
    top:0,
    backgroundColor:"#e2e7ed",
    left:0,
    width:Titanium.Platform.displayCaps.platformWidth
});
		var shareWhoModal2 = Ti.UI.createWindow(
		{
    		backgroundColor : '#B0000000',
    		zIndex: 1
		});
				var shareWhoModal3 = Ti.UI.createWindow(
		{
    		backgroundColor : '#B0000000',
    		zIndex: 1
		});
//// ---- Menu Table
// Menu Titles
	

// Tableview
var menuTableView = Ti.UI.createTableView({
    backgroundColor:'#252525',
    separatorColor: '#000',
    width: '260dp',
    left:0
});

menuTableView.addEventListener('click', function(e)
{
	if (e.source.id == 1){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:1});
   } else if (e.source.id == 4){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:4});
   } else if (e.source.id == 5){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:5});
   } else if (e.source.id == 6){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:6});
   } else if (e.source.id == 7){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:7, topic_id: e.source.extraData, entity_id: e.source.entity_id});
   } else if (e.source.id == 2){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:2, group_id: e.source.extraData});
   } else if (e.source.id == 8){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:8});
   } else if (e.source.id == 9){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:9});
   } else if (e.source.id == 10){
     Titanium.App.fireEvent('nav-menu-button',{data:true, menu_id:10});
   }
});

var navWindow = Ti.UI.createWindow({
	//height:Titanium.Platform.displayCaps.platformHeight,
    width: Ti.Platform.displayCaps.platformWidth, // Set the width of the sliding window to avoid cut out from animation
	backgroundColor:"#e2e7ed"
});

Titanium.App.addEventListener('reloadMenu', function(e)
{   
	reloadMenu();
});
Titanium.App.addEventListener('loadFeed', function(e)
{   
	win.close();
	reloadMenu();
	var win2 = Titanium.UI.createWindow({  
   					url:'source_both/feed.js',
    				barColor: '#46a546',
    				width: Ti.Platform.displayCaps.platformWidth,
   	    			backgroundColor:"#46a546",
       				moving:false, // Custom property for movement
       				axis:0 // Custom property for X axis
    			 });
    			Titanium.App.fireEvent('main-win-close');
        		win2.open();
        		navWindow = win2;
				
});
Titanium.App.addEventListener('loadMoodleAccount', function(e)
{   
	reloadMenu();
		var win2 = Titanium.UI.createWindow({  
    				title:'Moodle Account',
   					url:'source_both/moodle_account.js',
    				barColor: '#46a546',
    				width: Ti.Platform.displayCaps.platformWidth,
   	    			backgroundColor:"#e2e7ed",
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
    			url:'source_both/feed.js',
    			barColor: '#46a546',
    			width: Ti.Platform.displayCaps.platformWidth,
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
Titanium.App.addEventListener('nav-menu-button', function(e)
{
        // If the menu is opened
    var menu_id = e.menu_id;
    var topic_id = e.topic_id;
    var entity_id = e.entity_id;
    var group_id = e.group_id;
    var group_name = groupName[group_id];
    var moodle = menuMoodle[topic_id];
    var entity_id = menuEntity[entity_id];
    var class_number = menuName[topic_id];
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
    				width: Ti.Platform.displayCaps.platformWidth,
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
   	    			backgroundColor:'#ecfaff',
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
   					width: Ti.Platform.displayCaps.platformWidth,
    				barColor: '#46a546',
   	    			backgroundColor:"#e2e7ed",
       				moving:false, // Custom property for movement
       				axis:0 // Custom property for X axis
    			 });
				Titanium.App.fireEvent('main-win-close');
				win5.open();
				navWindow = win5;
			} else if(menu_id == 6) {
 			 dlg.show();
			} else if(menu_id == 7) {
				var win7 = Titanium.UI.createWindow({  
   	    		backgroundColor:'#46a546',
    			url:'source_both/feed.js',
    			barColor: '#46a546',
    			width: Ti.Platform.displayCaps.platformWidth,
    			moving:false, // Custom property for movement
       			axis:0 // Custom property for X axis
				});
				Titanium.App.fireEvent('main-win-close');
				win7.topic_id = topic_id;
				win7.moodle = moodle;
				win7.entity_id = entity_id;
				win7.class_number = class_number;
				win7.open();
				navWindow = win7;
			} else if(menu_id == 2) {
				var win7 = Titanium.UI.createWindow({  
   	    		backgroundColor:'#46a546',
    			url:'source_both/feed.js',
    			barColor: '#46a546',
    			width: Ti.Platform.displayCaps.platformWidth,
    			moving:false, // Custom property for movement
       			axis:0 // Custom property for X axis
				});
				Titanium.App.fireEvent('main-win-close');
				win7.group_id = group_id;
				win7.group_name = group_name;
				win7.open();
				navWindow = win7;	
			} else if(menu_id == 8) {
				var win8 = Titanium.UI.createWindow({  
    				title:'Search Classes',
   	 				url:'source_both/search_topics.js',
   	 				backgroundColor:'#ecfaff',
   	 				width: Ti.Platform.displayCaps.platformWidth,
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
    				width: Ti.Platform.displayCaps.platformWidth,
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
            left:'260dp',
            duration:75,
            curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
       Titanium.App.fireEvent('nav-menu-button-toggle',{toggle:true});
    }
});

var dlg = Titanium.UI.createAlertDialog({
    			message:'Are you sure you want to logout', 
    			buttonNames: ['Logout','Cancel']
  			});
   			dlg.addEventListener('click', function(ev) {
   				 if (ev.index == 0) { 
   				 	Titanium.App.Properties.setString("logged_in", 'false');
   				 	fb.logout();
				reopenLogin();
				menuWindow.close();
				Titanium.App.fireEvent('main-win-close');
				navWindow.close();
   				 } else if (ev.index == 1) { // clicked "No"
					dlg.hide();
   				 }
 			 });

var menuMoodle = [];
var menuEntity = [];
var menuName = [];
var groupName = [];

function reopenLogin()	{
	win.open();
}
var menuTitles = [];
function reloadMenu(){
	menuWindow.add(menuTableView);
	menuWindow.open();
	menuTableView.data = [];
	xhr = getUserWithChildren(Titanium.App.Properties.getString('mmat'),Titanium.App.Properties.getString('userid'));
	xhr.onerror = function(){
		Titanium.App.Properties.setString("logged_in", 'false');
   				 	fb.logout();
				reopenLogin();
				menuWindow.close();
				Titanium.App.fireEvent('main-win-close');
				navWindow.close();
	};
	xhr.onload = function(){
	var response = this.responseText;
	user = JSON.parse(response);
	var section1HeaderView = Ti.UI.createView({ height: '30dp' });
    var section1HeaderLabel = Ti.UI.createLabel({ text: 'Menu', font:{fontSize:'14dp'}});
    section1HeaderView.add(section1HeaderLabel);
    var headerSection = Ti.UI.createTableViewSection({
                        headerView: section1HeaderView
                    });
	var fbRow1 = Titanium.UI.createTableViewRow({
 	         	header:'Menu',
 	         	id: 1,
                backgroundColor:'#252525',
				height:'40dp'
            });
var labelTitle = Titanium.UI.createLabel({
    			text:'Feed',
    			id: 1,
    			font:{fontSize:'16dp'},
    			color:'#e2e7ed',
   				width:'auto',
    			textAlign:'left',
    			left: '40dp'
			});
			var labelIcon = Titanium.UI.createImageView({
				image: Titanium.App.Properties.getString("photo_url"),
				id: 1,
				left: 4,
				height:'32dp',
				width:'32dp',
			});
fbRow1.add(labelIcon);
fbRow1.add(labelTitle);
var fbRow6 = Titanium.UI.createTableViewRow({
				header:'Settings',
                backgroundColor:'#252525',
                id: 6,
				height:'40dp'
            });
var labelTitle = Titanium.UI.createLabel({
    			text:'Log Out',
    			id: 6,
    			font:{fontSize:'16dp'},
    			color:'#e2e7ed',
   				width:'auto',
    			textAlign:'left',
    			left: '40dp'
			});
			var labelIcon = Titanium.UI.createImageView({
				image: 'images/exit.png',
				id: 6,
				left: 4,
				top: 4,
				height:'32dp',
				width:'32dp',
			});
fbRow6.add(labelIcon);
fbRow6.add(labelTitle);
var fbRow8 = Titanium.UI.createTableViewRow({
                backgroundColor:'#252525',
                id: 8,
				height:'40dp'
            });
var labelTitle = Titanium.UI.createLabel({
    			text:'Add Class....',
    			id: 8,
    			font:{fontSize:'16dp'},
    			color:'#e2e7ed',
   				width:'auto',
    			textAlign:'left',
    			left: '40dp'
			});
			var labelIcon = Titanium.UI.createImageView({
				image: 'images/emblem_library.png',
				id: 8,
				left: 4,
				top: 4,
				height:'32dp',
				width:'32dp',
			});
fbRow8.add(labelIcon);
fbRow8.add(labelTitle);
var fbRow11 = Titanium.UI.createTableViewRow({
                backgroundColor:'#252525',
                id: 11,
				height:'40dp'
            });
var labelTitle = Titanium.UI.createLabel({
    			text:'Add Group....',
    			id: 11,
    			font:{fontSize:'16dp'},
    			color:'#e2e7ed',
   				width:'auto',
    			textAlign:'left',
    			left: '40dp'
			});
			var labelIcon = Titanium.UI.createImageView({
				image: 'images/emblem_library.png',
				id: 11,
				left: 4,
				top: 4,
				height:'32dp',
				width:'32dp',
			});
fbRow11.add(labelIcon);
fbRow11.add(labelTitle);
var fbRow9 = Titanium.UI.createTableViewRow({
                backgroundColor:'#252525',
                id: 9,
				height:'40dp'
            });
var labelTitle = Titanium.UI.createLabel({
    			text:'Campus Map',
    			id: 9,
    			font:{fontSize:'16dp'},
    			color:'#e2e7ed',
   				width:'auto',
    			textAlign:'left',
    			left: '40dp'
			});
			var labelIcon = Titanium.UI.createImageView({
				image: 'images/04_maps.png',
				id: 9,
				left: 4,
				top: 4,
				height:'32dp',
				width:'32dp',
			});
fbRow9.add(labelIcon);
fbRow9.add(labelTitle);
var fbRow10 = Titanium.UI.createTableViewRow({
                backgroundColor:'#252525',
                id: 10,
				height:'40dp'
            });
var labelTitle = Titanium.UI.createLabel({
    			text:'Moodle Account',
    			id: 10,
    			font:{fontSize:'16dp'},
    			color:'#e2e7ed',
   				width:'auto',
    			textAlign:'left',
    			left: '40dp'
			});
var labelIcon = Titanium.UI.createImageView({
				image: 'images/run.png',
				id: 10,
				left: 4,
				top: 4,
				height:'32dp',
				width:'32dp',
			});
fbRow10.add(labelIcon);
fbRow10.add(labelTitle);
//if(Titanium.App.Properties.getString("moodle_entity_2") == 2){
//menuTitles = [fbRow1, fbRow9] } else{
	menuTitles = [fbRow1];
//}
	for(c=0;c<user.topic_users.length;c++){
            var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#252525',
                id: 7,
				height:'40dp',
				moodle: false,
				number: user.topic_users[c].topic.number,
				entity_id: user.topic_users[c].topic.entity_id,
				extraData: user.topic_users[c].topic.id
            });
            
            if (c==0){fbRow.header = 'Classes'}
			var labelTitle = Titanium.UI.createLabel({
    			text:user.topic_users[c].topic.number,
    			id: 7,
    			font:{fontSize:'16dp'},
    			color:'#e2e7ed',
   				width:'auto',
    			textAlign:'left',
    			left: '40dp',
    			moodle: false,
    			entity_id: user.topic_users[c].topic.entity_id,
    			number:user.topic_users[c].topic.number,
                extraData: user.topic_users[c].topic.id
			});
			var labelIcon = Titanium.UI.createImageView({
				image: 'images/emblem_library.png',
				id: 7,
				left: 4,
				top: 4,
				height:'32dp',
				width:'32dp',
				moodle: false,
				entity_id: user.topic_users[c].topic.entity_id,
    			number:user.topic_users[c].topic.number,
                extraData: user.topic_users[c].topic.id
			});
			fbRow.add(labelIcon);
			fbRow.add(labelTitle);
			menuName[user.topic_users[c].topic.id] = user.topic_users[c].topic.number;
			moodle_entity_string = "moodle_entity_" + user.topic_users[c].topic.entity_id;
			moodle_url_string = "moodle_url_" + user.topic_users[c].topic.entity_id;
			if (user.topic_users[c].topic.entity_id == Titanium.App.Properties.getString(moodle_entity_string)){
				fbRow.moodle = true;
				labelTitle.moodle = true;
				labelIcon.moodle = true;
				menuMoodle[user.topic_users[c].topic.id] = Titanium.App.Properties.getString(moodle_url_string);
				menuEntity[user.topic_users[c].topic.entity_id] = user.topic_users[c].topic.entity_id;
			}
			fbRow.add(labelTitle);
            menuTitles.push(fbRow);
        }
      //  menuTitles.push(fbRow8);
        for(c=0;c<user.group_users.length;c++){
            var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#252525',
                id: 2,
				height:'40dp',
				moodle: false,
				extraData: user.group_users[c].group.id
            });
            if (c==0){fbRow.header = 'Groups'}
			var labelTitle = Titanium.UI.createLabel({
    			text:user.group_users[c].group.name,
    			name:user.group_users[c].group.name,
    			id: 2,
    			font:{fontSize:'16dp'},
    			color:'#e2e7ed',
   				width:'auto',
    			textAlign:'left',
    			left: '40dp',
    			moodle: false,
                extraData: user.group_users[c].group.id
			});
			var labelIcon = Titanium.UI.createImageView({
				image: 'images/emblem_library.png',
				id: 2,
				left: 4,
				top: 4,
				height:'32dp',
				width:'32dp',
				moodle: false,
				name: user.group_users[c].group.name,
                extraData: user.group_users[c].group.id
			});
			fbRow.add(labelIcon);
			groupName[user.group_users[c].group.id] = user.group_users[c].group.name;
			fbRow.add(labelTitle);
            menuTitles.push(fbRow);
        }
    //    menuTitles.push(fbRow11);
        menuTitles.push(fbRow6);
   if(Titanium.App.Properties.getString("moodle_entity_2") != null)
   {
		menuTitles.push(fbRow10);
		}
		menuTableView.data = menuTitles;
	}
	xhr.send();
}

var user = '';
fb.addEventListener('login', function(e) {
	    if (e.data != null ){
		Titanium.App.Properties.setString("fbid",e.data["id"]);	
		}
		xhr = postLogin(fb.accessToken)
		xhr.onload = function(){
			var response = this.responseText;
			var user = JSON.parse(response);
			for (i=0;i<user.entity_users.length;i++){
				if (user.entity_users[i].entity.moodle_url != null)
				{
					moodle_entity_string = "moodle_entity_" + user.entity_users[i].entity.id;
					moodle_url_string = "moodle_url_" + user.entity_users[i].entity.id;
					entity_user_string = "entity_user_" + user.entity_users[i].id;
					Titanium.App.Properties.setString(moodle_entity_string,user.entity_users[i].entity.id);
					Titanium.App.Properties.setString(moodle_url_string,user.entity_users[i].entity.moodle_url);
					Titanium.App.Properties.setString(entity_user_string,user.entity_users[i].id);
				}	
			}
			Titanium.App.Properties.setString("logged_in", 'true');
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
				top: '50dp',
			});
}
win.add(pict);


	var loginButton = Ti.UI.createButton(
	{
    	title: 'Login',
   		toggle:false,
    	width:200,
    	height: '45dp',
		bottom: '15dp'
	});
	loginButton.addEventListener('click',function(e){
		var win_height = '400dp';
   		var win_width = Ti.Platform.displayCaps.platformWidth * .85;
 		var headerLabel = Ti.UI.createLabel({
		text:"Please login below",
		color: '#000000',
		font:{fontSize:'16dp',fontWeight:'bold'},
		textAlign:'center',
		box: true,
		top: 15
	});
	var seperatorPhone = Ti.UI.createView({
					backgroundColor: "#808080",
					width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 10,
					top: 7,
					box: true,
					height:2,
				});
	var email = Titanium.UI.createTextField({
   	 	font:{fontSize:18,fontWeight:'bold'},
   	 	height:'35dp',
    	hintText: 'Email',
    	width:250,
    	top: 10,
    	bottom: 10,
    	box:true,
    	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var password = Titanium.UI.createTextField({
   	 	font:{fontSize:18,fontWeight:'bold'},
   	 	height:'35dp',
    	hintText: 'Password',
    	passwordMask:true,
    	width:250,
    	bottom: 20,
    	box:true,
    	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var signinButton = Ti.UI.createButton(
	{
    	title: 'Login',
   		toggle:false,
    	font:{fontSize:18,fontWeight:'bold'},
   	 	height:'35dp',
    	box:true,
    	width:200,

	});
	signinButton.addEventListener('click',function(e){
	
	    var postData = {'email': email.value, 'password': password.value};
		xhr = postLogin("",postData)
		xhr.onload = function(){
			var response = this.responseText;
			var user = JSON.parse(response);
			for (i=0;i<user.entity_users.length;i++){
				if (user.entity_users[i].entity.moodle_url != null)
				{
					moodle_entity_string = "moodle_entity_" + user.entity_users[i].entity.id;
					moodle_url_string = "moodle_url_" + user.entity_users[i].entity.id;
					entity_user_string = "entity_user_" + user.entity_users[i].id;
					Titanium.App.Properties.setString(moodle_entity_string,user.entity_users[i].entity.id);
					Titanium.App.Properties.setString(moodle_url_string,user.entity_users[i].entity.moodle_url);
					Titanium.App.Properties.setString(entity_user_string,user.entity_users[i].id);
				}	
			}
			Titanium.App.Properties.setString("logged_in", 'true');
			Titanium.App.Properties.setString("name",user.name);
			Titanium.App.Properties.setString("num_entities",user.entity_users.length);
			Titanium.App.Properties.setString("num_topics",user.topic_users.length);
			Titanium.App.Properties.setString("userid",user.id);
			Titanium.App.Properties.setString("mmat", user.access_token);
			Titanium.App.Properties.setString("photo_url", user.photo_url);
			email.blur();
			password.blur();
			redirectAfterLogin();
			
		};
		xhr.onerror = function(e){
			alert('Login failed, please check credentials and try again.');
		}
		xhr.send(JSON.stringify(postData));
			})
				var orLabel2 = Ti.UI.createLabel({
				text:"or",
				font:{fontSize:'16dp',fontWeight:'bold'},
				color: '#000000',
				box: true,
				top: 10
			}); 
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
   		 view.add(headerLabel);
   		 view.add(seperatorPhone);
   		 view.add(email);
   		 view.add(password);
   		 view.add(signinButton);
   		 view.add(orLabel2);
   		 view.add(fb.createLoginButton({
				style:fb.BUTTON_STYLE_WIDE,
				height: '35dp',
				top: 10
	}));
   		 shareWhoModal2.add(view);
		 shareWhoModal2.addEventListener('click', function(e)
		 {
			if(e.source.box != true)
			{
   				shareWhoModal2.close();
 			}
		 });
		 shareWhoModal2.open();
	})
		
	var signupButton = Ti.UI.createButton(
	{
    	title: 'Sign Up',
   		toggle:false,
    	width:200,
		bottom: '80dp',
		height: '45dp'
	});
	signupButton.addEventListener('click',function(e){
		var win_height = '400dp';
   		var win_width = Ti.Platform.displayCaps.platformWidth * .85;
   		var namesa = Titanium.UI.createTextField({
   		font:{fontSize:18,fontWeight:'bold'},
   	 	height:'35dp',
    	hintText: 'First and Last Name',
    	width:250,
    	box: true,
    	top: 10,
    	bottom: 10,
    	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
   	var emailsa = Titanium.UI.createTextField({
   	 	font:{fontSize:18,fontWeight:'bold'},
   	 	height:'35dp',
    	hintText: 'School Email',
    	width:250,
    	box: true,
    	bottom: 10,
    	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var passwordsa = Titanium.UI.createTextField({
   	 	font:{fontSize:18,fontWeight:'bold'},
   	 	height:'35dp',
    	hintText: 'Password',
    	box: true,
    	passwordMask:true,
    	width:250,
    	bottom: 10,
    	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var passwordconfsa = Titanium.UI.createTextField({
   	 	font:{fontSize:18,fontWeight:'bold'},
   	 	height:'35dp',
    	hintText: 'Confirm Password',
    	box: true,
    	passwordMask:true,
    	width:250,
    	bottom: 20,
    	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var finishsignupButton = Ti.UI.createButton(
	{
    	title: 'Finish Sign Up',
   		toggle:false,
    	font:{fontSize:18,fontWeight:'bold'},
   	 	height:'37dp',
    	box: true,
    	width:200,

	});
	finishsignupButton.addEventListener('click', function(e){
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.edu$/; 
		if(reg.test(emailsa.value) == false) {
		   alert("This is not a valid educational email.");
		} else if (passwordsa.value != passwordconfsa.value) {
		   alert("Passwords don't match.");
		}  else if (namesa.value.length < 4) {
		   alert("Please enter your first and last name.");
		} else {
			var postData = {'name': namesa.value, 'email': emailsa.value, 'password': passwordsa.value, 'password_confirmation': passwordconfsa.value};
			xhr = postCreateUser(postData)
			xhr.onload = function(e){
				    var response = this.responseText;
					var user = JSON.parse(response);
					for (i=0;i<user.entity_users.length;i++){
						if (user.entity_users[i].entity.moodle_url != null)
						{
							moodle_entity_string = "moodle_entity_" + user.entity_users[i].entity.id;
							moodle_url_string = "moodle_url_" + user.entity_users[i].entity.id;
							entity_user_string = "entity_user_" + user.entity_users[i].id;
							Titanium.App.Properties.setString(moodle_entity_string,user.entity_users[i].entity.id);
							Titanium.App.Properties.setString(moodle_url_string,user.entity_users[i].entity.moodle_url);
							Titanium.App.Properties.setString(entity_user_string,user.entity_users[i].id);
						}	
					}
					Titanium.App.Properties.setString("logged_in", 'true');
					Titanium.App.Properties.setString("name",user.name);
					Titanium.App.Properties.setString("num_entities",user.entity_users.length);
					Titanium.App.Properties.setString("num_topics",user.topic_users.length);
					Titanium.App.Properties.setString("userid",user.id);
					Titanium.App.Properties.setString("mmat", user.access_token);
					Titanium.App.Properties.setString("photo_url", user.photo_url);
					
				    var win4 = Titanium.UI.createWindow({  
   						url:'source_both/finish_verification.js',
    					barColor: '#46a546',
   	    				backgroundColor:'#ecfaff',
    			 	});
					shareWhoModal3.close();
					win4.open();
					navWindow = win4;
			}
			xhr.onerror = function(e){
				var response = this.responseText;
				jres = JSON.parse(response);
				alert(jres.error.message);
			}
			namesa.blur();
    		emailsa.blur();
    		passwordsa.blur();
    		passwordconfsa.blur();
			xhr.send(JSON.stringify(postData));


		}
	})
	var headerLabel = Ti.UI.createLabel({
		text:"Provide the information below to finish signup",
		color: '#000000',
		font:{fontSize:'16dp',fontWeight:'bold'},
		box: true,
		textAlign:'center',
		top: 15
	});
	var seperatorPhone = Ti.UI.createView({
					backgroundColor: "#808080",
					width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 10,
					top: 7,
					box: true,
					height:2,
				});
		var orLabel2 = Ti.UI.createLabel({
				text:"or",
				font:{fontSize:'16dp',fontWeight:'bold'},
				color: '#000000',
				box: true,
				top: 10
			});
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
   		 view.add(headerLabel);
   		 view.add(seperatorPhone);
   		 view.add(namesa);
   		 view.add(emailsa);
   		 view.add(passwordsa);
   		 view.add(passwordconfsa);
   		 view.add(finishsignupButton);
   		 view.add(orLabel2);
   			 view.add(fb.createLoginButton({
				style:fb.BUTTON_STYLE_WIDE,
				height: '35dp',
				top: 10
	}));
   		 shareWhoModal3.add(view);
		 shareWhoModal3.addEventListener('click', function(e)
		 {
			if(e.source.box != true)
			{
   				shareWhoModal3.close();
 			}
		 });
		 shareWhoModal3.open();
	})
	win.add(loginButton);
	win.add(signupButton);

if(Titanium.App.Properties.getString("logged_in") == 'true')
{
	redirectAfterLogin();
} else {
	win.open();
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
 		var env = 'development';
 		if(Ti.App.Properties.getString('production')=='true'){
 			env = 'production'
 		}
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
	shareWhoModal2.close();
	shareWhoModal3.close();
//// ---- Window with navigationGroup


var win1 = Titanium.UI.createWindow({  
    url:'source_both/feed.js',
    barColor: '#46a546',
    width:Ti.Platform.displayCaps.platformWidth,
    backgroundColor:"#e2e7ed",
    moving:false, // Custom property for movement
    axis:0 // Custom property for X axis
});
	var win4 = Titanium.UI.createWindow({  
    				title:'Confirm School Email',
   					url:'source_both/finish_verification.js',
    				barColor: '#46a546',
    				modal: true,
   	    			backgroundColor:'#ecfaff',
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
win.open();
navWindow = win4;
navWindow.open();

//} else if (Titanium.App.Properties.getString("num_entities") > 0 && Titanium.App.Properties.getString("moodle_entity_id") != false && Titanium.App.Properties.getString("num_topics") == 0){
	
//navWindow = win9;

} else {
navWindow = win1;
navWindow.open();
win.close();
}


}


