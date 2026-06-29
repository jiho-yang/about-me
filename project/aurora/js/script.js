(function(){
// scroll reveal (progressive enhancement — content is visible by default)
  var revealEls = document.querySelectorAll('[data-reveal]');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if('IntersectionObserver' in window && !reduceMotion){
    revealEls.forEach(function(el){ el.classList.add('reveal-armed'); });
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){
          en.target.classList.add('in-view');
          io.unobserve(en.target);
        }
      });
    },{threshold:0.12});
    revealEls.forEach(function(el){io.observe(el);});
    // safety net: in case an element never reports intersecting, reveal anyway
    setTimeout(function(){
      revealEls.forEach(function(el){ el.classList.add('in-view'); });
    }, 4000);
  }

  // dew ripple notes interaction
  var cards = document.querySelectorAll('.note-card');
  var rings = {
    'ring-top': document.getElementById('ring-top'),
    'ring-heart': document.getElementById('ring-heart'),
    'ring-base': document.getElementById('ring-base')
  };
  var rippleCurrent = document.getElementById('rippleCurrent');
  var ringNames = { 'ring-top':'TOP · 탑노트', 'ring-heart':'HEART · 미들노트', 'ring-base':'BASE · 베이스노트' };
  function setActive(card){
    cards.forEach(function(c){c.classList.remove('active');});
    Object.keys(rings).forEach(function(k){rings[k].classList.remove('active');});
    card.classList.add('active');
    var ringId = card.getAttribute('data-ring');
    if(rings[ringId]) rings[ringId].classList.add('active');
    if(rippleCurrent) rippleCurrent.textContent = ringNames[ringId] || '';
  }
  cards.forEach(function(card){
    card.addEventListener('click', function(){ setActive(card); });
  });
  // default highlight top
  setActive(cards[0]);

  // size selection
  var pills = document.querySelectorAll('.size-pill');
  var sizeLabel = document.getElementById('sizeLabel');
  var priceLabel = document.getElementById('priceLabel');
  var stickyPrice = document.getElementById('stickyPrice');
  pills.forEach(function(p){
    p.addEventListener('click', function(){
      pills.forEach(function(x){x.classList.remove('selected');});
      p.classList.add('selected');
      sizeLabel.textContent = p.getAttribute('data-label');
      priceLabel.textContent = '₩' + p.getAttribute('data-price');
      stickyPrice.textContent = p.getAttribute('data-size') + 'ml \u00b7 \u20a9' + p.getAttribute('data-price');
    });
  });

  // add to cart feedback (UI only — no real cart/backend)
  function flashAdded(btn, original){
    btn.textContent = '담았습니다';
    btn.classList.add('added');
    setTimeout(function(){
      btn.textContent = original;
      btn.classList.remove('added');
    },1600);
  }
  document.getElementById('mainAddBtn').addEventListener('click', function(){
    flashAdded(this, '장바구니에 담기');
  });
  document.getElementById('stickyBtn').addEventListener('click', function(){
    flashAdded(this, '장바구니에 담기');
  });

  // sticky bar visibility after hero
  var hero = document.querySelector('.hero');
  var bar = document.getElementById('stickyBar');
  var heroIO = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(!en.isIntersecting && en.boundingClientRect.top < 0){
        bar.classList.add('show');
      } else if(en.isIntersecting){
        bar.classList.remove('show');
      }
    });
  },{threshold:0});
  heroIO.observe(hero);
})();
