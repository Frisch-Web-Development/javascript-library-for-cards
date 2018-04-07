/*
List of Regex stuff: 
get infobox: {{Infobox\s(.+)\s (get group 1) 
finds all images ^\|\simage.*$ (might want to edit to grab the image name to get the image) 

*/
function getResarch() {
		var info = information("Einstien");
};

var information = function(search) {
    var title = "";
    var stuff = "";
	let possibleTitles = []; 
    $.ajax({
        headers: {
            'Content-Type': "application/json",
            'Access-Control-Allow-Origin': "*"
        },
        method: "GET",
        dataType: "jsonp",
        url: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + encodeURIComponent(search)
    }).done(function(result) {
        console.log(result); 
		possibleTitles = result[1]
        title = determineTitle(search, possibleTitles);

        $.ajax({
            headers: {
                'Content-Type': "application/javascript",
                'Access-Control-Allow-Origin': "*"
            },
            method: "GET",
            dataType: "jsonp",
			//url: 'https://en.wikipedia.org/api/rest_v1/page/html/' + title
            url: 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvlimit=1&format=json&rvprop=content&rvparse=&titles=' + title
        }).done(function(result) {
            console.log(Object.keys(result.query.pages)[0]); 
            stuff = result.query.pages[Object.keys(result.query.pages)[0]].revisions["0"]["*"];
			console.log(stuff);
            console.log(stuff.indexOf('<div class="redirectMsg">')); 

            if (stuff.indexOf('<div class="redirectMsg">')!= -1) {
				let regex = /title="((\w|\s)*)/;
                //console.log(stuff.match(regex)[1]);
                
                information(stuff.match(regex)[1]);

            }
			else{
			stuff = addHttps(stuff); 
			
			$("#wikiInfo").append(stuff);
			//console.log($("table.infobox").html());
			if($("table.infobox").html() != null){
			$("#wikiInfo").html($("table.infobox").html());
			}
			else{
			$("#wikiInfo").html("No infoBox available"); 
			information(getNewerTitle(possibleTitles,title,search));
			
			}
			 
            return stuff;
		}


        });
    });
	
	

	//https://en.wikipedia.org/api/rest_v1/page/html/ //this one I can't get working
	//https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvlimit=1&rvprop=content&rvparse=&titles= //idk what this is going to do
	//https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles= // original that gets data





}

var addHttps = function(html)	
{
	var string = html.replace(/\/\/upload/g,'https://upload'); 
	
	return string; 
	
}

var levenshteinDistance = function(a, b){
  if(a.length == 0) return b.length; 
  if(b.length == 0) return a.length; 

  var matrix = [];

  // increment along the first column of each row
  var i;
  for(i = 0; i <= b.length; i++){
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for(j = 0; j <= a.length; j++){
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for(i = 1; i <= b.length; i++){
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};


var determineTitle = function(original,array)
{
	let min = 100000000; 
	let term = ""; 
	for(let i = 0; i<array.length; i++)
	{
		let string = array[i];
		console.log(string);
		let num = levenshteinDistance(original,string); 
		if(num < min)
		{
			min = num
			term = string; 
		}
	}
	console.log("term: "+term);
	return term; 
		
}

var getNewerTitle = function(array,value,search)
{
	var newArray = []; 
	for(let i = 0; i<array.length; i++)
	{
		if(value != array[i])
		{
			newArray.push(array[i]); 
		}
	}
	//console.log(NewArray
	return determineTitle(search,newArray)
}