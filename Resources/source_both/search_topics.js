Ti.include("model/api.js");
var win = Titanium.UI.currentWindow;
var bar = Ti.UI.createView({
				backgroundColor:'#46a546',
				width:Ti.UI.Size,
				height: 44,
				left:0,
				top:0,
			});
			var border = Ti.UI.createView({
				backgroundColor:"black",
				height:1,
				bottom:0,
				width: Ti.UI.Size
			});
			bar.add(border);
win.add(bar);
var menuButton = Ti.UI.createImageView({
    image:'/images/Paragraph-Justify.png',
    toggle:false,
    height: 30,
    width:30,
	backgroundColor:'#347235',
	borderWidth: 1,
	borderColor: 'black',
	borderRadius: 2,
	left: 10

});
bar.add(menuButton);

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
	win1.open();
});
var search = Titanium.UI.createSearchBar({
	barColor:"#808080",
	showCancel:true,
	font:{fontSize:16,fontWeight:'bold'},
   	height:'33dp',
	top:1,
	left: 50,
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
                color: '#000000',
				hasDetail:true
            });
            
          tableview.appendRow(fbRow);
        }
	}
	xhr.send(JSON.stringify(postData));

	search.blur();

		bar.add(add_button);

});

