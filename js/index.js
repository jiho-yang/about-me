// nav scroll state
const navEl = document.getElementById('siteNav');
const progressEl = document.getElementById('scrollProgress');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// mobile menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// split section titles into words for staggered reveal
document.querySelectorAll('.section-title').forEach(title => {
    const words = title.textContent.trim().split(/\s+/);
    title.innerHTML = words.map((w, i) =>
        `<span class="word-mask"><span class="word-inner" style="transition-delay:${i * 70}ms">${w}</span></span>`
    ).join(' ');
});

// scroll reveal — replays every time an element enters/leaves the viewport
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { en.target.classList.toggle('in', en.isIntersecting); });
}, { threshold: 0.1, rootMargin: '0px 0px -4% 0px' });
revealEls.forEach(el => io.observe(el));

// ---- true masonry layout for .card-grid (packs each column independently) ----
const GAP = 28;
function layoutMasonry(grid) {
    const cards = Array.from(grid.children).filter(el => el.classList.contains('card'));
    if (!cards.length) return;

    if (window.innerWidth <= 760) {
        grid.classList.remove('is-masonry');
        cards.forEach(c => { c.style.position = ''; c.style.width = ''; c.style.left = ''; c.style.top = ''; });
        grid.style.height = '';
        return;
    }

    grid.classList.add('is-masonry');
    const numCols = 2;
    const containerWidth = grid.clientWidth;
    const colWidth = (containerWidth - GAP * (numCols - 1)) / numCols;
    const colHeights = new Array(numCols).fill(0);

    cards.forEach(card => {
        card.style.width = colWidth + 'px';
        const colIndex = colHeights.indexOf(Math.min(...colHeights));
        card.style.left = colIndex * (colWidth + GAP) + 'px';
        card.style.top = colHeights[colIndex] + 'px';
        colHeights[colIndex] += card.offsetHeight + GAP;
    });

    grid.style.height = (Math.max(...colHeights) - GAP) + 'px';
}
function layoutAllMasonry() {
    document.querySelectorAll('.card-grid').forEach(layoutMasonry);
}
window.addEventListener('load', layoutAllMasonry);
if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(layoutAllMasonry);
}
let masonryResizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(masonryResizeTimer);
    masonryResizeTimer = setTimeout(layoutAllMasonry, 150);
});

// ---- intro tag-cards entrance (plays once on load, then reveals headline) ----
const introCardsEl = document.getElementById('introCards');
const heroTextEl = document.getElementById('heroText');
let introBusy = false;

function startIntroTimeline() {
    introBusy = true;
    setTimeout(() => { if (introCardsEl) introCardsEl.classList.add('stacked'); }, 200);
    setTimeout(() => { if (introCardsEl) introCardsEl.classList.add('exit'); }, 2000);
    setTimeout(() => { if (heroTextEl) heroTextEl.classList.add('in'); }, 2750);
    setTimeout(() => { introBusy = false; }, 2900);
}

function replayIntro() {
    if (introBusy || reduceMotion || !introCardsEl || !heroTextEl) return;
    introCardsEl.classList.remove('stacked', 'exit');
    heroTextEl.classList.remove('in');
    void introCardsEl.offsetWidth; // force reflow so the transition retriggers
    setTimeout(startIntroTimeline, 30);
}

// logo: replay intro if already at the hero (top); otherwise just scroll up
const logoEl = document.querySelector('.logo');
if (logoEl) {
    logoEl.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.scrollY < 60) {
            replayIntro();
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

if (reduceMotion) {
    if (introCardsEl) introCardsEl.style.display = 'none';
    if (heroTextEl) heroTextEl.classList.add('in');
} else if (document.readyState === 'complete') {
    startIntroTimeline();
} else {
    window.addEventListener('load', startIntroTimeline, { once: true });
}

// ---- scroll progress bar + nav blur + aurora fade (throttled) ----
let ticking = false;
const heroEl = document.querySelector('.hero');
const auroraLayerEl = document.getElementById('auroraLayer');
function updateOnScroll() {
    const scrollY = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    progressEl.style.width = (docH > 0 ? (scrollY / docH) * 100 : 0) + '%';
    navEl.classList.toggle('scrolled', scrollY > 30);
    if (auroraLayerEl && heroEl) {
        const heroH = heroEl.offsetHeight || 1;
        const fade = Math.max(0, 1 - (scrollY / heroH) * 1.3);
        auroraLayerEl.style.opacity = (fade * 0.85).toFixed(2);
    }
    ticking = false;
}
window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateOnScroll); ticking = true; }
});
updateOnScroll();

// ---- aurora mouse parallax: whole layer drifts gently toward the cursor ----
if (heroEl && auroraLayerEl && !reduceMotion) {
    heroEl.addEventListener('mousemove', (e) => {
        const rect = heroEl.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 .. 0.5
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        const dx = px * 140;
        const dy = py * 140;
        auroraLayerEl.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
    });
    heroEl.addEventListener('mouseleave', () => {
        auroraLayerEl.style.transform = 'translate(0px, 0px)';
    });
}


// inspector tag tooltip
const tagEl = document.getElementById('inspectorTag');
document.querySelectorAll('.tag-target').forEach(el => {
    el.addEventListener('mouseenter', () => {
        tagEl.textContent = el.getAttribute('data-tag');
        tagEl.classList.add('show');
    });
    el.addEventListener('mousemove', (e) => {
        tagEl.style.left = e.clientX + 'px';
        tagEl.style.top = e.clientY + 'px';
    });
    el.addEventListener('mouseleave', () => tagEl.classList.remove('show'));
});

// copy email — clicking the email link copies it to clipboard while the mailto: still opens normally
const emailLinkEl = document.getElementById('emailLink');
const copyFeedbackEl = document.getElementById('copyFeedback');
let copyFeedbackTimer;
emailLinkEl.addEventListener('click', () => {
    navigator.clipboard.writeText('jhyang053@gmail.com').then(() => {
        copyFeedbackEl.classList.add('show');
        clearTimeout(copyFeedbackTimer);
        copyFeedbackTimer = setTimeout(() => copyFeedbackEl.classList.remove('show'), 1600);
    });
});

// marquee: 빈 공간 없이 무한 루프
function syncMarqueeShift() {
    const trackEl = document.querySelector('.marquee-track');
    const firstSetEl = document.querySelector('.marquee-set');

    if (!trackEl || !firstSetEl) return;

    // 기존 복제본 제거
    trackEl.querySelectorAll('.is-clone').forEach(el => el.remove());

    const shift = firstSetEl.getBoundingClientRect().width;
    if (!shift) return;

    // 화면 폭보다 충분히 길어질 때까지 자동 복제
    while (trackEl.scrollWidth < window.innerWidth + (shift * 2)) {
        const clone = firstSetEl.cloneNode(true);
        clone.classList.add('is-clone');
        trackEl.appendChild(clone);
    }

    trackEl.style.setProperty('--marquee-shift', shift + 'px');

    // 애니메이션 재시작
    trackEl.style.animation = 'none';
    void trackEl.offsetWidth;
    trackEl.style.animation = '';
}

syncMarqueeShift();

window.addEventListener('load', syncMarqueeShift);

if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncMarqueeShift);
}

let marqueeResizeTimer;

window.addEventListener('resize', () => {
    clearTimeout(marqueeResizeTimer);
    marqueeResizeTimer = setTimeout(syncMarqueeShift, 150);
});

