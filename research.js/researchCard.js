function getResarch()
{
	getStuff(); 
};

function getStuff()
{
	var zero = []; 
	$.ajax({headers: {
				'Content-Type': "application/json",
				'Access-Control-Allow-Origin' : "*"
			},
			method: "GET",
			dataType: "jsonp",
            url: "https://en.wikipedia.org/w/api.php?action=query&titles=New+York+City&prop=revisions&rvprop=content&format=json&formatversion=0"}).done(function(result) {
				console.log(result.query.pages[645042].revisions[0]["*"]); 
    });
}