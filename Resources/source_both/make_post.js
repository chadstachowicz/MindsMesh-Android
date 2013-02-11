Ti.include("model/api.js");
var win = Titanium.UI.currentWindow;
win.layout = 'absolute';
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
var selectedId = 0;
bar.add(btnPost);


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
//	keyboardType:Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
//	returnKeyType:Titanium.UI.RETURNKEY_SENDRETURNKEY_EMERGENCY_CALL,
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
}	
win.add(pict);		
win.add(ta1);
var pickerSelected = 0;
var timesfired = 0;
var data = [];
xhr = getUserWithChildren(Titanium.App.Properties.getString('mmat'),Titanium.App.Properties.getString('userid'));
xhr.onload = function(){
	var response = this.responseText;
	var user = JSON.parse(response);
	for(c=0;c<user.topic_users.length;c++){
            data[c]=Ti.UI.createPickerRow({title:user.topic_users[c].topic.name,topic_user_id:user.topic_users[c].id});
        }
       // turn on the selection indicator (off by default)
		var picker = Ti.UI.createPicker({
			bottom: 0,
			height: 200,
			width: Titanium.UI.FILL
		});
		picker.SelectionIndicator = true;

		var tr = Titanium.UI.create2DMatrix();
		tr = tr.rotate(90);
 
		var drop_button =  Titanium.UI.createButton({
			style:Titanium.UI.iPhone.SystemButton.DISCLOSURE,
			transform:tr
		});
if(Titanium.Platform.osname == 'iphone'){
var my_combo = Titanium.UI.createTextField({
	hintText:"Please Select a class",
	height:40,
	bottom: 220,
	width: 320,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	rightButton:drop_button,
	rightButtonMode:Titanium.UI.INPUT_BUTTONMODE_ALWAYS
});
} else {
	var my_combo = Titanium.UI.createTextField({
	hintText:"Please Select a class",
	height:40,
	width: 750,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	rightButton:drop_button,
	rightButtonMode:Titanium.UI.INPUT_BUTTONMODE_ALWAYS
});
}

win.add(my_combo);
	picker.add(data);
	win.add(picker);
	picker.hide();
my_combo.addEventListener("focus", function(e) {
	drop_button.fireEvent('click');
});
ta1.addEventListener("focus", function(e) {
	my_combo.blur();
	picker.hide();
});
drop_button.addEventListener("click", function(e) {
	picker.show();
	ta1.blur();
	my_combo.blur();
	if (timesfired == 0){
		picker.setSelectedRow(0,0,true);
	}
	timesfired++;
});
picker.addEventListener('change', function(e){
	pickerSelected = e.row;
	my_combo.value = picker.getSelectedRow(0).title;
	selectedId = picker.getSelectedRow(0).topic_user_id;
	my_combo.enabled = true;
});
picker.addEventListener('focus', function(e){
	my_combo.blur();
	my_combo.enabled = false;
});
ta1.focus();
}

xhr.send();


btnPost.addEventListener('click', function(e){
		if(ta1.value.length < 10)
		{
			alert("Your post must be at least 10 characters");
		} else if (pickerSelected == 0)
		{
			alert("Please select a class before posting");
		} else {
		var postData = {'post':{'topic_user_id': selectedId, 'text' :ta1.value}};
		xhr = postPostCreate(Titanium.App.Properties.getString('mmat'),postData);
		xhr.onload = function(){
			var response = this.responseText;
			var test = JSON.parse(response);
			if (win.source == 'class_feed'){
				Titanium.App.fireEvent('event_three',{data:'posted'});
			} else {
				Titanium.App.fireEvent('event_one',{data:'posted'});
			}
			win.close();

		};
		xhr.send(JSON.stringify(postData));
		
	}
});




