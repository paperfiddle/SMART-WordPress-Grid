/*! 
 * Vanilla Aria Modals Prep
 * Simplifies modal markup by adding 
 * missing attributes and a default close button.
 *
 * @this /js/AriaModal.js
 * @requires /js/AriaUtils.js
 * @requires /js/AriaModal.js
 * @css /sass/components/_AriaModal.scss
 * 
 */

(function () {

    // Get all wrappers
    let components = Array.from(
        document.querySelectorAll('[data-modal-component]')
    );

    // Check wrappers for required and recomended stuff
    components.forEach(function (component, index) {

        if (!component.id) {
            console.error(index, '[data-modal-component] requires an id', component);        
        } else if (!component.querySelector('[data-modal-overlay]')) {
            console.error(index, 'Modal requires div with the [data-modal-overlay] attribute. This div should wrap the [data-modal] div.', component);
        } else if (!component.querySelector('[data-modal')) {  
            console.error(index, 'Modal requires div with the [data-modal] attribute. This div should be nested in the [data-modal-overlay] div.', component);
        } else {
            return new AriaModalPrep(component, index);
        }

    }); // forEach

    // Prep stuff
    function AriaModalPrep(component, index) {

        // The modal parts
        let modal = component.querySelector('[data-modal]');


        let modalOpen = component.querySelector('[data-modal-open]');
        let modalLabel = component.querySelector('[data-modal-label]'); 
        let modalDescription = component.querySelector('[data-modal-description]');
        let modalOverlay = component.querySelector('[data-modal-overlay]'); 
        let xButton = document.createElement('button');

        // Set some stuff
        modal.id = component.id + '-modal';
        modalOverlay.id = component.id + '-overlay';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');

        if (modalLabel) {
            modal.setAttribute('aria-label', modalLabel.textContent); 
            if (modalOpen) {
                modalOpen.setAttribute('title', modalLabel.textContent);
                modalOpen.setAttribute('aria-label', modalLabel.textContent + ' - Open modal');
            }
        } else {
            modal.setAttribute('aria-label', 'Active modal');  
            if (modalOpen) {
                modalOpen.setAttribute('title', 'Open modal');
                modalOpen.setAttribute('aria-label', 'Open modal');                
            }  
            console.warn(index, 'Modal recommends a [data-modal-label] attribute be added to any element in [data-modal-component]. It is used to set titles and aria attributes. It espcially helps people who use keyboard navigation or screen readers.', component);
        };

        if (modalDescription) {
            modalDescription.id = component.id + '-description'; 
            modal.setAttribute('aria-describedby', modalDescription.id);
        } else {
            console.warn(index, 'Modal recommends an element with the [data-modal-descritpion] attribute be added to [data-modal-component]. This should be an element with no other [data-modal] attributes applied. It helps people who use keyboard navigation or screen readers.', component);            
        };

        if (modalOpen) {
            modalOpen.id = component.id + '-open'; 
            if ( !modalOpen.hasAttribute('onclick') ) {
                modalOpen.setAttribute('onclick', 'openModal("' + modal.id + '", this)'); 
            };  
        } else {
            console.warn(index, 'Modal has no button or link with the [data-modal-open] attribute. This is okay if the modal is being triggerd some other way - like on load.', component);
        } ;

        // The default close (X) button             
        let xIcon = '<span data-modal-x-wrap><svg aria-hidden="true" data-modal-x-icon focusable="false"  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg></span>';
            
        // Close button attributes
        xButton.setAttribute('onclick', 'closeModal(this)');                
        xButton.setAttribute('data-modal-xButton', '');
        xButton.setAttribute('aria-label', 'Close modal');
        xButton.setAttribute('title', 'Close modal');
        xButton.innerHTML = xIcon; 

        // Append default close button
        modal.insertBefore(xButton, modal.firstChild); 

        console.log('AriaModal', index, component);

    } // AriaModalPrep  

}());

