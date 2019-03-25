/*! Van11y ARIA Modal 
 * An accessible modal written in vanilla JS
 *
 * @this /js/modal.js
 * @CSS /sass/components.scss
 * 
 * @optional /vendors/velocity.js 
 * If not using, search this file for OPTIONAL to remove. 
 * 
 */ 

class AriaModal {

    constructor(modal) {

        // The modal itself
        this.modal = modal
        this.modalInner = modal.querySelector('[data-modal-inner]');
        this.title = modal.querySelector('[data-modal-title');
        this.description = modal.querySelector('[data-modal-description]');
        
        // The site header's CSS 'position' property.
        // Assumes site header is first header on page. 
        this.siteHeader = null;
        
        // The site's primary div to block focus and clicks on while modal is open
        this.siteWrap = document.querySelector('[data-modal-prevent-focus]');

        // The overlay appended when modal is open
        this.modalOverlay = document.createElement('div');

        // All page elements that, when clicked, open a given modal
        this.openers = Array.from(
            document.querySelectorAll('[data-modal-opener="' + modal.id + '"]')
        ); 

        // The element that was clicked to open this modal  
        this.returnOpener = null;     

        // Setup
        this.initModal();
        this.initOpeners();
        this.initClosers();

    } // constructor


    //
    // Init - Modal, Openers, Closers
    //

    // Modal 
    initModal() {

        // Modal - set initial attributes
        this.modal.setAttribute('role', 'dialog');
        this.modal.setAttribute('aria-hidden', 'true'); 
        
        // Modal title - set missing 'id' for 'aria-labelby'
        if ( this.title ) {
            if (typeof this.title.id == 'undefined' || this.title.id == null || this.title.id == '') {
                this.title.id = this.modal.id + '-title';
                this.modal.setAttribute('aria-labelledby', this.title.id);     
            }
        } else {
            console.log('MODAL', this.modal.id, 'does not have an element with [data-modal-title]. This is REQUIRED and used to set [aria-labelby]. It helps people using keyboard navigation and screen readers.')
        }

        // Modal description - set missing 'id' for 'aria-describeby'
        if (this.description) {
            if (typeof this.description.id == 'undefined' || this.description.id == null || this.description.id == '') {
                this.description.id = this.modal.id + '-description';
                this.modal.setAttribute('aria-describedby', this.description.id);
            }
        } else {
            console.log('MODAL', this.modal.id, 'does not have an element with [data-modal-description]. This is optional and used to set [aria-describeby]. It helps people using keyboard navigation and screen readers.')
        }  

        // Modal default close button - make
        const closeButton = document.createElement('button');
        closeButton.setAttribute('aria-label', 'Close dialog');
        closeButton.setAttribute('data-modal-closer', '');
        closeButton.setAttribute('data-modal-x', '');
        closeButton.setAttribute('type', 'button');
        closeButton.innerHTML = '<span class="icon"><svg aria-hidden="true" focusable="false" class="icon__svg" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg></span>';
  
        // Modal default close button - append to modal
        this.title.parentNode.insertBefore(closeButton, this.title.nextSibling); 
    
        // Add Trap Focus event listenter
        this.modal.addEventListener(
            'keydown',
            event => this.modalTrapFocusHandler(event)
        )  

    }; // 


    // Openers 
    initOpeners() {

        // Add event listeners + handlers
        this.openers.forEach(
            opener => {
                opener.addEventListener(
                    'click',
                    event => this.openerClickHandler(event)
                )  
                // console.log(this.modal.id, 'Opener', opener);
            } // opener
        ) // forEach

    }; //   


    // Closers
    initClosers() {

        //  Get closers - Must happen after default close button is added via 'initModal'
        const closers = Array.from(
            this.modal.querySelectorAll('[data-modal-closer]')
        );

        // Set missing attributes
        closers.forEach(
            closer => {
                if (closer.getAttribute('aria-label') == 'undefined' || closer.getAttribute('aria-label') == null || closer.getAttribute('aria-label') == '') {
                    closer.setAttribute('aria-label', 'Close dialog')
                }
                // Log each closer
                // console.log(this.modal.id, 'Closer', closer);
            } // closer
        ); // forEach

        // Add event listeners / handlers
        closers.forEach(
            closer => {
                closer.addEventListener(
                    'click',
                    event => this.closerClickHandler(event)
                )
            } // closer
        ); // forEach

    }; // 


    // 
    // Click Handlers
    //

