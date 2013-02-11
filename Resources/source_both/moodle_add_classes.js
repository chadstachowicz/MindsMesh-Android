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
win.backButtonTitle = 'Classes'

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
var btnCreate = Titanium.UI.createButton({
	title:'Import',
	height: 30,
    width:'auto',
	backgroundColor:'#347235',
	borderWidth: 1,
	borderColor: 'black',
	borderRadius: 2,
	left: 10
});
bar.add(btnCreate);
var tableview = Titanium.UI.createTableView({
	backgroundColor:'#ecfaff',
	top: 44,
});
win.add(tableview);
var user = ''; 

var postData = {username: Titanium.App.Properties.getString('moodle-user'), password: Titanium.App.Properties.getString('moodle-pass')};
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
					populateWizard(response2);
				};
				xhr.send(postData);
			} else if(response.match(regexLog)) {
				alert('These are not valid credentials.  Please correct them.');
			} else {
				populateWizard(response);
	}
}
xhr.send(postData);

tableview.addEventListener('click', function(e)
{
	if(e.source.hasCheck == false){
		e.source.hasCheck = true;
	} else {
		e.source.hasCheck = false;
	}
		
});
tableview.addEventListener('delete', function(ev)
{
	xhr = postTopicLeave(Titanium.App.Properties.getString('mmat'),user.topic_users[ev.index].topic.id)
	xhr.onload = function(){
		var response = this.responseText;
		alert("You left this class, you may add it back at anytime with the + button.");
		if (ev.index != (user.topic_users.length - 1))
		{
			user.topic_users.splice(ev.index,1);
		}
	}
	xhr.send();
		
});
win.addEventListener('focus', function() 
{
  if ( Titanium.Network.networkType != Titanium.Network.NETWORK_NONE ) {
  	
  if (win.passedData == 'added'){
    	
   }
   win.passedData = null;
  }else{
    var alertDialog = Titanium.UI.createAlertDialog({
    title: 'Attention',
    message: 'No Internet Connectity!',
    buttonNames: ['OK']
    });
    alertDialog.show(); 
}   
});
Titanium.App.addEventListener('event_two', function(e)
{
    win.passedData = e.data;
});
var Importrows = [];
var e = 0;
var currentImport = 0;
Titanium.App.addEventListener('iterateAdd', function(e)
{
	if (currentImport < Importrows.length){
    var postData = {'q': e.data};
	xhr = postTopicSearch(Titanium.App.Properties.getString("mmat"),postData);
	xhr.onload = function(){
		var response = this.responseText;
		topics = JSON.parse(response);
		if(topics.length == 1)
		{
			xhr = postTopicJoin(Titanium.App.Properties.getString('mmat'),topics[0].id);
			xhr.onload = function(){
				currentImport++;
				if (currentImport < Importrows.length){
				var Search = Importrows[currentImport][1] + ' ' + Importrows[currentImport][2];
				Titanium.App.fireEvent('iterateAdd',{data:Search});
				} else {
				Importrows = [];
				e = 0;
				currentImport = 0;
				for (var i = 0; i < tableview.data[0].rows.length; ++i) {
					tableview.data[0].rows[i].hasCheck = false
				}
				alert('Import of Moodle Classes completed, Enjoy!');
				Titanium.App.fireEvent('loadFeed');
			}
			}
			xhr.send();
        }
        else if(topics.length == 0)
        {
			var winModal = Ti.UI.createWindow({
        		backgroundColor : '#B0000000'
    		});
 
    	var win_height = 400;
   		var win_width = Ti.Platform.displayCaps.platformWidth * .85;
 
    	var view = Ti.UI.createView({
        	backgroundColor : '#e2e7ed',
        	borderColor : '#A5A5A5',
        	borderRadius : 15,
        	top: 50,
        	box:true,
        	layout: 'vertical',
        	borderWidth : 2,
        	width : win_width,
        	height : win_height
   		 });
   		 var labelTitle = Titanium.UI.createLabel({
    			text:'Please enter the title of the class associated ' + Importrows[currentImport][0],
    			font:{fontSize:16,fontWeight:'bold'},
    			color:'#000',
   				width:'auto',
    			textAlign:'center',
    			top: 2,
    			left: 5,
    			box:true,
    			right: 5,
 
			});
		var seperatorPhone = Ti.UI.createView({
				backgroundColor: "#808080",
				width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 10,
				top: 4,
				box:true,
				height:2,
			});
		 view.add(labelTitle);
		 view.add(seperatorPhone);
   		 winModal.add(view);
   		 var ta2 = Titanium.UI.createTextField({
			hintText:"(i.e. Introduction to Chemistry)",
			top:26,
			height:40,
			box:true,
			noblur: 'blur',
			width: (Titanium.Platform.displayCaps.platformWidth * .85 ) - 10,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		});
		view.add(ta2);
		var createClass = Titanium.UI.createButton({
            		title: 'Create Class',
            		top: 17,
            		width: 230,
					height: 30,
					box:true,
					backgroundColor: '#46a546',
					backgroundImage: 'none',
					borderRadius: 10,
					font:{fontWeight:'bold',fontSize:12, color: '#fff'}
					});
					createClass.addEventListener('click', function(e)
					{
						var postData = {'topic': {'entity_user_id': Titanium.App.Properties.getString('entity_user_id'),
						'title' :ta2.value, 'number': Importrows[currentImport][1] + ' ' + Importrows[currentImport][2]}};
						xhr = postTopicCreate(Titanium.App.Properties.getString('mmat'),postData);
						xhr.onload = function(){
							var response = this.responseText;
							var test = JSON.parse(response);
							if (currentImport < Importrows.length){
								winModal.close();
								var Search = Importrows[currentImport][1] + ' ' + Importrows[currentImport][2];
								Titanium.App.fireEvent('iterateAdd',{data:Search});
							} else {
								winModal.close();
								Importrows = [];
								e = 0;
								currentImport = 0;
								for (var i = 0; i < tableview.data[0].rows.length; ++i) {
									tableview.data[0].rows[i].hasCheck = false
							}
							alert('Import of Moodle Classes completed, Enjoy!');
							Titanium.App.fireEvent('loadFeed');
							}
						};
						xhr.send(JSON.stringify(postData));
					});
					createClass.addEventListener('touchstart', function(){
						this.setBackgroundColor('blue');
					});
					createClass.addEventListener('touchend', function(){
						this.setBackgroundColor('#46a546');
					});

		view.add(createClass);
		winModal.addEventListener('click', function(e){
		if (e.source.noblur != 'blur'){
			ta2.blur();
		}
		});
		winModal.open();
        } else {
        	var winModal = Ti.UI.createWindow({
        		backgroundColor : '#B0000000'
    		});
 
    	var win_height = 400;
   		var win_width = Ti.Platform.displayCaps.platformWidth * .85;
 
    	var view = Ti.UI.createView({
        	backgroundColor : '#e2e7ed',
        	borderColor : '#A5A5A5',
        	borderRadius : 15,
        	top: 50,
        	box:true,
        	layout: 'vertical',
        	borderWidth : 2,
        	width : win_width,
        	height : win_height
   		 });
   		 var labelTitle = Titanium.UI.createLabel({
    			text:'Please select the correct course below to match with Moodle course ' + Importrows[currentImport][0],
    			font:{fontSize:16,fontWeight:'bold'},
    			color:'#000',
   				width:'auto',
    			textAlign:'center',
    			top: 2,
    			box:true,
    			left: 5,
    			right: 5,
 
			});
		var modalTableView = Titanium.UI.createTableView({
			backgroundColor:'#e2e7ed',
			box:true,
		});
		var seperatorPhone = Ti.UI.createView({
				backgroundColor: "#808080",
				width:(Titanium.Platform.displayCaps.platformWidth * .85 ) - 10,
				top: 4,
				box:true,
				height:2,
			});
		 view.add(labelTitle);
		 view.add(seperatorPhone);
		 view.add(modalTableView);
   		 winModal.add(view);
		for (var i = 0; i < topics.length; ++i) {
			var classNumber = Titanium.UI.createLabel({
    			text:topics[i].number,
    			name:topics[i].name,
    			id:topics[i].id,
    			font:{fontSize:16,fontWeight:'bold'},
    			color:'#000',
   				width:'auto',
   				box:true,
    			textAlign:'left',
    			left: 10
 
			});
			var classTitle = Titanium.UI.createLabel({
    			text:topics[i].title,
    			name:topics[i].name,
    			id:topics[i].id,
    			font:{fontSize:11},
    			color:'#000',
   				width:'auto',
   				box:true,
    			textAlign:'left',
    			left: 10
 
			});
		var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#e2e7ed',
                name:topics[i].name,
                id:topics[i].id,
                layout: 'vertical',
                box:true,
                height: 40
          });
            fbRow.add(classNumber);
            fbRow.add(classTitle);
         modalTableView.appendRow(fbRow);
          }
          var classNumber = Titanium.UI.createLabel({
    			text:"Add Class...",
    			font:{fontSize:16,fontWeight:'bold'},
    			color:'#000',
    			add: true,
    			box:true,
   				width:'auto',
    			textAlign:'left',
    			left: 10
 
			});
			var classTitle = Titanium.UI.createLabel({
    			text:'Click here to add class',
    			font:{fontSize:11},
    			add: true,
    			color:'#000',
   				width:'auto',
   				box:true,
    			textAlign:'left',
    			left: 10
 
			});
		var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#e2e7ed',
                layout: 'vertical',
                add: true,
                box:true,
                height: 40
          });
          modalTableView.addEventListener('click', function(e)
			{
	
			var dlg = Titanium.UI.createAlertDialog({
    			message:'Final confirmation ' + e.source.name + ' is the correct class?', 
    			buttonNames: ['Yes','No']
  			});
   			dlg.addEventListener('click', function(ev) {
   				 if (ev.index == 0) { 
   				 	xhr = postTopicJoin(Titanium.App.Properties.getString('mmat'),e.source.id)
					xhr.onload = function(){
						currentImport++;
						if (currentImport < Importrows.length){
						winModal.close();
						var Search = Importrows[currentImport][1] + ' ' + Importrows[currentImport][2];
						Titanium.App.fireEvent('iterateAdd',{data:Search});
						} else {
							winModal.close();
							Importrows = [];
							e = 0;
							currentImport = 0;
							for (var i = 0; i < tableview.data[0].rows.length; ++i) {
								tableview.data[0].rows[i].hasCheck = false
							}
							alert('Import of Moodle Classes completed, Enjoy!');
							Titanium.App.fireEvent('loadFeed');
						}
					}
					xhr.send();
   				 } else if (ev.index == 1) { // clicked "No"

   				 }
 			 });
 			 dlg.show();
		
			});
        //  fbRow.add(classNumber);
         //   fbRow.add(classTitle);
        // modalTableView.appendRow(fbRow);
   		 winModal.open();
        }
        
        winModal.addEventListener('click', function(e){
			 	if(e.source.box != true){
			 		var dlg = Titanium.UI.createAlertDialog({
    					message:'Are you sure you would like to exit the wizard before it has completed?', 
    					buttonNames: ['Yes','No']
  					});
  					dlg.addEventListener('click', function(ev) {
  						if (ev.index == 0) {
   				 			Importrows = [];
							e = 0;
							currentImport = 0;
 							winModal.hide();
 						} else {
 					
 						}
 					});
 					dlg.show();
 				}
 		});
	}
	xhr.send(JSON.stringify(postData));
	} else {
		Importrows = [];
		e = 0;
		currentImport = 0;
		for (var i = 0; i < tableview.data[0].rows.length; ++i) {
			tableview.data[0].rows[i].hasCheck = false
		}
		alert('Import of Moodle Classes completed, Enjoy!');
		Titanium.App.fireEvent('loadFeed');
	}
});
btnCreate.addEventListener('click',function(e){
e = 0;
var checker = false;
for (var i = 0; i < tableview.data[0].rows.length; ++i) {
	if (tableview.data[0].rows[i].hasCheck == true){
    var regex = /([a-zA-Z]+)-([\d\w]+)/i;
    Importrows[e] = regex.exec(tableview.data[0].rows[i].title);
    checker = true;
    e++;
   }
}
if (checker == true){
	var Search = Importrows[0][1] + ' ' + Importrows[0][2]
	Titanium.App.fireEvent('iterateAdd',{data:Search});
} else {
	alert('You must select at least one class to run the wizard.');
}
});
var dialogBox = Titanium.UI.createAlertDialog({title: 'Import Wizard', message: 'Please select the classes from Moodle that are current or you would like to discuss through Minds Mesh.'});
dialogBox.show();
function populateWizard(response){
	var regex = /TreeNode\('([\w\d\s:-]+)'.+(http.+course\/view\.php\?id=\d+)/ig;
	while((hits = regex.exec(response)) !== null) {
            var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#ecfaff',
                title: hits[1],
                Moodurl: hits[2],
                hasCheck: false
            });
            
          tableview.appendRow(fbRow);
        }
}
