function checkCards(contents, text,id){
	let maths = findMath(contents); 
	for(let i = 0; i<maths.length; i++)
	{
		console.log(maths[i]); 
		let str = "Zeroes = " + maths[i].zero[0]; 
		addCard("math",maths[i].equasion,null,str,id)
	}
	
	let grammer = getGrammer(text); 
	console.log(grammer); 
	
	
	
}

function addCard(type,title,image,text,id){
	var html = '<div class ="' + type + '" ><h4 class = "title full clickable">' + type.substring(0,1).toUpperCase() + type.substring(1) + '</h4> <h2 class = "title full clickable">' + title + '</h2>';
	
	if(type == "grammer")
	{
		html += ' <img class = "full clickable" src = "' + image + '"> ';
	}
	else if (type == "math" && image == null)
	{
		html+= '<div class = "image full" id = "empty"> </div> ' ;
	}
	
	html += ' <h2 class = "text full clickable">' + text + '</h2></div>';
	
	if(type == "math")
	{
		let len = $(".grammer").length + $(".math").length + $("research").length + 1;
		html = html.substring(0,html.length - 6) +'<button class="btn full" data-toggle="modal" data-target="#mathModal' + (len) + '"">expand</button>' + html.substring(html.length - 6); 
	}
	
	
	$("#" + id).append(html); 
	if(type == "math") 
	{	
		let len = $(".grammer").length + $(".math").length + $("research").length ;
		let elt = document.getElementById("empty");
		let calculator = Desmos.GraphingCalculator(elt,{exspression: true, settingsMenu: false, expressionsTopbar: false,expressionsCollapsed: true } );
		calculator.setExpression({id:'graph1', latex:title});
		$("#empty").removeAttr("id"); 
		$("#modals").append('<div class="fade modal"role=dialog aria-hidden=true aria-labelledby=exampleModalCenterTitle id="mathModal' +len + '"tabindex=-1><div class="modal-dialog modal-dialog-centered"role=document><div class=modal-content><div class=modal-header><h3 class=modal-title id=exampleModalLongTitle style = "text-align: center;">' + title + '</h3><div id = "graph' + len+'" style="width:500px; height:600px;"> </div><button class=close type=button data-dismiss=modal aria-label=Close><span aria-hidden=true>×</span></button></div><div class=modal-body>...</div><div class=modal-footer><button class="btn btn-secondary"type=button data-dismiss=modal>Close</button> </div></div></div></div>'); 
		let elt2 = document.getElementById("graph" + len);
		let calculator2 = Desmos.GraphingCalculator(elt2,{exspression: true, settingsMenu: false, expressionsTopbar: false,expressionsCollapsed: true } );
		calculator2.setExpression({id:'graph1', latex:title});
		$(".dcg-show-expressions-tab").remove();
	}
	$(".clickable").off("click"); 
	$(".clickable").click(handler); 
		
	
};

function handler(){
		$(this).parent().children().toggleClass("full"); 
		$(this).parent().children().toggleClass("small"); 
}

	
	