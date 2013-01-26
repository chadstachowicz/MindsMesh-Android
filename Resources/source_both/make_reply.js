Ti.include("model/api.js");
var win = Titanium.UI.currentWindow;
win.layout = 'vertical';

var btnPost = Titanium.UI.createButton({
	title:'Finish',
});
win.setRightNavButton(btnPost);

var data = [];
if (Titanium.Platform.osname == 'iphone')
{
var ta1 = Titanium.UI.createTextArea({
	editable: true,
	top:-50,
	left:55,
	height: 155,
	width: (Titanium.Platform.displayCaps.platformWidth - 55),
	backgroundColor:'#ecfaff',
	color:'#888',
	textAlign:'left',
	appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,	
//	keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
//	returnKeyType:Titanium.UI.RETURNKEY_SENDRETURNKEY_EMERGENCY_CALL,
	suppressReturn:false
	
});
var pict = Titanium.UI.createImageView({
				image: Titanium.App.Properties.getString('photo_url'),
				top: 0,
				left: 0,
				height:50,
				width:50,
			});
			win.add(pict);
win.add(ta1);
} else {
	var ta1 = Titanium.UI.createTextArea({
	editable: true,
	top:-75,
	left:80,
	height: 155,
	width: (Titanium.Platform.displayCaps.platformWidth - 75),
	backgroundColor:'#ecfaff',
	color:'#888',
	textAlign:'left',
	appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,	
    font:{fontSize:16},
	suppressReturn:false
	
});
var pict = Titanium.UI.createImageView({
				image: Titanium.App.Properties.getString('photo_url'),
				top: 0,
				left: 0,
				height:75,
				width:75,
			});
			win.add(pict);
win.add(ta1);
}	
btnPost.addEventListener('click', function(e){
		if(ta1.value.length < 1)
		{
			alert("Your post must be at least 1 character");
		} else {
		var postData = {'reply': {'text' :ta1.value}};
		xhr = postReplyCreate(Titanium.App.Properties.getString("mmat"),win.postid,postData)
		xhr.onload = function(){
			var response = this.responseText;
			var test = JSON.parse(response);
			win.navGroup.close(win);

		};
		xhr.send(JSON.stringify(postData));
		
	}
});
setTimeout(function(e){    
            ta1.focus();
            },500);




