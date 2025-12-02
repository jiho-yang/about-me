/* ===============================
   SLICK SLIDER
   =============================== */
$(document).ready(function () {
  // 메인 비주얼 슬라이드
  $('.single-item').slick({
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
  });

  const $center = $('.center');

  // Mall 슬라이드 텍스트 활성화
  function setMallCaptionActive(slick, index) {
    $('.center .mall-txt-box').removeClass('is-active');
    $(slick.$slides[index]).find('.mall-txt-box').addClass('is-active');
  }

  $center
    .on('init', function (event, slick) {
      setMallCaptionActive(slick, slick.currentSlide);
    })
    .on('beforeChange', function (e, slick, cur, next) {
      setMallCaptionActive(slick, next);

      const last = slick.slideCount - 1;
      const isWrap =
        (cur === last && next === 0) ||
        (cur === 0 && next === last);

      if (isWrap) $(this).addClass('is-wrap');
    })
    .on('afterChange', function () {
      $(this).removeClass('is-wrap');
    })
    .slick({
      centerMode: true,
      centerPadding: '0',
      slidesToShow: 3,
      arrows: true,
      speed: 450,
      cssEase: 'ease',
      prevArrow:
        '<button type="button" class="slick-prev">' +
        '<i class="bi bi-arrow-left-circle default"></i>' +
        '<i class="bi bi-arrow-left-circle-fill hover"></i>' +
        '</button>',
      nextArrow:
        '<button type="button" class="slick-next">' +
        '<i class="bi bi-arrow-right-circle default"></i>' +
        '<i class="bi bi-arrow-right-circle-fill hover"></i>' +
        '</button>',

      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,     // ✅ 한 개만
            centerMode: false,   // ✅ 센터모드 OFF
            arrows: false,       // ✅ 화살표 제거
            dots: true           // ✅ dots로 전환
          }
        }
      ]
    });
});

/* ===============================
   FULL PAGE SCROLL (PC ONLY)
   + MOBILE NAV
   =============================== */
document.addEventListener('DOMContentLoaded', function () {
  /* ---------- 풀페이지 스크롤 ---------- */
  const sections = Array.from(document.querySelectorAll('.page-section'));
  const BREAKPOINT = 1024;
  const SCROLL_DELAY = 700;

  let currentIndex = 0;
  let isScrolling = false;
  let isActive = false;

  function updateCurrentIndex() {
    if (!sections.length) return;
    const scrollPos = window.pageYOffset;
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

  function scrollToSection(index) {
    if (!sections.length) return;
    if (index < 0 || index >= sections.length) return;
    isScrolling = true;
    currentIndex = index;

    window.scrollTo({
      top: sections[index].offsetTop,
      behavior: 'smooth'
    });

    setTimeout(() => {
      isScrolling = false;
    }, SCROLL_DELAY);
  }

  function onWheel(e) {
    if (!isActive || !sections.length) return;

    const delta = e.deltaY;
    updateCurrentIndex();

    const lastSectionEnd =
      sections[sections.length - 1].offsetTop +
      sections[sections.length - 1].offsetHeight;

    // footer 영역에서는 개입하지 않음
    if (window.scrollY >= lastSectionEnd - 1) {
      return;
    }

    if (isScrolling) {
      e.preventDefault();
      return;
    }

    if (delta > 0 && currentIndex < sections.length - 1) {
      e.preventDefault();
      scrollToSection(currentIndex + 1);
    } else if (delta < 0 && currentIndex > 0) {
      e.preventDefault();
      scrollToSection(currentIndex - 1);
    }
  }

  function enableFullpage() {
    if (isActive || !sections.length) return;
    window.addEventListener('wheel', onWheel, { passive: false });
    isActive = true;
  }

  function disableFullpage() {
    if (!isActive) return;
    window.removeEventListener('wheel', onWheel, { passive: false });
    isActive = false;
  }

  function checkMode() {
    if (window.innerWidth > BREAKPOINT) {
      enableFullpage();
    } else {
      disableFullpage();
    }
  }

  checkMode();
  window.addEventListener('resize', checkMode);

  /* ---------- 모바일 네비 (햄버거 + 패널) ---------- */
  const btn = document.querySelector('.btn-hamburger');
  const dim = document.querySelector('.nav-dim');
  const menu = document.querySelector('.menu');

  if (!btn || !menu) return;

  const isMobile = () => window.innerWidth <= 768;

  function openNav() {
    document.body.classList.add('nav-open');
    btn.classList.add('is-open');   // 햄버거 → X
  }

  function closeNav() {
    document.body.classList.remove('nav-open');
    btn.classList.remove('is-open');

    // 아코디언 열려있는 것들 정리
    const opened = menu.querySelectorAll('li.is-open');
    opened.forEach(li => li.classList.remove('is-open'));
  }

  function toggleNav() {
    if (document.body.classList.contains('nav-open')) {
      closeNav();
    } else {
      openNav();
    }
  }

  btn.addEventListener('click', toggleNav);

  // dim 클릭 시 닫기
  if (dim) {
    dim.addEventListener('click', closeNav);
  }

  // 1depth 아코디언 + 클릭 시 닫기 처리
  const firstDepthItems = menu.querySelectorAll(':scope > ul > li');

  firstDepthItems.forEach(li => {
    const link = li.querySelector(':scope > a');
    const sub = li.querySelector(':scope > .sub-menu');

    if (!link) return;

    // ✅ 서브메뉴 있는 1depth : 아코디언
    if (sub) {
      link.addEventListener('click', (e) => {
        if (!isMobile()) return; // PC에서는 원래 링크 동작

        e.preventDefault(); // 링크 이동 막고

        // 나머지 1depth는 닫기
        firstDepthItems.forEach(other => {
          if (other !== li) {
            other.classList.remove('is-open');
          }
        });

        // 현재 것만 토글
        li.classList.toggle('is-open');
      });
    } else {
      // ✅ 서브 없는 1depth : 모바일에서 클릭하면 패널 닫고 이동
      link.addEventListener('click', () => {
        if (isMobile()) {
          closeNav();
        }
      });
    }
  });

  // ✅ 2depth(서브 메뉴) 클릭 시 패널 닫기
  const secondDepthLinks = menu.querySelectorAll('.sub-menu a');
  secondDepthLinks.forEach(a => {
    a.addEventListener('click', () => {
      if (isMobile()) {
        closeNav();
      }
    });
  });

  // 화면이 다시 커지면 상태 정리
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeNav();
    }
  });
});