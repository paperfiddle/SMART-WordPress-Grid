/*!
 * Vanilla Aria Modals
 * 
 * @this /js/AriaModal.js
 * @requires /js/AriaModalPrep.js
 * @requires /js/AriaUtils.js
 * @css /sass/components/_AriaModal.scss
 * 
 * Adapted from:
 * https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html
 * 
 */

var aria = aria || {};
    aria.Utils = aria.Utils || {};

(function () {

    /*
     * When util functions move focus around, set this true so the focus listener
     * can ignore the events.
     */

    aria.Utils.IgnoreUtilFocusChanges = false;

    /**
     * @desc Set focus on descendant nodes until the first focusable element is found.
     * @param element DOM node for which to find the first focusable descendant.
     * @returns true if a focusable element is found and focus is set.
     */

    aria.Utils.focusFirstDescendant = function (element) {
        for (var i = 0; i < element.childNodes.length; i++) {
            var child = element.childNodes[i];
            if (aria.Utils.attemptFocus(child) ||
                aria.Utils.focusFirstDescendant(child)) {
                return true;
            }
        }
        return false;
    }; // end focusFirstDescendant

    /**
     * @desc Find the last descendant node that is focusable.
     * @param element DOM node for which to find the last focusable descendant.
     * @returns true if a focusable element is found and focus is set.
     */

    aria.Utils.focusLastDescendant = function (element) {
        for (var i = element.childNodes.length - 1; i >= 0; i--) {
            var child = element.childNodes[i];
            if (aria.Utils.attemptFocus(child) ||
                aria.Utils.focusLastDescendant(child)) {
                return true;
            }
        }
        return false;
    }; // end focusLastDescendant

    /**
     * @desc Set Attempt to set focus on the current node.
     * @param element The node to attempt to focus on.
     * @returns true if element is focused.
     */

    aria.Utils.attemptFocus = function (element) {
        if (!aria.Utils.isFocusable(element)) {
            return false;
        }

        aria.Utils.IgnoreUtilFocusChanges = true;
        try {
            element.focus();
        }
        catch (e) {
        }
        aria.Utils.IgnoreUtilFocusChanges = false;
        return (document.activeElement === element);
    }; // end attemptFocus

    /* 
     * Modals can open modals. Keep track of them with this array. 
     */

    aria.OpenModalList = aria.OpenModalList || new Array(0);

    /**
     * @returns the last opened modal (the current modal)
     */

    aria.getCurrentModal = function () {
        if (aria.OpenModalList && aria.OpenModalList.length) {
            return aria.OpenModalList[aria.OpenModalList.length - 1];
        }
    };

    aria.closeCurrentModal = function () {

        var currentModal = aria.getCurrentModal();
        if (currentModal) {           
            currentModal.close();
            return true;
        }
        return false;
    };

    aria.handleEscape = function (event) {
        var key = event.which || event.keyCode;
        if (key === aria.KeyCode.ESC && aria.closeCurrentModal()) {
            event.stopPropagation();
        }
    };

    document.addEventListener('keyup', aria.handleEscape);

    /**
     * @constructor
     * @desc Modal object providing modal focus management.
     *
     * Assumptions: The element serving as the modal container is present in the
     * DOM and hidden. The modal container has role='modal'.
     *
     * @param modalId The ID of the element serving as the modal container.
     * @param focusAfterClosed Either the DOM node or the ID of the DOM node 
     *          to focus when the  modal closes.
     * @param focusFirst  Optional parameter containing either the DOM node or the ID 
     *          of the DOM node to focus when the modal opens. If not specified, the
     *          first focusable element in the modal will receive focus.
     */

    aria.Modal = function (modalId, focusAfterClosed, focusFirst) {

        // Modal - <div data-modal>
        this.modalNode = document.getElementById(modalId);

        if (this.modalNode === null) {
            throw new Error('No element found with id="' + modalId + '".');
        }

        // Adjust site header - Theme specific
        // Disables CSS transforms on header because they 
        // conflict with transforms on modals in header. 
        // One time - no need to reset on modal close.
        document.getElementById('site-header').removeAttribute('data-header-sticky');

        // Overlay <div data-modal-overlay>
        this.overlayNode = this.modalNode.parentNode;
        this.overlayNode.style.display = 'block';  

        // Add Scrollbars
        var scrollBarWidth = window.innerWidth - document.body.offsetWidth;    
        document.body.style.margin = '0px ' + scrollBarWidth + 'px 0px 0px';
        document.body.style.overflow = 'hidden';                 

        // // Animate these
        setTimeout(() => {             
            this.overlayNode.setAttribute('data-modal-active', '');
            this.modalNode.setAttribute('data-modal-active', ''); 
            document.body.setAttribute('data-modal-active', ''); 
        }); 

        // Get element to focus after closing
        if (typeof focusAfterClosed === 'string') {
            this.focusAfterClosed = document.getElementById(focusAfterClosed);
        }
        else if (typeof focusAfterClosed === 'object') {
            this.focusAfterClosed = focusAfterClosed;
        }
        else {
            throw new Error(
                'the focusAfterClosed parameter is required for the aria.Modal constructor.');
        }

        // Get the first element to focus
        if (typeof focusFirst === 'string') {
            this.focusFirst = document.getElementById(focusFirst);
        }
        else if (typeof focusFirst === 'object') {
            this.focusFirst = focusFirst;
        }
        else {
            this.focusFirst = null;
        } 

        /*
         * Bracket the modal node with two invisible, focusable nodes.
         * While this modal is open, we use these to make sure that focus never
         * leaves the document even if modalNode is the first or last node.
         */

        var preDiv = document.createElement('div');
        this.preNode = this.overlayNode.insertBefore(preDiv, this.modalNode);
        this.preNode.tabIndex = 0;

        var postDiv = document.createElement('div');
        this.postNode = this.overlayNode.insertBefore(postDiv, this.modalNode.nextSibling);
        this.postNode.tabIndex = 0;

        // If this modal is opening on top of one that is already open,
        // get rid of the document focus listener of the open modal.
        if (aria.OpenModalList.length > 0) {
            aria.getCurrentModal().removeListeners();
        }

        this.addListeners();
        aria.OpenModalList.push(this);
        this.clearModal();

        if (this.focusFirst) {
            this.focusFirst.focus();
        }
        else {
            aria.Utils.focusFirstDescendant(this.modalNode);
        }

        this.lastFocus = document.activeElement;

    }; // end Modal constructor


    aria.Modal.prototype.clearModal = function () {
        Array.prototype.map.call(
            this.modalNode.querySelectorAll('input'),
            function (input) {
                input.value = '';
            }
        );
    };


    /**
     * @desc
     *  Hides the current top modal,
     *  removes listeners of the top modal,
     *  restore listeners of a parent modal if one was open under the one that just closed,
     *  and sets focus on the element specified for focusAfterClosed.
     */

    aria.Modal.prototype.close = function () {
        this.removeListeners();
        aria.Utils.remove(this.preNode);
        aria.Utils.remove(this.postNode);
       
        // Stop <iframe>
        var iframe = this.modalNode.querySelector('iframe');
        if (iframe) {
            var iframeSrc = iframe.src;
            iframe.src = iframeSrc;
        };
        // Stop <video>
        var video = this.modalNode.querySelector('video');
        if (video) {
            video.pause();
        };
        // Stop <audio>
        const audioTracks = Array.from(
            this.modalNode.querySelectorAll('audio')
        );
        audioTracks.forEach(function (track) {
            if (track) {
                track.pause();
            }
        });      

        // Apply CSS animations to these
        this.overlayNode.removeAttribute('data-modal-active');
        this.modalNode.removeAttribute('data-modal-active');   
        document.body.removeAttribute('data-modal-active');  
         
        // Wait for CSS animations before changing these
        setTimeout(() => {
            this.overlayNode.style.display = 'none';
            document.body.style.margin = '';
            document.body.style.overflow = '';
        }, 500);    

        // Return focus 
        this.focusAfterClosed.focus(); 

    }; // end close


    /*
     * Listeners
     *
     */

    aria.Modal.prototype.addListeners = function () {
        document.addEventListener('focus', this.trapFocus, true);
    }; // end addListeners

    aria.Modal.prototype.removeListeners = function () {
        document.removeEventListener('focus', this.trapFocus, true);
    }; // end removeListeners

    aria.Modal.prototype.trapFocus = function (event) {
        if (aria.Utils.IgnoreUtilFocusChanges) {
            return;
        }
        var currentModal = aria.getCurrentModal();
        if (currentModal.modalNode.contains(event.target)) {
            currentModal.lastFocus = event.target;
        }
        else {
            aria.Utils.focusFirstDescendant(currentModal.modalNode);
            if (currentModal.lastFocus == document.activeElement) {
                aria.Utils.focusLastDescendant(currentModal.modalNode);
            }
            currentModal.lastFocus = document.activeElement;
        }
    }; // end trapFocus


    window.openModal = function (modalId, focusAfterClosed, focusFirst) {
        event.stopPropagation();
        event.preventDefault(); 
        var modal = new aria.Modal(modalId, focusAfterClosed, focusFirst);
    };


    window.closeModal = function (closeButton) {
        event.stopPropagation();
        event.preventDefault(); 
        var topModal = aria.getCurrentModal();
        if (topModal.modalNode.contains(closeButton)) {
            topModal.close();
        }
    }; // end closeModal

}());
   
