Ti.include("model/api.js");
var win = Titanium.UI.currentWindow;
win.layout = 'vertical';

Titanium.App.addEventListener('main-win-close', function(e)
{
	win.close();
});
var label1 = Titanium.UI.createLabel({
	text: 'Once you have verified the link which arrives in your email.  Please click the Confirmed button below.',
	top: 100,
	height:'auto',
	left: 17,
	width: 320,
	
});

var confirm = Titanium.UI.createButton({
            		title: 'Confirmed',
            		top: 17,
            		width: 230,
					height: 30,
					backgroundColor: '#46a546',
					backgroundImage: 'none',
					borderRadius: 10,
					font:{fontWeight:'bold',fontSize:12, color: '#fff'}
					});
					confirm.addEventListener('click', function(e)
					{
			
						xhr = getUserWithChildren(Titanium.App.Properties.getString('mmat'),Titanium.App.Properties.getString('userid'));
						xhr.onload = function(){
						var response = this.responseText;
						var user = JSON.parse(response);
						if(user.entity_users.length > 0)
						{
							if(Titanium.App.Properties.getString("moodle_entity_id") != false && Titanium.App.Properties.hasProperty('moodle-user') == false){
								var win1 = Titanium.UI.createWindow({  
    								title:'Moodle Account',
   									url:'moodle_account.js',
    								barColor: '#46a546',
   	    							backgroundColor:"#e2e7ed",
       								moving:false, // Custom property for movement
       								axis:0 // Custom property for X axis
    			 				});
							} else {
								var win1 = Titanium.UI.createWindow({  
   									url:'feed.js',
    								barColor: '#46a546',
   	    							backgroundColor:"#46a546",
       								moving:false, // Custom property for movement
       								axis:0 // Custom property for X axis
    			 				});
							}
							win1.open();
						} else {
							alert('You have not confirmed the email we have sent you.  If you would like to resend it to yourself please click the Re-enter Email button.')
						}
						}
						xhr.send();
					
					});
					confirm.addEventListener('touchstart', function(){
						this.setBackgroundColor('blue');
					});
					confirm.addEventListener('touchend', function(){
						this.setBackgroundColor('#46a546');
					});
					
					var remail = Titanium.UI.createButton({
            		title: 'Re-enter Email',
            		top: 17,
            		width: 230,
					height: 30,
					backgroundColor: '#46a546',
					backgroundImage: 'none',
					borderRadius: 10,
					font:{fontWeight:'bold',fontSize:12, color: '#fff'}
					});
					remail.addEventListener('click', function(e)
					{
						win.close();	
					});
					remail.addEventListener('touchstart', function(){
						this.setBackgroundColor('blue');
					});
					remail.addEventListener('touchend', function(){
						this.setBackgroundColor('#46a546');
					});
win.add(label1);
win.add(confirm);
win.add(remail);




