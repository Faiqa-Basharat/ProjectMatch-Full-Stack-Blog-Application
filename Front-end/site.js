(function () {
  'use strict';

  var CSS = [
    '.nav-toggle{display:none;width:40px;height:40px;border:1px solid var(--border,#e3e3dc);border-radius:8px;background:var(--card,#fff);cursor:pointer;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:0}',
    '.nav-toggle:focus-visible{outline:2px solid var(--green,#6b7f68);outline-offset:2px}',
    '.nav-toggle span{display:block;width:18px;height:2px;background:var(--ink,#1c2420);border-radius:1px;transition:transform .2s,opacity .2s}',
    '.menu-open .nav-toggle span:nth-child(1){transform:translateY(6px) rotate(45deg)}',
    '.menu-open .nav-toggle span:nth-child(2){opacity:0}',
    '.menu-open .nav-toggle span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}',
    '@media (max-width:900px){',
    '.nav{flex-wrap:wrap;height:auto!important;padding-top:10px!important;padding-bottom:10px!important}',
    '.nav>.logo{order:0}',
    '.nav-toggle{display:flex;order:1}',
    '.nav .navlinks,.nav .nav-links,.nav [data-account]{display:none!important}',
    '.menu-open .nav .navlinks,.menu-open .nav .nav-links{display:flex!important;order:2;width:100%;flex-direction:column;gap:0;margin:8px 0 0;padding:0;overflow:visible;list-style:none}',
    '.menu-open .nav .navlinks a,.menu-open .nav .nav-links a{display:block;padding:12px 4px;border-top:1px solid var(--border,#e3e3dc);box-shadow:none!important}',
    '.menu-open .nav .navlinks a.active,.menu-open .nav .nav-links a.active{color:var(--ink,#1c2420);font-weight:600}',
    '.menu-open .nav [data-account]{display:flex!important;order:3;width:100%;justify-content:flex-start;align-items:center;gap:14px;padding:12px 4px;margin:0;border-top:1px solid var(--border,#e3e3dc)}',
    '}',
    '.pm-footer{margin-top:56px;border-top:1px solid var(--border,#e3e3dc);background:var(--bg,#f8f8f4);color:var(--ink,#1c2420);font-family:var(--sans,system-ui,-apple-system,"Segoe UI",Arial,sans-serif)}',
    '.pm-footer-in{max-width:1112px;margin:0 auto;padding:40px 16px 48px;display:grid;grid-template-columns:1.6fr 1fr;gap:48px}',
    '.pm-footer h2{font-family:var(--serif,Georgia,serif);font-size:18px;font-weight:600;margin-bottom:12px}',
    '.pm-footer p{color:var(--muted,#5b625d);font-size:13px;max-width:400px;margin-bottom:14px}',
    '.pm-footer p.small{font-size:12px}',
    '.pm-footer h3{font-size:11px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:var(--muted,#5b625d);margin-bottom:14px}',
    '.pm-footer a{display:block;color:var(--muted,#5b625d);font-size:13px;margin-bottom:10px;text-decoration:none}',
    '.pm-footer a:hover{color:var(--ink,#1c2420)}',
    '@media (max-width:900px){.pm-footer-in{grid-template-columns:1fr;gap:28px}}'
  ].join('\n');

  var style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  /* ---------- hamburger ---------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var bar = nav.closest('.navbar, .site-header') || nav.parentNode;
    var links = nav.querySelector('.navlinks, .nav-links');

    // everything that is not the logo or the page links is the account area (login, user, logout);
    // marked with an attribute because some pages reset the element's class later
    Array.prototype.forEach.call(nav.children, function (c) {
      if (!c.classList.contains('logo') && c !== links) c.setAttribute('data-account', '');
    });

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-label', 'Open menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span></span><span></span><span></span>';
    nav.appendChild(btn);

    var setOpen = function (open) {
      bar.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    btn.addEventListener('click', function () { setOpen(!bar.classList.contains('menu-open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('click', function (e) { if (!bar.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) setOpen(false); });
  }

  /* ---------- footer (only where the page has none) ---------- */
  if (nav && !document.querySelector('.footer, .pm-footer')) {
    var f = document.createElement('footer');
    f.className = 'pm-footer';
    f.innerHTML =
      '<div class="pm-footer-in">' +
        '<div><h2>ProjectMatch</h2>' +
        '<p>A platform for university students to share project ideas, test campus interest, and find collaborators to build portfolio-ready prototypes together.</p>' +
        '<p class="small">Built by students, for students — Northbridge University.</p></div>' +
        '<div><h3>Platform Links</h3>' +
        '<a href="index.html">Home</a><a href="explore.html">Explore Projects</a><a href="blogs.html">Blogs</a>' +
        '<a href="dashboard.html">Dashboard</a><a href="profile.html">Profile</a></div>' +
      '</div>';
    document.body.appendChild(f);
  }
})();
