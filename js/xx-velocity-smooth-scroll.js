
var anchors = document.getElementsByTagName("a");

for (var i = 0, length = anchors.length; i < length; i++) {

  var anchor = anchors[i];
  
  anchor.addEventListener('click', function() {
    // `this` refers to the anchor tag that's been clicked
    console.log(this.getAttribute('href'));
  }, true);

};



var clickElement = document.querySelectorAll('a[href*="#"]')


clickElement.addEventListener('click', function (event) {

	// Don't navigate!
	event.preventDefault()

	// Find self and get href (bit hanky using closest) 
	// Returns '#hash' on anchors - it includes the # symbol               
	// var linkHref = event.target.closest("a").getAttribute('href')
	var linkHref = clickElement.getAttribute('href')
	// var linkHref = this.getAttribute('href')	

	// Use the '#hash' to fint the target element
	// Since the '#hash' includes the # symbol, 
	// we can't 'getElementByID'
	// var targetElement = document.querySelectorAll(linkHref)

	// Get the element's position
	// var targetPosition = targetElement.getBoundingClientRect().top;

	// Get the current postion
	// var currentPosition = window.pageYOffset

	// Log to test
	console.log(linkHref)
	// console.log(targetElement)
	// console.log(targetPosition)
	// console.log(currentPosition)

}, true)





