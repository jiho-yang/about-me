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



document.addEventListener('DOMContentLoaded', function () {
    const sections = Array.from(document.querySelectorAll('.page-section'));
    if (!sections.length) return;

    let currentIndex = 0;
    let isScrolling = false;
    const SCROLL_DURATION = 700; // ms (스크롤 막는 시간)

    function scrollToSection(index) {
        if (index < 0 || index >= sections.length) return;
        isScrolling = true;
        currentIndex = index;

        const targetTop = sections[index].offsetTop;

        window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
        });

        // 일정 시간 지나고 다시 스크롤 허용
        setTimeout(() => {
            isScrolling = false;
        }, SCROLL_DURATION);
    }

    // 현재 화면에 제일 가까운 섹션 index 갱신
    function updateCurrentIndex() {
        const scrollPos = window.scrollY || window.pageYOffset;
        let nearest = 0;
        let minDiff = Infinity;

        sections.forEach((sec, idx) => {
            const diff = Math.abs(sec.offsetTop - scrollPos);
            if (diff < minDiff) {
                minDiff = diff;
                nearest = idx;
            }
        });

        currentIndex = nearest;
    }

    // 마우스 휠 이벤트
    window.addEventListener('wheel', function (e) {
        if (isScrolling) {
            e.preventDefault();
            return;
        }

        // 스크롤 방향
        const delta = e.deltaY;

        updateCurrentIndex(); // 현재 섹션 다시 계산

        if (delta > 0 && currentIndex < sections.length - 1) {
            e.preventDefault();
            scrollToSection(currentIndex + 1); // 아래로
        } else if (delta < 0 && currentIndex > 0) {
            e.preventDefault();
            scrollToSection(currentIndex - 1); // 위로
        }
    }, { passive: false });

    // 터치(모바일)도 지원하고 싶으면 아래 주석 풀기
    /*
    let touchStartY = 0;
    window.addEventListener('touchstart', function (e) {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', function (e) {
      if (isScrolling) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;

      updateCurrentIndex();

      if (diff > 50 && currentIndex < sections.length - 1) {
        scrollToSection(currentIndex + 1); // 아래로 스와이프
      } else if (diff < -50 && currentIndex > 0) {
        scrollToSection(currentIndex - 1); // 위로 스와이프
      }
    }, { passive: true });
    */
});