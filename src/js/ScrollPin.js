/*!
 * Vanilla Scroll-Pin
 * Detect when an element enters-exits viewport for applying animations
 * 
 * @this /js/ScrollPin.js
 * @used /sass/components/_banner.scss
 * @used /sass/components/_card.scss
 * 
 * IMPORTANT: 
 * When animating an element 'pin', DO NOT transition the Y axis. 
 * For 'unpin' it IS okay to transition the Y. 
 * 
 */


function ScrollPin(selector) {

    // Viewport variables
    let viewHeight;
    let viewTriggerTop;
    let viewTriggerBottom;

    // Viewport handler
    function viewportHandler() {

        viewHeight = window.innerHeight || document.documentElement.clientHeight;
        viewTriggerTop = viewHeight * 0.30;
        viewTriggerBottom = viewHeight * 0.70;
        // console.log('ScrollPin viewportHandler', viewHeight, viewTriggerTop, viewTriggerBottom);

    }; //

    // Viewport update on init
    viewportHandler();


    // Get array of all elements   
    let elements = Array.from(
        document.querySelectorAll(selector)
    );

    // Iterate elements
    elements.forEach(function (element, index) {

        // Initial variables
        let elementPinState;
        let elementTop = element.getBoundingClientRect().top;
        let elementBottom = element.getBoundingClientRect().bottom;
        element.setAttribute('data-scroll-pin', '');


        let pinHandler = function() {
            
            elementTop = element.getBoundingClientRect().top;
            elementBottom = element.getBoundingClientRect().bottom;   

            if (elementTop > viewTriggerBottom || elementBottom < viewTriggerTop) {
                if (elementPinState == false) {
                    return;
                }
                else {
                    elementPinState = false;
                    elementUnpin();
                }
            }
            else {
                if (elementPinState == true) {
                    return;
                }
                else {
                    elementPinState = true;
                    elementPin();
                }
            };

        }; // pinHandler

        // Run on init
        pinHandler();


        // Element fade in
        function elementPin() {
            element.setAttribute('data-scroll-pin', 'true');            
        }; //

        // Element Fade Out
        function elementUnpin() {
            element.setAttribute('data-scroll-pin', 'false');
        }; // 


        // Listen for scroll
        let timeoutScroll;

        window.addEventListener('scroll', function (event) {
            // console.log('ScrollPin scroll NO debounce');
            // If there's a timer, cancel it
            if (timeoutScroll) {
                window.cancelAnimationFrame(timeoutScroll);
            };
            // Setup the new requestAnimationFrame()
            timeoutScroll = window.requestAnimationFrame(function () {
                pinHandler();
                // console.log('ScrollPin scroll debounced');
            });
        }, false);


        // Log each element
        // console.log('ScrollPin element', index, elementPinState, elementTop, elementBottom, element);

    }); //  forEach  


    // Listen for viewport resize
    let timeoutResize;

    window.addEventListener('resize', function (event) {
        // console.log('ScrollPin resize NO debounce');
        // If there's a timer, cancel it
        if (timeoutResize) {
            window.cancelAnimationFrame(timeoutResize);
        };
        // Setup the new requestAnimationFrame()
        timeoutResize = window.requestAnimationFrame(function () {
            viewportHandler();
            // console.log('ScrollPin resize debounced:');
        });
    }, false);

}; // ScrollPin


//
// HTML
// @selector - any valid CSS selector - '.class', '#id' ...
//
// <script>
//     ScrollPin.init('selector');
// </script>
// 

ScrollPin.init = function (selector) {

    console.log('ScrollPin init');

    return new ScrollPin(selector);

}; 
