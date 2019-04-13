/*! 
 * Vanilla Aria Toggle Content
 *  A lighter-weight alternative to many ARIA accordions.
 *
 * @this /js/ToggleContent.js
 * @requires /sass/componenets/_ToggleContent.scss
 * 
 */


function ToggleContent() {

    // Get all wrappers
    let wrappers = Array.from(
        document.querySelectorAll('[data-toggle]')
    );
    
    // Iterate wrappers
    wrappers.forEach(function(wrapper, index) {

        // Get the title 
        let title = wrapper.querySelector('[data-toggle-title]');
        let titleTag = title.tagName.toLowerCase();
        let titleText = title.textContent;    
        
        // Make `id`s
        let idString = titleText
            .replace(/[^\w\s]/gi, ' ') // remove special characters
            .toLowerCase() // make lowercase            
            .trim() // trim leading + trailing white space
            .replace(/\s+/g, '-') // remplace space with dash
            .substring(0, 18); // return first 18 characters  

        let buttonId = idString + '-button'   
        let contentId = idString + '-content'     

        // Make button parts     
        let buttonText  = '<span data-toggle-button-text>' + titleText + '</span>';     
        let buttonIcon = '<span data-toggle-icon-wrap><svg aria-hidden="true" focusable="false" class="icon" data-toggle-icon role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg></span>';
  
        // Make button
        let button = document.createElement('button');
            button.innerHTML = buttonIcon + buttonText;
            button.id = buttonId; 
            button.setAttribute('aria-label', 'Expand content below');           
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('data-toggle-button', '');

        // Make new title tag with button inside
        let titleNew = document.createElement(titleTag);
            titleNew.setAttribute('data-toggle-title', '');
            titleNew.setAttribute('aria-label', titleText);
            titleNew.appendChild(button);

        // Replace original title with new title     
        wrapper.replaceChild(titleNew, title);

        // Set init attributes for content <div>
        let content = wrapper.querySelector('[data-toggle-content]');
            content.id = contentId;
            content.setAttribute('aria-labelledby', button.id);
            content.setAttribute('aria-label', 'Content for: ' + titleText);
            content.setAttribute('aria-hidden', 'true');
            content.style.display = 'none';

        // Close Handler
        function toggleClose() {
            // Change these right away
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-label', 'Expand content below');
            content.setAttribute('aria-hidden', 'true');           
            // Wait for animation to change these
            setTimeout(() => {        
                content.style.display = 'none';                       
            }, 300);     
        };

        // Open Handler
        function toggleOpen() {
            button.setAttribute('aria-expanded', 'true');
            button.setAttribute('aria-label', 'Collapse content below');
            content.setAttribute('aria-hidden', 'false');        
            content.style.display = 'block';  
            // Wait for animation to change these
            setTimeout(() => {
            }, 300);     
        };

        // Click Event Listener
        button.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();      
            if (button.getAttribute('aria-expanded') == 'false') {
                toggleOpen();
            } else {
                toggleClose();
            }        
        });   
        // console.log('AraiToggle', index, idString, titleNew);

    }); // forEach

} // ToggleContent


// ToggleContent.init(); 

ToggleContent.init = function () {
    console.log('INIT ToggleContent.js')
    return new ToggleContent();
}

