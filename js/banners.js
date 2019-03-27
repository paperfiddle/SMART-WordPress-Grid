/*! Vanilla Velocity Banners
 *
 * @this /js/banners.js
 * @css /sass/components/_banner.scss
 * @requires /vendors/velocity.js
 * 
 */

function Banners() {

    // 
    // Viewport
    // 

    // Timer
    let timeoutResize;

    // Handler
    let veiwportHandler = function () {
        let viewHeight = window.innerHeight || document.documentElement.clientHeight;
        let viewTriggerTop = viewHeight * 0.25;
        let viewTriggerBottom = viewHeight - (viewHeight * 0.25);
        // console.log('BANNER viewport:',viewHeight, viewTriggerTop, viewTriggerBottom );
        return {
            viewHeight,
            viewTriggerTop,
            viewTriggerBottom,
        }
    };

    // Run on init
    veiwportHandler();

    // Listen for resize
    window.addEventListener('resize', function (event) {
        console.log('BANNER resize NO debounce');
        // If there's a timer, cancel it
        if (timeoutResize) {
            window.cancelAnimationFrame(timeoutResize);
        };
        // Setup the new requestAnimationFrame()
        timeoutResize = window.requestAnimationFrame(function () {
            veiwportHandler();
            console.log('BANNER resize debounced');
            console.log('Banner Viewport:', veiwportHandler().viewHeight, veiwportHandler().viewTriggerTop, veiwportHandler().viewHeight);
        });
    }, false);


    // 
    // Banners
    // 

    let banners = Array.from(
        document.querySelectorAll('[data-banner]')
    );

    banners.forEach(function (banner) {

        // Banner Content
        let bannerContent = banner.querySelector('[data-banner-content]');
        // let bannerTitle = banner.querySelector('[data-banner-title]');
        // let bannerText = banner.querySelector('[data-banner-text]');
        // let bannerAction = banner.querySelector('[data-banner-action]');  
        
        // Banner State
        let bannerPinState;
        let bannerContentTop;
        let bannerContentBottom;        

        let bannerHandler = function() {                   
            bannerContentTop = bannerContent.getBoundingClientRect().top
            bannerContentBottom = bannerContent.getBoundingClientRect().bottom            
        };

        let pinHandler = function() {
            if (bannerContentTop > veiwportHandler().viewTriggerBottom || bannerContentBottom < veiwportHandler().viewTriggerTop ) {      
                if (bannerPinState == false) {
                    return;
                } 
                else { 
                    bannerPinState = false;
                    bannerUnpin();
                    console.log('Banner pinned:', bannerPinState, banner);
                }
            } 
            else {
                if (bannerPinState == true) {
                    return;
                } 
                else {
                    bannerPinState = true;
                    bannerPin();
                    console.log('Banner pinned:', bannerPinState, banner);                    
                }
            } 
        };

        let bannerPin = function() {
            bannerContent.velocity({
                opacity: [1, 0],
            }, {
                    duration: 500,
                    easing: "linear",
                }) 
        };

        let bannerUnpin = function() {
            bannerContent.velocity({
                opacity: [0, 1],
            }, {
                    duration: 400,
                    easing: "linear",
                }) // 
        };

        // Run functions on init
        bannerHandler();
        pinHandler();

        // Timer
        let timeoutScroll;          

        // Listen for scroll for each banner
        window.addEventListener('scroll', function (event) {
            console.log('BANNER scroll NO debounce');
            // If there's a timer, cancel it
            if (timeoutScroll) {
                window.cancelAnimationFrame(timeoutScroll);
            };
            // Setup the new requestAnimationFrame()
            timeoutScroll = window.requestAnimationFrame(function () {
                bannerHandler();
                pinHandler();
                console.log('BANNER scroll debounced');
            });
        }, false);
   
    }); // forEach

}; // Banners



// 
// HTML
// <script>
//      Banners.init();
// </script>
//


 Banners.init = function() {

    console.log('INIT banners.js');
    return new Banners();

 }; 

