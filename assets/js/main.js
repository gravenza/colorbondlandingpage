$(document).ready(function(){

  var wWidth = $(window).width();
  var wheight = $(window).height();

  console.log('width:'+ wWidth);
  console.log('height:'+ wheight);

  if($(window).width() > 1680){
    $('section.form-award').css('height',wheight);
    $('.align-items-center').css('height',(wheight - 300));
  }

  $('.btn-category button').click(function(){
    $('.btn-category').find('.btn-secondary').addClass('btn-warning');
    $('.btn-category').find('.btn-warning').removeClass('btn-warning');
    $(this).addClass('btn-warning');
  })
})
