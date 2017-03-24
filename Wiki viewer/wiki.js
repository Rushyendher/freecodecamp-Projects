$(document).ready(function(){
	$("#search").on("click",function(){
		$("#panel").html('');
		var titleValue = $("#title").val();
		var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+titleValue;
		$.ajax({
			dataType:'jsonp',
			url: url,
			success: function(response){
				var pages = response.query.pages;
				var pageKeys = Object.keys(pages);
				for(var i = 0;i<pageKeys.length;i++){
					var extract = pages[pageKeys[i]]["extract"];
					console.log(extract);
					var curlId = "https://en.wikipedia.org/?curid="+pageKeys[i];
					var html = "<a target='_blank' href="+curlId+"><div class='panel panel-primary'><div class='panel-body'>"+extract+"</div></div></a>"
					$("#panel").append(html);
				}
			}
		});
	});				
});