# Quick Grab: BG Gradients

This theme includes `@mixin`s for adding gradient backgrounds. Below are suggestions based on the current theme colors. 

## Linear - Brand 
	@include bg-linear-h($color__primary-a,$color__blue);

## Linear - Dark on left
	@include bg-linear-h($color__black, 1, $color__black-a, 1);
	@include bg-linear-h($color__white-a, 1, $color__white, 1);
	@include bg-linear-h($color__primary-a, 1, $color__primary, 1);
	@include bg-linear-h($color__blue-a, 1, $color__blue, 1);
	@include bg-linear-h($color__alt-a, 1, $color__alt, 1);

## Linear - Dark on right
	@include bg-linear-h($color__black-a, 1, $color__black, 1);
	@include bg-linear-h($color__white, 1, $color__white-a, 1);
	@include bg-linear-h($color__primary, 1, $color__primary-a, 1);
	@include bg-linear-h($color__blue, 1, $color__blue-a, 1);
	@include bg-linear-h($color__alt, 1, $color__alt-a, 1);

## Linear - Dark on top
	@include bg-linear-v($color__black, 1, $color__black-a, 1);
	@include bg-linear-v($color__white-a, 1, $color__white, 1);
	@include bg-linear-v($color__primary-a, 1, $color__primary, 1);
	@include bg-linear-v($color__blue-a, 1, $color__blue, 1);
	@include bg-linear-v($color__alt-a, 1, $color__alt, 1);

## Linear - Dark on bottom
	@include bg-linear-v($color__black-a, 1, $color__black, 1);
	@include bg-linear-v($color__white, 1, $color__white-a, 1);
	@include bg-linear-v($color__primary, 1, $color__primary-a, 1);
	@include bg-linear-v($color__blue, 1, $color__blue-a, 1);
	@include bg-linear-v($color__alt, 1, $color__alt-a, 1);

## Veritcal Slash - Dark on left
	@include bg-slash-v($color__black, 1, $color__black-a, 1);
	@include bg-slash-v($color__white-a, 1, $color__white, 1);
	@include bg-slash-v($color__primary-a, 1, $color__primary, 1);
	@include bg-slash-v($color__blue-a, 1, $color__blue, 1);
	@include bg-slash-v($color__alt-a, 1, $color__alt, 1);

## Verital Slash - Dark on right
	@include bg-slash-h($color__black-a, 1, $color__black, 1);
	@include bg-slash-h($color__white, 1, $color__white-a, 1);
	@include bg-slash-h($color__primary, 1, $color__primary-a, 1);
	@include bg-slash-h($color__blue, 1, $color__blue-a, 1);
	@include bg-slash-h($color__alt, 1, $color__alt-a, 1);

## Horizontal Slash - Dark on top
	@include bg-slash-h($color__black, 1, $color__black-a, 1);
	@include bg-slash-h($color__white-a, 1, $color__white, 1);
	@include bg-slash-h($color__primary-a, 1, $color__primary, 1);
	@include bg-slash-h($color__blue-a, 1, $color__blue, 1);
	@include bg-slash-h($color__alt-a, 1, $color__alt, 1);

## Horizontal Slash - Dark on bottom
	@include bg-slash-h($color__black-a, 1, $color__black, 1);
	@include bg-slash-h($color__white, 1, $color__white-a, 1);
	@include bg-slash-h($color__primary, 1, $color__primary-a, 1);
	@include bg-slash-h($color__blue, 1, $color__blue-a, 1);
	@include bg-slash-h($color__alt, 1, $color__alt-a, 1);


# Swoosh
