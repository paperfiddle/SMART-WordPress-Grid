/*! 
 * Vanilla Sticky-Scrolly Header

 * A sticky site header that animates in/out on scroll up/down.
 * Also adjusts main container's `padding-top` so that content 
 * doesn't hide under the header. 
 * 
 * Written in vanilla Javascript with no dependencies. 
 * Uses CSS `transition` for animation of `translate'.
 *
 * @this /js/StickyHeader.js
 * @css /sass/components/header.scss
 * 
 */

function StickyHeader(header, main) {

    // Inital variables
    let pinState = true;

    let headerHeight = header.offsetHeight - 4 + 'px';
    // let headerHeight = getComputedStyle(header).height;
    let scrollCurrent = window.pageYOffset || document.documentElement.scrollTop; 
    let scrollLast = scrollCurrent;
    let timeoutResize;
    let timeoutScroll;

    console.log('Header height:', headerHeight);

    // Set attributes
    header.setAttribute('data-header', '');
    // header.setAttribute('data-header-sticky', '');
    main.style.paddingTop = headerHeight;

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
            // Update the last known postion
            scrollLast = scrollCurrent;
            // Update header height
            headerHeight = getComputedStyle(header).height;
            // Update main padding
            main.style.paddingTop = headerHeight;
          
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
            if (scrollCurrent < scrollLast && pinState == false) { 
                headerPin();
                // console.log('StickyHeader scroll direction = UP')

            // If scroll DOWN and header isn't already UNPINNED  
            } else if (scrollCurrent > scrollLast && pinState == true) {            
                headerUnpin();
                // console.log('StickyHeader scroll direction = DOWN')
            }

            // Update last known scroll postion
            scrollLast = scrollCurrent;

            // console.log('StickyHeader scroll debounced');
        });

    }, false);

    // Pin
    function headerPin() {
        pinState = true;
        header.setAttribute('data-header-sticky', 'true'); 


    }; // pin

    // Unpin
    function headerUnpin() {
        pinState = false;
        header.setAttribute('data-header-sticky', 'false'); 
    }; // pin


    // console.log('SticyHeader headerHeight', headerHeight);

} // StickyHeader


//
// HTML
// <script>
//      StickyHeader.init('site-header', 'site-main'); 
// </script>
// 

StickyHeader.init = function (headerId, mainId) {

    console.log('INIT StickyHeader.js')

    const header = document.getElementById(headerId);
    const main = document.getElementById(mainId);

    return new StickyHeader(
        header,
        main
    );

};
