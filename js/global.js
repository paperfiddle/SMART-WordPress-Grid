//
// @file /js/global.js
//


// Event timeout variables
var timeout_resize;
var timeout_scroll;



// Viewport variables
var viewport_height;
var viewport_width;
var toTop_thresh

// Set/update viewport variables
var viewportUpdate = function () {
    viewport_height = window.innerHeight || document.documentElement.clientHeight
    viewport_width = window.innerWidth || document.documentElement.clientWidth;
    toTop_thresh = viewport_height * 1.6;
    console.log('VIEWPORT height = %i | wdith = %i', viewport_height, viewport_width)
} // viewportSet



// Scroll variables
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



// To Top Variables
var toTop_link

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
    // If is-unpin, then make is-pin
    if (toTop_link.getAttribute('data-to-top') === 'is-unpin') {
        toTop_link.setAttribute("data-to-top", "is-pin");
        console.log('UPDATE site header is-pin');

        toTop_link.velocity({
            transform: ["scale(1)", "scale(0)"],
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


function toTopUnpin() {
    // If is-pin, then make is-upin
    if (toTop_link.getAttribute('data-to-top') === 'is-pin') {
        toTop_link.setAttribute("data-to-top", "is-unpin");
        console.log('UPDATE site header is-UNpin');

        toTop_link.velocity({
            transform: ["scale(0)", "scale(1)"],
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
    toTop_link = document.getElementById('site-to-top');
    toTop_link.setAttribute('data-to-top', 'is-unpin');

    toTop_link.velocity({
        transform: ["scale(0)", "scale(1)"],
        opacity: [0, 1],
    }, {
            duration: 400,
            easing: "linear",
        }) //  

    console.log('LOADED global.js');
    viewportUpdate();
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
            headerUpdate();
            scrollUpdate();
            toTopUpdate();
            
        }, 66) // timeout     
    } // if timeout   
}, false) // scroll

