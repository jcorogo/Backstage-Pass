/* Backstage Pass – site scripts
   1. Optional photos   2. Paged card grids   3. About Us popups
   4. Featured video    5. Background music                              */
'use strict';


/* 1. OPTIONAL PHOTOS ------------------------------------------------------
   Images marked data-opt are removed when the file is missing, so the CSS
   placeholder behind them shows instead of a broken-image icon. */
document.addEventListener('error', e => {
  if (e.target.matches && e.target.matches('img[data-opt]')) e.target.remove();
}, true);
document.querySelectorAll('img[data-opt]').forEach(img => {
  if (img.complete && !img.naturalWidth) img.remove();
});


/* 2. PAGED CARD GRIDS (category pages) -----------------------------------
   <li data-page="n"> items inside #vgrid, buttons drawn into #pager. */
(() => {
  const grid = document.getElementById('vgrid');
  const pager = document.getElementById('pager');
  if (!grid || !pager) return;

  const items = [...grid.children];
  const pages = Math.max(...items.map(li => +li.dataset.page));
  if (pages < 2) { pager.hidden = true; return; }

  function button(label, target, { aria, disabled, current } = {}) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    if (aria) b.setAttribute('aria-label', aria);
    if (disabled) b.disabled = true;
    if (current) b.setAttribute('aria-current', 'page');
    b.addEventListener('click', () => show(target, true));
    pager.appendChild(b);
  }

  function show(n, scroll) {
    const page = Math.min(Math.max(n, 1), pages);
    items.forEach(li => { li.hidden = +li.dataset.page !== page; });
    pager.replaceChildren();
    button('‹', page - 1, { aria: 'Previous page', disabled: page === 1 });
    for (let i = 1; i <= pages; i++) button(String(i), i, { current: i === page });
    button('›', page + 1, { aria: 'Next page', disabled: page === pages });
    if (scroll) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  show(1);
})();


