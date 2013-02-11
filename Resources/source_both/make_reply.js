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

var btnPost = Titanium.UI.createButton({
	title:'Finish',
	height: 30,
    width:'auto',
	backgroundColor:'#347235',
	borderWidth: 1,
	borderColor: 'black',
	borderRadius: 2,
	right: 10
});
bar.add(btnPost);

var data = [];
if (Titanium.Platform.osname == 'iphone')
{
var ta1 = Titanium.UI.createTextArea({
	editable: true,
	top:44,
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
				top: 44,
				left: 0,
				height:50,
				width:50,
			});
			win.add(pict);
win.add(ta1);
} else {
	var ta1 = Titanium.UI.createTextArea({
	editable: true,
	top:44,
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
				top: 44,
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
			win.close();

		};
		xhr.send(JSON.stringify(postData));
		
	}
});
setTimeout(function(e){    
            ta1.focus();
            },500);




