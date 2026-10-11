(() => {
  const header = document.querySelector('.header');
  const progress = document.querySelector('.progress');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = [...document.querySelectorAll('.nav>a[href^="#"]')];
  function updateScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${max > 0 ? scrollY / max * 100 : 0}%`;
    header.classList.toggle('scrolled', scrollY > 25);
  }
  addEventListener('scroll', updateScroll, {passive:true}); updateScroll();
  function closeMenu() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Ouvrir le menu');
    document.body.classList.remove('menu-open');
  }
  function openMenu() {
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fermer le menu');
    document.body.classList.add('menu-open');
  }
  toggle.addEventListener('click', () => {
    toggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });
  navLinks.forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduce) {
    const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -25px 0px'});
    document.querySelectorAll('.section-heading,.service-grid article,.build-card,.contact-copy,#contact-form').forEach(el=>el.classList.add('reveal'));
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  } else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
  const sections=[...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){const id=entry.target.id;document.querySelectorAll('.nav>a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id))}}),{rootMargin:'-35% 0px -55% 0px'});sections.forEach(s=>sectionObserver.observe(s));}
  document.getElementById('year').textContent=new Date().getFullYear();
  document.getElementById('contact-form').addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.currentTarget);const name=String(d.get('name')||'').trim(),email=String(d.get('email')||'').trim(),topic=String(d.get('topic')||''),message=String(d.get('message')||'').trim();const subject=encodeURIComponent(`[SO INFO] ${topic} — ${name}`);const body=encodeURIComponent(`Bonjour SO INFO,\n\nNom : ${name}\nE-mail : ${email}\nBesoin : ${topic}\n\n${message}`);const destination='contact@votre-domaine.fr';e.currentTarget.querySelector('.status').textContent='Votre application e-mail va s’ouvrir. Pensez à configurer votre adresse de contact avant la mise en ligne.';location.href=`mailto:${destination}?subject=${subject}&body=${body}`;});
})();
