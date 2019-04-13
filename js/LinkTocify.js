/*!
 * Vanilla Idify Linkify Tocify
 *
 * @this /js/LinkTocify.js
 * @css /sass/components/_linkify.scss
 *
 * Idify - Adds missing 'id' attribute to all headings
 * Linkify - Adds an anchor tag with icon to defined heading levels
 * Tocify - Creates a table of contents from defined heading levels
 *
 * Inspired by Parker Moore's work for jekyllrb.com:
 * https://byparker.com/blog/2014/header-anchor-links-in-vanilla-javascript-for-github-pages-and-jekyll/
 *
 */

function LinkTocify(selector, linkLevel, tocLevel) {

    // The container with headings to linkify, tocify
    let container = document.querySelector(selector);

    // Get all headings, assign missing 'id's, pass to linkify +  tocify
    function idify() {

        let headings = Array.from(
            container.querySelectorAll('h1, h2, h3, h4, h5, h6')
        );

        headings.forEach(function (heading) {

            // This heading's tag returned as 'h1' 'h2' 'h3'
            let headingTag = heading.tagName.toLowerCase();

            // Remove 'h' so we can use number to compare
            let headingLevel = headingTag.substring(1);

            // This heading's unaltered text as a string
            let headingText = heading.textContent;

            // The heading's id 
            let headingId = headingText
                .replace(/[^\w\s]/gi, ' ') // remove special characters
                .toLowerCase() // make lowercase            
                .trim() // trim leading + trailing white space
                .replace(/\s+/g, '-') // remplace space with dash
                .substring(0, 24); // return first 24 characters

            // Add missing 'id's to all headings
            if (typeof heading.id == 'undefined' || heading.id == null || heading.id == '') {
                heading.setAttribute('id', headingId);
            }; 

            // Pass to linkify
            if (headingLevel <= linkLevel) {
                linkify(heading, headingTag);
            }; 

            // Pass to tocify
            if (tocLevel > 0 && headingLevel <= tocLevel) {
                tocify(heading, headingText, headingTag);
            }

        }); // forEach
    }; // idify


    // Add anchors to headings
    function linkify(heading, headingText) {

        heading.setAttribute('data-linkify-heading', '');

        let anchor = document.createElement('a');
            anchor.setAttribute('data-linkify-anchor', '');        
            anchor.setAttribute('rel', 'bookmark');
            anchor.setAttribute('title', headingText);
            anchor.href = '#' + heading.id;

        anchor.innerHTML = '<svg aria-hidden="true" focusable="false" data-linkify-icon role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M440.667 182.109l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l14.623-81.891C377.123 38.754 371.468 32 363.997 32h-40.632a12 12 0 0 0-11.813 9.891L296.175 128H197.54l14.623-81.891C213.477 38.754 207.822 32 200.35 32h-40.632a12 12 0 0 0-11.813 9.891L132.528 128H53.432a12 12 0 0 0-11.813 9.891l-7.143 40C33.163 185.246 38.818 192 46.289 192h74.81L98.242 320H19.146a12 12 0 0 0-11.813 9.891l-7.143 40C-1.123 377.246 4.532 384 12.003 384h74.81L72.19 465.891C70.877 473.246 76.532 480 84.003 480h40.632a12 12 0 0 0 11.813-9.891L151.826 384h98.634l-14.623 81.891C234.523 473.246 240.178 480 247.65 480h40.632a12 12 0 0 0 11.813-9.891L315.472 384h79.096a12 12 0 0 0 11.813-9.891l7.143-40c1.313-7.355-4.342-14.109-11.813-14.109h-74.81l22.857-128h79.096a12 12 0 0 0 11.813-9.891zM261.889 320h-98.634l22.857-128h98.634l-22.857 128z"></path></svg>';

        // Anchor before heading
        // This is the best postion in terms of markup.
        // Use CSS to visually display icon before or after heading.
        heading.insertBefore(anchor, heading.firstChild);
        
    }; //


    // Prepare a TOC section to receive items
    function tocifyToc() {

        let tocContainer = document.createElement('section');
            tocContainer.setAttribute('data-tocify-toc', '');

        let tocTitle = document.createElement('h1');
            tocTitle.setAttribute('data-tocify-title', '');
            tocTitle.innerHTML = 'On This Page';
            tocContainer.appendChild(tocTitle);        

        let tocNav = document.createElement('nav');
            tocNav.setAttribute('data-tocify-nav', '');
            tocNav.setAttribute('role', 'menu');
            tocNav.setAttribute('aria-label', 'Page contents');
            tocContainer.appendChild(tocNav);

        // Append DOM
        container.parentNode.insertBefore(tocContainer, container);

    }; //


    function tocify(heading, headingText, headingTag) {

        heading.setAttribute('data-tocify-heading', '');

        let tocLink = document.createElement('a');
            tocLink.setAttribute('data-tocify-link', '');
            tocLink.setAttribute('data-tocify-' + headingTag, '');
            tocLink.setAttribute('rel', 'bookmark');
            tocLink.setAttribute('title', headingText);
            tocLink.href = '#' + heading.id;       
            tocLink.innerHTML = headingText;

        let tocItem = document.createElement('div'); 
            tocItem.setAttribute('role', 'none');
            tocItem.setAttribute('data-tocify-item', ''); 
            tocItem.appendChild(tocLink);

        let tocTarget = document.querySelector('[data-tocify-nav]')
            tocTarget.append(tocItem);
        
    }; //


    // Run the functions
    if (tocLevel > 0) {
        tocifyToc();
    }

    idify();

};  // LinkTocify


//
// HTML
// @param selector - '.class' or '#id'
// @param integer - Heading level to linkify to
// @param optional integer - Heading level to tocify to
// 
// <script>
//      LinkTocify.init('.post__main', 6, 6); 
// <script>
//

 LinkTocify.init = function (selector, linkLevel, tocLevel) {

     console.log('INIT LinkTocify.js');
     return new LinkTocify(selector, linkLevel, tocLevel);

 }

 