//
// @file /js/c-totop.js
//


// The 'to top' wrapper #id
var containerElement = document.getElementById('c-totop__link');

// The user's viewport heigt
var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

// Height at which to switch classes
var switchAt = viewHeight * 0.4;


// The 'to top' link is visible by default for noJS fallback.
// This handles when page loads + before user has scorlled.
// Result is that 'to top' link is briefly visible as page loads,
// and fades out according to CSS transitons only if JS is enabled.

containerElement.classList.add('is-unpin');


// Once user has scrolled, this function takes over. 
window.onscroll = function toTop(){
			
	var currentPos = window.pageYOffset | document.body.scrollTop;

	if(currentPos > switchAt) {

		containerElement.classList.remove('is-unpin');
		containerElement.classList.add('is-pin');
		
	} else if(currentPos <= switchAt) {

		containerElement.classList.remove('is-pin');
		containerElement.classList.add('is-unpin');

	}

} //