function getGrammer(text)
{
	var freq = getWordFrequency(text);  // returns a dictionary of words with the amount of times the word has been said if it is over a threshold. 
	console.log(JSON.stringify(freq)); 
	var period = getDistanceBetween(text,".",200); 
	console.log(JSON.stringify(period)); 
};

var getWordFrequency = function(str)
{
	
	let blacklist = ["in","the","on"]
	let lStr = str.toLowerCase(); 
	let dict = {};
	let regex = /\b[a-zA-Z]+'?[a-zA-Z]?\b/g;
	let array = lStr.match(regex); 

	for(let i = 0; i<array.length; i++)
	{
		let word = array[i];
		//console.log(word); 
		if(dict[word] == null && !(blacklist.includes(word)))
		{
			dict[word] = 1; 
		}
		else {
			dict[word] ++; 
		}
		
	};
	let overflow = 10; 
	let overDict = {}; 
	for (var key in dict) {
    // check if the property/key is defined in the object itself, not in parent
    if (dict.hasOwnProperty(key)) {           
	if(dict[key] != null && dict[key] >= overflow)
	{
		overDict[key] = dict[key]; 
	}	
    }
}
	
	
	return overDict; 
	
};



var getDistanceBetween = function (iStr,item,threshold)
{
	let str = iStr; 
	let distanceBetween = []; 
//	let threshold = 200; 	
	let begin = 0; 
	let end = 0; 
	while(end < str.length || end == null){
		end = str.indexOf(item); 
		console.log(end); 
			if(end != null && end >= threshold)
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
		
	console.log(distanceBetween); 
	
	
	return distanceBetween
}

