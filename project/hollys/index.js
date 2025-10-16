$(document).ready(function () {
    $('.single-item').slick({
        arrows: false,         // ← 이전/다음 버튼 안 보이게!
        dots: true,            // ← 점(dot) 보이게!
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
    });


    // $('.center').slick({
    //     centerMode: true,
    //     centerPadding: '60px',
    //     slidesToShow: 3,
    //     prevArrow: '<button class="custom-prev"><</button>',
    //     nextArrow: '<button class="custom-next">></button>',
    //     responsive: [
    //         {
    //             breakpoint: 768,
    //             settings: {
    //                 arrows: false,
    //                 centerMode: true,
    //                 centerPadding: '40px',
    //                 slidesToShow: 3
    //             }
    //         },
    //         {
    //             breakpoint: 480,
    //             settings: {
    //                 arrows: false,
    //                 centerMode: true,
    //                 centerPadding: '40px',
    //                 slidesToShow: 1
    //             }
    //         }
    //     ]
    // });



    $('.center').slick({
        centerMode: true,
        centerPadding: '0',
        slidesToShow: 3,
        arrows: true,
        prevArrow:
            '<button type="button" class="slick-prev" aria-label="Previous">' +
            '<i class="bi bi-arrow-left-circle default"></i>' +
            '<i class="bi bi-arrow-left-circle-fill hover"></i>' +
            '</button>',
        nextArrow:
            '<button type="button" class="slick-next" aria-label="Next">' +
            '<i class="bi bi-arrow-right-circle default"></i>' +
            '<i class="bi bi-arrow-right-circle-fill hover"></i>' +
            '</button>',
        speed: 450,
        cssEase: 'ease'
    });

    $center.on('beforeChange', function (e, slick, cur, next) {
        const last = slick.slideCount - 1;
        const isWrap = (cur === last && next === 0) || (cur === 0 && next === last);
        if (isWrap) $(this).addClass('is-wrap');
    });

    $center.on('afterChange', function () {
        $(this).removeClass('is-wrap');
    });
});