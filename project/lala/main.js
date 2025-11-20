$(document).ready(function () {



	$('.moBtn').on('click', function () {

		var isOn = $('#moPanel').hasClass('on');

		if (isOn) {
			$('#moPanel').removeClass('on');
			$(this).removeClass('on');
		} else {
			$('#moPanel').addClass('on');
			$(this).addClass('on');
		}
	});

	$('#moPanel>li').on('click', function () {
		var depOn = $(this).children('.moDepth').hasClass('on');

		if (depOn) {
			$(this).children('.moDepth').removeClass('on');
			$(this).children('.moDepth').slideUp();
		} else {
			$(this).children('.moDepth').addClass('on');
			$(this).children('.moDepth').stop().slideDown();
		}


	});


	$('#header>ul>li').on("mouseenter", function () {

		$(this).children(".Depth").stop().slideDown();

	});

	$('#header>ul>li').on("mouseleave", function () {

		$(this).children(".Depth").stop().slideUp();
	});

	// --------------------------------------------------

	var con1Top = $('.con1').offset().top -500;
	var con2Top = $('.con2').offset().top;

	console.log($(window).scrollTop());
	console.log($('.con1').offset().top);



	$(window).on('scroll', function () {
		var scroll1 = $(this).scrollTop();
	if (window.outerWidth >= 577) {
		if (scroll1 >= con1Top && scroll1 < con2Top) {
			
			$('.con1>.op').css({'bottom' : '0px', 'opacity' : '1'});

		} 

		if (scroll1 <= con1Top) {

			$('.con1>.op').css({'bottom' : '-500px', 'opacity' : '0'});

		}
	}
	});



	// --------------------------------------------------






	timer();

	function timer() {
		setInterval(function () {
			$('.next').trigger("click")

		}, 3000);

	}


	$('.next').on('click', function (e) {
		e.preventDefault();


		$('.pan1').stop().animate({
			'margin-left': '-100%'
		}, 500, function () {
			$('.pan1>li').first().appendTo('.pan1');
			$('.pan1').css({
				'margin-left': '0%'
			});
		});


		$('.pan2').stop().animate({
			'margin-left': '-50%'
		}, 500, function () {
			$('.pan2>li').first().appendTo('.pan2');
			$('.pan2').css({
				'margin-left': '0%'
			});
			$('.pan2>li').removeClass('on');
			$('.pan2>li').first().addClass('on');
		});
	});


	$('.prev').on('click', function (e) {
		e.preventDefault();


		$('.pan1>li').last().prependTo('.pan1');
		$('.pan1').css({
			'margin-left': '-100%'
		});
		$('.pan1').stop().animate({
			'margin-left': '0%'
		}, 500);


		$('.pan2>li').last().prependTo('.pan2');
		$('.pan2').css({
			'margin-left': '-50%'
		});
		$('.pan2').stop().animate({
			'margin-left': '0%'
		}, 500, function () {
			$('.pan2>li').removeClass('on');
			$('.pan2>li').first().addClass('on');
		});
	});

	var wid = $(".bgBoxWrap>div").outerWidth();
	var num = $(".bgBoxWrap>div").length;
	var totalWid = wid * num;
	$(".bgBoxWrap").width(totalWid);




	var mleft = 0;

	var timer = setInterval(move, 15);

	$(".con4").on("mouseenter", function () {
		clearInterval(timer);
	});

	$(".con4").on("mouseleave", function () {
		timer = setInterval(move, 15);
	});

	function move() {
		mleft -= 2;

		if (mleft < -wid) {
			$(".bgBoxWrap>div").first().appendTo(".bgBoxWrap");

			mleft = 0;
		}
		$(".bgBoxWrap").css({
			"left": mleft
		});
	}

	var con6Top = $('.con6').offset().top - 600;
	var footerTop = $('.footerWrap').offset().top;

	console.log($(window).scrollTop());
	console.log($('.footerWrap').offset().top);

	$(window).on('scroll', function () {
		var scroll = $(this).scrollTop();

		if (scroll >= con6Top && scroll < footerTop) {
			$('.first>div').css({
				'margin-left': '0%',
				'opacity': '1'
			})
			$('.second>div').css({
				'margin-left': '0%',
				'opacity': '1'
			})
		} else if (scroll < con6Top) {
			$('.first>div').css({
				'margin-left': '-100%',
				'opacity': '0'
			})
			$('.second>div').css({
				'margin-left': '100%',
				'opacity': '0'
			})
		}
	});


});