var match = []; 
function checkAnnotation(str){
	let rawMatch = str.match(/@\w*{\w*}/g);
	if(rawMatch != null){
	for(let i = 0; i<rawMatch.length; i++)
	{
		
		if(contains(match,{name:rawMatch[i].replace(/@(\w+){\w*}/,"$1"),content:rawMatch[i].replace(/@\w+{(\w*)}/,"$1")})){
			addAnnotation(rawMatch[i].replace(/@(\w+){\w*}/,"$1"),rawMatch[i].replace(/@\w+{(\w*)}/,"$1")); 
		}
	}
	}

};

var contains = function (array,holder)
{
	var bool = true; 
	
	for(let i = 0; i<array.length; i++)
	{
		if(array[i].name == holder.name && array[i].content == holder.content)
		{
			bool = false; 
			i = array.length+1; 
		}
	}
	
	return bool; 
	
}

function addAnnotation(_name, _content)
{
	let holder = {
		name: _name,
		content: _content
	};
	match.push(holder); 
	
};