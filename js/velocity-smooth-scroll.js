
// @link https://stackoverflow.com/a/29223563

//
// Figure out if site has sticky header
// This lets us add px on scroll up so 
// content doesn't hide under header.
// Hanky - won't work in every scenario - adjust selector
//

// Find first header in markup
var headerElement = document.querySelector('body header:first-child')
console.log('smooth-scroll header element is:', headerElement)

// Get header's rendered display property
var headerPosition = window.getComputedStyle(headerElement).position
console.log('smooth-scroll header position is: ', headerPosition)

// If header's display = fixed, get its rendered height.
// Else set value to '0px' because we don't need a top buffer.
if (headerPosition === 'fixed') {
	var headerHeight = window.getComputedStyle(headerElement).height
	console.log('smooth-scroll header height is: ', headerHeight)
} else {
	var headerHeight = '0px'
	console.log('smooth-scroll header is not fixed, so height is:', headerHeight)
}


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
 		// target's `id`, we can use it as `querySelector`
 		// but not as `getElementById`.
 		var thisTarget = document.querySelector(thisHref)
 		console.log('smooth-scroll target element is:', thisTarget)
		// console.log(thisLink)
		// console.log(thisUrl)
		// console.log(thisHref)


	}, true) // Listener

} // for

