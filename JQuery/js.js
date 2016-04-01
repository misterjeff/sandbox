$(function() {
 $('#navigation > li').hover(
  function () {
   $('a',$(this)).stop().animate({'marginLeft':'-2px'},200);
  },
  function () {
   $('a',$(this)).stop().animate({'marginLeft':'-85px'},200);
  }
 );
});


$(function(){
      alert("My First Jquery Test");
   });