var win = Titanium.UI.currentWindow;
alert("TEST");
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
var webview = Titanium.UI.createWebView({top: 44});
bar.add(refresh_button);
refresh_button.addEventListener('click', function(e){
	webview.reload();
})
webview.addEventListener('load', function(e) {
	    alert(win1.cookie);
	    webview.evalJS("document.cookie='"+win1.cookie+"';");
		var cookies = webview.evalJS("document.cookie");
		alert(cookies);
});
win.add(webview);
webview.url = win.url;