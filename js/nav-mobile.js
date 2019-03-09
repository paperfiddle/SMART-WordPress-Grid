/*
* @file menuButton.js
*
* Adapted from: 
* https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html
*
* Licence: 
* https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
*
*/

//
// https://www.w3.org/TR/wai-aria-practices/examples/menu-button/js/Menubutton2.js
//

var menuButton = function (domNode) {

  this.domNode   = domNode;
  this.popupMenu = false;

  this.hasFocus = false;
  this.hasHover = false;

  this.keyCode = Object.freeze({
    'TAB': 9,
    'RETURN': 13,
    'ESC': 27,
    'SPACE': 32,
    'PAGEUP': 33,
    'PAGEDOWN': 34,
    'END': 35,
    'HOME': 36,
    'LEFT': 37,
    'UP': 38,
    'RIGHT': 39,
    'DOWN': 40
  });
};

menuButton.prototype.init = function () {

  this.domNode.setAttribute('aria-haspopup', 'true');

  this.domNode.addEventListener('keydown',    this.handleKeydown.bind(this));
  this.domNode.addEventListener('click',      this.handleClick.bind(this));
  this.domNode.addEventListener('focus',      this.handleFocus.bind(this));
  this.domNode.addEventListener('blur',       this.handleBlur.bind(this));
  this.domNode.addEventListener('mouseover',  this.handleMouseover.bind(this));
  this.domNode.addEventListener('mouseout',   this.handleMouseout.bind(this));

  // initialize pop up menus

  var popupMenu = document.getElementById(this.domNode.getAttribute('aria-controls'));

  if (popupMenu) {
    this.popupMenu = new menuButton_popup_menuLinks(popupMenu, this);
    this.popupMenu.init();
  }

};

menuButton.prototype.handleKeydown = function (event) {
  var flag = false;

  switch (event.keyCode) {
    case this.keyCode.SPACE:
    case this.keyCode.RETURN:
    case this.keyCode.DOWN:
      if (this.popupMenu) {
        this.popupMenu.open();
        this.popupMenu.setFocusToFirstItem();
      }
      flag = true;
      break;

    case this.keyCode.UP:
      if (this.popupMenu) {
        this.popupMenu.open();
        this.popupMenu.setFocusToLastItem();
        flag = true;
      }
      break;

    default:
      break;
  }

  if (flag) {
    event.stopPropagation();
    event.preventDefault();
  }
};

menuButton.prototype.handleClick = function (event) {
  if (this.domNode.getAttribute('aria-expanded') == 'true') {
    this.popupMenu.close(true);
  }
  else {
    this.popupMenu.open();
    this.popupMenu.setFocusToFirstItem();
  }
};

menuButton.prototype.handleFocus = function (event) {
  this.popupMenu.hasFocus = true;
};

menuButton.prototype.handleBlur = function (event) {
  this.popupMenu.hasFocus = false;
};

menuButton.prototype.handleMouseover = function (event) {
  this.hasHover = true;
  this.popupMenu.open();
};

menuButton.prototype.handleMouseout = function (event) {
  this.hasHover = false;
  setTimeout(this.popupMenu.close.bind(this.popupMenu, false), 300);
};


 
//
// https://www.w3.org/TR/wai-aria-practices/examples/menu-button/js/MenuItemLinks.js
//

var menuButton_itemLinks = function (domNode, menuObj) {

  this.domNode = domNode;
  this.menu = menuObj;

  this.keyCode = Object.freeze({
    'TAB': 9,
    'RETURN': 13,
    'ESC': 27,
    'SPACE': 32,
    'PAGEUP': 33,
    'PAGEDOWN': 34,
    'END': 35,
    'HOME': 36,
    'LEFT': 37,
    'UP': 38,
    'RIGHT': 39,
    'DOWN': 40
  });
};

menuButton_itemLinks.prototype.init = function () {
  this.domNode.tabIndex = -1;

  if (!this.domNode.getAttribute('role')) {
    this.domNode.setAttribute('role', 'menuitem');
  }

  this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
  this.domNode.addEventListener('click', this.handleClick.bind(this));
  this.domNode.addEventListener('focus', this.handleFocus.bind(this));
  this.domNode.addEventListener('blur', this.handleBlur.bind(this));
  this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
  this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));

};

