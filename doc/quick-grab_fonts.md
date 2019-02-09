# Quick Grab: Fonts

* @link https://github.com/paperfiddle/SMART-CSS-System-Font-Stacks


## `font-size`

This theme uses `$font-size` to set a base size. Changing `$font-size` will proportionatly scale all fonts that use this `@mixin`. This `@mixin` provides a `rem` value with `px` fallback. 

	@include font-size(1.125);


## `font-family`, `font-weight`, `font-style`

This theme uses system fonts - as opposed to foundry or webfonts. The families are stored as `$globals`. The following `@mixin`s make it easy to visualize which font varients are available and to use them in your Sass.

	@include sans-300;
	@include sans-300i;
	@include sans-400;
	@include sans-400i;
	@include sans-600;
	@include sans-600i;
	@include sans-700;
	@include sans-700i;
	@include sans-900;
	@include sans-900i;

	@include serif-400;
	@include serif-400i;
	@include serif-700;
	@include serif-700i;

	@include mono-400;
	@include mono-400i;
	@include mono-700;
	@include mono-700i;
