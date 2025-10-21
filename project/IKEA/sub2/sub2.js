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
		$('.imgBoxWrap').stop().animate({'margin-left':'-200%'},700,function(){
			$('.imgBoxWrap>div').first().appendTo('.imgBoxWrap');
			$('.imgBoxWrap').css({'margin-left':'-100%'});
        });
        
        $('.blackBoxWrap').stop().animate({'margin-left':'-200%'},700,function(){
			$('.blackBoxWrap>div').first().appendTo('.blackBoxWrap');
			$('.blackBoxWrap').css({'margin-left':'-100%'});
		});
	});


	$('.prev').on('click', function(e){
		e.preventDefault();
		$('.imgBoxWrap').stop().animate({'margin-left':'0px'},700,function(){
			$('.imgBoxWrap>div').last().prependTo('.imgBoxWrap');
			$('.imgBoxWrap').css({'margin-left':'-100%'});
        });
        
        $('.blackBoxWrap').stop().animate({'margin-left':'0px'},700,function(){
			$('.blackBoxWrap>div').last().prependTo('.blackBoxWrap');
			$('.blackBoxWrap').css({'margin-left':'-100%'});
		});
    });
    
});