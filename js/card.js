/*!
 * Vanilla Velocity Cards
 * Cards that transition on page load and on scroll in-out.
 *
 * @this /js/card.js
 * @css /sass/components/_card.scss
 * @requires velocity.2.0.5.js
 *
 */


(function () {

    // DOM Variables
    var cards = document.querySelectorAll('.card')
    
    // Viewport variables
    var viewport_height;
    var viewport_thresh;

  
    // Set/update viewport variables
    var viewportSet = function () {
        viewport_height = window.innerHeight || document.documentElement.clientHeight; 
        viewport_thresh = viewport_height * 0.15; 
        console.log('CARD height = %i | thresh 15% = %i', viewport_height, viewport_thresh);        
    } 

    // Iterate NodeList so we can work with indivdual cards
    for (let i = 0, length = cards.length; i < length; i++) {

        // Timers for event listeners
        let timeout_resize;
        let timeout_scroll;          

        // Individual card variables
        let thisCard;
        let thisCard_top;
        let thisCard_bottom;
        let thisCard_height;


        // Set + update individual cards
        let thisCardSet = function () {
            thisCard = cards[i];
            thisCard_top = thisCard.getBoundingClientRect().top;
            thisCard_bottom = thisCard.getBoundingClientRect().bottom;
            thisCard_height = thisCard.getBoundingClientRect().height;
            // this works because there is only one img per card
            thisCard_img = thisCard.querySelector('img');
        };


        // Define the card animations
        let thisCardVelocity = function () {
            if (thisCard.getAttribute('data-card') === 'is-pin') {

                if (thisCard_img !== null) {
                    thisCard.velocity({
                        opacity: [1, 0],
                    }, {
                        duration: 600,
                        easing: "linear",
                    }); //  
                    thisCard_img.velocity({
                        transform: ["scaleY(1)", "scaleY(0)"],
                    }, {
                        duration: 500,
                        easing: "linear",
                    }); //  
                } else {
                    thisCard.velocity({
                        opacity: [1, 0],
                    }, {
                        duration: 600,
                        easing: "linear",
                    }); //  
                }; //

            } else if (thisCard.getAttribute('data-card') === 'is-unpin') {

                if (thisCard_img !== null) {
                    thisCard.velocity({
                        opacity: [0, 1],
                    }, {
                        duration: 500,
                        easing: "linear",
                    }); // 
                    thisCard_img.velocity({
                        transform: ["scaleY(0)", "scaleY(1)"],
                    }, {
                        duration: 400,
                        easing: "linear",
                    }); // 
                } else {
                    thisCard.velocity({
                        opacity: [0, 1],
                    }, {
                        duration: 500,
                        easing: "linear",
                    }); //                             
                } //

            } else { 
                return ;
            };

        }; // thisCardVelocity


        let thisCardState = function () {

            // If card is outside threshold, then unpin
            if (thisCard_bottom <= viewport_thresh || thisCard_top >= viewport_height - viewport_thresh) {

                // If card is already unpin, do nothing  
                if (thisCard.getAttribute('data-card') === ('is-unpin')) {
                    return;
                // Else go ahead and unpin   
                } else {
                    thisCard.setAttribute('data-card', 'is-unpin')
                }

            // Else card is inside threshold, then pin
            } else {
                // If card is already pin, do nothing  
                if (thisCard.getAttribute('data-card') === ('is-pin')) {
                    return;
                // Else go ahead and pin 
                } else {
                    thisCard.setAttribute('data-card', 'is-pin');
                }
            }; // if-else  

            // Run Velocity here 
            // and not on events where it animates every debounce
            thisCardVelocity();

            console.log([i], 'thisCard UPDATE', thisCard.getAttribute('data-card'), 'Height', thisCard_height, 'Top', thisCard_top, 'bottom', thisCard_bottom);

        }; // thisCardState  


        // Listen for DOM and animate cards one time
        document.addEventListener("DOMContentLoaded", function (event) {
            console.log("LOADED card.js");            
            viewportSet();
            thisCardSet();
            thisCardState();
        }) // loaded    


        // Listen for resize 
        window.addEventListener('resize', function (event) {
            console.log('CARD resize no debounce');
            // If there's a timer, cancel it
            if (timeout_resize) {
                window.cancelAnimationFrame(timeout_resize);
            }
            // Setup the new requestAnimationFrame()
            timeout_resize = window.requestAnimationFrame(function () {
                // Run resize functions
                console.log('CARD resize debounced');
                viewportSet();
                thisCardSet();
                thisCardState();
            });
        }, false);


        // Listen for scroll 
        window.addEventListener('scroll', function (event) {
            console.log('CARD scroll no debounce');
            // If there's a timer, cancel it
            if (timeout_scroll) {
                window.cancelAnimationFrame(timeout_scroll);
            }
            // Setup the new requestAnimationFrame()
            timeout_scroll = window.requestAnimationFrame(function () {
                // Run scroll functions
                console.log('CARD scroll debounced');
                thisCardSet()
                thisCardState()
            });
        }, false);      

    } // for for for
    
}) ();   
