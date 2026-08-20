/* Portfolio motion + contact form */
(function () {
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');
  if (prefersReduced || !('IntersectionObserver' in window)) revealEls.forEach(function(el){el.classList.add('reveal-in');});
  else { var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('reveal-in');io.unobserve(e.target);}});},{threshold:.15,rootMargin:'0px 0px -40px 0px'}); revealEls.forEach(function(el){io.observe(el);}); }

  var counters=document.querySelectorAll('[data-count]');
  function animateCount(el){var target=parseInt(el.getAttribute('data-count'),10),suffix=el.getAttribute('data-suffix')||'';if(prefersReduced){el.textContent=target+suffix;return;}var start=null,duration=1100;function step(ts){if(start===null)start=ts;var p=Math.min((ts-start)/duration,1),v=Math.round((1-Math.pow(1-p,3))*target);el.textContent=v+suffix;if(p<1)requestAnimationFrame(step);else el.textContent=target+suffix;}requestAnimationFrame(step);}
  if(counters.length){if(!('IntersectionObserver' in window))counters.forEach(animateCount);else{var cio=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){animateCount(e.target);cio.unobserve(e.target);}});},{threshold:.4});counters.forEach(function(el){cio.observe(el);});}}

  var navLinks=document.querySelectorAll('.nav-links a'),sections=Array.prototype.map.call(navLinks,function(a){return document.querySelector(a.getAttribute('href'));}).filter(Boolean);
  if(sections.length&&'IntersectionObserver'in window){var nio=new IntersectionObserver(function(entries){entries.forEach(function(e){var id='#'+e.target.id,link=document.querySelector('.nav-links a[href="'+id+'"]');if(!link)return;if(e.isIntersecting){navLinks.forEach(function(l){l.classList.remove('active');});link.classList.add('active');}});},{rootMargin:'-40% 0px -50% 0px'});sections.forEach(function(s){nio.observe(s);});}

  /* Working contact form: no mail app required. FormSubmit securely forwards the form to the portfolio email. */
  function openContact(){
    if(document.querySelector('.contact-modal'))return;
    var modal=document.createElement('div');modal.className='contact-modal';
    modal.innerHTML='<div class="contact-box" role="dialog" aria-modal="true" aria-labelledby="contact-title"><button class="contact-close" aria-label="Close">×</button><div class="eyebrow"><span class="line"></span>CONTACT</div><h2 id="contact-title">Let’s work together</h2><p>Send me a message and I’ll get back to you.</p><form action="https://formsubmit.co/proravi99@gmail.com" method="POST"><input type="hidden" name="_subject" value="Portfolio Contact — Ravi Kumar"><input type="hidden" name="_captcha" value="false"><input type="hidden" name="_template" value="table"><input type="hidden" name="_next" value="https://proravi99.github.io/Ravikumar-portfolio/"><label>Name<input name="name" type="text" placeholder="Your name" required></label><label>Email<input name="email" type="email" placeholder="you@example.com" required></label><label>Message<textarea name="message" rows="5" placeholder="Tell me how I can help..." required></textarea></label><button class="btn btn-primary contact-submit" type="submit">Send Message ↗</button></form></div>';
    document.body.appendChild(modal);requestAnimationFrame(function(){modal.classList.add('contact-open');});
    function close(){modal.classList.remove('contact-open');setTimeout(function(){modal.remove();},220);} modal.querySelector('.contact-close').addEventListener('click',close);modal.addEventListener('click',function(e){if(e.target===modal)close();});document.addEventListener('keydown',function esc(e){if(e.key==='Escape'){close();document.removeEventListener('keydown',esc);}});
    setTimeout(function(){modal.querySelector('input[name="name"]').focus();},100);
  }
  document.querySelectorAll('.nav-cta,.btn-primary').forEach(function(btn){if((btn.textContent||'').toLowerCase().indexOf('contact')>=0||(btn.textContent||'').toLowerCase().indexOf('get in touch')>=0){btn.addEventListener('click',function(e){e.preventDefault();openContact();});}});
})();
