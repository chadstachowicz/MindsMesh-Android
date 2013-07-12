Ti.include("model/api.js");
var win = Titanium.UI.currentWindow;
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
			bar.add(border);
win.add(bar);
var btnPost = Titanium.UI.createButton({
	title:'Finish',
	height: '36dp',
    width:'60dp',
    color: '#ffffff',
	backgroundColor:'#347235',
	borderWidth: 1,
	borderColor: 'black',
	borderRadius: 2,
	right: '5dp'
});
bar.add(btnPost);
var menuButton = Ti.UI.createButton({
    title:'Menu',
    toggle:false // Custom property for menu toggle
});

menuButton.addEventListener('click', function(e){
    Titanium.App.fireEvent('nav-menu-button',{data:e.source.toggle});
});
Titanium.App.addEventListener('nav-menu-button-toggle', function(e)
{
	menuButton.toggle = e.toggle;
});
Titanium.App.addEventListener('main-win-close', function(e)
{
	win.close();
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
				alert(response);
				var win1 = Titanium.UI.createWindow({  
   							url:'finish_verification.js',
    						barColor: '#46a546',
   	    					backgroundColor:"#e2e7ed"
    			 		});
				win1.open();
				win.close();

			};
			xhr.send(JSON.stringify(postData));	
		
	}
});
var ta1 = Titanium.UI.createTextArea({
	editable: true,
	top:'44dp',
	left:'65dp',
	height: 155,
	width: (Titanium.Platform.displayCaps.platformWidth - 55),
	backgroundColor:'#ecfaff',
	color:'#888',
	textAlign:'left',
	appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,	
	suppressReturn:false
	
});
var pict = Titanium.UI.createImageView({
				image: Titanium.App.Properties.getString('photo_url'),
				top: '44dp',
				left: 0,
				height:'50dp',
				width:'50dp',
			});


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
   	    					backgroundColor:"#e2e7ed"
    			 		});
    			 		alert('test');
				win1.open();

			};
			xhr.send(JSON.stringify(postData));
	}
});



