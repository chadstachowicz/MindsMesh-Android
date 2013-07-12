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

var data = [];
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
			win.add(pict);
win.add(ta1);

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




