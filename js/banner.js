/*!
 * Vanilla Velocity Banners
 * Banners who's content fades in-out on enter-leave viewport
 *
 * @this /js/banner.js
 * @css /sass/components/_banner.scss
 * @requires /vendors/velocity.js
 *
 */


(function () {

    console.log('LOADED banners.js')

    // 
    // Viewport
    // 

    // Viewport variables
    var viewport_height
    var viewport_thresh

    // Set/update viewport variables
    var viewportSet = function () {
        viewport_height = window.innerHeight || document.documentElement.clientHeight
        viewport_thresh = viewport_height * 0.15
    } // viewportSet

    // Log viewport variables
    var viewportLog = function () {
        console.log('BANNER viewport height = %i | thresh 15% = %i', viewport_height, viewport_thresh)
    } // viewportLog


    // 
    // Banners
    //

    // Get NodeList of all banners
    var banners = document.querySelectorAll('.banner')

    // Iterate NodeList so we can work with indivdual banners
    for (let i = 0, length = banners.length; i < length; i++) {

        // Event listener variables
        let timeout_resize
        let timeout_scroll

        // DOM variables
        let thisBanner
        // let thisBanner_top
        // let thisBanner_bottom
        // let thisBanner_height    
        let thisBanner_content  
        let thisBanner_contentTop
        let thisBanner_contentBottom
        let thisBanner_contentHeight  

        // Set + update individual banners
        let thisBannerSet = function () {

            thisBanner = banners[i]
            // thisBanner_top = thisBanner.getBoundingClientRect().top
            // thisBanner_bottom = thisBanner.getBoundingClientRect().bottom
            // thisBanner_height = thisBanner.getBoundingClientRect().height   
            thisBanner_content = thisBanner.querySelector('.banner__content')        
            thisBanner_contentTop = thisBanner_content.getBoundingClientRect().top
            thisBanner_contentBottom = thisBanner_content.getBoundingClientRect().bottom
            thisBanner_contentHeight = thisBanner_content.getBoundingClientRect().height

        } // thisBannerSet

        // Define the card animations
        let thisBannerVelocity = function () {

            if (thisBanner_content.getAttribute('data-banner-pin') === 'true') {
                thisBanner_content.velocity({
                    opacity: [1, 0],
                }, {
                        duration: 500,
                        easing: "linear",
                    }) //  

            } else if (thisBanner_content.getAttribute('data-banner-pin') === 'false') {

                thisBanner_content.velocity({
                    opacity: [0, 1],
                }, {
                        duration: 400,
                        easing: "linear",
                    }) // 

            } else { 
                return 
            }

        } // thisBannerVelocity


        let thisBannerState = function () {

            // If card is outside of threshold, unpin it
            if (thisBanner_contentBottom <= viewport_thresh || thisBanner_contentTop >= viewport_height - viewport_thresh) {
                // If card is already unpin, do nothing  
                if (thisBanner_content.getAttribute('data-banner-pin') === ('false')) {
                    return
                // Else go ahead and unpin it    
                } else {
                    thisBanner_content.setAttribute('data-banner-pin', 'false')
                }
                console.log([i], 'BANNER Un-pinned');
            // Else card is inside threshold, pin it
            } else {
                // If card is already pin, do nothing  
                if (thisBanner_content.getAttribute('data-banner-pin') === ('true')) {
                    return
                // Else go ahead and unpin it
                } else {
                    thisBanner_content.setAttribute('data-banner-pin', 'true')
                } 
                console.log([i], 'BANNER Pinned');
            } // if-else  

            // Run Velocity here _content
            // and not on events where it animates every debounce
            thisBannerVelocity()
            
        } // thisBannerState  


        // Listen for DOM 
        document.addEventListener("DOMContentLoaded", function (event) {
            viewportSet();
            viewportLog();
            thisBannerSet();
            thisBannerState();
            console.log("BANNER loaded and parsed");
        });   


        // Listen for resize events run viewport + card functions
        window.addEventListener('resize', function (event) {
            console.log('BANNER resize no debounce');
            // If there's a timer, cancel it
            if (timeout_resize) {
                window.cancelAnimationFrame(timeout_resize);
            }
            // Setup the new requestAnimationFrame()
            timeout_resize = window.requestAnimationFrame(function () {
                // Run resize functions
                viewportSet()
                viewportLog()
                thisBannerSet()
                thisBannerState()
                console.log('BANNER resize debounced');
            });
        }, false);


        // Listen for scroll events and update banners only
        window.addEventListener('scroll', function (event) {
            console.log('BANNER scroll no debounce');
            // If there's a timer, cancel it
            if (timeout_scroll) {
                window.cancelAnimationFrame(timeout_scroll);
            }
            // Setup the new requestAnimationFrame()
            timeout_scroll = window.requestAnimationFrame(function () {
                // Run scroll functions
                thisBannerSet()
                thisBannerState()
                console.log('BANNER scroll debounced');
            });
        }, false);

    } // for for for

})();