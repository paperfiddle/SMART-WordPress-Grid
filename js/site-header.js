/*!
 * Vanilla Velocity Sticky-Scolly Header
 * 
 * @file /js/site-header.js
 * @file /sass/components/_site-header.scss
 * @file /vendors/velocity.2.0.5.min.js
 * 
 */



(function () {

    // DOM variables
    var header_ele = document.getElementById('site-header');
    var header_ht;
    var header_ht_px;
    var main_ele = document.getElementById('site-main');

    // Event variables
    var timeout_resize;
    var timeout_scroll;
    var scroll_y_last;
    var scroll_y_current;

    // Scroll update
    var scrollUpdate = function () {
        scroll_y_last = scroll_y_current;
    }

    // Header update on scroll
    function headerScrollUpdate() {
        if (scroll_y_current < scroll_y_last) {
            headerPin();
        } else if (scroll_y_current > scroll_y_last) {
            headerUnpin();
        }
    }

    // Header Pin
    function headerPin() {
        // If false, then make true
        if (header_ele.getAttribute('data-header-pin') === 'false') {
            header_ele.setAttribute("data-header-pin", "true");
            console.log('UPDATE site header true');

            header_ele.velocity({
                transform: ["scaleY(1)", "scaleY(0)"],
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


    // Header Unpin
    function headerUnpin() {
        // If true, then make is-upin
        if (header_ele.getAttribute('data-header-pin') === 'true') {
            header_ele.setAttribute("data-header-pin", "false");
            console.log('UPDATE site header false');

            header_ele.velocity({
                transform: ["scaleY(0)", "scaleY(1)"],
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


    // Header Sticky
    // Get's height of header and adjusts the top padding 
    // on the main container so content isn't hidden under header
    function headerSticky() {
        // Get header height as string
        header_ht_px = window.getComputedStyle(header_ele).height;
        // Convert height to integer base 10
        header_ht = parseInt(header_ht_px, 10);
        // Add some extra 
        main_padding = header_ht + 40 + 'px';
        // Apply padding
        main_ele.style.paddingTop = main_padding;
    }


    // Listen for DOM 
    document.addEventListener("DOMContentLoaded", function (event) {
        scroll_y_last = 0;
        scroll_y_current = 0;
        header_ele.setAttribute('data-header-pin', 'true');
        header_ele.setAttribute('data-header-sticky', 'true');
        console.log('LOADED site-header.js');
        headerSticky();
    }) // loaded   


    // Listen for resize events 
    window.addEventListener('resize', function (event) {
        console.log('RESIZE no debounce')
        if (!timeout_resize) {
            timeout_resize = setTimeout(function () {
                timeout_resize = null;
                scroll_y_current = window.pageYOffset;
                console.log('RESIZE debounced');
                headerSticky();
            }, 66)
        } // if timeout
    }, false) // resize


    // Listen for scroll event
    window.addEventListener('scroll', function (event) {
        console.log('SCROLL no debounce')
        if (!timeout_scroll) {
            timeout_scroll = setTimeout(function () {
                timeout_scroll = null;
                scroll_y_current = window.pageYOffset;
                console.log('SCROLL debounced', scroll_y_last, scroll_y_current);
                headerScrollUpdate();
                scrollUpdate();
            }, 66) // timeout     
        } // if timeout   
    }, false) // scroll


})();