/* 3. ABOUT US POPUPS (footer: Our Story, Mission & Vision, Team, Privacy Policy) */
(() => {
  const links = document.querySelectorAll('footer #about a');
  if (!links.length) return;

  function member(name, role, text) {
    return '<div class="member"><h4>' + name + '</h4><div class="role">' + role + '</div><p>' + text + '</p></div>';
  }

  const ABOUT = {
    'Our Story': '<p>Every great idea begins with a simple opportunity. Our journey started in a humble classroom laboratory as part of our requirements for the subject Web Systems and Technology, where we were tasked with developing a website before our final examination. Through a random selection using a roulette, our group was assigned to create an Information Website, giving us the opportunity to explore different ideas and decide what kind of information we wanted to share with our audience.</p>'
      + '<p>We discussed a few of the ideas and one of our group members suggested that we design a website containing Biographies of Filipino celebrities. This idea interested us because celebrities play an important role within the Philippines entertainment industry. We wanted to create a website where visitors can learn about the background, careers, achievements and journeys of these celebrities.</p>'
      + '<p>We decided to make the website more interactive by categorising the celebrities into different sections. We separated them into sections such as ‘Action’, ‘Bombshells’, ‘Comedians’, ‘Drama’, ‘Heartthrobs’, ‘Horror’, ‘Rising Stars’, ‘Romance’ and ‘Veterans’. This made it easier for people to view the different types of personalities within the Philippine Entertainment industry.</p>'
      + '<p>Throughout the project, we were able to work collaboratively outside of the classroom. We talked to each other through online communication, group chats and constantly sharing ideas. Each individual within our group contributed to the website by sharing their ideas, information and improving the website.</p>'
      + '<p>This project quickly turned into something we could be proud of. Using collaboration, creativity and determination we were able to transform this simple idea into an Information Website celebrating Filipino celebrities.</p>'
      + '<p>Backstage Pass is a collaborative effort to provide information to our audience so everyone can learn about the stories behind the stars.</p>',

    'Mission & Vision': '<h4>Mission</h4><p>To provide an informative and accessible platform that presents the biographies, achievements, and stories of Filipino celebrities. We aim to deliver organized, relevant, and timely information that allows visitors to discover and appreciate the personalities behind Philippine entertainment.</p>'
      + '<h4>Vision</h4><p>To become a trusted and engaging online destination for discovering Filipino celebrities, preserving their stories, celebrating their achievements, and keeping their journeys accessible to audiences for years to come.</p>',

    'Team': '<p>Behind every successful project is a team of individuals who share ideas, responsibilities, and dedication. Backstage Pass was made possible through the combined efforts of five members, each contributing their own skills and responsibilities throughout the development of the website.</p>'
      + '<p>From gathering celebrity information and designing the user interface to handling website development and preparing research documentation, every member played an important role in bringing our project to life.</p>'
      + member('1. JC Orogo','Project Manager / UI Designer / Front-End Developer','He took the lead in managing the overall development of the website. He was primarily responsible for building the website’s front-end structure, implementing its visual elements, and contributing ideas to improve its overall appearance and functionality. He also helped coordinate the development process to ensure that the project progressed according to the group’s objectives.')
      + member('2. Anna Beatriz Hirang','UI/UX Designer / Development Assistant','She assisted JC Orogo throughout the website development process, particularly in coding-related tasks. She helped explain certain technical aspects, provided assistance with implementation, and contributed ideas concerning the website’s user interface and overall design. Her support helped make the development process more organized and collaborative.')
      + member('3. Justin James Marcos Espino','Celebrity Information Researcher / UI/UX Contributor','He’s the one responsible for gathering and providing information about the featured Filipino celebrities. He contributed to researching their backgrounds, careers, and other relevant details to help ensure that the website contained informative content. He also worked closely with Xander Wulf Balbin, exchanging ideas and assisting with the user interface and user experience to improve the website’s overall presentation.')
      + member('4. Xander Wulf Balbin','UX Designer / Celebrity Information Researcher','He contributed to researching and organizing information about Filipino celebrities, working alongside Justin James Marcos Espino to gather relevant details for the website. He also took part in the user experience design process, helping improve the website’s organization, accessibility, and presentation. Through collaboration and shared suggestions, he helped ensure that visitors could easily explore the website and discover celebrity biographies.')
      + member('5. Nikki Espeña','Researcher / Research Paper Documentation','She was responsible for preparing the research paper and supporting documentation for the project. She handled the formal written research concerning the website, helping establish its background, purpose, and supporting information. Her contribution provided an academic foundation for the project and helped document the work completed by the group.'),

    'Privacy Policy': '<p>Backstage Pass values the privacy of its visitors and is committed to providing a safe, accessible, and informative browsing experience.</p>'
      + '<h4>1. Free Access and Website Usage</h4><p>Backstage Pass is a free information website. Visitors can freely browse and explore celebrity biographies and related information without creating an account, logging in, or providing personal details.</p>'
      + '<h4>2. Information Collection</h4><p>Our website does not require user registration or account creation. We do not intentionally collect personal information through login systems or user accounts.</p>'
      + '<h4>3. Content Accuracy and Reliability</h4><p>We strive to provide accurate, relevant, and up-to-date information about Filipino celebrities. The information presented is gathered and organized for educational and informational purposes. We aim to maintain the reliability and quality of our published content.</p>'
      + '<h4>4. Website Content Protection</h4><p>All published content, including celebrity biographies, descriptions, and website materials, is maintained by our development team. Visitors are not authorized to modify, alter, or interfere with the information presented on the website.</p>'
      + '<h4>5. Updates to This Policy</h4><p>We reserve the right to update this Privacy Policy whenever necessary to reflect changes in the website’s content, features, or practices.</p>'
      + '<h4>6. Contact and Inquiries</h4><p>For questions, concerns, or corrections regarding the information presented on Backstage Pass, visitors may contact the website’s development team.</p>'
      + '<p>Thank you for visiting Backstage Pass. We appreciate your interest in discovering the stories behind Filipino entertainment.</p>'
  };

  const dialog = document.createElement('dialog');
  dialog.className = 'about-dlg';
  dialog.setAttribute('aria-labelledby', 'aboutTitle');
  dialog.innerHTML = '<div class="tag">ABOUT US</div><h3 id="aboutTitle"></h3><div class="about-body"></div><button class="btn" type="button">CLOSE</button>';
  document.body.appendChild(dialog);

  const title = dialog.querySelector('h3');
  const body = dialog.querySelector('.about-body');
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });   // click on the backdrop

  links.forEach(a => {
    a.addEventListener('click', e => {
      const key = a.textContent.trim();
      if (!ABOUT[key]) return;
      e.preventDefault();
      title.textContent = key;
      body.innerHTML = ABOUT[key];
      dialog.showModal();
      dialog.scrollTop = 0;
    });
  });
})();


/* 4. FEATURED VIDEO (celebrity pages) -------------------------------------
   Click the thumbnail: plays on the page when the site is online, otherwise
   (YouTube blocks embeds on local files) opens the video on YouTube. */
