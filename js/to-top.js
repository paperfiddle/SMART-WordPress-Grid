/*!
 * Vanilla Velocity Smooth To Top
 *
 * @this /js/site-to-top.js
 * @css /sass/components/_to-top.scss
 * @requires /vendors/velocity.js
 * @enhanced /vendors/smooth-scroll.js
 * 
 */

function ToTop(wrapper, link, icon) {

    // Inital variables
    let pinState = false;
    let scrollCurrent = window.pageYOffset || document.documentElement.scrollTop;
    let timeoutResize;
    let timeoutScroll;
    let vpHeight = window.innerHeight || document.documentElement.clientHeight
    let vpThreshold = vpHeight * 1.6;   

    // Initial Attributes
    wrapper.style.opacity = '0';
    wrapper.style.transform = 'scale(0)';


    // Listen for resize
    window.addEventListener('resize', function (event) {

        console.log('ToTop resize NO debounce');

        // If there's a timer, cancel it
        if (timeoutResize) {
            window.cancelAnimationFrame(timeoutResize);
        };

        // Setup the new requestAnimationFrame()
        timeoutResize = window.requestAnimationFrame(function () {

            scrollCurrent = window.pageYOffset || document.documentElement.scrollTop;
            vpHeight = window.innerHeight || document.documentElement.clientHeight;
            vpThreshold = vpHeight * 1.6;

            // If below trigger point and not already PINNED
            if (scrollCurrent > vpThreshold && pinState == false) {
                topPin();
                console.log('ToTop resize ran topPin');

            // If above trigger and not already UNpinned    
            } else if (scrollCurrent < vpThreshold && pinState == true) {
                topUnpin();
                console.log('ToTop resize ran topUnpin');
            };           

            console.log('ToTop resize debounced');
        });

    }, false);


    // Listen for scroll  
    window.addEventListener('scroll', function () {

        // console.log('ToTop scroll NO debounce');

        // If there's a timer, cancel it
        if (timeoutScroll) {
            window.cancelAnimationFrame(timeoutScroll);
        }

        // Setup the new requestAnimationFrame()
        timeoutScroll = window.requestAnimationFrame(function () {

            // Check current postion
            scrollCurrent = window.pageYOffset || document.documentElement.scrollTop;

            // If below trigger point and not already PINNED
            if (scrollCurrent > vpThreshold && pinState == false) {
                topPin();
                // console.log('ToTop scroll direction = UP')

            // If above trigger and not already UNpinned    
            } else if (scrollCurrent < vpThreshold && pinState == true) {
                topUnpin();
                // console.log('ToTop scroll direction = DOWN')
            }

            // Update last known scroll postion
            scrollLast = scrollCurrent;

            // console.log('ToTop scroll debounced');
        });

    }, false);


    // Velocity Pin
    function topPin() {

        pinState = true;
        wrapper.velocity({
            transform: ["scale(1)", "scale(0)"],
            opacity: [1, 0],
        }, {
                duration: 400,
                easing: "linear",
            }); // 

        // console.log('ToTop PIN');

    }; // pin


    // Velocity Unpin
    function topUnpin() {

        pinState = false;
        wrapper.velocity({
            transform: ["scale(0)", "scale(1)"],
            opacity: [0, 1],
        }, {
                duration: 400,
                easing: "linear",
            }); //        

        // console.log('ToTop UNpin');

    }; // pin

}; // ToTop



ToTop.init = function () {

    console.log('INIT to-top.js')

    const wrapper = document.querySelector('[data-to-top]');
    const link = document.querySelector('[data-to-top-link]');
    const icon = document.querySelector('[data-to-top-icon]');

    return new ToTop(
        wrapper, link, icon
    );

};

