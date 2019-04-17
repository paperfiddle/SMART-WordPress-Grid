/*!
 * Flickity full cell height hack
 * 
 * @this /vendors/flickity.fullheight.js
 * @css /sass/components/_flickity.styles.scss
 * @source https://codepen.io/desandro/pen/ZXEGVq?editors=1010
 *
 */


Flickity.prototype._createResizeClass = function () {
    this.element.classList.add('flickity-resize');
};

Flickity.createMethods.push('_createResizeClass');

var resize = Flickity.prototype.resize;
Flickity.prototype.resize = function () {
    this.element.classList.remove('flickity-resize');
    resize.call(this);
    this.element.classList.add('flickity-resize');
};    
    
