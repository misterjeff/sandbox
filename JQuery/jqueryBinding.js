$(document).ready(function() {

	$("#btn1").on('click', function() {
		$("#panel1").slideToggle();
	});
	
	$("#btn2").on('click', function() {
		$("#panel2").fadeToggle();
	});
	
	$("#btn3").on('mouseover', function() {
		$("#panel3").toggle();
	});
	
	$("#btn4").on('click', function() {
		$("#panel4 .panel-body").html('my panel 4 content');
	});
	
	$('#panel1').on('click', function() {
		$('#panel2').fadeToggle();
	});
	
});