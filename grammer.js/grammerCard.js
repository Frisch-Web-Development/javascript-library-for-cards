var globalGrammer; 

var getGrammer = function (text)
{
	var freq = getWordFrequency(text);  // returns a dictionary of words with the amount of times the word has been said if it is over a threshold. 
	var period = getDistanceBetween(text,".",200); 
	var comma = getDistanceBetween(text,",",400); 
	
	globalGrammer = {overflowWords: freq, underflowPeriod: period, underflowComma: comma}; 
	console.log(globalGrammer);
	return globalGrammer; 
	

};

var getWordFrequency = function(str)
{

	let blacklist = ["in","the","on","if","a","i"]; // add more to this 
	let lStr = str.toLowerCase(); 
	let dict = {};
	let regex = /\b[a-zA-Z]+'?[a-zA-Z]?\b/g;
	let array = lStr.match(regex); 
	if(array == null){return null;}
	var lastWorld = "";
	var currentKey = ""; 
	for(let i = 0; i<array.length; i++)
	{
		let word = array[i];
		////console.log(word); 
		if(dict[word] == null && !(blacklist.includes(word)))
		{
			dict[word] = 1; 
		}
		else {
			dict[word] ++; 
		}
		lastWorld = word; 
	};
	let overflow = 15; 
	let wordArray = []; 
	for (var key in dict) {
		currentKey = key; 
    // check if the property/key is defined in the object itself, not in parent
    if (dict.hasOwnProperty(key)) {           
	if(dict[key] != null && dict[key] >= overflow)
	{
		
		//console.log("run"); 
		let overFlowWord = {
			word: key, 
			amount: dict[key],
			synonyms: []
		
		}; 
		
		
		 $.ajax({
            headers: {
                'Content-Type': "application/json",
                'Access-Control-Allow-Origin': "*"
            },
            method: "GET",
            dataType: "jsonp",
			//url: 'https://en.wikipedia.org/api/rest_v1/page/html/' + title
            url: 'http://thesaurus.altervista.org/thesaurus/v1?word=' + encodeURIComponent(overFlowWord.word) + '&language=en_US&output=json&key=HbqgolDXeWZPbmdMbwKF&callback=process'
        }).done(function(response) {
			//console.log(response); 
			let ob = response; 
			//let ob = JSON.parse(response.responseText.substring(8,response.responseText.length-1)); 
		    //console.log("word: " + overFlowWord.word);
		    //console.log(ob.response.length);
			for(let i = 0; i<ob.response.length; i++ )
			{
				//console.log(ob.response[i]); 
				overFlowWord.synonyms.push(ob.response[i].list.synonyms); ; 
				
			}
			//console.log(overFlowWord); 
		wordArray.push(overFlowWord);
		//console.log(wordArray); 
		 	
		});
		
	 
	}	
    }
	
	
}
//while(currentKey != lastWorld){} 
return wordArray;
	
	
	
};



var getDistanceBetween = function (iStr,item,threshold)
{
	let str = iStr; 
	let distanceBetween = []; 
//	let threshold = 200; 	
	let begin = 0; 
	let end = 0; 
	console.log(str.length); 
	while((end != -1) && end < str.length || end == null){
		end = str.indexOf(item); 
		console.log(end); 
			if(end != -1 && end >= threshold)
			{
				if(distanceBetween[distanceBetween.length-1] != null){
				distanceBetween.push(end+distanceBetween[distanceBetween.length-1]+1);}
				else {
					distanceBetween.push(end+1); 
				}
			}
			begin = end; 
			str = str.substring(begin+1,str.length); 
		
	}
	if(end == -1 && str.length > threshold)
	{
		
		
	}
		
	console.log(distanceBetween); 
	
	
	return distanceBetween
}
//Get synonyms
//http://thesaurus.altervista.org/thesaurus/v1?word=peace&language=en_US&output=json&key=HbqgolDXeWZPbmdMbwKF&callback=process