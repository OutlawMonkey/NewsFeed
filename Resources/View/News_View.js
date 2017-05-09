

function News_View(_args){
	
	var window_win = Ti.UI.createWindow({
		backgroundColor:'white',
		title:_args.title
	});
	
	var main_scl = Ti.UI.createScrollView({
	left:0, right:0, bottom:0, top:0,
	contentWidth:Ti.UI.FILL,
	contentHeight:Ti.UI.SIZE,
	showVerticalScrollIndicator: true,
	showHorizontalScrollIndicator: false
	});
	
	window_win.add(main_scl);
	
	var content_view =  Ti.UI.createWebView({
		left:0, right:0,
		height:'auto',
		layout:'horizontal',
		url:_args.destination,
		scalesPageToFit:true
	});
	
	main_scl.add(content_view);

	
	return window_win;	
}

module.exports = News_View;