menuButton_itemLinks.prototype.handleKeydown = function (event) {
  var flag = false,
    char = event.key;

  function isPrintableCharacter(str) {
    return str.length === 1 && str.match(/\S/);
  }

  if (event.ctrlKey || event.altKey || event.metaKey || (event.keyCode === this.keyCode.SPACE) || (event.keyCode === this.keyCode.RETURN)) {
    return;
  }

  if (event.shiftKey) {
    if (isPrintableCharacter(char)) {
      this.menu.setFocusByFirstCharacter(this, char);
      flag = true;
    }

    if (event.keyCode === this.keyCode.TAB) {
      this.menu.setFocusToController();
      this.menu.close(true);
    }
  }
  else {
    switch (event.keyCode) {

      case this.keyCode.ESC:
        this.menu.setFocusToController();
        this.menu.close(true);
        flag = true;
        break;

      case this.keyCode.UP:
        this.menu.setFocusToPreviousItem(this);
        flag = true;
        break;

      case this.keyCode.DOWN:
        this.menu.setFocusToNextItem(this);
        flag = true;
        break;

      case this.keyCode.HOME:
      case this.keyCode.PAGEUP:
        this.menu.setFocusToFirstItem();
        flag = true;
        break;

      case this.keyCode.END:
      case this.keyCode.PAGEDOWN:
        this.menu.setFocusToLastItem();
        flag = true;
        break;

      case this.keyCode.TAB:
        this.menu.setFocusToController();
        this.menu.close(true);
        break;

      default:
        if (isPrintableCharacter(char)) {
          this.menu.setFocusByFirstCharacter(this, char);
        }
        break;
    }
  }

  if (flag) {
    event.stopPropagation();
    event.preventDefault();
  }
};

menuButton_itemLinks.prototype.handleClick = function (event) {
  this.menu.setFocusToController();
  this.menu.close(true);
};

menuButton_itemLinks.prototype.handleFocus = function (event) {
  this.menu.hasFocus = true;
};

menuButton_itemLinks.prototype.handleBlur = function (event) {
  this.menu.hasFocus = false;
  setTimeout(this.menu.close.bind(this.menu, false), 300);
};

menuButton_itemLinks.prototype.handleMouseover = function (event) {
  this.menu.hasHover = true;
  this.menu.open();

};

menuButton_itemLinks.prototype.handleMouseout = function (event) {
  this.menu.hasHover = false;
  setTimeout(this.menu.close.bind(this.menu, false), 300);
};



//
// https://www.w3.org/TR/wai-aria-practices/examples/menu-button/js/PopupMenuLinks.js
//

var menuButton_popup_menuLinks = function (domNode, controllerObj) {
  var elementChildren,
    msgPrefix = 'menuButton_popup_menuLinks constructor argument domNode ';

  // Check whether domNode is a DOM element
  if (!domNode instanceof Element) {
    throw new TypeError(msgPrefix + 'is not a DOM Element.');
  }

  // Check whether domNode has child elements
  if (domNode.childElementCount === 0) {
    throw new Error(msgPrefix + 'has no element children.');
  }

  // Check whether domNode descendant elements have A elements
  var childElement = domNode.firstElementChild;
  while (childElement) {
    var menuitem = childElement.firstElementChild;
    if (menuitem && menuitem.tagName !== 'A') {
      throw new Error(msgPrefix + 'has descendant elements that are not A elements.');
    }
    childElement = childElement.nextElementSibling;
  }

  this.domNode = domNode;
  this.controller = controllerObj;

  this.menuitems = [];      // see menuButton_popup_menuLinks init method
  this.firstChars = [];      // see menuButton_popup_menuLinks init method

  this.firstItem = null;    // see menuButton_popup_menuLinks init method
  this.lastItem = null;    // see menuButton_popup_menuLinks init method

  this.hasFocus = false;   // see menuButton_itemLinks handleFocus, handleBlur
  this.hasHover = false;   // see menuButton_popup_menuLinks handleMouseover, handleMouseout
};


