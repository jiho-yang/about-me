$(document).ready(function(){


	$('#header>ul>li').on("mouseenter", function () {

		$(this).children(".Depth").stop().slideDown();

	});

	$('#header>ul>li').on("mouseleave", function () {

		$(this).children(".Depth").stop().slideUp();
	});

	
	$('.con2>div>div').on('mouseover', function(){
		$(this).addClass('on');
	});

	$('.con2>div>div').on('mouseleave', function(){
		$(this).removeClass('on');
	});
	

	showSlide(0);

	var total = $(".panel li").length; 


	$(".next").on("click",function(e){
		e.preventDefault();
		
		if(currentIndex==total - 1){
			currentIndex=0;
		}else{
			currentIndex++;
		}
		showSlide(currentIndex);
	});


	$(".prev").on("click",function(e){
		e.preventDefault();

		if(currentIndex==0){
			currentIndex=total - 1;
		}else{
			currentIndex--;
		}
		showSlide(currentIndex);
	});
	
	

	$(".navi li").on("click",function(e){
		e.preventDefault();
		
		var i = $(this).index();
		showSlide(i);
	});	


	function showSlide(index){
		$(".navi li a").removeClass("on");
		$(".navi li").eq(index).children("a").addClass("on");
		
		$(".panel li").fadeOut().removeClass("on");
		$(".panel li").eq(index).fadeIn().addClass("on");

		currentIndex = index;
	}


	$('#contents>.con4>div').on('mouseover', function(){
		$(this).children('a').children('i').removeClass('far fa-lightbulb');
		$(this).children('a').children('i').addClass('fas fa-lightbulb');
	});
	$('#contents>.con4>div').on('mouseleave', function(){
		$(this).children('a').children('i').removeClass('fas fa-lightbulb');
		$(this).children('a').children('i').addClass('far fa-lightbulb');
	});

	

	$('#contents>.con5>ul>li>a').on('click', function(e){
		e.preventDefault();

		var btnOn = $(this).hasClass('on');

		if (!btnOn) {

			$('#contents>.con5>ul>li>a').removeClass('on');
			$(this).addClass('on');

			var onNum = $(this).parent('li').index();
			$('#contents>.con5').children('div').removeClass('btnOn');
			$('#contents>.con5').children('div').eq(onNum).addClass('btnOn');
		}

	});

    
    var wid = $(".con6Wrap>div").outerWidth();
	var num = $(".con6Wrap>div").length;
	var totalWid = wid * num;
	$(".con6Wrap").width(totalWid);
    
    var mleft = 0;

	var timer = setInterval(move, 15);

	$(".con6Wrap>div").on("mouseenter", function () {
		clearInterval(timer);
	});

	$(".con6Wrap>div").on("mouseleave", function () {
		timer = setInterval(move, 15);
	});

	function move() {
		mleft -= 2;

		if (mleft < -wid) {
			$(".con6Wrap>div").first().appendTo(".con6Wrap");

			mleft = 0;
		}
		$(".con6Wrap").css({
			"left": mleft
		});
	}
	
});