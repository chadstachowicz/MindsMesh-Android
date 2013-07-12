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
	title: 'Finish',
	height: '36dp',
    width:'60dp',
    color: '#ffffff',
	backgroundColor:'#347235',
	borderWidth: 1,
	borderColor: 'black',
	borderRadius: 2,
	right: '5dp'
});
var selectedId = 0;
bar.add(btnPost);


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
var pickerSelected = 0;
var timesfired = 0;
var data = [];
win.addEventListener('focus', function(e){
	ta1.focus();
});
btnPost.addEventListener('click', function(e){
		if(ta1.value.length >= 5)
		{				if(win.topic_id != null)
				{
					var postData = {'topic_id': win.topic_id, 'text': ta1.value};
				} else if (win.group_id != null) {		
					var postData = {'group_id': win.group_id, 'text': ta1.value};
				} else {					
					var postData = {'text': ta1.value};
				}
				
				xhr = postPostCreate(Titanium.App.Properties.getString('mmat'),postData);
			xhr.onload = function(){
				var response = this.responseText;
				alert(response);
				var test = JSON.parse(response);
				if (win.source == 'class_feed'){
					Titanium.App.fireEvent('event_three',{data:'posted'});
				} else {
					Titanium.App.fireEvent('event_one',{data:'posted'});
				}
				win.close();

			};
			xhr.send(postData);
				
			
		} else {
			alert("A reasonable post should have at least 5 chars.")
		}
			
		
});




