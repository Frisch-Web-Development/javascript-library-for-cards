function checkAnnotation(str,full){
	let rawMatch = str.match(/@\w*{.*}/g);
	if(rawMatch != null){
	for(let i = 0; i<rawMatch.length; i++)
	{
		addAnnotation(rawMatch[i].replace(/@(\w+){.*}/,"$1"),rawMatch[i].replace(/@\w+{(.*)}/,"$1"),str.indexOf(rawMatch[i]),true,full); 
	}
	}

};
function addAnnotation(_name, _content,_index,bool,full)
{ 
	let holder = {
		name: _name,
		content: _content,
		index: _index
	};
	console.log(holder); 
		configureText(holder,full,bool); 
};


function configureText(holder,full,bool)
{
	//console.log(typeof stuff.ops[0].insert); 
	let stuff = full ;
	console.log(stuff);
	console.log(bool); 
	let length = stuff.ops[0].insert.length; 
	if(bool){
	for(let i = 0; i<stuff.ops.length; i++)
	{
		if(typeof stuff.ops[i].insert == 'string' )
		{
			if(stuff.ops[i].insert.indexOf('@' + holder.name + '{' + holder.content + '}') != -1){
			console.log(stuff.ops[i].insert); 
			let initalString = stuff.ops[i].insert; 
			/*stuff.ops[i].insert = initalString.substring(0,holder.index); 
			stuff.ops.splice(i+1,0,{attributes: {annotation: true}, insert:initalString.substring(holder.index+2+holder.name.length,holder.index+2+holder.name.length+holder.content.length) }); 
			stuff.ops.splice(i+2,0,{insert: " " + initalString.substring(holder.index+3+holder.name.length+holder.content.length,initalString.length)}); 
			console.log(stuff); 
			//addModel(holder,stuff);*/
			let one = initalString.match(/(.*)@\w+{.*}/s);
			//console.log(one[1]); 
			let two = initalString.match(/@\w+{(.*)}/s)
			//console.log("two " + two[1]); 
			let three = " " + initalString.substring(initalString.indexOf("{" + two[1] + "}") + two[1].length+2, initalString.length); 
			//console.log(three); 
			stuff.ops[i].insert = one[1]; 
			stuff.ops.splice(i+1,0, {attributes: {annotation: true}, insert:two[1]}); 
			stuff.ops.splice(i+2,0, {insert:three}); 
			//console.log(stuff); 
			setContent(stuff); 
			
			
			$(".tooltip-" + true).tooltip();
			$(".tooltip-" + true).attr('title',holder.name); 
			}
			else {
				
			}
			
			
			 
			
		}
	}}
	else{
		let I = findIndex(stuff,holder); 
		let i = I.index; 
		holder = I.holder; 
		console.log("run3"); 
				let initalString = stuff.ops[i].insert; 
				let one = initalString.substring(0,holder.index); 
				let two = holder.content; 
				let three = initalString.substring(holder.index+holder.content.length); 
				stuff.ops[i].insert = one; 
				stuff.ops.splice(i+1,0, {attributes: {annotation: true}, insert:two}); 
				stuff.ops.splice(i+2,0, {insert:three});
				setContent(stuff); 
			
			
			$(".tooltip-" + true).tooltip();
			$(".tooltip-" + true).attr('title',holder.name);  
	}
	
	
};


var findIndex = function(stuff,holder)
{
	var index = 0; 
	var length = 0; 
	for(let i = 0; i<stuff.ops.length; i++)
	{
		if(typeof stuff.ops[i].insert == 'string' && length+stuff.ops[i].insert.length<holder.index)
		{
			console.log("run if 1", i); 
			console.log(stuff.ops[i].insert.length); 
			length += stuff.ops[i].insert.length
			index = i; 
		}
		else if(typeof stuff.ops[i].insert != 'string')
		{
			console.log("run if 2",i); 
			length++; 
			index = i; 
		}
		else{
			console.log("run if 3",i); 
			index = i; 
			i= stuff.ops.length+1; 
		}
	}
	holder.index = holder.index-length; 
	console.log(index); 
	console.log(holder.index); 
	return {index: index, holder: holder}; 
}; 

