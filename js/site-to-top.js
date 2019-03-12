/*!
 * Vanilla Velocity Smooth To Top
 *
 * @this /js/site-to-top.js
 * @css /sass/components/_site-to-top.scss
 * @requires /vendors/velocity.js
 * @uses /vendors/smooth-scroll.js
 * 
 */


(function () {

    // DOM Variables
    var toTop_wrap = document.getElementById('site-to-top');

    // Event timeout variables
    var timeout_resize;
    var timeout_scroll;

    // Viewport variables
    var viewport_height;
    // var viewport_width;
    var toTop_thresh;

    // Scroll variables
    var scroll_y_last;
    var scroll_y_current;    


    // Set/update viewport variables
    var viewportUpdate = function () {
        viewport_height = window.innerHeight || document.documentElement.clientHeight
        viewport_width = window.innerWidth || document.documentElement.clientWidth;
        toTop_thresh = viewport_height * 1.6;
        console.log('TO TOP viewport height = %i | wdith = %i', viewport_height); 
    }; // viewportSet


    // Scroll update
    var scrollUpdate = function () {
        scroll_y_last = scroll_y_current;
    };


    // To Top Update
    function toTopUpdate() {
        if (scroll_y_current > toTop_thresh) {
            toTopPin();
        } else if (scroll_y_current < toTop_thresh) {
            toTopUnpin();
        }      
    }; // update


    // To Top Pin
    function toTopPin() {
        // If false, then make true
        if (toTop_wrap.getAttribute('data-to-top-pin') === 'false') {
            console.log('TO TOP Pinned');
            toTop_wrap.setAttribute('data-to-top-pin', 'true');

            toTop_wrap.velocity({
                transform: ['scale(1)', 'scale(0)'],
                opacity: [1, 0],
            }, {
                duration: 400,
                easing: 'linear',
            }); //  
            
        } else {
            // Implied else is that attribute already = true and no action is needed
            return;
        }
    }; // pin 


    function toTopUnpin() {
        // If true, then make is-upin
        if (toTop_wrap.getAttribute('data-to-top-pin') === 'true') {

            console.log('TO TOP Un-pinned');
            toTop_wrap.setAttribute('data-to-top-pin', 'false');

            toTop_wrap.velocity({
                transform: ['scale(0)', 'scale(1)'],
                opacity: [0, 1],
            }, {
                duration: 400,
                easing: 'linear',
            }); // 

        } else {
            // Implied else is that attribute already = false and no action is needed
            return;
        }
    }; // unpin


    // Listen for DOM 
    document.addEventListener('DOMContentLoaded', function (event) {
        console.log('LOADED site-to-top.js');
        scroll_y_last = 0;
        scroll_y_current = 0;   
        toTop_wrap.setAttribute('data-to-top-pin', 'true');    
        viewportUpdate();
        scrollUpdate();
        toTopUpdate();
    });   


    // Listen for resize events run viewport + card functions
    window.addEventListener('resize', function (event) {
        console.log('TO TOP resize no debounce');
        // If there's a timer, cancel it
        if (timeout_resize) {
            window.cancelAnimationFrame(timeout_resize);
        }
        // Setup the new requestAnimationFrame()
        timeout_resize = window.requestAnimationFrame(function () {
            // Run resize functions
            console.log('TO TOP resize debounced');
            scroll_y_current = window.pageYOffset;
            viewportUpdate();
            scrollUpdate();
            toTopUpdate();
        });
    }, false);

    // Listen for scroll events and update banners only
    window.addEventListener('scroll', function (event) {
        console.log('TO TOP scroll no debounce');
        // If there's a timer, cancel it
        if (timeout_scroll) {
            window.cancelAnimationFrame(timeout_scroll);
        }
        // Setup the new requestAnimationFrame()
        timeout_scroll = window.requestAnimationFrame(function () {
            // Run scroll functions
            console.log('TO TOP scroll debounced');
            scroll_y_current = window.pageYOffset;
            scrollUpdate();
            toTopUpdate();
        });
    }, false);
    
})(); 