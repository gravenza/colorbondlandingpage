$(document).ready(function(){

  var wWidth = $(window).width();
  var wheight = $(window).height();

  console.log('width:'+ wWidth);
  console.log('height:'+ wheight);

  $('section.form-award').css('height',wheight);
  $('.align-items-center').css('height',(wheight - 300));
})
