$(document).ready(function(){

    $("#header>ul>li").on("mouseover",  function(){
        $(this).children(".depth").stop().slideDown(250);
    });

    $("#header>ul>li").on("mouseleave",  function(){
        $(this).children(".depth").stop().slideUp(250);
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
    
    

    




    var slideImg = $(".headerWrap");

    var slides = slideImg.find(">img");   

    var currentIndex = 0;    

    var slideCount = slides.size();   


    

    function showNext(){
        var nextIndex = (currentIndex + 1) % slideCount;  
        

        slides.eq(currentIndex).fadeOut(800);   

        slides.eq(nextIndex).fadeIn(800);    

        console.log("currentIndex :" + currentIndex);
        console.log("nextIndex :" + nextIndex);

        currentIndex = nextIndex;

    }

    setInterval(showNext, 3000);


});