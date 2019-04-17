# AriaModal

Accessible modals wirtten in vanilla Javascript. 

* `AriaModalPrep.js` - Simplifies HTML by adding IDs, roles, aria-attributes, a default close button, and other things.
* `AriaModal.js` - A modified version of [WAI-ARIA Modal Dialog](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html). Constructs, opens, and closes dialogs. Uses `setTimeout` to allow time for CSS animations. 
* `AriaUtils.js` - A helper file that handles focus for many of the WIA-ARIA examples.
* `AriaModal.scss` - The required CSS + examples. 
* `animate.scss` - A selection of transitons from [Animate.css](https://github.com/daneden/animate.css).

## Focus Management

Focus management is what makes a modal "accessible". The main idea is to help people using keyboard navigation and screenreaders navigate into, within, and back out of a modal in a predictable and reasonable way. 

A generic flow looks like: 

* Activate an opener element (link or button). 
* On open, set focus to the first natively focusable element in the modal.
* On tab, keep navigation within the modal until it's closed.
* On keydown, allow any focusable elements to function as they normally would (ie links).
* On escape, close modal. 
* On close, return focus to the opening element. 

For all of these, you need Javascript. And the WAI-ARIA example I adapted was the only one I could find that deals with these particular challenges: 

* Keep focus inside modals where there are media players - `iframe`, `video`, and `audio` are super tricky and I just couldn't work it out on my own. 
* Set "first focused element" case-by-case -  This gets a lot of discussion and is what's most often adjusted.
* Return focus to something other than the opener element - important if you're stacking open modals.  


## Simplified HTML

Modals use a set of easy-to-remember `data-modal` attributes plus `AriaModalPrep.js` to simplify markup. 

Everything about a given modal is contained in a wrapper and exists in its proper semantic location - and not outside the site's main `div`. 

The core structure looks like this - note that only the outter `div` requires an `id`: 

    <div id="demo-1" data-modal-component>
        <button data-modal-open>Open</button>
        <div data-modal-overlay>
            <div data-modal>
            </div>
        </div> 
    </div>

In addition, there must be an element with the `[data-modal-label]` attribute - This can be placed on any element within the `[data-modal-component]`. 

And a separate element with the `[data-modal-description]` attribute - To avoid conflicts, do not set this on any element that already has one of the other `[data-modal]` attributes.

## Default Focus

Each `[data-modal-component]` has one and only one opener. This can be a link or button element. The open element is identified with `[data-modal-open]`. 

A modal's open function define's its first and return focus elements. This function is auto-created by `AriaModalPrep.js`. 

The markup + JS above also adds a default close (x) button as the modal's first child. 

On open, focus moves to the default close button because it's the first natively focusable element in the markup. 

On close, focus returns to the open link or button.  

IF YOU WANT THE DEFAULT FOCUS BEHAVIORS, you only need to add `[data-modal-open]` to the open element - `AriaModalPrep.js` will set ids and add the `onclick` function. 

FYI it looks like this:

    <button onclick="openDialog('demo-1-modal', this)">
        Open Modal
    </button>


## Open Modal - Focus First

Alternatively, you can set the open function manually - `ArialPrep.js` won't override it.

One reason to do this is to set the first focused element to something other than the default close button. For example, a subscribe email input. 

For this, you must manually add an `id` to the element you want to focus. If the element isn't natively focusable - like a heading - then add `tabindex="0"` and `focusable="true"` to the tag. 

Next you'll need to add the `onclick` function to the `[data-modal-open]` element and pass in the focus element's `id` as the third parameter. 

    <button onclick="openModal('demo-1-modal', this, 'subscribe-email')">
        Open Modal
    </button>

The first parameter is REQUIRED and is the modal `id`. `AriaModalPrep.js` creates this id for you. It's the component id appended with `-modal` - so `demo-1-modal` in this example. 

The second parameter is REQUIRED and is the element to focus when modal is closed - `this` returns focus to the open element, which is most common. The WAI-ARIA example shows alternative useage for stacked modals. 

The third parameter is OPTIONAL and the one we need to chage. It's the element `id` to focus when modal is first opened. 

## Return Focus

As mentioned abouve, the `onclick` function's second parameter is the return focus element. 

When a modal is closed, focus returns to the `[data-modal-open]` element by default.  

To return focus to a different element,  maually create the element with an `id` and pass it as the function's section parameter. 

    <button onclick="openModal('demo-1-modal', 'return-id')">
        Open Modal
    </button>

## Close Modal

`AriaModalPrep.js` adds a default close (X) button. Additional close elements can be manually added. 

    <button onclick="closeModal(this)">Close</button>

    <a href="#" onclick="closeModal(this)">Close</a>

## CSS Animation

`AriaModal.js` uses `setTimeout` to allow time for CSS animations to happen. Transitons are from [Animate.css](https://github.com/daneden/animate.css).

Note that with these CSS transitions, the element being animated cannot have other transforms. For example, you cannot use `postion: absolute` plus `transform: translate(-50%, -50%);` for centering the modal.

Alternatively, you can replace CSS with Javascript animations by adding them to the `aria.Modal` and the `aria.Modal.prototype.close` functions.