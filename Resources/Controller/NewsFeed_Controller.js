var Config = require("../config.js");
var Functions = require("../Requires/Functions.js");
var Feed_View_Model = require('../ViewModel/Feed_View_Model.js');

		
var config = new Config();
var functions =  new Functions(); 
	

function NewsFeed_Controller(){
	
	this.GetNewsFeed = function(vSuccess){	
		
		Ti.API.info ('inicializando controller');
		
		if ( functions.bIsOnline() ){
			functions.RequestGet(
				config.URL,
				function(data){
					var oResult = functions.ParseResult(data);
					switch(oResult.status){
						case 'ok':
							
							var newsArray = [];
							
							Ti.API.info('todo funciono');
							//Ti.API.info(oResult.data[0].title);
							
							for (var count = 0; count < oResult.data.length; count++ ){
								
								var oFeed = new Feed_View_Model();
							
								oFeed.title = oResult.data[count].title;
								
								var tempString = oResult.data[count].pubDate.toString();
								tempString = tempString.replace(' ','T');
								tempString+='Z';
								var tempDate = new Date( tempString );
								
								oFeed.pubDate = tempDate.toDateString();
								
								oFeed.link =  oResult.data[count].link;
																		
								//Ti.API.info ('objeto generado por view model'+'\n'+JSON.stringify(oFeed));
								
								newsArray.push(oFeed);	
							}
							
			
							vSuccess(newsArray);
							
						break;
						default: 
							alert(oResult.status);
						break;
					}
					
				},
				function(){
					
				}
			);
		}else{
			alert('check your internet connection');
		}
	};
		
}

module.exports = NewsFeed_Controller;
