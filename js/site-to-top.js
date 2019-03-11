/*!
 * Vanilla Velocity Smooth To Top
 *
 * @file /js/site-to-top.js
 * @file /sass/components/_site-to-top.scss
 * @file /vendors/velocity.2.0.5.min.js
 * @file /vendors/smooth-scroll.pollyfills.15.2.1.js
 * 
 */


(function () {

    // DOM Variables
    toTop_wrap = document.getElementById('site-to-top');

    // Event timeout variables
    var timeout_resize;
    var timeout_scroll;

    // Viewport variables
    var viewport_height;
    var viewport_width;
    var toTop_thresh

    // Scroll variables
    var scroll_y_last;
    var scroll_y_current;    


    // Set/update viewport variables
    var viewportUpdate = function () {
        viewport_height = window.innerHeight || document.documentElement.clientHeight
        viewport_width = window.innerWidth || document.documentElement.clientWidth;
        toTop_thresh = viewport_height * 1.6;
        console.log('VIEWPORT height = %i | wdith = %i', viewport_height, viewport_width)
    } // viewportSet

    // Scroll update
    var scrollUpdate = function () {
        scroll_y_last = scroll_y_current;
    }

    // To Top Update
    function toTopUpdate() {
        if (scroll_y_current > toTop_thresh) {
            toTopPin();
        } else if (scroll_y_current < toTop_thresh) {
            toTopUnpin();
        }
    }

    // To Top Pin
    function toTopPin() {
        // If false, then make true
        if (toTop_wrap.getAttribute('data-to-top-pin') === 'false') {
            toTop_wrap.setAttribute("data-to-top-pin", "true");
            console.log('UPDATE site header true');

            toTop_wrap.velocity({
                transform: ["scale(1)", "scale(0)"],
                opacity: [1, 0],
            }, {
                    duration: 400,
                    easing: "linear",
                }) //  

        } else {
            // Implied else is that attribute already = true and no action is needed
            return;
        }
    } // pin 


    function toTopUnpin() {
        // If true, then make is-upin
        if (toTop_wrap.getAttribute('data-to-top-pin') === 'true') {
            toTop_wrap.setAttribute("data-to-top-pin", "false");
            console.log('UPDATE site header false');

            toTop_wrap.velocity({
                transform: ["scale(0)", "scale(1)"],
                opacity: [0, 1],
            }, {
                    duration: 400,
                    easing: "linear",
                }) //  

        } else {
            // Implied else is that attribute already = false and no action is needed
            return;
        }
    } // unpin


    // Listen for DOM 
    document.addEventListener("DOMContentLoaded", function (event) {
        scroll_y_last = 0;
        scroll_y_current = 0;   
        toTop_wrap.setAttribute('data-to-top-pin', 'true');
        console.log('LOADED site-to-top.js');
        viewportUpdate();
        scrollUpdate();
        toTopUpdate();
    }) // loaded   


    // Listen for resize events 
    window.addEventListener('resize', function (event) {
        console.log('RESIZE no debounce')
        if (!timeout_resize) {
            timeout_resize = setTimeout(function () {
                timeout_resize = null;
                scroll_y_current = window.pageYOffset;
                console.log('RESIZE debounced');
                viewportUpdate();
                scrollUpdate();
                toTopUpdate();
            }, 66)
        } // if timeout
    }, false) // resize


    // Scroll event 
    window.addEventListener('scroll', function (event) {
        console.log('SCROLL no debounce')
        if (!timeout_scroll) {
            timeout_scroll = setTimeout(function () {
                timeout_scroll = null;
                scroll_y_current = window.pageYOffset;
                console.log('SCROLL debounced', scroll_y_last, scroll_y_current);
                scrollUpdate();
                toTopUpdate();
            }, 66) // timeout     
        } // if timeout   
    }, false) // scroll
    
})();