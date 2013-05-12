var win = Titanium.UI.currentWindow;
;var bar = Ti.UI.createView({
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
var webview = Titanium.UI.createWebView({top: 44});
var refresh_button =  Titanium.UI.createButton({
	title:'Refresh',
	height: 30,
    width:'auto',
	backgroundColor:'#347235',
	borderWidth: 1,
	borderColor: 'black',
	borderRadius: 2,
	left: 10
});
bar.add(refresh_button);
refresh_button.addEventListener('click', function(e){
	webview.reload();
})
var passed = false;
webview.addEventListener('beforeload', function(e) {
	if (passed == false){
	    webview.evalJS("document.cookie='"+win.cookie+"';");
	    passed = true;
	   }
});
win.add(webview);
webview.url = win.grade_url;