# Quick Grab: Flex

This theme uses `@mixin`s to add vendor prefixes for `display: flex`. Some mixins also help with `display: grid` - but you'll still need auto-prefixer.

* TODO: Add some `flex` examples
* TODO: Figure out what `align-self: auto` does

## Containers

### `display`

	@include display-flex;
	@include display-grid;

### `flex-flow` - Flex

	$direction = row | row-reverse | column | column-reverse
	$wrap = wrap | nowrap | wrap-reverse
	@include flex-flow($direction, $wrap);

	@include flex-flow(row, nowrap); // default
	@include flex-flow(row, wrap);
	@include flex-flow(column, nowrap);
	@include flex-flow(column, wrap);
	
### `justify-content` - Flex + Grid

	@include justify-content(start); // default
	@include justify-content(end);
	@include justify-content(center);
	@include justify-content(stretch); // grid only
	@include justify-content(space-between);
	@include justify-content(space-around);
	@include justify-content(space-evenly);

### `align-items` - Flex + Grid

	@include align-items(flex-start);
	@include align-items(flex-end);
	@include align-items(center);
	@include align-items(stretch); // default
	@include align-items(baseline); // flex only

### `align-content` - Flex + Grid

	@include align-content(flex-start); 
	@include align-content(flex-end);
	@include align-content(center);
	@include align-content(stretch); // default
	@include align-content(space-between);
	@include align-content(space-around);
	@include align-content(space-evenly); // grid only

## Items

### `order` - Flex

 @include flex-order($order);

### `flex` - Flex

Replaces `flex`, `flex-grow`, `flex-shrink`, `flex-basis`

	@include flex-flex($grow, $shrink, $basis);

## `align-self`

	@include align-self(start);
	@include align-self(end);
	@include align-self(center);
	@include align-self(stretch); // default
	@include align-self(baseline); // flex only
	@include align-self(auto); // flex only

