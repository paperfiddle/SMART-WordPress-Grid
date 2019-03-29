/*!
 * Vanilla Velocity Scroll-Fade
 * Fade any element in-out on page scroll
 * 
 *  Uses Velocity but can be easily adapted to use any animation. 
 *  https://github.com/julianshapiro/velocity
 * 
 */


function ScrollFade(selector) {

    // Viewport variables
    let viewHeight;
    let viewTriggerTop;
    let viewTriggerBottom;

    // Viewport handler
    function viewportHandler() {

        viewHeight = window.innerHeight || document.documentElement.clientHeight;
        viewTriggerTop = viewHeight * 0.25;
        viewTriggerBottom = viewHeight * 0.75;
        // console.log('ScrollFade viewportHandler', viewHeight, viewTriggerTop, viewTriggerBottom);

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
            element.velocity({
                opacity: [1, 0],
            }, {
                    duration: 500,
                    easing: "linear",
                })
        }; //

        // Element Fade Out
        function elementUnpin() {
            element.velocity({
                opacity: [0, 1],
            }, {
                    duration: 400,
                    easing: "linear",
                }) // 
        }; // 


        // Listen for scroll
        let timeoutScroll;

        window.addEventListener('scroll', function (event) {
            // console.log('ScrollFade scroll NO debounce');
            // If there's a timer, cancel it
            if (timeoutScroll) {
                window.cancelAnimationFrame(timeoutScroll);
            };
            // Setup the new requestAnimationFrame()
            timeoutScroll = window.requestAnimationFrame(function () {
                pinHandler();
                // console.log('ScrollFade scroll debounced');
            });
        }, false);


        // Log each element
        // console.log('ScrollFade element', index, elementPinState, elementTop, elementBottom, element);

    }); //  forEach  


    // Listen for viewport resize
    let timeoutResize;

    window.addEventListener('resize', function (event) {
        // console.log('ScrollFade resize NO debounce');
        // If there's a timer, cancel it
        if (timeoutResize) {
            window.cancelAnimationFrame(timeoutResize);
        };
        // Setup the new requestAnimationFrame()
        timeoutResize = window.requestAnimationFrame(function () {
            viewportHandler();
            // console.log('ScrollFade resize debounced:');
        });
    }, false);

}; // ScrollFade


//
// HTML
// @selector - any valid CSS selector - '.class', '#id' ...
//
// <script>
//     ScrollFade.init('selector');
// </script>
// 

ScrollFade.init = function (selector) {

    console.log('ScrollFade init');

    return new ScrollFade(selector);

}; 
