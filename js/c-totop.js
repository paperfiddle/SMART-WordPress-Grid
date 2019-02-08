//
// @file /js/velocity-totop.js
//
// This component also uses, but does not require: 
// @file /js/smooth-scroll.js 
//


/**
 * #id of the 'totop' link
 * Note the markup - just an <a> with no wrapper.
 * Meaning this element serves position + visibility + clicks
 */

var linkId = document.getElementById('c-totop');


/**
 * Get the link's width + height attributes
 */

var linkHeight = window.getComputedStyle(linkId).height
console.log('linkHeight', linkHeight)

var linkWidth = window.getComputedStyle(linkId).width
console.log('linkWidth', linkWidth)

/**
 * Let CSS know JS has taken over
 */

linkId.setAttribute('data-js-loaded', 'true')



/**
 * The user's viewport height
 * ?? difference bewteen variable in and outsid of function ??
 * 
 * Originally had this in the scroll function,
 *  but seemed greedy to request on every scroll.
 * 
 * So I put it here thinking the tradeoff is that we miss if
 * user has switched orientation or resized brower
 * after page load. 
 *
 * This is acceptable becaue while we do need the height, 
 * after-load changes don't break layout or decrease UX
 * of the 'totop' component.  
 * 
 * After-load changes only affect when 'totop' is dsiplayed.
 * This is low impact - a single user in a single session is
 * not going to notice this timing quirk. 
 * 
 * But is this how putting the variable outside the funtion works? 
 * Or is height calculated on every scroll because it's 
 * used in the scroll function?  
 */

var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);


/**
 * Height at which to switch classes
 * Set low here for testing.
 * For prod, 1-2 is reasonable.
 */

var switchAtPosition = viewHeight * 0.4;


/**
 * The 'to top' link is visible by default for no-JS fallback.
 * This handles when page loads + before user has scorlled.
 * Result is that 'totop' link is briefly visible as page loads,
 *  and fades out according to CSS transitons only if JS is enabled.
 */

linkId.classList.add('is-unpin');


/**
 * Once user has scrolled, this function controlls visibility. 
 * CSS tranistions scale + opacity.
 */

window.onscroll = function toTop(){
			
	var currentPosition = window.pageYOffset | document.body.scrollTop;

	// Show totop link
	if(currentPosition > switchAtPosition) {



		linkId.velocity({ 

		    top: 50, // Defaults to the px unit type
		    left: "50%",
		    height: "*=2" // Double the current height
		    

			// height: [ linkHeight, 0 ],
			// width: [ linkWidth, 0],
			transform: [ "stop", "scale(1)", "scale(1.602)", "scale(0)" ],
			opacity: [ "stop", 1, 0 ],  
			}, { duration: 1200 })

		// linkId.velocity("stop", true);

		linkId.classList.remove('is-unpin');
		linkId.classList.add('is-pin');

	// hide totop link	
	} else if(currentPosition <= switchAtPosition) {


		linkId.classList.remove('is-pin');
		linkId.classList.add('is-unpin');

	}

} //
