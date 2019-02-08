
// @link https://stackoverflow.com/a/29223563

// 
// A helper function to get an element's exact position
// @link https://www.kirupa.com/html5/get_element_position_using_javascript.htm
//

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


//
// Figure out if site has sticky header
// This lets us add px on scroll up so 
// content doesn't hide under header.
// Hanky - won't work in every scenario - adjust selector
//

function calcHeaderHeight() {

	// Find first header in markup
	var headerElement = document.querySelector('body header:first-child')
	console.log('smooth-scroll headerElement:', headerElement)

	// Get header's rendered position property
	var headerPosition = window.getComputedStyle(headerElement).position
	console.log('smooth-scroll headerPosition: ', headerPosition)

	// If header's position = fixed, get its rendered height.
	// Else set value to '0px' because we don't need a top buffer.
	if (headerPosition === 'fixed') {
		var calculatedHeight = window.getComputedStyle(headerElement).height
		console.log('smooth-scroll calculatedHeight: ', calculatedHeight)
	} else {
		var calculatedHeight = '0px'
		console.log('smooth-scroll headerPosition is not fixed, so height is:', calculatedHeight)
	}	

	return calculatedHeight	

} // function

var headerHeight = calcHeaderHeight()
console.log('smooth-scroll final headerHeight:', headerHeight)


//
// Now let's handle the links
//

// Get a list of links
var pageLinks = document.getElementsByTagName('a')
console.log('smooth-scroll pageLinks are:', pageLinks)

// Index links
for (var i = 0, length = pageLinks.length; i < length; i++) {

	// Reference curent link
	var thisLink = pageLinks[i]

	// Listen to current link
	thisLink.addEventListener('click', function() {

		// Reference current link's href
		var thisHref = this.getAttribute('href')

		// If link's target is on this page, keep going
		if ( thisHref.startsWith('#') ) {
			console.log('smooth-scroll IS lstening to:', thisHref)
		// If link is to another page, bail			
		} else {
			console.log('smooth-scroll NOT listening to:', thisHref)
			return
		} // ife
 
 		// Because the link's `href` matches the
 		// target's `id`, we can use it as `querySelector`.
 		// Because string includes `#`, we can't use `getElementById`.
 		var scrollToElement = document.querySelector(thisHref)
 		console.log('smooth-scroll target element is:', scrollToElement)

 		// Use helper function to get element's position
 		var scrollToElementPosition = getYPosition(scrollToElement)
 		console.log('smooth-scroll to element postion is:', scrollToElementPosition)

 		// Get current postion
 		var currentPosition = window.pageYOffset
 		console.log('smooth-scroll current position is:', currentPosition)



	}, true) // Listener

} // for







