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
var menuButton = Ti.UI.createImageView({
    image:'/images/Paragraph-Justify.png',
    toggle:false,
    height: '36dp',
    width:'36dp',
	backgroundColor:'#347235',
	borderWidth: 1,
	borderColor: 'black',
	borderRadius: 2,
	left: 10
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
	setTimeout(function(e){
	win.close();
	},500);
});
bar.add(menuButton);
var data = [];

	var label1 = Titanium.UI.createLabel({
	text: 'Moodle Username',
	top:'105dp',
	color: "#000000",
	font:{fontSize:'18dp',fontWeight:'bold'},
	height:40,
	width: 320,
	
});
	var ta1 = Titanium.UI.createTextField({
	value: Titanium.App.Properties.getString('moodle-user-' + selectedId),
	hintText:"Moodle Username",
	top: '140dp',
	font:{fontSize:18,fontWeight:'bold'},
   	height:'35dp',
	width: 500,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	
});
var label2 = Titanium.UI.createLabel({
	text: 'Moodle Password',
	top: '175dp',
	color: "#000000",
	font:{fontSize:'18dp',fontWeight:'bold'},
	height:40,
	width: 320,
	
});
var ta2 = Titanium.UI.createTextField({
	value: Titanium.App.Properties.getString('moodle-pass-' + selectedId),
	hintText:"Moodle Password",
	passwordMask: true,
	top: '210dp',
	font:{fontSize:18,fontWeight:'bold'},
   	height:'35dp',
	width: 500,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	
});




var btnCreate = Titanium.UI.createButton({
	title:'Verify',
	height: '36dp',
    width:'60dp',
    color: '#ffffff',
	backgroundColor:'#347235',
	borderWidth: 1,
	borderColor: 'black',
	borderRadius: 2,
	right: '5dp'
});

bar.add(btnCreate);



var importWiz = Titanium.UI.createButton({
            		title: 'Start Import Wizard',
            		top: 270,
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
   	 				layout:'absolute',
   	 				barColor: '#46a546'
					});
					win1.open();
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
            data[c]=Ti.UI.createPickerRow({title:user.entity_users[c].entity.name,entity_id:user.entity_users[c].entity.id});
        }
        var picker = Ti.UI.createPicker({
			top: '45dp',
			//height: 160,
			width: Titanium.UI.FILL
		});
       // turn on the selection indicator (off by default)
	picker.selectionIndicator = true;
	

win.add(label1);
win.add(ta1);
win.add(label2);
win.add(ta2);
//win.add(importWiz);

	picker.add(data);
	win.add(picker);

	
picker.addEventListener('change', function(e){
	pickerSelected = e.row;
	selectedId = picker.getSelectedRow(0).entity_id;
	if (Titanium.App.Properties.getString('moodle-user-' + picker.getSelectedRow(0).entity_id) != null){
		ta1.value = Titanium.App.Properties.getString('moodle-user-' + picker.getSelectedRow(0).entity_id);
	} else {
		ta1.value = "";
	}
	if (Titanium.App.Properties.getString('moodle-pass-' + picker.getSelectedRow(0).entity_id) != null){
		ta2.value = Titanium.App.Properties.getString('moodle-pass-' + picker.getSelectedRow(0).entity_id);
	} else {
		ta2.value = "";
	}
});

ta1.addEventListener('return', function(e)
{
	ta2.blur();
});

ta2.addEventListener('return', function(e)
{
	ta2.blur();
});
ta1.addEventListener('return', function(e)
{
		ta1.blur();
});

}
xhr.send();


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
			if (selectedId == 2)
			{
				var postData = {username: ta1.value, password: ta2.value};
				xhr = postLoginToMoodle(Titanium.App.Properties.getString("moodle_url_" + selectedId),postData);
				xhr.onload = function()
				{
					var response = this.responseText;
					var regexSess = /Your\ssession\shas/;
					var regexSess2 = /your\slogin\ssession/;
					var regexLog = /Invalid\slogin/;
					if(response.match(regexSess2)) 
					{
						xhr = postLoginToMoodle(Titanium.App.Properties.getString("moodle_url_" + selectedId),postData);
						xhr.onload = function()
						{
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
			} else {
				xhr = getLoginToMoodle2(Titanium.App.Properties.getString("moodle_url_" + selectedId),ta1.value,ta2.value);
				xhr.onload = function()
				{
					var response = this.responseText;
					var user = JSON.parse(response);
					if (user.token != null){
						Titanium.App.Properties.setString('moodle-user-' + selectedId, ta1.value);
						Titanium.App.Properties.setString('moodle-pass-' + selectedId, ta2.value);
						Titanium.App.Properties.setString('moodle-token-' + selectedId, user.token);
						xhr = getMoodle2SiteRetrieve(Titanium.App.Properties.getString("moodle_url_" + selectedId),user.token);
						xhr.onload = function()
						{
							var response = this.responseText;
							var user = JSON.parse(response);
							Titanium.App.Properties.setString('moodle-userid-' + selectedId, user.userid);
							alert("Your moodle credentials were good, enjoy!");
						}
						xhr.send();
					} else {
						alert("Your moodle credentials were no good, please re-enter them!");
					}
				}
				xhr.send();
			}
		}
		
});
function redirectToWizard(){
				Titanium.App.Properties.setString('moodle-user-' + selectedId, ta1.value);
				Titanium.App.Properties.setString('moodle-pass-' + selectedId, ta2.value);
				if(Titanium.App.Properties.getString('moodle-wizard-run') == false)
				{
				var win1 = Titanium.UI.createWindow({  
    				title:' Select Classes',
   	 				url:'moodle_add_classes.js',
   	 				backgroundColor:'#ecfaff',
   	 				layout:'absolute',
   	 				barColor: '#46a546'
				});
				win1.open();
				} else {
					alert("Your moodle credentials were good, enjoy!")
					ta1.blur();
					ta2.blur();

				}
				Titanium.App.Properties.setString('moodle-wizard-run',true)
}










