# Quick-Grab: Boxes

## Global Focus

This theme has a global focus style, but there are times it must be applied manually.

	.element:focus {@include focus;}


## `box-sizing`

Default = `border-box`

	@include box-sizing; 
	@include box-sizing(initial);
	@include box-sizing(inherit);
	@include box-sizing(content-box);


## `border-radius`

Global = `$border-radius`

	@include border-radius;
	@include border-radius($border-radius__button);
	@include border-radius($border-radius__icon);
	@include border-radius($border-radius__input);
	@include border-radius($border-radius__card);
	@include border-radius(20px);
	@include border-radius($tl, $tr, $br, $bl);


## `box-shadow`

Default = 0px, 0px, 0.25rem, 0px, #000, 0.3

	@include box-shadow($h, $v, $b, $s, $hex, $opacity); 


## `drop-shadow`

Use instead of `box-shadow` when you need to wrap around layered or pseudo elements. 

	.element {@include drop-shadow;}


## `transform: rotate`

	@include rotate; 45deg
	@include rotate(90);


## Clearfix

	@include clearfix;

