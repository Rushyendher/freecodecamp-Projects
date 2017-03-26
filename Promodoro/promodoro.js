var break_value;
var session_value;
var session_run = true;
var secs;
var toggle_timer = false;

var timeInterval;

function incBreakValue(){
	break_value++;
}
function decBreakValue(){
	if(break_value <= 1){
		break_value = 1;
		return;
	}
	break_value--;
}
function incSessionValue(){
	session_value++;
}
function decSessionValue(){
	if(session_value <= 1){
		session_value = 1;
		return;
	}
	session_value--;
}

function secondsToHms(d) {
	d = Number(d);
	var h = Math.floor(d / 3600);
	var m = Math.floor(d % 3600 / 60);
	var s = Math.floor(d % 3600 % 60);
	return (
	  (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
	); 
}

function updateTimer(){
	if(secs >= 0){
		var display = secondsToHms(secs);
		$("#timer_value").text(display);		
		secs--;
	}
	else{
		clearInterval(timeInterval);
		if(session_run){
			$("#header").text("BREAK");
			$("#header").css("color","red");
			session_run = false;			
		}
		else{
			$("#header").text("SESSION");
			$("#header").css("color","green");
			session_run = true;
		}
	}
}

$(document).ready(function(){
	break_value = $("#break_len_value").text();
	session_value = $("#session_len_value").text();

	$("#dec_break").on("click",function(){
		decBreakValue();
		$("#break_len_value").text(break_value);
		if(!session_run){
			$("#timer_value").text(break_value);
		}
	});
	$("#inc_break").on("click",function(){
		incBreakValue();
		$("#break_len_value").text(break_value);
		if(!session_run){
			$("#timer_value").text(break_value);
		}
	});
	$("#dec_session").on("click",function(){
		decSessionValue();
		$("#session_len_value").text(session_value);
		if(session_run){
			$("#timer_value").text(session_value);
		}
	});
	$("#inc_session").on("click",function(){
		incSessionValue();
		$("#session_len_value").text(session_value);
		if(session_run){
			$("#timer_value").text(session_value);
		}
	});

	$("#time_div").on("click",function(){
		if(session_run){
			secs = session_value * 60;
			if(secs >= 0){
				timeInterval = setInterval(updateTimer,1000);
			}
		}
		else{
			secs = break_value * 60;
			if(secs >= 0){	
				timeInterval = setInterval(updateTimer, 1000);
			}
		}
	});
});