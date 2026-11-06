const menu=document.querySelector('.menu-button');
const navigation=document.querySelector('#primary-navigation');
if(menu&&navigation){
 const close=()=>{menu.setAttribute('aria-expanded','false');navigation.classList.remove('is-open');};
 menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open);});
 navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){close();menu.focus();}});
 window.addEventListener('resize',()=>{if(innerWidth>800)close();});
}
// Retain previously shared homepage section URLs after moving details to pages.
if(location.pathname==='/'||location.pathname.endsWith('/index.html')){
 const legacy={vision:'technology.html',applications:'applications.html',architecture:'research-library.html#architecture',roadmap:'research.html',experiment:'research.html',evidence:'research.html',about:'about.html',collaborate:'contact.html'};
 const route=()=>{const target=legacy[location.hash.slice(1)];if(target)location.replace(target);};
 window.addEventListener('hashchange',route);route();
}
