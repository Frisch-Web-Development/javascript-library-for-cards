$( document ).ready(function() {
var bool = false; 
	$( ".card" ).click(function() {
		$("#bottomBar").click(function(){bool = true;}); 
		$(".miniButton").click(function(){bool = true;});
		
		if(!bool){
		if($(this).hasClass("collapse")){
			$(this).removeClass( "collapse" );
			
		}
		else{
			$(this).addClass("collapse");
		}
		}
		bool = false;
	});
	
	addCard('<img src = "https://travel.usnews.com/static-travel/images/destinations/44/empire_state_building_getty_zsolt_hlinka.jpg"></img>',"stuff","research","New York City"); 

});


function addCard(img,information,type,title){
	var bool = false; 
	var html = '<div class = "card ' +type +'"><p id = "cardType">This is a '+ type + ' related card</p1><h1 id = "title">' + title + '</h1><!--<i class="large material-icons">aspect_ratio</i>-->'+img+'<p1>' + information + '</p1> <div id = "bottomBar" class = "container"><div class="row"><div class="col-sm-4"><button class = "miniButton">expand</button></div><div class="col-sm-4"><button class = "miniButton">source</button></div><div class="col-sm-4"><button class = "miniButton">star</button></div></div></div></div>';
	console.log(html); 
	var jObject = $($.parseHTML(html)).click(function() {
		$("#bottomBar").click(function(){bool = true;}); 
		$(".miniButton").click(function(){bool = true;});
		
		if(!bool){
		if($(this).hasClass("collapse")){
			$(this).removeClass( "collapse" );
			
		}
		else{
			$(this).addClass("collapse");
		}
		}
		bool = false;
		
		
		
	});
	
	$("#main").append(jObject); 
	
	
};
	
	