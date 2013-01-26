Ti.include("model/api.js");
var win = Titanium.UI.currentWindow;
win.layout = 'absolute';

var btnCreate = Titanium.UI.createButton({
	title:'Finish',
});

win.setRightNavButton(btnCreate);

var selectedId = 0;
var pickerSelected = 0;
var timesfired = 0;



var data = [];
xhr = getUserWithChildren(Titanium.App.Properties.getString('mmat'),Titanium.App.Properties.getString('userid'));
xhr.onload = function(){
	var response = this.responseText;
	var user = JSON.parse(response);
	for(c=0;c<user.entity_users.length;c++){
            data[c]=Ti.UI.createPickerRow({title:user.entity_users[c].entity.name,entity_user_id:user.entity_users[c].id});
        }
        var picker = Ti.UI.createPicker({
			bottom: 0,
			//height: 160,
			width: Titanium.UI.FILL
		});
       // turn on the selection indicator (off by default)
	picker.selectionIndicator = true;
	
	var tr = Titanium.UI.create2DMatrix();
tr = tr.rotate(90);
 
var drop_button =  Titanium.UI.createButton({
		style:Titanium.UI.iPhone.SystemButton.DISCLOSURE,
		transform:tr
});

if(Titanium.Platform.osname == 'iphone'){
var my_combo = Titanium.UI.createTextField({
	hintText:"Please Select a School",
	height:40,
	top: 8,
	width: 320,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	rightButton:drop_button,
	rightButtonMode:Titanium.UI.INPUT_BUTTONMODE_ALWAYS
});
} else {
	var my_combo = Titanium.UI.createTextField({
	hintText:"Please Select a School",
	height:40,
	top: 8,
	width: 750,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	rightButton:drop_button,
	rightButtonMode:Titanium.UI.INPUT_BUTTONMODE_ALWAYS
});
}
win.add(my_combo);
win.add(ta1);
win.add(ta2);


	picker.add(data);
	win.add(picker);
	picker.hide();
	
	picker.addEventListener('change', function(e){
	pickerSelected = e.row;
	selectedId = picker.getSelectedRow(0).entity_user_id;
	my_combo.value = picker.getSelectedRow(0).title;
	});
	ta1.addEventListener("focus", function(e) {
	picker.hide();
});
ta1.addEventListener('return', function(e)
{
	ta2.blur();
});
ta2.addEventListener("focus", function(e) {
	picker.hide();
});
ta2.addEventListener('return', function(e)
{
	ta2.blur();
});
ta1.addEventListener('return', function(e)
{
		ta1.blur();
});
my_combo.addEventListener("focus", function(e) {
	drop_button.fireEvent('click');
	my_combo.blur();
});
drop_button.addEventListener("click", function(e) {
	ta1.blur();
	ta2.blur();
	my_combo.blur();
	picker.show();
	if (timesfired == 0){
		picker.setSelectedRow(0,0,true);
	}
	timesfired++;

});

}
xhr.send();
var data = [];
if(Titanium.Platform.osname == 'iphone'){
var ta1 = Titanium.UI.createTextField({
	hintText:"Number (i.e. CHEM 1241)",
	top:52,
	height:40,
	width: 320,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	
});
var ta2 = Titanium.UI.createTextField({
	hintText:"Name (i.e. Introduction to Chemistry)",
	top:96,
	height:40,
	width: 320,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	
});
} else {
	var ta1 = Titanium.UI.createTextField({
	hintText:"Number (i.e. CHEM 1241)",
	top:52,
	height:40,
	width: 750,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	
});
var ta2 = Titanium.UI.createTextField({
	hintText:"Name (i.e. Introduction to Chemistry)",
	top:96,
	height:40,
	width: 750,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	
});
}


btnCreate.addEventListener('click', function(e){
		if(ta1.value.length < 5)
		{
			alert("Your class number must be at least 5 characters.");
		} else if (pickerSelected == 0)
		{
			alert("Please select a university before creating class.");
		} else if (ta2.value.length < 5)
		{
			alert("Your class name must be at least 5 characters.");
		} else {
		var postData = {'topic': {'entity_user_id': selectedId,
						'title' :ta2.value, 'number': ta1.value}
		};
		xhr = postTopicCreate(Titanium.App.Properties.getString('mmat'),postData);
		xhr.onload = function(){
			var response = this.responseText;
			var test = JSON.parse(response);
			win.navGroup.close(win);
		};
		xhr.send(JSON.stringify(postData));
		
	}
});




