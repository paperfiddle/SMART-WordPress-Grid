/*
* @file menuButton.js
*
* Adapted from:
* https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html
*
* Licence:
* https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
*
*/


// 
// https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/js/MenubarItemLinks.js
// 

var menuBar_itemLinks = function (domNode, menuObj) {

  this.menu = menuObj;
  this.domNode = domNode;
  this.popupMenu = false;

  this.hasFocus = false;
  this.hasHover = false;

  this.isMenubarItem = true;

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

menuBar_itemLinks.prototype.init = function () {
  this.domNode.tabIndex = -1;

  this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
  this.domNode.addEventListener('focus', this.handleFocus.bind(this));
  this.domNode.addEventListener('blur', this.handleBlur.bind(this));
  this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
  this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));

  // Initialize pop up menus

  var nextElement = this.domNode.nextElementSibling;

  if (nextElement && nextElement.tagName === 'UL') {
    this.popupMenu = new menuBar_popup_menuLinks(nextElement, this);
    this.popupMenu.init();
  }

};

menuBar_itemLinks.prototype.handleKeydown = function (event) {
  var tgt = event.currentTarget,
    char = event.key,
    flag = false,
    clickEvent;

  function isPrintableCharacter (str) {
    return str.length === 1 && str.match(/\S/);
  }

  switch (event.keyCode) {
    case this.keyCode.SPACE:
    case this.keyCode.RETURN:
    case this.keyCode.DOWN:
      if (this.popupMenu) {
        this.popupMenu.open();
        this.popupMenu.setFocusToFirstItem();
        flag = true;
      }
      break;

    case this.keyCode.LEFT:
      this.menu.setFocusToPreviousItem(this);
      flag = true;
      break;

    case this.keyCode.RIGHT:
      this.menu.setFocusToNextItem(this);
      flag = true;
      break;

    case this.keyCode.UP:
      if (this.popupMenu) {
        this.popupMenu.open();
        this.popupMenu.setFocusToLastItem();
        flag = true;
      }
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
      this.popupMenu.close(true);
      break;

    case this.keyCode.ESC:
      this.popupMenu.close(true);
      break;

    default:
      if (isPrintableCharacter(char)) {
        this.menu.setFocusByFirstCharacter(this, char);
        flag = true;
      }
      break;
  }

  if (flag) {
    event.stopPropagation();
    event.preventDefault();
  }
};

menuBar_itemLinks.prototype.setExpanded = function (value) {
  if (value) {
    this.domNode.setAttribute('aria-expanded', 'true');
  }
  else {
    this.domNode.setAttribute('aria-expanded', 'false');
  }
};

menuBar_itemLinks.prototype.handleFocus = function (event) {
  this.menu.hasFocus = true;
};

menuBar_itemLinks.prototype.handleBlur = function (event) {
  this.menu.hasFocus = false;
};

menuBar_itemLinks.prototype.handleMouseover = function (event) {
  this.hasHover = true;
  this.popupMenu.open();
};

menuBar_itemLinks.prototype.handleMouseout = function (event) {
  this.hasHover = false;
  setTimeout(this.popupMenu.close.bind(this.popupMenu, false), 300);
};



// 
// https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/js/MenubarLinks.js
// 

var menuBar = function (domNode) {
  var elementChildren,
    msgPrefix = 'menuBar constructor argument menubarNode ';

  // Check whether menubarNode is a DOM element
  if (!domNode instanceof Element) {
    throw new TypeError(msgPrefix + 'is not a DOM Element.');
  }

  // Check whether menubarNode has descendant elements
  if (domNode.childElementCount === 0) {
    throw new Error(msgPrefix + 'has no element children.');
  }

  // Check whether menubarNode has A elements
  e = domNode.firstElementChild;
  while (e) {
    var menubarItem = e.firstElementChild;
    if (e && menubarItem && menubarItem.tagName !== 'A') {
      throw new Error(msgPrefix + 'has child elements are not A elements.');
    }
    e = e.nextElementSibling;
  }

  this.isMenubar = true;

  this.domNode = domNode;

  this.menubarItems = []; // See menuBar init method
  this.firstChars = []; // See menuBar init method

  this.firstItem = null; // See menuBar init method
  this.lastItem = null; // See menuBar init method

  this.hasFocus = false; // See menuBar_itemLinks handleFocus, handleBlur
  this.hasHover = false; // See menuBar handleMouseover, handleMouseout
};

