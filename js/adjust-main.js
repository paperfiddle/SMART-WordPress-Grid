/*!
 * @file adjust-top.js
 * Adds 'padding-top' to '#site-main'
 * Adds additional px when header positiion is fixed
 * so that page content is not hidden under header
 */

(function () {

    var header_ele;
    var header_position; 
    var header_ht_px; 
    var header_ht;
    var main_ele;
    

    function adjustMain() {

        var padding_top;
    
        if (header_position == 'fixed') {
            padding_top = header_ht + 40 + 'px';           	
        } else {
            padding_top = 40 + 'px';
        }

        main_ele.style.paddingTop = padding_top;

        console.log('Site header position =', header_position, '| Height =', header_ht, '| margin-top =', padding_top, 'added to', main_ele);

    } // function

    document.addEventListener("DOMContentLoaded", function (event) {
        console.log('LOADED adjust-top.js');
        // Get header element
        header_ele = document.getElementById('site-header');
        // Get header position
        header_position = window.getComputedStyle(header_ele).position;
        // Get header height as string
        header_ht_px = window.getComputedStyle(header_ele).height;
        // Convert height to integer base 10
        header_ht = parseInt(header_ht_px, 10);
        // Get the element to receive 'margin-top'
        main_ele = document.getElementById('site-main');
        // Run the adjustment function
        adjustMain();

    }) // loaded  

})();