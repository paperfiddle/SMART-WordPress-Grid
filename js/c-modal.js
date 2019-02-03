function Modal(modalEl, overlayEl) {

	this.modalEl = modalEl;
	this.overlayEl = overlayEl;
	this.focusedElBeforeOpen;

	var focusableEls = this.modalEl.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
	this.focusableEls = Array.prototype.slice.call(focusableEls);

	this.firstFocusableEl = this.focusableEls[0];
	this.lastFocusableEl = this.focusableEls[ this.focusableEls.length - 1 ];

	this.close(); // Reset
};


Modal.prototype.open = function() {

	var Modal = this;

	// Accessibility
	this.modalEl.setAttribute('aria-hidden', false);
	this.overlayEl.setAttribute('aria-hidden', false);

	// Focus
	this.focusedElBeforeOpen = document.activeElement;

	this.modalEl.addEventListener('keydown', function(e) {
		Modal._handleKeyDown(e);
	});

	this.overlayEl.addEventListener('click', function() {
		Modal.close();
	});

	this.firstFocusableEl.focus();
};

Modal.prototype.close = function() {

	this.modalEl.setAttribute('aria-hidden', true);
	this.overlayEl.setAttribute('aria-hidden', true);

	if ( this.focusedElBeforeOpen ) {
		this.focusedElBeforeOpen.focus();
	}
};


Modal.prototype._handleKeyDown = function(e) {

	var Modal = this;
	var KEY_TAB = 9;
	var KEY_ESC = 27;

	function handleBackwardTab() {
		if ( document.activeElement === Modal.firstFocusableEl ) {
			e.preventDefault();
			Modal.lastFocusableEl.focus();
		}
	}

	function handleForwardTab() {
		if ( document.activeElement === Modal.lastFocusableEl ) {
			e.preventDefault();
			Modal.firstFocusableEl.focus();
		}
	}

	switch(e.keyCode) {
		case KEY_TAB:
			if ( Modal.focusableEls.length === 1 ) {
				e.preventDefault();
				break;
			} 
			if ( e.shiftKey ) {
				handleBackwardTab();
			} else {
				handleForwardTab();
			}
			break;
		case KEY_ESC:
			Modal.close();
			break;
			default:
			break;
	} // switch
};


Modal.prototype.addEventListeners = function(openModalSel, closeModalSel) {

	var Modal = this;

	var openModalEls = document.querySelectorAll(openModalSel);
	for ( var i = 0; i < openModalEls.length; i++ ) {
		openModalEls[i].addEventListener('click', function() { 
			Modal.open();
		});
	}

	var closeModalEls = document.querySelectorAll(closeModalSel);
	for ( var i = 0; i < closeModalEls.length; i++ ) {
		closeModalEls[i].addEventListener('click', function() {
			Modal.close();
		});
	}

};



