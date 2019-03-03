/*!
 * Velocity V2 Smooth Scroll
 * @file /js/velocity-smooth-scroll.js
 */


/**
 * A console helper I'll leverage in the future.
 * @link https://stackoverflow.com/a/25867340
 */

var myLog = (function () {
	return {
		log: function() {
			var args = Array.prototype.slice.call(arguments);
			console.log.apply(console, args);
		},
		warn: function() {
			var args = Array.prototype.slice.call(arguments);
			console.warn.apply(console, args);
		},
		error: function() {
			var args = Array.prototype.slice.call(arguments);
			console.error.apply(console, args);
		}
	}
}());


/**
 * A helper function to get an element's exact position
 * @link https://www.kirupa.com/html5/get_element_position_using_javascript.htm
 */

function getYPosition(el) {
	var yPos = 0; 
	while (el) {
		// deal with browser quirks with body/window/document and page scroll		
		if (el.tagName == "BODY") {
		var yScroll = el.scrollTop || document.documentElement.scrollTop;
		yPos += (el.offsetTop - yScroll + el.clientTop);
		// for all other non-BODY elements
		} else {	
			yPos += (el.offsetTop - el.scrollTop + el.clientTop);
		}
		el = el.offsetParent;
	} // while
	return yPos
} // function


/**
 * Figure out if site has a fixed header.
 * This lets us add px to destination so
 * content doesn't hide under header.
 * Hanky - won't work in every scenario - adjust selector
 */

function calcHeaderHeight() {

	// Find first header in markup
	var headerElement = document.querySelector('body header:first-child')
	myLog.log('headerElement:', headerElement)

	// Get header's rendered position property
	var headerPosition = window.getComputedStyle(headerElement).position
	myLog.log('headerPosition: ', headerPosition)

	// If header's position = fixed, get its rendered height.	
	if (headerPosition === 'fixed') {		
		var getHeightPx = window.getComputedStyle(headerElement).height
		// replace because we need a number for later math
		var calculatedHeight = getHeightPx.replace('px', '')
		myLog.log('calculatedHeight of header:', calculatedHeight)
	// Else set value to '0' because we don't need a top buffer.	
	} else {
		var calculatedHeight = '0'
		myLog.log('headerPosition is not fixed, so height is 0 because we do not need to add buffer pixels:', calculatedHeight)
	}	

	// result is unitless number
	return calculatedHeight	

} // function

var headerHeight = calcHeaderHeight()
myLog.log('headerHeight final:', headerHeight)


/**
 *
 *
 *
 *
 */

//
// Now let's handle the links
//

// Get a list of links
var pageLinks = document.getElementsByTagName('a')
myLog.log('pageLinks:', pageLinks)

// Index links
// @link https://stackoverflow.com/a/29223563
for (var i = 0, length = pageLinks.length; i < length; i++) {

	// Reference curent link
	var thisLink = pageLinks[i]

	// Listen to current link
	// `this` = the <a> that was clicked
	thisLink.addEventListener('click', function() {

		// Reference current link's href
		var thisHref = this.getAttribute('href')

		// If link's target is on this page, keep going
		if ( thisHref.startsWith('#') ) {
			event.preventDefault()
			console.log('smooth-scroll IS lstening to thisHref:', thisHref)
		// If link is to another page, bail			
		} else {
			console.log('smooth-scroll NOT listening to thisHref:', thisHref)
			return
		} // ife
 

 /**
 *
 *
 *
 *
 */
 		// Find the element to scroll to 
 		// Because the link's `href` matches the
 		// target's `id`, we can use it as `querySelector`.
 		// Because string includes `#`, we can't use `getElementById`.
 		var targetElement = document.querySelector(thisHref)
 		myLog.log('targetElement:', targetElement)

 /**
 *
 *
 *
 *
 */		

 		// Use helper function to get element's position
 		// Returns a number that's realative to currentPosition
 		// A negitive number means we need to scroll up
 		// A positive number means we need to scroll down
 		var targetElementPosition = getYPosition(targetElement)
 		myLog.log('targetElementPosition:', targetElementPosition)

 		// Get current postion
 		var currentPosition = window.pageYOffset
 		myLog.log('currentPosition:', currentPosition)

/**
 *
 *
 *
 *
 */ 		

 		// Calculate how far from top we need to scroll to
 		// This is the value Velocity needs

 		// Calculate where to scroll relative to currentPosition
 		// by accounting for headerHeight
 		// and converting it to pixels so we can use Velocity

 		var calcScrollTop = currentPosition + targetElementPosition + headerHeight + 'px'
 		myLog.log('calcScrollTop:', calcScrollTop)

		// Velocity :) finally :)	
		this.velocity({scrollTop: calcScrollTop}, {
			duration: 800,
			delay: 500
		}) 

	}, true) // Listener

} // for


