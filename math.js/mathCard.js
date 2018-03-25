function getMath(id, equasion)
{
	//var math = require('mathjs');
	var elt = document.getElementById(id);
	var calculator = Desmos.GraphingCalculator(elt,{exspression: true, settingsMenu: false, expressionsTopbar: false,expressionsCollapsed: true } );
	calculator.setExpression({id:'graph1', latex:equasion});
	$(".dcg-show-expressions-tab").remove();
	getStuff("http://api.wolframalpha.com/v2/query?appid=YRVH38-J3JRL4T888&input=what+are+zeroes+of+function+","X Intercept(s): ",equasion,id);
	getStuff("http://api.wolframalpha.com/v2/query?appid=YRVH38-J3JRL4T888&input=what+are+y+intercepts+of+function+","Y Intercept(s): ",equasion,id);
	getStuff("http://api.wolframalpha.com/v2/query?appid=YRVH38-J3JRL4T888&input=what+is+the+maximum+of+","maximum(s) ",equasion,id);
};

function getStuff(stuff,what,equasion,id)
{
	var zero = []; 
	$.ajax({headers: {
				'Content-Type': "application/json",
				'Access-Control-Allow-Origin' : "*"
			},
			method: "GET",
			dataType: "jsonp",
            url: ""+stuff + encodeURIComponent(equasion) + "&output=json"}).done(function(result) {
				console.log(result.queryresult); 
				$("#" + id).append(what)
				for(let i = 0; i<result.queryresult.pods[1].subpods.length; i++)
				{
					zero[i] = result.queryresult.pods[1].subpods[i].plaintext;
					$("#" + id).append(""+(i+1)+". "+ zero[i] + "\n"); 
					
					
				}
    });
}