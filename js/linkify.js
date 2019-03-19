/*!
 * Vanilla Idify Linkify Tocify
 *
 * @this /js/linkify.js
 * @css /sass/components/_linkify.scss 
 * 
 * Idify - Adds missing 'id' attribute to all headings 
 * Linkify - Adds an anchor tag with icon to defined heading levels
 * Tocify - Creates a table of contents from defined heading levels
 * 
 * NO SPECIAL markup needed in .html, BUT search this file for 'EDIT THIS'
 * 
 * TOC container is output as: section -> heading, nav -> div -> a
 * This structure supports future plan to add toggle.
 * It's also semantically correct + proper ARIA attributes are present.
 * 
 * 
 * Inspired by Parker Moore's work for jekyllrb.com: 
 * https://byparker.com/blog/2014/header-anchor-links-in-vanilla-javascript-for-github-pages-and-jekyll/
 * 
 * 
 */


(function () {

    // EDIT THIS: Look in these containers for headings
    // If using anything other than 'getElementById', 
    // then [0] index only the first instance so we don't
    // have to iterate the containers. 
    var headings_container = document.getElementsByClassName('post__main')[0] ||
        document.getElementsByClassName('page__main')[0];


    // Get all headings in the containers and iterate
    // Add missing 'id' attributes to all headings
    // Get all information needed by linkify() and tocify()
    function idify() {

        var headings_all = headings_container.querySelectorAll('h1, h2, h3, h4, h5, h6');

        for (var i = 0; i < headings_all.length; i++) {

            // This heading
            var heading = headings_all[i];

            // This heading's tag returned as 'h1' 'h2' 'h3' ...
            var heading_tag = heading.tagName.toLowerCase();

            // This heading's unaltered text as a string
            var heading_text = heading.textContent;

            // String with special characters and 
            // leading-trailing white space trimmed
            var heading_prep = heading_text.replace(/[^\w\s]/gi, '').trim();
            
            // String with space to dash + lowercase
            var heading_id = heading_prep.replace(/\s+/g, '-').toLowerCase();

            // Add missing ids
            if (typeof heading.id == 'undefined' || heading.id == null || heading.id == '') {
                heading.setAttribute('id', heading_id);
            }

            // Pass headings to linkify and tocify
            linkify(heading, heading_tag, heading_text, heading.id );
            tocify(heading, heading_tag, heading_text, heading.id);

            // console.log('idified heading:', heading);            

        }// for
       
    }; // idify


    // Linkify headings
    function linkify(heading, tag, text, id) {

        // EDIT THIS: If you want to limit which headings are linkified,
        // then move all code into a conditional statement like this:

        // if (tag == 'h1' || tag == 'h2') {
        //     // code here
        // }; 

        function makeAnchor() {
            var anchor = document.createElement('a');
            anchor.className = 'linkify';
            anchor.setAttribute('rel', 'bookmark');
            anchor.setAttribute('title', text);
            anchor.href = '#' + id;
            // anchor.innerHTML = '<span class="icon-link"></span>';
            anchor.innerHTML = '<svg aria-hidden="true" focusable="false" class="linkify__icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M12.971 352h32.394C67.172 454.735 181.944 512 288 512c106.229 0 220.853-57.38 242.635-160h32.394c10.691 0 16.045-12.926 8.485-20.485l-67.029-67.029c-4.686-4.686-12.284-4.686-16.971 0l-67.029 67.029c-7.56 7.56-2.206 20.485 8.485 20.485h35.146c-20.29 54.317-84.963 86.588-144.117 94.015V256h52c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-52v-5.47c37.281-13.178 63.995-48.725 64-90.518C384.005 43.772 341.605.738 289.37.01 235.723-.739 192 42.525 192 96c0 41.798 26.716 77.35 64 90.53V192h-52c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h52v190.015c-58.936-7.399-123.82-39.679-144.117-94.015h35.146c10.691 0 16.045-12.926 8.485-20.485l-67.029-67.029c-4.686-4.686-12.284-4.686-16.971 0L4.485 331.515C-3.074 339.074 2.28 352 12.971 352zM288 64c17.645 0 32 14.355 32 32s-14.355 32-32 32-32-14.355-32-32 14.355-32 32-32z"></path></svg>';

            return anchor;             
        };            

        heading.appendChild(makeAnchor());

        // console.log('linkify heading:', heading);   
            
    }; // linkify


    // Make the tocify TOC container
    var tocifyToc = function () {

        // Create DOM elements
        var toc_container = document.createElement('section');
        toc_container.id = 'tocify'
        toc_container.className = 'tocify';

        var toc_heading = document.createElement('h1');
        toc_heading.id = 'tockify-heading';
        toc_heading.className = 'tocify__heading';
        toc_heading.innerHTML = 'On This Page';

        var toc_nav = document.createElement('nav');
        toc_nav.id = 'tocify-nav';
        toc_nav.className = 'tocify__nav';
        toc_nav.setAttribute('role', 'menu');
        toc_nav.setAttribute('aria-label', 'Page contents');

        // Append DOM
        var toc_target = headings_container;
        toc_target.parentNode.insertBefore(toc_container, toc_target);
        toc_container.appendChild(toc_heading);
        toc_container.appendChild(toc_nav);

    };// tocifyToc


    // Tocify headings
    function tocify(heading, tag, text, id) {

        // EDIT THIS: If you want to limit which headings are tocified,
        // then move all code into a conditional statement like this:

        // if (tag == 'h1' || tag == 'h2') {
        //     // code here
        // }; 

        // Make link 
        var anchor = document.createElement('a');
            anchor.className = 'tocify__link tocify__link--' + tag;
            anchor.setAttribute('rel', 'bookmark');
            anchor.setAttribute('title', text);
            anchor.setAttribute('role', 'menuitem');
            anchor.href = '#' + id;
            anchor.innerHTML = text;

        // Make link item wrapper
        var nav_item = document.createElement('div');
            nav_item.className = 'tocify__nav-item';
            nav_item.setAttribute('role', 'none');
            nav_item.appendChild(anchor);

        // Add links to TOC
        document.getElementById('tocify-nav').append(nav_item);   

        // console.log('tocify heading:', heading);

    }; // tocify


    // Listen for DOM 
    document.addEventListener('DOMContentLoaded', function (event) {

        // If there is no container we want, then return
        if (!headings_container) {
            console.log('LOADED linkify.js but no heading containers were found');
            return; 
        // Else go ahead and and do some stuff
        } else {
            tocifyToc();
            idify();
            console.log('LOADED linkify.js');
        }

    }); // listen  

})();    

