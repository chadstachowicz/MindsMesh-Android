Ti.include("model/api.js");
var win = Titanium.UI.currentWindow;
win.layout = 'vertical';
var menuButton = Ti.UI.createButton({
    image:'../images/Paragraph-Justify.png',
    toggle:false // Custom property for menu toggle
});
win.setLeftNavButton(menuButton);

menuButton.addEventListener('click', function(e){
	if(menuButton.toggle == false)
	{
		ta1.touchEnabled = false;
		ta2.touchEnabled = false;
	} else {
		ta1.touchEnabled = true;
		ta2.touchEnabled = true;
	}
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

var btnCreate = Titanium.UI.createButton({
	title:'Verify',
});

win.setRightNavButton(btnCreate);



var importWiz = Titanium.UI.createButton({
            		title: 'Start Import Wizard',
            		top: 17,
            		width: 230,
					height: 30,
					backgroundColor: '#46a546',
					backgroundImage: 'none',
					borderRadius: 10,
					font:{fontWeight:'bold',fontSize:12, color: '#fff'}
					});
					importWiz.addEventListener('click', function(e)
					{
						if (Titanium.App.Properties.hasProperty('moodle-user') == false || Titanium.App.Properties.hasProperty('moodle-user') == 0 || Titanium.App.Properties.hasProperty('moodle-pass') == false || Titanium.App.Properties.hasProperty('moodle-pass') == 0)
  					{
  						alert('Please fill in moodle credentials and verify them first.');
  					}else {
						var win1 = Titanium.UI.createWindow({  
    				title:'Select Classes',
   	 				url:'moodle_add_classes.js',
   	 				backgroundColor:'#ecfaff',
   	 				navGroup: win.navGroup,
   	 				layout:'absolute',
   	 				barColor: '#46a546'
					});
					win.navGroup.open(win1,{animated:false});
					}
					});
					importWiz.addEventListener('touchstart', function(){
						this.setBackgroundColor('blue');
					});
					importWiz.addEventListener('touchend', function(){
						this.setBackgroundColor('#46a546');
					});

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
win.add(label1);
win.add(ta1);
win.add(label2);
win.add(ta2);
win.add(importWiz);

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
var label1 = Titanium.UI.createLabel({
	text: 'Moodle Username',
	top: 5,
	height:40,
	width: 320,
	
});
var ta1 = Titanium.UI.createTextField({
	value: Titanium.App.Properties.getString('moodle-user'),
	hintText:"Moodle Username",
	top: 5,
	height:40,
	width: 320,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	
});
var label2 = Titanium.UI.createLabel({
	text: 'Moodle Password',
	top: 5,
	height:40,
	width: 320,
	
});
var ta2 = Titanium.UI.createTextField({	
	value: Titanium.App.Properties.getString('moodle-pass'),
	hintText:"Moodle Password",
	passwordMask: true,
	top: 5,
	height:40,
	width: 320,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	
});
} else {
	var label1 = Titanium.UI.createLabel({
	text: 'Moodle Username',
	top: 10,
	height:40,
	width: 320,
	
});
	var ta1 = Titanium.UI.createTextField({
	value: Titanium.App.Properties.getString('moodle-user'),
	hintText:"Moodle Username",
	top: 10,
	height:40,
	width: 750,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	
});
var label2 = Titanium.UI.createLabel({
	text: 'Moodle Username',
	top: 10,
	height:40,
	width: 320,
	
});
var ta2 = Titanium.UI.createTextField({
	value: Titanium.App.Properties.getString('moodle-pass'),
	hintText:"Moodle Password",
	passwordMask: true,
	top: 10,
	height:40,
	width: 750,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	
});
}


btnCreate.addEventListener('click', function(e){
		if(ta1.value.length < 4)
		{
			alert("You must enter a Moodle username.");
	//	} else if (pickerSelected == 0)
	//	{
	//		alert("Please select a university before creating class.");
		} else if (ta2.value.length < 5)
		{
			alert("You must enter a Moodle password.");
		} else {
			var postData = {username: ta1.value, password: ta2.value};
			xhr = postLoginToMoodle(Titanium.App.Properties.getString("moodle_url"),postData);
			xhr.onload = function(){
			var response = this.responseText;
			var regexSess = /Your\ssession\shas/;
var regexSess2 = /your\slogin\ssession/;
			var regexLog = /Invalid\slogin/;
			if(response.match(regexSess2)) {
				xhr = postLoginToMoodle(Titanium.App.Properties.getString("moodle_url"),postData);
				xhr.onload = function(){
					var response2 = this.responseText;
					redirectToWizard();
				};
				xhr.send(postData);
			} else if(response.match(regexLog)) {
				alert('These are not valid credentials.  Please correct them.');
			} else {
				redirectToWizard();
			}
       		}
			xhr.send(postData);
		}
		
});
function redirectToWizard(){
				Titanium.App.Properties.setString('moodle-user', ta1.value);
				Titanium.App.Properties.setString('moodle-pass', ta2.value);
				if(Titanium.App.Properties.getString('moodle-wizard-run') == false)
				{
				var win1 = Titanium.UI.createWindow({  
    				title:' Select Classes',
   	 				url:'moodle_add_classes.js',
   	 				backgroundColor:'#ecfaff',
   	 				navGroup: win.navGroup,
   	 				layout:'absolute',
   	 				barColor: '#46a546'
				});
				win.navGroup.open(win1,{animated:false});
				} else {
					alert("Your moodle credentials were good, enjoy!")
					ta1.blur();
					ta2.blur();
				}
				Titanium.App.Properties.setString('moodle-wizard-run',true)
}