menuButton_popup_menuLinks.prototype.init = function () {
  var childElement, menuElement, menuItem, textContent, numItems, label;

  // Configure the domNode itself
  this.domNode.tabIndex = -1;

  this.domNode.setAttribute('role', 'menu');

  if (!this.domNode.getAttribute('aria-labelledby') && !this.domNode.getAttribute('aria-label') && !this.domNode.getAttribute('title')) {
    label = this.controller.domNode.innerHTML;
    this.domNode.setAttribute('aria-label', label);
  }

  this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
  this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));

  // Traverse the element children of domNode: configure each with
  // menuitem role behavior and store reference in menuitems array.
  childElement = this.domNode.firstElementChild;

  while (childElement) {
    menuElement = childElement.firstElementChild;

    if (menuElement && menuElement.tagName === 'A') {
      menuItem = new menuButton_itemLinks(menuElement, this);
      menuItem.init();
      this.menuitems.push(menuItem);
      textContent = menuElement.textContent.trim();
      this.firstChars.push(textContent.substring(0, 1).toLowerCase());
    }
    childElement = childElement.nextElementSibling;
  }

  // Use populated menuitems array to initialize firstItem and lastItem.
  numItems = this.menuitems.length;
  if (numItems > 0) {
    this.firstItem = this.menuitems[0];
    this.lastItem = this.menuitems[numItems - 1];
  }
};

/* EVENT HANDLERS */

menuButton_popup_menuLinks.prototype.handleMouseover = function (event) {
  this.hasHover = true;
};

menuButton_popup_menuLinks.prototype.handleMouseout = function (event) {
  this.hasHover = false;
  setTimeout(this.close.bind(this, false), 300);
};

/* FOCUS MANAGEMENT METHODS */

menuButton_popup_menuLinks.prototype.setFocusToController = function (command) {
  if (typeof command !== 'string') {
    command = '';
  }

  if (command === 'previous') {
    this.controller.menubar.setFocusToPreviousItem(this.controller);
  }
  else {
    if (command === 'next') {
      this.controller.menubar.setFocusToNextItem(this.controller);
    }
    else {
      this.controller.domNode.focus();
    }
  }
};

menuButton_popup_menuLinks.prototype.setFocusToFirstItem = function () {
  this.firstItem.domNode.focus();
};

menuButton_popup_menuLinks.prototype.setFocusToLastItem = function () {
  this.lastItem.domNode.focus();
};

menuButton_popup_menuLinks.prototype.setFocusToPreviousItem = function (currentItem) {
  var index;

  if (currentItem === this.firstItem) {
    this.lastItem.domNode.focus();
  }
  else {
    index = this.menuitems.indexOf(currentItem);
    this.menuitems[index - 1].domNode.focus();
  }
};

menuButton_popup_menuLinks.prototype.setFocusToNextItem = function (currentItem) {
  var index;

  if (currentItem === this.lastItem) {
    this.firstItem.domNode.focus();
  }
  else {
    index = this.menuitems.indexOf(currentItem);
    this.menuitems[index + 1].domNode.focus();
  }
};

menuButton_popup_menuLinks.prototype.setFocusByFirstCharacter = function (currentItem, char) {
  var start, index, char = char.toLowerCase();

  // Get start index for search based on position of currentItem
  start = this.menuitems.indexOf(currentItem) + 1;
  if (start === this.menuitems.length) {
    start = 0;
  }

  // Check remaining slots in the menu
  index = this.getIndexFirstChars(start, char);

  // If not found in remaining slots, check from beginning
  if (index === -1) {
    index = this.getIndexFirstChars(0, char);
  }

  // If match was found...
  if (index > -1) {
    this.menuitems[index].domNode.focus();
  }
};

menuButton_popup_menuLinks.prototype.getIndexFirstChars = function (startIndex, char) {
  for (var i = startIndex; i < this.firstChars.length; i++) {
    if (char === this.firstChars[i]) {
      return i;
    }
  }
  return -1;
};

/* MENU DISPLAY METHODS */

menuButton_popup_menuLinks.prototype.open = function () {
  // get position and bounding rectangle of controller object's DOM node
  var rect = this.controller.domNode.getBoundingClientRect();

  // set CSS properties
  // this.domNode.style.display = 'block';
  this.domNode.style.display = 'flex';
  this.domNode.style.position = 'absolute';
  // this.domNode.style.top = rect.height + 'px';
  // this.domNode.style.left = '0px';

  // set aria-expanded attribute
  this.controller.domNode.setAttribute('aria-expanded', 'true');
};

menuButton_popup_menuLinks.prototype.close = function (force) {

  if (force || (!this.hasFocus && !this.hasHover && !this.controller.hasHover)) {
    this.domNode.style.display = 'none';
    this.controller.domNode.removeAttribute('aria-expanded');
  }
};
