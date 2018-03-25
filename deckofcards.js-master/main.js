$( document ).ready(function() {
var bool = false; 
	$( ".card" ).click(function() {
		$("#bottomBar").click(function(){bool = true;}); 
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


});