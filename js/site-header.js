(function () {

    // Scroll variables
    var timeout_scroll;
    var scroll_y_last;
    var scroll_y_current;

    // Scroll update
    var scrollUpdate = function () {
        scroll_y_last = scroll_y_current;
    }

    // Header variables
    var header_id = 'site-header';
    var header_ele = null;

    // Header update
    function headerUpdate() {
        if (scroll_y_current < scroll_y_last) {
            headerPin();
        } else if (scroll_y_current > scroll_y_last) {
            headerUnpin();
        }
    }

    // Header Pin
    function headerPin() {
        // If is-unpin, then make is-pin
        if (header_ele.getAttribute('data-header') === 'is-unpin') {
            header_ele.setAttribute("data-header", "is-pin");
            console.log('UPDATE site header is-pin');

            header_ele.velocity({
                transform: ["scaleY(1)", "scaleY(0)"],
                opacity: [1, 0],
            }, {
                    duration: 400,
                    easing: "linear",
                }) //  

        } else {
            // Implied else is that attribute already = is-pin and no action is needed
            return;
        }
    } // pin 


    // Header Unpin
    function headerUnpin() {
        // If is-pin, then make is-upin
        if (header_ele.getAttribute('data-header') === 'is-pin') {
            header_ele.setAttribute("data-header", "is-unpin");
            console.log('UPDATE site header is-UNpin');

            header_ele.velocity({
                transform: ["scaleY(0)", "scaleY(1)"],
                opacity: [0, 1],
            }, {
                    duration: 400,
                    easing: "linear",
                }) //  

        } else {
            // Implied else is that attribute already = is-unpin and no action is needed
            return;
        }
    } // unpin


    // Listen for DOM 
    document.addEventListener("DOMContentLoaded", function (event) {
        scroll_y_last = 0;
        scroll_y_current = 0;
        header_ele = document.getElementById(header_id);
        header_ele.setAttribute('data-header', 'is-pin');
        console.log('LOADED site-header.js');
    }) // loaded   


    // Scroll event 
    window.addEventListener('scroll', function (event) {
        console.log('SCROLL no debounce')
        if (!timeout_scroll) {
            timeout_scroll = setTimeout(function () {
                timeout_scroll = null;
                scroll_y_current = window.pageYOffset;
                console.log('SCROLL debounced', scroll_y_last, scroll_y_current);
                headerUpdate();
                scrollUpdate();
            }, 66) // timeout     
        } // if timeout   
    }, false) // scroll


})();