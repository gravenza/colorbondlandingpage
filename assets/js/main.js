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

    var catvalue = $(this).data('value');

    $('input:hidden').val(catvalue);

    if(catvalue == 'other'){
      $('.form-group.inhidden').css('display','flex');
      $('input[name="occupation"]').val('');
    }else{
      $('.form-group.inhidden').css('display','none');
    }

  })
})
