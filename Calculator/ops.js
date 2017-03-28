$(document).ready(function(){
	var expression = '';
	var isValid = true;
	$(".exp").on("click",function(){
		if(!isValid){
			expression = '';
			$("#display").text('');
			isValid = true;
		}
		var op = $(this).val();
		expression += op;
		console.log(expression);
		$("#display").append(op);
	});
	
	$(".reset").on("click",function(){
		$("#display").text('');
		expression = '';
	});
	
	$("#evaluate").on("click",function(){
		var output;
		try{
			output = eval(expression);
		}
		catch(err){
			isValid = false;
			output = 'Invalid Expression';
		}
		finally{
			$("#display").text(output);
		}
	});
});