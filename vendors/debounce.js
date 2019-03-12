/**
 * debounce.js (c) 2018 Chris Ferdinandi
 * 
 * Project 
 * https://vanillajstoolkit.com/helpers/debounce/
 * 
 * MIT License
 * https://gomakethings.com
 * 
 * Usage
 * https://gomakethings.com/debouncing-your-javascript-events/
 * https://codepen.io/cferdinandi/pen/VEgzVa
 * 
 * @param  {Function} fn The function to debounce
 * 
 */


var debounce = function (fn) {

    // Setup a timer
    var timeout;

    // Return a function to run debounced
    return function () {

        // Setup the arguments
        var context = this;
        var args = arguments;

        // If there's a timer, cancel it
        if (timeout) {
            window.cancelAnimationFrame(timeout);
        }

        // Setup the new requestAnimationFrame()
        timeout = window.requestAnimationFrame(function () {
            fn.apply(context, args);
        });

    }

};
