var letters = 0; 
var contents;
var blob;
var quill;
var temp;
var path;
/*
function onSignIn(googleUser) {
    console.log("Success");

    profile = googleUser.getBasicProfile();
    google = googleUser;
    // set user
    user = {
        "email": profile.getEmail(),
        "firstName": profile.getGivenName(),
        "lastName": profile.getFamilyName(),
        "socialId": profile.getId(),
        "tokenId": googleUser.getAuthResponse().id_token
    };

    $.ajax({
	    type: 'POST',
	    url: "/conf/user",
	    data: JSON.stringify(user),
	    async: false,
	    error: function(e) {
	        console.log(e);
	    },
	    dataType: "json",
	    contentType: "application/json"
	});
       
    temp = window.location.href.substring(window.location.href.indexOf("=") + 1, window.location.href.length);
    
    path = temp.substring(temp.indexOf("/"), temp.length);
        
    if(temp.substring(0, temp.indexOf("/")) == user.email){
    	console.log("URL Matches Prince");
    	$.ajax({
    	    method: "GET",
    	    headers: {
    	        'Content-Type': 'application/json'
    	    },
    	    url: "/getfile?path=" + path,
    	    async:false
    	}).done(function(data) {
    			console.log(data + " data");
    			blob = JSON.parse(data);
    			quill.setContents(
    				  blob
    				);
    			
    });
    	// load file here
    	// remember to create new pages if it doesn't exist and prompt them.
    }
    else {
    	console.log("HACKER");
    	// redirect
    }
        
    $.ajax({
	    type: 'POST',
	    url: "/conf/user",
	    data: JSON.stringify(user),
	    async: false,
	    error: function(e) {
	        console.log(e);
	    },
	    dataType: "json",
	    contentType: "application/json"
	});
    
    console.log(user);
    
   
}
*/

$(document).ready(function(){
	
	
	$('body').on('click', '[data-editable]', function(){
		  
		  var $el = $(this);
		              
		  var $input = $('<input/>').css({'font-size': '200%'}).val( $el.text() );
		  $el.replaceWith( $input );
		  
		  var save = function(){
		    var $p = $('<p style = "font-size: 200%;" data-editable />').text( $input.val() );
		    $input.replaceWith( $p );
		  };
		  
		  $input.one('blur', save).focus();
		  
		});
	
	
	var toolbarOptions = [ 
	[{'font' : []}],
	[ {'size': []}],
	['bold','italic','underline'],
	[{"color": []}, {"background": []}], 
	['link','video','formula','image'],
	[{'align':[]}],
	[{'indent': '+1'}, {'indent': '-1'}	]
	];
	
	quill = new Quill('#editor', 	{
		modules: { 
			formula: true, 
			toolbar: toolbarOptions
			}, 
		theme: "snow"
	});
	var Parchment = Quill.import("parchment");

	let CustomClass = new Parchment.Attributor.Class('annotation', 'tooltip', {
	scope: Parchment.Scope.INLINE
	});

	Quill.register(CustomClass, true);
//	$("button.ql-annotation").append('<svg viewBox="0 0 18 18"> <text font-size="15" font-family="Verdana" x="0" y="11"> @</text></svg>');
	
	
	var finalBool = false; 
	quill.on('selection-change', function(range, oldRange, source) {
	if (range) {
		if (range.length != 0) {
			finalBool = true; 
			//console.log('User has highlighted', content);
			console.log('range' ,range.index); 
			$("button#annotation").click(function(){
			let content = quill.getText(range.index, range.length);
			console.log('User has highlighted', content); 
			console.log('Index', range.index); 
			console.log(source); 
			let name = $('input#annotation').val(); 
			console.log('Name =', name ); 
			
			if(!(name == null || name == "" || name == " ") && finalBool )
			{
				console.log("run"); 
				addAnnotation(name,content,range.index,false,quill.getContents()); 
				finalBool = false; 
			}
			}); 
		} 
	} 
	});
	
	
	var myTimer = setInterval(timer, 100);
	var mySecondTimer = setInterval(timer2, 1); 
	
	//$("#editor").keypress(function(){
	quill.on('text-change',function(){
		letters++; 
//		timer(); 
		clearInterval(myTimer); 
		checkAnnotation(quill.getText(),quill.getContents()); 
	});	
	function timer()  {
		if(letters > 0) 
		{
			letters = 0; 
			// save and ajax
			
			/*$.ajax({
			    type: 'POST',
			    url: "/file/save?path=" + path,
			    data: JSON.stringify(quill.getContents()),
			    async: false,
			    error: function(e) {
			        console.log(e);
			    },
			    contentType: "application/json"
			});*/
			
			contents = JSON.stringify(quill.getContents());
			console.log(contents); 
		}
	}
	function timer2()
	{
		if(letters == 500)
			{
			contents = JSON.stringify(quill.getContents());
			console.log(contents)
			// save and ajax
			}
		
	}
	
});


function setContent(input)
{
	quill.setContents(input); 
};