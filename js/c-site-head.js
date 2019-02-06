//
// @file /js/c-header.js
//
// @link https://github.com/sysleaf/js-auto-hide-header-onscroll
// @link https://www.sysleaf.com/js-toggle-header-on-scroll/
//


// Code goes here
var lastKnownScrollY = 0;
var currentScrollY = 0;
var ticking = false;
var idOfHeader = 'site__head';
var eleHeader = null;


const classes = {
  pinned: 'is-pin',
  unpinned: 'is-unpin',
};


function onScroll() {
  currentScrollY = window.pageYOffset;
  requestTick();
}


function requestTick() {
  if (!ticking) {
    requestAnimationFrame(update);
  }
  ticking = true;
}

function update() {
  if (currentScrollY < lastKnownScrollY) {
    pin();
  } else if (currentScrollY > lastKnownScrollY) {
    unpin();
  }
  lastKnownScrollY = currentScrollY;
  ticking = false;
}


function pin() {
  if (eleHeader.classList.contains(classes.unpinned)) {
    eleHeader.classList.remove(classes.unpinned);
    eleHeader.classList.add(classes.pinned);
  }
}


function unpin() {
  if (eleHeader.classList.contains(classes.pinned) || !eleHeader.classList.contains(classes.unpinned)) {
    eleHeader.classList.remove(classes.pinned);
    eleHeader.classList.add(classes.unpinned);
  }
}

window.onload = function(){
  eleHeader = document.getElementById(idOfHeader);
  // console.log(eleHeader);
  document.addEventListener('scroll', onScroll, false);
}


