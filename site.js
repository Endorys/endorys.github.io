const menu=document.querySelector('.menu-button');
const navigation=document.querySelector('#primary-navigation');
if(menu&&navigation){
 const header=menu.closest('header');
 const isOpen=()=>menu.getAttribute('aria-expanded')==='true';
 const setOpen=open=>{
  menu.setAttribute('aria-expanded',String(open));
  navigation.classList.toggle('is-open',open);
  menu.querySelector('span').textContent=open?'−':'＋';
 };
 const close=()=>setOpen(false);
 document.documentElement.classList.add('nav-enhanced');
 menu.addEventListener('click',()=>setOpen(!isOpen()));
 navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&isOpen()){close();menu.focus();}});
 document.addEventListener('click',e=>{if(isOpen()&&!header.contains(e.target))close();});
 header.addEventListener('focusout',e=>{if(e.relatedTarget&&!header.contains(e.relatedTarget))close();});
 matchMedia('(min-width: 801px)').addEventListener('change',close);
}
// Retain previously shared homepage section URLs after moving details to pages.
if(location.pathname==='/'||location.pathname.endsWith('/index.html')){
 const legacy={vision:'technology.html',applications:'applications.html',architecture:'research-library.html#architecture',roadmap:'research.html',experiment:'research.html',evidence:'research.html',about:'about.html',collaborate:'contact.html'};
 const route=()=>{const target=legacy[location.hash.slice(1)];if(target)location.replace(target);};
 window.addEventListener('hashchange',route);route();
}
