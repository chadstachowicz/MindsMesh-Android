Ti.include("model/api.js");
var win = Titanium.UI.currentWindow;
var menuButton = Ti.UI.createButton({
    image:'../images/Paragraph-Justify.png',
    toggle:false // Custom property for menu toggle
});
win.setLeftNavButton(menuButton);

menuButton.addEventListener('click', function(e){
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
var add_button =  Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.ADD
});


add_button.addEventListener('click', function(e){
	var win1 = Titanium.UI.createWindow({  
    	title:'Create Class',
   	 	url:'create_topic.js',
   	 	backgroundColor:'#ecfaff',
   	 	layout:'absolute',
   	 	barColor: '#46a546'
	});
	win.navGroup.open(win1,{animated:false});
});
var search = Titanium.UI.createSearchBar({
	barColor:"#808080",
	showCancel:true,
	height:43,
	top:0
});

win.add(search);

var tableview = Titanium.UI.createTableView({
	top:43,
	backgroundColor:'#ecfaff'
});
win.add(tableview);

var user = '';
tableview.addEventListener('click', function(e)
{
	
			var dlg = Titanium.UI.createAlertDialog({
    			message:'Are you sure you want to join ' + topics[e.index].name, 
    			buttonNames: ['Yes','No']
  			});
   			dlg.addEventListener('click', function(ev) {
   				 if (ev.index == 0) { 
   				 	xhr = postTopicJoin(Titanium.App.Properties.getString('mmat'),topics[e.index].id)
					xhr.onload = function(){
						var response = this.responseText;
						Titanium.App.fireEvent('event_two',{data:'added'});
						Titanium.UI.currentWindow.close();
					}
					xhr.send();
   				 } else if (ev.index == 1) { // clicked "No"

   				 }
 			 });
 			 dlg.show();
		
});
search.addEventListener('cancel', function(e)
{
	search.blur();
});
search.addEventListener('return', function(e)
{
	var postData = {'q': search.value};
	xhr = postTopicSearch(Titanium.App.Properties.getString("mmat"),postData);
	xhr.onload = function(){
		var response = this.responseText;
		topics = JSON.parse(response);
		var rd = []; tableview.data = rd;
		for(c=0;c<topics.length;c++){
            var fbRow = Titanium.UI.createTableViewRow({
                backgroundColor:'#ecfaff',
                title: topics[c].name,
                extraData:topics[c].id,
				hasDetail:true
            });
            
          tableview.appendRow(fbRow);
        }
	}
	xhr.send(JSON.stringify(postData));

	search.blur();
	if(Titanium.Platform.name == 'iPhone OS'){
	
		win.setRightNavButton(add_button);

		}
});

