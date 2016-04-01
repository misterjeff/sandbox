$(document).ready(function() {

	$("#panel1").hide(500).show(1000);
	$("#panel2").slideUp(1000).delay(500).slideDown(1000);
	$("#panel3").fadeOut(1000).delay(750).fadeIn(1000);
	$("#panel4").toggle(1000).delay(1000).toggle(1000);
	$("#panel5").css({
		color: 'red',
		fontWeight: 'bold',
		opacity: '0.5'
	});
	
});