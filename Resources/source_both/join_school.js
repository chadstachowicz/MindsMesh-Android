Ti.include("model/api.js");
var win = Titanium.UI.currentWindow;
win.barColor = '#46a546';

var btnPost = Titanium.UI.createButton({
	title:'Finish',
});
win.setRightNavButton(btnPost);
var menuButton = Ti.UI.createButton({
    title:'Menu',
    toggle:false // Custom property for menu toggle
});
//win.setLeftNavButton(menuButton);

menuButton.addEventListener('click', function(e){
    Titanium.App.fireEvent('nav-menu-button',{data:e.source.toggle});
});
Titanium.App.addEventListener('nav-menu-button-toggle', function(e)
{
	menuButton.toggle = e.toggle;
});
Titanium.App.addEventListener('main-win-close', function(e)
{
	win.navGroup.close(win);
});

var data = [];

btnPost.addEventListener('click', function(e){
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.edu$/; 
		if(reg.test(ta1.value) == false) {
		   alert("This is not a valid educational email.");
		} else {
			var postData = {'email':ta1.value};
			xhr = postEntityJoin(Titanium.App.Properties.getString('mmat'),postData)
			xhr.onload = function(){
				var response = this.responseText;
				var win1 = Titanium.UI.createWindow({  
   							url:'finish_verification.js',
    						barColor: '#46a546',
    						navGroup: win.navGroup,
   	    					backgroundColor:"#e2e7ed"
    			 		});
				win.navGroup.open(win1,{animated:false});

			};
			xhr.send(JSON.stringify(postData));	
		
	}
});
if (Titanium.Platform.osname == 'iphone')
{
	var ta1 = Titanium.UI.createTextField({
	editable: true,
	hintText:"Enter your school email to confirm.",
	top:0,
	left:55,
	height: 40,
	width: (Titanium.Platform.displayCaps.platformWidth - 55),
	textAlign:'left'
	});
	
var pict = Titanium.UI.createImageView({
				image: Titanium.App.Properties.getString('photo_url'),
				top: 0,
				left: 0,
				height:50,
				width:50,
			});
} else {
	var ta1 = Titanium.UI.createTextField({
	editable: true,
	hintText:"Enter your school email to confirm.",
	top:0,
	left:80,
	height: 40,
	width: (Titanium.Platform.displayCaps.platformWidth - 75),
	textAlign:'left',
	font:{fontSize:16}
	});
var pict = Titanium.UI.createImageView({
				image: Titanium.App.Properties.getString('photo_url'),
				top: 0,
				left: 0,
				height:75,
				width:75,
			});
}


hintText:"Enter your school email to confirm.",
win.add(pict);
win.add(ta1);

win.addEventListener("open", function(e) {
	ta1.focus();
});
ta1.addEventListener('return', function(e)
{
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.edu$/; 
		if(reg.test(ta1.value) == false) {
		   alert("This is not a valid educational email.");
		} else {
			xhr = postJoinEntity(Titanium.App.Properties.getString('mmat'),postData)
			xhr.onload = function(){
				var response = this.responseText;
				var win1 = Titanium.UI.createWindow({  
   							url:'finish_verification.js',
    						barColor: '#46a546',
    						navGroup: win.navGroup,
   	    					backgroundColor:"#e2e7ed"
    			 		});
    			 		alert('test');
				win.navGroup.open(win1,{animated:false});

			};
			xhr.send(JSON.stringify(postData));
	}
});