    // Openers
    openerClickHandler(event) {

        // Don't follow the fallback link
        event.stopPropagation();
        event.preventDefault();   

        // Opener - Remember which opener was clicked
        // before moving focus to the modal.     
        this.returnOpener = event.target;

        // Scroll - To properly scroll longer divs, 
        // we need some CSS and JS on <body> and on
        // any 'fixed' element. Ususally this is the site header.

        // Scroll - Are there any headers? 
        var getHeaders = Array.from(
            document.getElementsByTagName('header')
        );

        // Scroll - If there are, assume the first is the site header
        // and is the one that might be 'fixed'
        if (getHeaders.length >= 1) {
            var firstHeader = getHeaders[0];
            var firstHeaderPostion = getComputedStyle(firstHeader).position;
            // console.log('ONE or more headers. First is:', firstHeaderPostion, getHeaders[0]);

            // If the first header is fixed, then update property
            if (firstHeaderPostion = 'fixed') {
                this.siteHeader = firstHeader;
                // console.log('UPDATED siteHeader', this.siteHeader);
            } // Implied else is property remains 'null'  
        } // Implied else is there are no headers and property reamins 'null'

        // Scroll - Adjust <body> and <header>
        var scrollBarWidth = window.innerWidth - document.body.offsetWidth;
        document.body.style.margin = '0px ' + scrollBarWidth + 'px 0px 0px';
        document.body.style.overflow = 'hidden';
        if (this.siteHeader != null) {
            this.siteHeader.style.margin = '0px ' + scrollBarWidth + 'px 0px 0px';
        }

        // Site - make underneath content inaccessible
        // This relies on the modal's HTML residing outside
        // the site's primary content div.
        this.siteWrap.setAttribute('aria-hidden', 'true');
        this.siteWrap.setAttribute('tabindex', '-1');  
        this.siteWrap.style.zIndex = '-10';

        // Overlay - create + append       
        this.modalOverlay.setAttribute('aria-hidden', 'true');
        this.modalOverlay.setAttribute('tabindex', '0');
        this.modalOverlay.setAttribute('data-modal-overlay', '');
        document.body.appendChild(this.modalOverlay);

        // Modal - change attributes            
        this.modal.setAttribute('aria-hidden', 'false');
        this.modal.setAttribute('tabindex', '1');

        // OPTIONAL Animate Overlay
        this.modalOverlay.velocity({
            opacity: [1, 0],
        }, {
                duration: 300,
                easing: "linear",
            }) // 

        // OPTIONAL Animate outter modal
        this.modal.velocity({
            opacity: [1, 0],
        }, {
                duration: 300,
                easing: "linear",
            }) //     

        // OPTIONAL Animate inner modal
        this.modalInner.velocity({
            transform: ["scale(1)", "scale(0)"],
            opacity: [1, 0],
        }, {
                duration: 200,
                easing: "linear",
            }) // 

        // Modal - Set focus
        this.modal.focus();
        
        // Log clicked opener
        // console.log('MODAL Opener clicked:', event.target, 'Opened:', this.modal);

    }; //


    // Closers
    closerClickHandler(event) { 

        // Don't do default action of close buttons / links
        event.stopPropagation();
        event.preventDefault();   

        // OPTIONAL Animate Overlay
        this.modalOverlay.velocity({
            opacity: [0, 1],
        }, {
                duration: 500,
                easing: "linear",
            }) // 

        // OPTIONAL Animate outter modal
        this.modal.velocity({
            opacity: [0, 1],
        }, {
                duration: 300,
                easing: "linear",
            }) //       

        // OPTIONAL Animate Modal Inner
        this.modalInner.velocity({
            transform: ["scale(0)", "scale(1)"],
            opacity: [0, 1],
        }, {
                duration: 300,
                easing: "linear",
            }) // 

        // Body - make accessible again
        this.siteWrap.removeAttribute('aria-hidden');
        this.siteWrap.removeAttribute('tabindex');
        this.siteWrap.style.zIndex = '';

        // Scroll - clear styles and properties
        document.body.style.margin = '';
        document.body.style.overflow = '';
        if (this.siteHeader != null) {
            this.siteHeader = null;
        }

        // Overlay - Remove
        document.body.removeChild(this.modalOverlay);  

        // Modal - Wait for animation then change attributes    
        setTimeout(() => {
            this.modal.setAttribute('aria-hidden', 'true');
            this.modal.removeAttribute('tabindex');  
        }, 320); 

        // Opener - Return focus and clear
        this.returnOpener.focus();
        this.returnOpener = null;

        // Log click
        // console.log('MODAL Closer clicked:', event.target, 'Closed:', this.modal);

    }; // 


    // 
    // Modal - Trap Focus
    //     

    modalTrapFocusHandler(event) {

        var currentModal = this.modal       
        var canFocus = this.modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        var canFocusFirst = canFocus[0];
        var canFocusLast = canFocus[canFocus.length - 1];

        // Keys to listen to
        var KEY_TAB = 9;
        var KEY_ESC = 27;

        // If focus is on modal or modal's first focusable element
        // and user tabs backwards, then move to the last focusable element
        function handleBackwardTab() {
            if (document.activeElement === currentModal || document.activeElement === canFocusFirst) { 
                event.preventDefault();
                canFocusLast.focus();
            }
        }

        // If focus is on modal or modal's last focusable element
        // and user tabs forward, then move to the first focusable element
        function handleForwardTab() {
            if (document.activeElement === currentModal || document.activeElement === canFocusLast) {
                event.preventDefault();
                canFocusFirst.focus();
            }
        }

        switch (event.keyCode) {
            case KEY_TAB:
                if (canFocus.length === 1) {
                    event.preventDefault();
                    break;
                }
                if (event.shiftKey) {
                    handleBackwardTab();
                } else {
                    handleForwardTab();
                }
                break;
            case KEY_ESC:
                this.closerClickHandler(event);
                break;
            default:
                break;
        } 
     }; // 

}; // class


//
// HTML
// <script>
//      AriaModal new = ('modal-id')
// </script>
// 

AriaModal.init = function(id) {

    // The block to display as a modal
    // The HTML must reside outside the site's main wrapper
    const modal = document.getElementById(id);

    // Pass consts to class
    return new AriaModal(
        modal
    );
  
};
