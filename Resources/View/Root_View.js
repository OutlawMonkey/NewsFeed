

function Root_View(){

	
	var window_win = Ti.UI.createWindow({
		//title:title,
		backgroundColor:'white'
	});
	
	
	
	window_win.addEventListener('open',function(){
		
		var NewsFeed_Controller = require('/Controller/NewsFeed_Controller.js');
		var nfController = new NewsFeed_Controller();
		
		
		nfController.GetNewsFeed( function(aData){
			
			var rData = [];
			
			for (var count = 0; count < aData.length; count++){
				
				
				
				/*
				var TbRow = Ti.UI.createTableViewRow({
					destination:aData[count].link,
					hasChild:true,
					view:'/View/News_Views',
					height:'auto'
				});
				
				Ti.API.info(TbRow.destination);
				
				*/
				
				var TbRow = Ti.UI.createTableViewRow({
					hasChild:true,
					height:50,
					name:aData[count].title.toString(),
					test:aData[count].link.toString()
				});
				
				
				var titleLbl = Ti.UI.createLabel({
					left:5, right:5, top:0, height:'auto',
					font:{fontSize:14}, color:'#000', 
					textAlign:'center',
					text: aData[count].title
				});
				
				
				var dateLbl = Ti.UI.createLabel({
					left:5, right:5, bottom:0, height:'auto',
					font:{fontSize:8}, color:'#000', 
					textAlign:'center',
					text: aData[count].pubDate
				});
				
				//TbRowView.add(titleLbl);
				//TbRowView.add(dateLbl);
				
				TbRow.add(titleLbl);
				TbRow.add(dateLbl);
				rData.push(TbRow);
				
			}
			
			var content_view =  Ti.UI.createTableView({
				data:rData
			}); 
			
			//content_view.data = rData;
			
			window_win.add(content_view);
			
			content_view.addEventListener('click', function(e){
				
				
				if(e.rowData.test){
					
					var newsWindow = require('/View/News_View');
					
					win = new newsWindow({
						title:e.rowData.name, 
						containingTab:window_win.containingTab,
						tabGroup:window_win.tabGroup,
						destination:e.rowData.test
					});
					
					window_win.containingTab.open(win,{animated:true});
					
				}
				
			});
			
			
			
		});
		
		
		
	});
	
	

	
	return window_win;
	
}

module.exports = Root_View;
