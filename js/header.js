/*! Vanilla Velocity Sticky-Scrolly Header
 * A sticky site header that animates in/out on scroll up/down
 *
 * @this /js/header.js
 * @CSS /sass/components/header.scss
 * @requires /vendors/velocity.js
 */

function StickyHeader(header, main) {

    // Inital variables
    let headerPinState = true;
    let headerHtCurrent = getComputedStyle(header).height;
    let headerHtLast = headerHtCurrent;
    let scrollCurrent = window.pageYOffset || document.documentElement.scrollTop; 
    let scrollLast = scrollCurrent;
    let timeoutResize;
    let timeoutScroll;


    // Set attributes
    header.setAttribute('data-header-sticky', '');
    main.style.paddingTop = headerHtLast;


    // Listen for resize
    window.addEventListener('resize', function (event) {

        // console.log('StickyHeader resize NO debounce');

        // If there's a timer, cancel it
        if (timeoutResize) {
            window.cancelAnimationFrame(timeoutResize);
        }

        // Setup the new requestAnimationFrame()
        timeoutResize = window.requestAnimationFrame(function () {

            // Update current postion
            scrollCurrent = window.pageYOffset || document.documentElement.scrollTop;
            scrollLast = scrollCurrent;

            // Check header height
            headerHtCurrent = getComputedStyle(header).height;

            // If resize changes 'headerHtCurrent',
            // update 'headerHtLast' to adjust padding on main container.
            if (headerHtCurrent != headerHtLast) {
                headerHtLast = headerHtCurrent;
            }
          
            // console.log('StickyHeader resize debounced');
        });

    }, false);


    // Listen for scroll  
    window.addEventListener('scroll', function (event) {

        // console.log('StickyHeader scroll NO debounce');

        // If there's a timer, cancel it
        if (timeoutScroll) {
            window.cancelAnimationFrame(timeoutScroll);
        }

        // Setup the new requestAnimationFrame()
        timeoutScroll = window.requestAnimationFrame(function () {

            // Check current postion
            scrollCurrent = window.pageYOffset;   

            // If scroll UP and header isn't already PINNED
            if (scrollCurrent < scrollLast && headerPinState == false) { 
                headerPin();
                // console.log('StickyHeader scroll direction = UP')

            // If scroll DOWN and header isn't already UNPINNED  
            } else if (scrollCurrent > scrollLast && headerPinState == true) {            
                headerUnpin();
                // console.log('StickyHeader scroll direction = DOWN')
            }

            // Update last known scroll postion
            scrollLast = scrollCurrent;

            // console.log('StickyHeader scroll debounced');
        });

    }, false);


    // Velocity Pin
    function headerPin() {

        headerPinState = true;
        header.velocity({
            transform: ["scaleY(1)", "scaleY(0)"],
            opacity: [1, 0],
        }, {
                duration: 400,
                easing: "linear",
            }); // 

        // console.log('StickyHeader PIN');
        
    }; // pin


    // Velocity Unpin
    function headerUnpin() {

        headerPinState = false;
        header.velocity({
            transform: ["scaleY(0)", "scaleY(1)"],
            opacity: [0, 1],
        }, {
                duration: 400,
                easing: "linear",
            }); //        

        // console.log('StickyHeader UNpin');
        
    }; // pin
        
} // StickyHeader


//
// HTML
// <script>
//      StickyHeader.init('site-header', 'site-main'); 
// </script>
// 

StickyHeader.init = function (headerId, mainId) {

    console.log('INIT header.js')

    const header = document.getElementById(headerId);
    const main = document.getElementById(mainId);

    return new StickyHeader(
        header,
        main
    );

};
