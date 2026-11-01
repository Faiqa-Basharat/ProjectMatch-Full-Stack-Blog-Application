var API = 'http://localhost:5000/api';

function getUser() {
  try { return JSON.parse(localStorage.getItem('pm_currentUser')); } catch (e) { return null; }
}

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

// Builds the top navigation bar inside <div id="site-nav"></div>
function renderNav(active) {
  var links = [['index.html', 'Home'], ['explore.html', 'Explore Projects'], ['blogs.html', 'Blogs'], ['dashboard.html', 'Dashboard'], ['profile.html', 'Profile']];
  var nav = document.getElementById('site-nav');
  nav.className = 'navbar';
  var html = '<div class="nav"><div class="logo">ProjectMatch</div><div class="navlinks">';
  links.forEach(function (l) {
    html += '<a href="' + l[0] + '"' + (l[0] === active ? ' class="active"' : '') + '>' + l[1] + '</a>';
  });
  html += '</div><div class="who" id="who"></div></div>';
  nav.innerHTML = html;

  var u = getUser(), who = document.getElementById('who');
  if (u && u.name) {
    who.textContent = u.name.trim().split(/\s+/)[0];
    var out = document.createElement('button');
    out.className = 'logout';
    out.type = 'button';
    out.textContent = 'Log out';
    out.addEventListener('click', logout);
    who.appendChild(out);
  } else {
    var a = document.createElement('a');
    a.href = 'login.html';
    a.textContent = 'Log in';
    who.appendChild(a);
  }
}

var CATEGORIES = ['Technology', 'Design', 'Education', 'Career', 'Other'];

function getToken() { return localStorage.getItem('pm_token'); }

// The login token contains the user's id; read it so the page can show Edit/Delete to the owner
function myId() {
  try {
    var part = getToken().split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(part)).id;
  } catch (e) { return null; }
}

function fillCategories(select, firstLabel) {
  if (firstLabel !== undefined) {
    var o = document.createElement('option');
    o.value = ''; o.textContent = firstLabel;
    select.appendChild(o);
  }
  CATEGORIES.forEach(function (c) {
    var o = document.createElement('option');
    o.value = c; o.textContent = c;
    select.appendChild(o);
  });
}

// Logging out = forgetting the token in this browser
function logout() {
  localStorage.removeItem('pm_token');
  localStorage.removeItem('pm_currentUser');
  location.href = 'login.html';
}