/*
*   @method menuBar.prototype.init
*
*   @desc
*       Adds ARIA role to the menubar node
*       Traverse menubar children for A elements to configure each A element as a ARIA menuitem
*       and populate menuitems array. Initialize firstItem and lastItem properties.
*/
menuBar.prototype.init = function () {
  var menubarItem, childElement, menuElement, textContent, numItems;


  // Traverse the element children of menubarNode: configure each with
  // menuitem role behavior and store reference in menuitems array.
  elem = this.domNode.firstElementChild;

  while (elem) {
    var menuElement = elem.firstElementChild;

    if (elem && menuElement && menuElement.tagName === 'A') {
      menubarItem = new menuBar_itemLinks(menuElement, this);
      menubarItem.init();
      this.menubarItems.push(menubarItem);
      textContent = menuElement.textContent.trim();
      this.firstChars.push(textContent.substring(0, 1).toLowerCase());
    }

    elem = elem.nextElementSibling;
  }

  // Use populated menuitems array to initialize firstItem and lastItem.
  numItems = this.menubarItems.length;
  if (numItems > 0) {
    this.firstItem = this.menubarItems[0];
    this.lastItem = this.menubarItems[numItems - 1];
  }
  this.firstItem.domNode.tabIndex = 0;
};

/* FOCUS MANAGEMENT METHODS */

menuBar.prototype.setFocusToItem = function (newItem) {

  var flag = false;

  for (var i = 0; i < this.menubarItems.length; i++) {
    var mbi = this.menubarItems[i];

    if (mbi.domNode.tabIndex == 0) {
      flag = mbi.domNode.getAttribute('aria-expanded') === 'true';
    }

    mbi.domNode.tabIndex = -1;
    if (mbi.popupMenu) {
      mbi.popupMenu.close();
    }
  }

  newItem.domNode.focus();
  newItem.domNode.tabIndex = 0;

  if (flag && newItem.popupMenu) {
    newItem.popupMenu.open();
  }
};

menuBar.prototype.setFocusToFirstItem = function (flag) {
  this.setFocusToItem(this.firstItem);
};

menuBar.prototype.setFocusToLastItem = function (flag) {
  this.setFocusToItem(this.lastItem);
};

menuBar.prototype.setFocusToPreviousItem = function (currentItem) {
  var index;

  if (currentItem === this.firstItem) {
    newItem = this.lastItem;
  }
  else {
    index = this.menubarItems.indexOf(currentItem);
    newItem = this.menubarItems[index - 1];
  }

  this.setFocusToItem(newItem);

};

menuBar.prototype.setFocusToNextItem = function (currentItem) {
  var index;

  if (currentItem === this.lastItem) {
    newItem = this.firstItem;
  }
  else {
    index = this.menubarItems.indexOf(currentItem);
    newItem = this.menubarItems[index + 1];
  }

  this.setFocusToItem(newItem);

};

menuBar.prototype.setFocusByFirstCharacter = function (currentItem, char) {
  var start, index, char = char.toLowerCase();
  var flag = currentItem.domNode.getAttribute('aria-expanded') === 'true';

  // Get start index for search based on position of currentItem
  start = this.menubarItems.indexOf(currentItem) + 1;
  if (start === this.menubarItems.length) {
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
    this.setFocusToItem(this.menubarItems[index]);
  }
};

menuBar.prototype.getIndexFirstChars = function (startIndex, char) {
  for (var i = startIndex; i < this.firstChars.length; i++) {
    if (char === this.firstChars[i]) {
      return i;
    }
  }
  return -1;
};



// 
// https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/js/PopupMenuItemLinks.js
// 

var menuBar_popup_itemLinks = function (domNode, menuObj) {

  if (typeof popupObj !== 'object') {
    popupObj = false;
  }

  this.domNode = domNode;
  this.menu = menuObj;
  this.popupMenu = false;
  this.isMenubarItem = false;

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

menuBar_popup_itemLinks.prototype.init = function () {
  this.domNode.tabIndex = -1;

  this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
  this.domNode.addEventListener('click', this.handleClick.bind(this));
  this.domNode.addEventListener('focus', this.handleFocus.bind(this));
  this.domNode.addEventListener('blur', this.handleBlur.bind(this));
  this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
  this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));

  // Initialize flyout menu

  var nextElement = this.domNode.nextElementSibling;

  if (nextElement && nextElement.tagName === 'UL') {
    this.popupMenu = new menuBar_popup_menuLinks(nextElement, this);
    this.popupMenu.init();
  }

};

menuBar_popup_itemLinks.prototype.isExpanded = function () {
  return this.domNode.getAttribute('aria-expanded') === 'true';
};

/* EVENT HANDLERS */

