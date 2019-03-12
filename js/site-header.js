/*!
 * Vanilla Velocity Sticky-Scolly Header
 * 
 * @this /js/site-header.js
 * @css /sass/components/_site-header.scss
 * @requires /vendors/velocity.2.0.5.min.js
 * 
 */



(function () {

    // DOM variables
    var header_ele = document.getElementById('site-header');
    var header_ht;
    var main_ele = document.getElementById('site-main');

    // Event variables
    var timeout_resize;
    var timeout_scroll;
    var scroll_y_last;
    var scroll_y_current;

    // Scroll update
    var scrollUpdate = function () {
        scroll_y_last = scroll_y_current;
    };

    // Header update on scroll
    function headerScrollUpdate() {
        if (scroll_y_current < scroll_y_last) {
            headerPin();
        } else if (scroll_y_current > scroll_y_last) {
            headerUnpin();
        }
    }; 

    // Header Pin
    function headerPin() {
        if (header_ele.getAttribute('data-header-pin') != 'true') {
            console.log('HEADER Pinned');            
            header_ele.setAttribute("data-header-pin", "true");

            header_ele.velocity({
                transform: ["scaleY(1)", "scaleY(0)"],
                opacity: [1, 0],
            }, {
                duration: 400,
                easing: "linear",
            }); //  
        } else {
            // Implied else is that attribute already = true and no action is needed
            return;
        }
    }; // pin 


    // Header Unpin
    function headerUnpin() {
        if (header_ele.getAttribute('data-header-pin') != 'false') {
            console.log('HEADER Un-pinned');            
            header_ele.setAttribute("data-header-pin", "false");
            header_ele.velocity({
                transform: ["scaleY(0)", "scaleY(1)"],
                opacity: [0, 1],
            }, {
                duration: 400,
                easing: "linear",
            }); //  

        } else {
            // Implied else is that attribute already = false and no action is needed
            return;
        }
    }; // unpin


    // Header Sticky
    // Gets height of header and adjusts the top padding 
    // on the main container so content isn't hidden under header
    function headerSticky() {
        // Get header height as string
        header_ht_px = window.getComputedStyle(header_ele).height;
        // Apply padding
        main_ele.style.paddingTop = header_ht;
    };


    // Listen for DOM 
    document.addEventListener("DOMContentLoaded", function (event) {
        console.log('LOADED site-header.js');        
        scroll_y_last = 0;
        scroll_y_current = 0;
        header_ele.setAttribute('data-header-pin', 'true');
        header_ele.setAttribute('data-header-sticky', 'true');
        headerSticky();
    }); // loaded



    // Listen for resize events
    window.addEventListener('resize', function (event) {
        console.log('HEADER resize no debounce');
        // If there's a timer, cancel it
        if (timeout_resize) {
            window.cancelAnimationFrame(timeout_resize);
        }
        // Setup the new requestAnimationFrame()
        timeout_resize = window.requestAnimationFrame(function () {
            // Run resize functions
            console.log('HEADER resize debounced');
            scroll_y_current = window.pageYOffset;
            headerSticky();
        });
    }, false);


    // Listen for scroll events 
    window.addEventListener('scroll', function (event) {
        console.log('HEADER scroll no debounce');
        // If there's a timer, cancel it
        if (timeout_scroll) {
            window.cancelAnimationFrame(timeout_scroll);
        }
        // Setup the new requestAnimationFrame()
        timeout_scroll = window.requestAnimationFrame(function () {
            // Run scroll functions
            console.log('HEADER scroll debounced');
            scroll_y_current = window.pageYOffset;
            headerScrollUpdate();
            scrollUpdate();
        });
    }, false);


})();