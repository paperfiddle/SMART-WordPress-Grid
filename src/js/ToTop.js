/*!
 * Vanilla Smooth To Top
 *
 * @this /js/ToTop.js
 * @css /sass/components/_to-top.scss
 * @enhanced with /vendors/smooth-scroll.js
 * 
 */

function ToTop(wrapper) {

    // Inital variables
    let pinState = false;
    let scrollCurrent = window.pageYOffset || document.documentElement.scrollTop;
    let viewportHeight = window.innerHeight || document.documentElement.clientHeight
    let viewportTrigger = viewportHeight * 1.6;     
    let timeoutResize;
    let timeoutScroll;

    // Initial Attributes
    wrapper.setAttribute('data-totop-pin', 'false');

    // Listen for resize
    window.addEventListener('resize', function (event) {
        console.log('ToTop resize NO debounce');

        // If there's a timer, cancel it
        if (timeoutResize) {
            window.cancelAnimationFrame(timeoutResize);
        };

        // Setup the new requestAnimationFrame()
        timeoutResize = window.requestAnimationFrame(function () {

            // Update scroll
            scrollCurrent = window.pageYOffset || document.documentElement.scrollTop;
            
            // Update viewport
            viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            viewportTrigger = viewportHeight * 1.6;

            // If below trigger point and not already pinned
            if (scrollCurrent > viewportTrigger && pinState == false) {
                topPin();
            // If above trigger and not already UNpinned    
            } else if (scrollCurrent < viewportTrigger && pinState == true) {
                topUnpin();
            };           

            console.log('ToTop resize debounced');
        });

    }, false);


    // Listen for scroll  
    window.addEventListener('scroll', function () {

        console.log('ToTop scroll NO debounce');

        // If there's a timer, cancel it
        if (timeoutScroll) {
            window.cancelAnimationFrame(timeoutScroll);
        }

        // Setup the new requestAnimationFrame()
        timeoutScroll = window.requestAnimationFrame(function () {

            // Check current postion
            scrollCurrent = window.pageYOffset || document.documentElement.scrollTop;

            // If below trigger point and not already PINNED
            if (scrollCurrent > viewportTrigger && pinState != true) {
                topPin();
            // If above trigger and not already UNpinned    
            } else if (scrollCurrent < viewportTrigger && pinState != false) {
                topUnpin();
            }

            // Update last known scroll postion
            scrollLast = scrollCurrent;

            console.log('ToTop scroll debounced');
        });

    }, false);


    // Pin handler
    function topPin() {

        pinState = true;
        wrapper.setAttribute('data-totop-pin', 'true')
        console.log('ToTop PIN');

    }; // pin


    // Unpin handler
    function topUnpin() {

        pinState = false;
        wrapper.setAttribute('data-totop-pin', 'false')
        console.log('ToTop UNpin');

    }; // pin

}; // ToTop



ToTop.init = function () {

    console.log('INIT ToTop.js')

    const wrapper = document.querySelector('[data-totop]');

    return new ToTop(
        wrapper
    );

};