menuBar_popup_itemLinks.prototype.handleKeydown = function (event) {
  var tgt = event.currentTarget,
    char = event.key,
    flag = false,
    clickEvent;

  function isPrintableCharacter(str) {
    return str.length === 1 && str.match(/\S/);
  }

  switch (event.keyCode) {
    case this.keyCode.SPACE:
    case this.keyCode.RETURN:
      if (this.popupMenu) {
        this.popupMenu.open();
        this.popupMenu.setFocusToFirstItem();
      }
      else {

        // Create simulated mouse event to mimic the behavior of ATs
        // and let the event handler handleClick do the housekeeping.
        try {
          clickEvent = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
          });
        }
        catch (err) {
          if (document.createEvent) {
            // DOM Level 3 for IE 9+
            clickEvent = document.createEvent('MouseEvents');
            clickEvent.initEvent('click', true, true);
          }
        }
        tgt.dispatchEvent(clickEvent);
      }

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

    case this.keyCode.LEFT:
      this.menu.setFocusToController('previous', true);
      this.menu.close(true);
      flag = true;
      break;

    case this.keyCode.RIGHT:
      if (this.popupMenu) {
        this.popupMenu.open();
        this.popupMenu.setFocusToFirstItem();
      }
      else {
        this.menu.setFocusToController('next', true);
        this.menu.close(true);
      }
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

    case this.keyCode.ESC:
      this.menu.setFocusToController();
      this.menu.close(true);
      flag = true;
      break;

    case this.keyCode.TAB:
      this.menu.setFocusToController();
      break;

    default:
      if (isPrintableCharacter(char)) {
        this.menu.setFocusByFirstCharacter(this, char);
        flag = true;
      }
      break;
  }

  if (flag) {
    event.stopPropagation();
    event.preventDefault();
  }
};

menuBar_popup_itemLinks.prototype.setExpanded = function (value) {
  if (value) {
    this.domNode.setAttribute('aria-expanded', 'true');
  }
  else {
    this.domNode.setAttribute('aria-expanded', 'false');
  }
};

menuBar_popup_itemLinks.prototype.handleClick = function (event) {
  this.menu.setFocusToController();
  this.menu.close(true);
};

menuBar_popup_itemLinks.prototype.handleFocus = function (event) {
  this.menu.hasFocus = true;
};

menuBar_popup_itemLinks.prototype.handleBlur = function (event) {
  this.menu.hasFocus = false;
  setTimeout(this.menu.close.bind(this.menu, false), 300);
};

menuBar_popup_itemLinks.prototype.handleMouseover = function (event) {
  this.menu.hasHover = true;
  this.menu.open();
  if (this.popupMenu) {
    this.popupMenu.hasHover = true;
    this.popupMenu.open();
  }
};

menuBar_popup_itemLinks.prototype.handleMouseout = function (event) {
  if (this.popupMenu) {
    this.popupMenu.hasHover = false;
    this.popupMenu.close(true);
  }

  this.menu.hasHover = false;
  setTimeout(this.menu.close.bind(this.menu, false), 300);
};



// 
// https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/js/PopupMenuLinks.js
// 


var menuBar_popup_menuLinks = function (domNode, controllerObj) {
  var elementChildren,
    msgPrefix = 'menuBar_popup_menuLinks constructor argument domNode ';

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
    if (menuitem && menuitem === 'A') {
      throw new Error(msgPrefix + 'has descendant elements that are not A elements.');
    }
    childElement = childElement.nextElementSibling;
  }

  this.isMenubar = false;

  this.domNode = domNode;
  this.controller = controllerObj;

  this.menuitems = []; // See menuBar_popup_menuLinks init method
  this.firstChars = []; // See menuBar_popup_menuLinks init method

  this.firstItem = null; // See menuBar_popup_menuLinks init method
  this.lastItem = null; // See menuBar_popup_menuLinks init method

  this.hasFocus = false; // See menuBar_popup_itemLinks handleFocus, handleBlur
  this.hasHover = false; // See menuBar_popup_menuLinks handleMouseover, handleMouseout
};

