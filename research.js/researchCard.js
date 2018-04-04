function getResarch()
{
	information("New York City"); 
	information("Ice cream"); 
	information("Hot dogs"); 
};

var information = function(search)
{
	var title = ""; 
	var stuff = ""; 
	$.ajax({headers: {
				'Content-Type': "application/json",
				'Access-Control-Allow-Origin' : "*"
			},
			method: "GET",
			dataType: "jsonp",
            url: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='+ encodeURIComponent(search)}).done(function(result) {
				//console.log(result); 
				title = result[0]; 
				
				$.ajax({headers: {
				'Content-Type': "application/json",
				'Access-Control-Allow-Origin' : "*"
			},
			method: "GET",
			dataType: "jsonp",
            url: 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles='+title}).done(function(result) {
				//console.log(Object.keys(result.query.pages)[0]); 
				stuff = result.query.pages[Object.keys(result.query.pages)[0]].revisions["0"]["*"]; 
				//console.log(stuff.substr(0,10) == "#REDIRECT "); 
				
					if(stuff.substr(0,10) == "#REDIRECT ")
						{
							console.log("ran"); 
							let regex = /\[\[(.+)\]\]/; 
							information(stuff.match(regex)[1]); 

							}
					console.log(stuff); 
					return stuff; 
					
				
			});
		});
	

	
}