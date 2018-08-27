	function openModal(){
		document.getElementById('myModal').style.display = "block";
	}

		function closeModal() {
		  document.getElementById('myModal').style.display = "none";
		}

		var slideIndex = 1;
		showSlides(slideIndex);

		function plusSlides(n) {
		  showSlides(slideIndex += n);
		}

		function currentSlide(n) {
		  showSlides(slideIndex = n);
		}

		function showSlides(n) {
		  var i;
		  var slides = document.getElementsByClassName("mySlides");
		  var dots = document.getElementsByClassName("demo");
		  var captionText = document.getElementById("caption");
		  if (n > slides.length) {slideIndex = 1}
		  if (n < 1) {slideIndex = slides.length}
		  
		  for (i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
			slides[slideIndex - 1].style.display = "block";
		  }
		  
		  
		  
		  //for (i = 0; i < dots.length; i++) {
			//dots[i].className = dots[i].className.replace(" active", "");
		  //}
		  
		  
		  //dots[slideIndex-1].className += " active";
		  //captionText.innerHTML = dots[slideIndex-1].alt;
		}
	
	function showModaldelete(){
		document.getElementById('myModal').style.display = "block";
	}
	
	function modalLogin(){
		document.getElementById('modalLogin').style.display = "block";
	}
	
	function closeLogin(){
		document.getElementById('modalLogin').style.display = "none";
	}
	
	function currentDelete(e){
		var i;
		var delId = $('a.del-item'+ e);
		var name = delId.data('name');
		var rowid = delId.data('id');
		var base_url = window.location.origin;
		
		var c_name = delId.length;
			
		document.getElementById('del-item').innerHTML = "Apakah kamu yakin ingin menghapus <strong>" + name + "</strong>?";
		$('#btnDelete').attr('href',''+ base_url +'/cart/delete_item/'+ rowid );
	}
	
	
	$(document).ready(function(){
		
	//=======AJAX START=======//
	
	$('input[type="text"].input-number').change(function(e){
		e.preventDefault();
		
		var id 	= $(this).data('id');
		var qty = $(this).val();
		var num = $(this).data('num');
		var price = $(this).data('price');
		var base_url = window.location.origin;
		
		$.ajax({
		  type: "POST",
		  url: base_url + "/cart/updateqty",
		  data: "cart_id="+ id +"&qty="+ qty +""
		});
		
		var count = qty * price;
		var amount = $.number(count);
		var rpc = String(amount).replace(/\,/g,'.');	
		
		$(".price"+ num).html( "<strong>Rp. " + rpc + "</strong>" );
		
		location.reload();
		
	});
	
	
	var allTotal = 0;
	function cartTotal(){
		
		var button = $('.btn-number').data('type');
		
		$('.input-number').each(function(){
			
			var priceperitem = $(this).val() * $(this).data('price');
			
			//console.log(priceperitem);
			
				allTotal += parseFloat(priceperitem);

			$('#grandtotal').html("Total: <strong>Rp. " + $.number(allTotal) +"</strong>");
			
			location.reload();
		});
	}
	
	//var testcount = $('.input-number').length;
	//$('body').append(testcount);
	
	//=======AJAX END=======//	
	
	//=======FUNCTION BUTTON CART START=======//
	
	$('.btn-number').click(function(e){
    e.preventDefault();
    
    var fieldName = $(this).attr('data-field');
    var type      = $(this).attr('data-type');
    var input = $("input[name='"+fieldName+"']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if(type == 'minus') {
            
            if(currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            } 
            if(parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if(type == 'plus') {

            if(currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if(parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
	});
	$('.input-number').focusin(function(){
	   $(this).data('oldValue', $(this).val());
	});
	$('.input-number').change(function() {
    
    minValue =  parseInt($(this).attr('min'));
    maxValue =  parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());
    
    name = $(this).attr('name');
    if(valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    
    
	});
	$(".input-number").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) || 
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
	
	//=======FUNCTION BUTTON CART END=======//
	
	});
	


// $(document).ready(function(){
		
		// $('#accordionInner1').on('shown.bs.collapse',function(){
				
			// $('#accordionInner1 a[aria-expanded="true"]').find('i.fa').removeClass('fa-plus');
			// $('#accordionInner1 a[aria-expanded="true"]').find('i.fa').addClass('fa-minus');	
				
		// });
			
		// $('#accordionInner1').on('hidden.bs.collapse',function(){
				
			// $('#accordionInner1 a[aria-expanded="false"]').find('i.fa').addClass('fa-plus');
			// $('#accordionInner1 a[aria-expanded="false"]').find('i.fa').removeClass('fa-minus');	
				
		// });			

		// $('.counter').countUp();

		// $('#carousel-amitra').carousel({
			// interval: 7000
		// })

		// $('#carousel, #carousel-amitra').each(function(){
			// $('.carousel-caption h1').each(function(){
				// new WOW().init();
			// })
		// });

		// $('#carousel, #carousel-amitra').on('slide.bs.carousel', function () {

			// $('.carousel-caption h1').each(function(){
				// new WOW().init();
			// });
		// });
		
		// $('.fifastra-spriter,.parallax-spektra-inner,.danastra-slider').each(function(){
			// wow = new WOW(
                      // {
                      // boxClass:     'wow1',      // default
                      // animateClass: 'animated', // default
                      // offset:       5,          // default
                      // mobile:       false,       // default
                      // live:         true        // default
                    // }
                    // )
                    // wow.init();
		// });

		// $('.menu').slicknav();

		// var $grid = $('.grid').masonry({
			// columnWidth: 200,
			// itemSelector: '.grid-item'
		// });

		// layout Masonry after each image loads
		// $grid.imagesLoaded().progress( function() {
		// $grid.masonry('layout');
		// });

		// Cache the Window object
		// var $window = $(window);
		
		// $('.promotion-feature .thumbnail a').hover(function(){
			// $(this).find('h4.link').toggleClass('hidden');
			// $('h4.title').toggleClass('animated bounceInLeft');
		// });
		
		// $('table').addClass('table table-bordered table-striped');
		
		// $('section.news .animateOnScroll:first-child').attr('data-animation','bounceInLeft');
		// $('section.news .animateOnScroll:nth-child(2)').attr('data-animation','bounceInDown');
		// $('section.news .animateOnScroll:last-child').attr('data-animation','bounceInRight');



		// if($(window).width() > 768){
			
			// var cekLebar = window.innerWidth;
			// var cekTinggi = window.innerHeight;
			// var headerHeight = $('header').height();
			// var footerHeight = $('footer').height();
			
			// $('content').append('<p style="position:absolute;z-index:5"> Tinggi Screen ini adalah:'+ cekTinggi +'</p>');
		
			// $('.fifgroup-slider .parallax-slider').css({height:+ cekTinggi - headerHeight +"px"});
			// $('.parallax-overview').css({height:+ cekTinggi - footerHeight +"px"});
			// $('.fifastra-slider .parallax-slider').css({height:+ cekTinggi - headerHeight +"px"});
			// $('.spektra-slider .parallax-slider').css({height:+ cekTinggi - headerHeight +"px"});
			// $('.parallax-spektra-inner .sprite-left,.parallax-spektra-inner .sprite-right').css({height:+ cekTinggi - headerHeight +"px"});
			// $('.danastra-slider .parallax-slider, .amitra-slider .parallax-slider').css({height:+ cekTinggi - headerHeight +"px"});
			
			// $('.fifastra-inner .news,.spektra-inner .news,.danastra-inner .news,.amitra-inner .news').css({height:+ (cekTinggi - footerHeight) + 200 +"px"});
			
			// if(cekTinggi > 637){
				// $('.fifastra-inner .fifastra-spriter > div.spritebox').css({height:+ (cekTinggi - headerHeight) + 280 +"px"});
				// $('.fifastra-inner .fifastra-spriter').css({width:+ cekLebar / 3 +"px",height:+ (cekTinggi - headerHeight) + 280 +"px"});
			// }else{
				// $('.fifastra-inner .fifastra-spriter > div.spritebox').css({height:+ (cekTinggi - headerHeight) + 150 +"px"});
				// $('.fifastra-inner .fifastra-spriter').css({width:+ cekLebar / 3 +"px",height:+ (cekTinggi - headerHeight) + 150 +"px"});
			// }
			
			// var mrg = $('.fifastra-inner .fifastra-spriter .caption').height();
			
			// $('.fifastra-inner .fifastra-spriter .caption').css({top:+ cekTinggi - (headerHeight + mrg) +"px"});
			// $('.fifastra-inner .fifastra-spriter .caption h4').css({margin:+ (mrg - 19) / 2 +"px "+ 0});
			

			// SECTION FIFASTRA
			// $('section.fifastra').each(function(){

				// var $thisSection = $(this);

				// $window.on('scroll', fifastraOnScroll);

			// function fifastraOnScroll(){
				// var scrolled 			= $window.scrollTop();

				// $(".fifastraOnScroll:not(.animated)").each(function(){
					// var $this 		= $(this),
						// offsetTop 	= $('section.fifastra').offset().top;

					// if (scrolled > ($('.parallax-fifastra').offset().top - 300)) {
						// if($this.data('timeout')){
							// window.setTimeout(function(){
							// $this.addClass('animated ' + $this.data('animation'));
							// $this.css('visibility','visible');
							// }, parseInt($this.data('timeout'),10));

						// }else{
							// $this.addClass('animated ' + $this.data('animation'));
							// $this.css('visibility','visible');
						// };
					// };

				// });

				// $(".fifastraOnScroll.animated").each(function(index) {
					// var $this   = $(this),
					// offsetTop 	= $this.offset().top;

					// if (scrolled < ($('.parallax-fifastra').offset().top - 500)) {
						// $this.removeClass('animated bounceInLeft bounceInRight fadeInUp flipInX lightSpeedIn fadeInUpBig');
						// $this.css('visibility','hidden');
					// }
				// });

			// };

			// fifastraOnScroll();

		// });

		// SECTION SPEKTRA
		// $('section.spektra').each(function(){

			// var $thisSection = $(this);

			// $window.on('scroll', spektraOnScroll);

			// function spektraOnScroll(){
				// var scrolled 			= $window.scrollTop();

				// $(".spektraOnScroll:not(.animated)").each(function(){
					// var $this 		= $(this),
						// offsetTop 	= $('section.fifastra').offset().top;

					// if (scrolled > ($('.parallax-spektra').offset().top - 300)) {
						// if($this.data('timeout')){
							// window.setTimeout(function(){
							// $this.addClass('animated ' + $this.data('animation'));
							// $this.css('visibility','visible');
							// }, parseInt($this.data('timeout'),10));

						// };
					// };

				// });

				// $(".spektraOnScroll.animated").each(function(index) {
					// var $this   = $(this),
					// offsetTop 	= $this.offset().top;

					// if (scrolled < ($('.parallax-spektra').offset().top - 600)) {
						// $this.removeClass('animated bounceInLeft bounceInRight fadeInUp flipInX lightSpeedIn fadeInUpBig');
						// $this.css('visibility','hidden');
					// }
				// });

			// };

			// spektraOnScroll();

		// });

		// SECTION DANASTRA
		// $('section.danastra').each(function(){

			// var $thisSection = $(this);

			// $window.on('scroll', danastraOnScroll);

			// function danastraOnScroll(){
				// var scrolled 			= $window.scrollTop();

				// $(".danastraOnScroll:not(.animated)").each(function(){
					// var $this 		= $(this),
						// offsetTop 	= $('section.fifastra').offset().top;

					// if (scrolled > ($('.parallax-danastra').offset().top - 300)) {
						// if($this.data('timeout')){
							// window.setTimeout(function(){
							// $this.addClass('animated ' + $this.data('animation'));
							// $this.css('visibility','visible');
							// }, parseInt($this.data('timeout'),10));

						// };
					// };

				// });

				// $(".danastraOnScroll.animated").each(function(index) {
					// var $this   = $(this),
					// offsetTop 	= $this.offset().top;

					// if (scrolled < ($('.parallax-danastra').offset().top - 500)) {
						// $this.removeClass('animated bounceInLeft bounceInRight fadeInUp flipInX lightSpeedIn fadeInUpBig');
						// $this.css('visibility','hidden');
					// }
				// });

			// };

			// danastraOnScroll();

		// });

		// SECTION AMITRA
		// $('section.amitra').each(function(){

			// var $thisSection = $(this);

			// $window.on('scroll', amitraOnScroll);

			// function amitraOnScroll(){
				// var scrolled 			= $window.scrollTop();

				// $(".amitraOnScroll:not(.animated)").each(function(){
					// var $this 		= $(this),
						// offsetTop 	= $('section.fifastra').offset().top;

					// if (scrolled > ($('.parallax-amitra').offset().top - 300)) {
						// if($this.data('timeout')){
							// window.setTimeout(function(){
							// $this.addClass('animated ' + $this.data('animation'));
							// $this.css('visibility','visible');
							// }, parseInt($this.data('timeout'),10));

						// };
					// };

				// });

				// $(".amitraOnScroll.animated").each(function(index) {
					// var $this   = $(this),
					// offsetTop 	= $this.offset().top;

					// if (scrolled < ($('.parallax-amitra').offset().top - 500)) {
						// $this.removeClass('animated bounceInLeft bounceInRight fadeInUp flipInX lightSpeedIn fadeInUpBig');
						// $this.css('visibility','hidden');
					// }
				// });

			// };

			// amitraOnScroll();

		// });

		// SPEKTRA NEWS

		// $('section.news').each(function(){

			// var $thisSection = $(this);

			// $window.on('scroll', animateOnScroll);

			// function animateOnScroll(){
				// var scrolled 			= $window.scrollTop();

				// $(".animateOnScroll:not(.animated)").each(function(){
					// var $this 		= $(this);

					// if (scrolled > ($('section.news').offset().top - 600)) {
						// if($this.data('timeout')){
							// window.setTimeout(function(){
							// $this.addClass('animated ' + $this.data('animation'));
							// $this.css('visibility','visible');
							// }, parseInt($this.data('timeout'),10));

						// };
					// };

				// });

				// $(".animateOnScroll.animated").each(function(index) {
					// var $this   = $(this);

					// if (scrolled < ($('section.news').offset().top - 600)) {
						// $this.removeClass('animated bounceInLeft bounceInRight fadeInUp bounceInDown lightSpeedIn fadeInUpBig');
						// $this.css('visibility','hidden');
					// }
				// });

			// };

			// animateOnScroll();

		// });
		
		// PROMO FEATURE

		// $('section.promotion-feature').each(function(){

			// var $thisSection = $(this);

			// $window.on('scroll', promoOnScroll);

			// function promoOnScroll(){
				// var scrolled 			= $window.scrollTop();

				// $(".promoOnScroll:not(.animated)").each(function(){
					// var $this 		= $(this);

					// if (scrolled > ($('section.promotion-feature').offset().top - 600)) {
						// if($this.data('timeout')){
							// window.setTimeout(function(){
							// $this.addClass('animated ' + $this.data('animation'));
							// $this.css('visibility','visible');
							// }, parseInt($this.data('timeout'),10));

						// };
					// };

				// });

				// $(".promoOnScroll.animated").each(function(index) {
					// var $this   = $(this);

					// if (scrolled < ($('section.promotion-feature').offset().top - 600)) {
						// $this.removeClass('animated bounceInLeft bounceInRight');
						// $this.css('visibility','hidden');
					// }
				// });

			// };

			// promoOnScroll();

		// });

		// Parallax Backgrounds
		// Tutorial: http://code.tutsplus.com/tutorials/a-simple-parallax-scrolling-technique--net-27641

				// $('.middle-logo').click(function(){
					// var x = $(".parallax-fifastra").offset();
	        // alert("Top: " + x.top + " Left: " + x.left);
				// });


		// $('section[data-type="background"],li[data-type="background"],li:eq(2)[data-type="background"]').each(function(){
			// var $bgobj = $(this); // assigning the object

			// $(window).scroll(function() {

			// Scroll the background at var speed
			// the yPos is a negative value because we're scrolling it UP!
			// if($bgobj.data('order')==0){
			// if($window.scrollTop() > 0){
				// var yPos = -(($window.scrollTop() - $('.fifgroup-slider').offset().top) / $bgobj.data('speed'));
			// }
			// }

			// if($bgobj.data('order')==1){
			// if($window.scrollTop() > 200){
			// var yPos = -(($window.scrollTop() - $('.parallax-fifastra').offset().top) / $bgobj.data('speed'));
			// }
			// }

			// if($bgobj.data('order')==2){
			// if($window.scrollTop() > 700){
			// var yPos = -(($window.scrollTop() - $('.parallax-spektra').offset().top) / $bgobj.data('speed'));
			// }
			// }

			// if($bgobj.data('order')==3){
			// if($window.scrollTop() > 1300){
			// var yPos = -(($window.scrollTop() - $('.parallax-danastra').offset().top) / $bgobj.data('speed'));
			// }
			// }

			// if($bgobj.data('order')==4){
			// if($window.scrollTop() > 1800){
			// var yPos = -(($window.scrollTop() - $('.parallax-amitra').offset().top) / $bgobj.data('speed'));
			// }
			// }

			// Put together our final background position
			

			// var coords = '50% '+ yPos ;
			// Move the background
			// $bgobj.css({ backgroundPosition: coords });
			// $bgobj.css({ zIndex: $window.scrollTop() });

			// }); // end window scroll
		// });

		// $('.fifastra-inner').each(function(){
		// var $fifastraSpriterCaption = $(window).width() - ($('.fifastra-spriter').offset().left + $('.fifastra-spriter').outerWidth(true));
		// $('.fifastra-spriter .caption').css('width', + $fifastraSpriterCaption );
		// });

		// $('.fifastra-spriter').each(function(){
			// new WOW().init();
		// });

		// $('.parallax-slider').each(function(){
			// var $this = $(this);

			// $(window).scroll(function() {
				// if($window.scrollTop() > 0){
					// var yPos = -(($window.scrollTop()) / $this.data('speed'));
				// }

				// if($window.scrollTop() == 0){
					// var coords = 'center';
				// }else{
					// var coords = '50% '+ yPos + 'px';
				// }

				// $this.css({ backgroundPosition: coords });
			// });

		// });

		// $('.danastra-slider .slide-spriter').each(function(){

			// $(window).on('load', function(){
			
				// $(window).scroll(function() {
				// if($window.scrollTop() == 0){
					// $('.slide-spriter').each(function(){
					// new WOW().init();
					// });
				// }
				// });
			
				// new WOW().init();
			// });


		// });

	// };

	// });