/*
*   @method menuBar_popup_menuLinks.prototype.init
*
*   @desc
*       Add domNode event listeners for mouseover and mouseout. Traverse
*       domNode children to configure each menuitem and populate menuitems
*       array. Initialize firstItem and lastItem properties.
*/
menuBar_popup_menuLinks.prototype.init = function () {
  var childElement, menuElement, menuItem, textContent, numItems, label;

  // Configure the domNode itself

  this.domNode.addEventListener('mouseover', this.handleMouseover.bind(this));
  this.domNode.addEventListener('mouseout', this.handleMouseout.bind(this));

  // Traverse the element children of domNode: configure each with
  // menuitem role behavior and store reference in menuitems array.
  childElement = this.domNode.firstElementChild;

  while (childElement) {
    menuElement = childElement.firstElementChild;

    if (menuElement && menuElement.tagName === 'A') {
      menuItem = new menuBar_popup_itemLinks(menuElement, this);
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

menuBar_popup_menuLinks.prototype.handleMouseover = function (event) {
  this.hasHover = true;
};

menuBar_popup_menuLinks.prototype.handleMouseout = function (event) {
  this.hasHover = false;
  setTimeout(this.close.bind(this, false), 1);
};

/* FOCUS MANAGEMENT METHODS */

menuBar_popup_menuLinks.prototype.setFocusToController = function (command, flag) {

  if (typeof command !== 'string') {
    command = '';
  }

  function setFocusToMenubarItem(controller, close) {
    while (controller) {
      if (controller.isMenubarItem) {
        controller.domNode.focus();
        return controller;
      }
      else {
        if (close) {
          controller.menu.close(true);
        }
        controller.hasFocus = false;
      }
      controller = controller.menu.controller;
    }
    return false;
  }

  if (command === '') {
    if (this.controller && this.controller.domNode) {
      this.controller.domNode.focus();
    }
    return;
  }

  if (!this.controller.isMenubarItem) {
    this.controller.domNode.focus();
    this.close();

    if (command === 'next') {
      var menubarItem = setFocusToMenubarItem(this.controller, false);
      if (menubarItem) {
        menubarItem.menu.setFocusToNextItem(menubarItem, flag);
      }
    }
  }
  else {
    if (command === 'previous') {
      this.controller.menu.setFocusToPreviousItem(this.controller, flag);
    }
    else if (command === 'next') {
      this.controller.menu.setFocusToNextItem(this.controller, flag);
    }
  }

};

menuBar_popup_menuLinks.prototype.setFocusToFirstItem = function () {
  this.firstItem.domNode.focus();
};

menuBar_popup_menuLinks.prototype.setFocusToLastItem = function () {
  this.lastItem.domNode.focus();
};

menuBar_popup_menuLinks.prototype.setFocusToPreviousItem = function (currentItem) {
  var index;

  if (currentItem === this.firstItem) {
    this.lastItem.domNode.focus();
  }
  else {
    index = this.menuitems.indexOf(currentItem);
    this.menuitems[index - 1].domNode.focus();
  }
};

menuBar_popup_menuLinks.prototype.setFocusToNextItem = function (currentItem) {
  var index;

  if (currentItem === this.lastItem) {
    this.firstItem.domNode.focus();
  }
  else {
    index = this.menuitems.indexOf(currentItem);
    this.menuitems[index + 1].domNode.focus();
  }
};

menuBar_popup_menuLinks.prototype.setFocusByFirstCharacter = function (currentItem, char) {
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

menuBar_popup_menuLinks.prototype.getIndexFirstChars = function (startIndex, char) {
  for (var i = startIndex; i < this.firstChars.length; i++) {
    if (char === this.firstChars[i]) {
      return i;
    }
  }
  return -1;
};

/* MENU DISPLAY METHODS */

menuBar_popup_menuLinks.prototype.open = function () {
  // Get position and bounding rectangle of controller object's DOM node
  var rect = this.controller.domNode.getBoundingClientRect();

  // Set CSS properties
  if (!this.controller.isMenubarItem) {
    this.domNode.parentNode.style.position = 'relative';
    this.domNode.style.display = 'block';
    this.domNode.style.position = 'absolute';
    this.domNode.style.left = rect.width + 'px';
    this.domNode.style.zIndex = 100;
  }
  else {
    this.domNode.style.display = 'block';
    this.domNode.style.position = 'absolute';
    this.domNode.style.top = (rect.height - 1) + 'px';
    this.domNode.style.zIndex = 100;
  }

  this.controller.setExpanded(true);

};

menuBar_popup_menuLinks.prototype.close = function (force) {

  var controllerHasHover = this.controller.hasHover;

  var hasFocus = this.hasFocus;

  for (var i = 0; i < this.menuitems.length; i++) {
    var mi = this.menuitems[i];
    if (mi.popupMenu) {
      hasFocus = hasFocus | mi.popupMenu.hasFocus;
    }
  }

  if (!this.controller.isMenubarItem) {
    controllerHasHover = false;
  }

  if (force || (!hasFocus && !this.hasHover && !controllerHasHover)) {
    this.domNode.style.display = 'none';
    this.domNode.style.zIndex = 0;
    this.controller.setExpanded(false);
  }
};

