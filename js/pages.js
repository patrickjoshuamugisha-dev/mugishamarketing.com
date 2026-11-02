
/* ===== SVC: services page (.svc-) ===== */
(function(){
  function init(MZ){
    var jump=document.querySelector('.svc-jump'); if(!jump) return;
    var hdr=document.querySelector('.site-header'), links=[].slice.call(jump.querySelectorAll('a[data-jump]'));
    var parts=links.map(function(a){return document.getElementById(a.getAttribute('data-jump'))}).filter(Boolean);
    // keep the sticky bar just under the header while it is showing, flush to the top when it hides
    var last=-1;
    function follow(){ if(!hdr) return; var b=Math.max(0,Math.round(hdr.getBoundingClientRect().bottom)); if(b!==last){last=b; jump.style.setProperty('--hb',b+'px');} }
    if(window.gsap) gsap.ticker.add(follow); else addEventListener('scroll',follow,{passive:true});
    follow();
    function off(){ return jump.offsetHeight+16; }
    function go(id,instant){
      var t=document.getElementById(id); if(!t) return;
      var y=t.getBoundingClientRect().top+scrollY+parseFloat(getComputedStyle(t).paddingTop)-off()-24;
      if(MZ.lenis) MZ.lenis.scrollTo(Math.max(0,y),{immediate:!!instant}); else window.scrollTo({top:Math.max(0,y),behavior:instant||MZ.RM?'auto':'smooth'});
    }
    links.forEach(function(a){ a.addEventListener('click',function(e){ e.preventDefault(); var id=a.getAttribute('data-jump'); history.replaceState(null,'','#'+id); go(id); }); });
    // arriving with a hash (from the home cards or the footer)
    function arrive(){ var id=location.hash.slice(1); if(id&&document.getElementById(id)&&links.some(function(a){return a.getAttribute('data-jump')===id})) go(id,true); }
    if(location.hash){ arrive(); addEventListener('load',function(){ setTimeout(arrive,150); }); if(document.fonts&&document.fonts.ready) document.fonts.ready.then(function(){ setTimeout(arrive,50); }); }
    // active pill
    function mark(){
      var cur=null, line=innerHeight*0.4;
      parts.forEach(function(p){ var r=p.getBoundingClientRect(); if(r.top<=line&&r.bottom>line) cur=p.id; });
      links.forEach(function(a){ var on=a.getAttribute('data-jump')===cur; a.classList.toggle('is-on',on); if(on) a.setAttribute('aria-current','true'); else a.removeAttribute('aria-current'); });
      if(cur){ var a=jump.querySelector('a.is-on'), ul=jump.querySelector('ul'); if(a&&ul.scrollWidth>ul.clientWidth){ var l=a.offsetLeft-16; if(Math.abs(ul.scrollLeft-l)>40) ul.scrollTo({left:l,behavior:'smooth'}); } }
    }
    addEventListener('scroll',mark,{passive:true}); mark();
  }
  if(window.MZ&&MZ.add) MZ.add(init); else document.addEventListener('DOMContentLoaded',function(){init(window.MZ)});
})();
/* ===== /SVC ===== */

/* ===== SUB: behaviour shared by the subpages (menu Escape + focus trap, header entrance off, form error wiring) ===== */
(function(){
  function init(MZ){
    // header: no entrance on subpages
    var hdr=[].slice.call(document.querySelectorAll('.site-header .mark,.site-header .links li,.site-header .nav-r > .btn,.site-header .burger'));
    function still(){ if(window.gsap&&hdr.length){ gsap.killTweensOf(hdr); gsap.set(hdr,{autoAlpha:1,y:0,scale:1}); } }
    still(); setTimeout(still,0); setTimeout(still,400); addEventListener('load',still);
    // phone menu: Escape closes and returns focus; Tab stays inside while open
    var b=document.querySelector('.burger'), m=document.getElementById('menu'); if(b&&m){
      function open(){ return b.getAttribute('aria-expanded')==='true'; }
      function items(){ return [b].concat([].slice.call(m.querySelectorAll('a'))); }
      document.addEventListener('keydown',function(e){
        if(!open()) return;
        if(e.key==='Escape'){ b.click(); b.focus(); return; }
        if(e.key==='Tab'){ var l=items(), i=l.indexOf(document.activeElement);
          if(e.shiftKey){ if(i<=0){ e.preventDefault(); l[l.length-1].focus(); } }
          else if(i===l.length-1||i<0){ e.preventDefault(); l[0].focus(); } }
      });
      new MutationObserver(function(){ var o=open(); document.querySelectorAll('main,.foot,.skip').forEach(function(n){ if(o) n.setAttribute('inert',''); else n.removeAttribute('inert'); }); if(o){ var f=m.querySelector('a'); if(f) f.focus(); } }).observe(b,{attributes:true,attributeFilter:['aria-expanded']});
    }
    // form: a field points at its error text only while it is invalid
    [].slice.call(document.querySelectorAll('form .field [aria-describedby]')).forEach(function(f){
      var full=f.getAttribute('aria-describedby'), ids=full.split(/\s+/), err=ids.filter(function(x){return /-err$/.test(x)})[0], rest=ids.filter(function(x){return x!==err}).join(' ');
      function sync(){ var v=f.getAttribute('aria-invalid')==='true'; var val=(v&&err?ids.join(' '):rest); if(val) f.setAttribute('aria-describedby',val); else f.removeAttribute('aria-describedby'); }
      sync(); new MutationObserver(sync).observe(f,{attributes:true,attributeFilter:['aria-invalid']});
    });
  }
  if(window.MZ&&MZ.add) MZ.add(init); else document.addEventListener('DOMContentLoaded',function(){init(window.MZ)});
})();
/* ===== /SUB ===== */