(() => {
  document.querySelectorAll('.vid[data-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      document.dispatchEvent(new Event('bp:pause-music'));

      if (!/^https?:$/.test(location.protocol)) {
        window.open('https://www.youtube.com/watch?v=' + id, '_blank', 'noopener');
        return;
      }
      const frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      frame.title = 'Featured video';
      frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      btn.replaceChildren(frame);
      btn.style.cursor = 'default';
    });
  });
})();


/* 5. BACKGROUND MUSIC (music.mp3, kept next to the pages) -------------------
   - Starts by itself when the browser allows it; otherwise on the first click,
     tap or key press (browsers block sound before that).
   - The position is saved so the track carries on when you change pages. */
(() => {
  const KEY = 'bp-music';
  const VOLUME = 0.6;

  // Saved in localStorage and window.name so it also works on local files (file://)
  function load() {
    let a = null, b = null;
    try { a = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
    try { if (window.name.startsWith('bpm:')) b = JSON.parse(window.name.slice(4)); } catch (e) {}
    if (a && b) return (b.ts || 0) > (a.ts || 0) ? b : a;
    return a || b || {};
  }
  function store(state) {
    state.ts = Date.now();
    const json = JSON.stringify(state);
    try { localStorage.setItem(KEY, json); } catch (e) {}
    try { window.name = 'bpm:' + json; } catch (e) {}
  }

  const state = load();                    // { off, t: seconds, playing, ts: ms }
  let wantOn = !state.off;
  let started = false;
  let seeked = false;

  const audio = new Audio('music.mp3');
  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = VOLUME;

  const btn = document.createElement('button');
  btn.className = 'bgm-toggle';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Toggle background music');
  btn.innerHTML =
    '<svg class="on" viewBox="0 0 24 24"><path d="M12 3v10.6A4 4 0 1014 17V7h4V3z"/></svg>' +
    '<svg class="off" viewBox="0 0 24 24"><path d="M3 5.4L4.4 4 20 19.6 18.6 21l-4.3-4.3A4 4 0 1112 13.6V9.4L3 5.4zM14 3h4v4h-4z"/></svg>' +
    '<span>MUSIC</span>';
  document.body.appendChild(btn);

  function render() {
    btn.setAttribute('aria-pressed', String(wantOn));
    btn.classList.toggle('hint', wantOn && !started);
  }
  function save(playing) {
    state.t = audio.currentTime || 0;
    state.playing = !!playing;
    state.off = !wantOn;
    store(state);
  }

  // Where the track should be now, counting the time spent loading this page
  function resumeAt() {
    let t = state.t || 0;
    if (state.playing && state.ts) t += (Date.now() - state.ts) / 1000;
    const d = audio.duration;
    return d && isFinite(d) ? t % d : t;
  }
  function seek() {
    if (seeked) return;
    seeked = true;
    try { audio.currentTime = resumeAt(); } catch (e) {}
  }
  function play() {
    if (!wantOn) return;
    const p = audio.play();
    if (p && p.catch) p.catch(() => { started = false; render(); });   // blocked until the visitor interacts
  }

  audio.addEventListener('loadedmetadata', () => { seek(); play(); });
  audio.addEventListener('playing', () => { started = true; render(); save(true); });
  audio.addEventListener('pause', () => { if (!document.hidden || !wantOn) save(false); });
  if (audio.readyState >= 1) seek();
  play();

  // Keep the saved position fresh for the next page
  setInterval(() => { if (!audio.paused) save(true); }, 400);
  window.addEventListener('pagehide', () => save(!audio.paused));
  document.addEventListener('click', e => { if (e.target.closest('a[href]')) save(!audio.paused); }, true);

  // First click / tap / key press starts the music if autoplay was blocked
  const gestures = ['pointerdown', 'keydown', 'touchstart', 'click'];
  function onGesture() {
    if (wantOn && audio.paused) { seek(); play(); }
    if (started || !wantOn) gestures.forEach(g => document.removeEventListener(g, onGesture, true));
  }
  gestures.forEach(g => document.addEventListener(g, onGesture, true));

  btn.addEventListener('click', e => {
    e.stopPropagation();
    if (wantOn) { wantOn = false; audio.pause(); save(false); }
    else { wantOn = true; seek(); play(); }
    render();
  });

  // Featured videos pause the music while they play
  document.addEventListener('bp:pause-music', () => {
    if (!wantOn) return;
    wantOn = false;
    audio.pause();
    save(false);
    render();
  });

  render();
})();
