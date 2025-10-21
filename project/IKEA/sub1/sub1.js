$(document).ready(function(){	

	$("#header>ul>li").on("mouseover",  function(){
        $(this).children(".depth").stop().slideDown();
    });

    $("#header>ul>li").on("mouseleave",  function(){
        $(this).children(".depth").stop().slideUp();
    });


	$('.moBtn').on('click', function(e){
        e.preventDefault();


        var isOpen = $('.moBtn').hasClass('on');

        if(isOpen){
            $('.moBtn').removeClass('on');
            $('#moPanel').removeClass('on');
        }else{
            $('.moBtn').addClass('on');
            $('#moPanel').addClass('on');
        }
    });

    var $moPanel_li = $('#moPanel>ul>li');

    $moPanel_li.on('click', function(e){
        e.preventDefault();

        var isOn = $(this).children('.moDepth').hasClass('on');
        if(isOn){
            $(this).children('.moDepth').removeClass('on');
            $(this).children('.moDepth').stop().slideUp();
        }else {
            $(this).children('.moDepth').addClass('on');
            $(this).children('.moDepth').stop().slideDown();
        }
	});
	

   
    $('.next').on('click', function(e){
		e.preventDefault();
		$('.viewBox').stop().animate({'margin-left':'-50%'},700,function(){
			$('.viewBox>div').first().appendTo('.viewBox');
			$('.viewBox').css({'margin-left':'-25%'});
		});
	});


	$('.prev').on('click', function(e){
		e.preventDefault();
		$('.viewBox').stop().animate({'margin-left':'0%'},700,function(){
			$('.viewBox>div').last().prependTo('.viewBox');
			$('.viewBox').css({'margin-left':'-25%'});
		});
	});
	

    
});