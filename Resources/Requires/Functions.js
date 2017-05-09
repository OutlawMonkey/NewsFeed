var Result = require("../Requires/Result.js");


function Functions(){

	
	this.setTimeStamp = function(){
		var d = new Date();
		return  Math.floor(d/1000);
	};
	
	this.setMd5Hash = function(value){
		return Ti.Utils.md5HexDigest(value);
	};
	
	this.bIsOnline = function(){
		var online = true;
		if (Titanium.Network.online == false) {
			online = false;
		}
		return online;
	};
	
	this.RequestPost = function(url,params,action,error){
		
		var xhr = Ti.Network.createHTTPClient();
		xhr.onload = function(){
			Ti.API.info(this.responseText);
			action(this.responseText);
		};
		xhr.onerror = function(){
			error();
		};
		xhr.open("POST",url);
		xhr.send(params);
	};
	
	this.RequestGet = function(url,action,error){
		
		//Ti.API.info(url);
		
		var xhr = Ti.Network.createHTTPClient();
		xhr.onload = function(){
			//Ti.API.info(this.responseText);
			action(this.responseText);
		};
		xhr.onerror = function(){
			Ti.API.info("error: "+this.responseText);
		};
		xhr.open("GET",url);
	
		xhr.send( );
	};
	
	this.ParseResult = function(aResponse){
		
		var aResultData=eval('(['+aResponse+'])');
		var result=new Result();
		result.status=aResultData[0].status;
		
		if(aResultData[0].items==null){
			result.data={};
		}else{
			result.data=aResultData[0].items;
		}
		
		return result;
	};
	

}

module.exports =  Functions;

