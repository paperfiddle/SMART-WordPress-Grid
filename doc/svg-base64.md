# SVG base64

There are a few places this theme uses SVG icons that are stored as base64. I chose to do this for components where the icons aren't likely to change - navigation, accordion, dialogs. 

The main benefit is performance - one less request and the URLs have been optimized for g-zip. 

The downside is that these icons don't inherit `currentColor` and can't be changed with the `color` or `fill` properties. Nor can they include variable `$colors`. 

However, the optomized URLs make it easy to locate and change the colors - you just have to do it manually.

* @credt Taylor Hunt
* @article https://codepen.io/tigt/post/optimizing-svgs-in-data-uris
* @converter https://codepen.io/jakob-e/pen/doMoML


## How to Convert

1. Download SVG from Font Awesome, Icon Moon, etc.
2. Open SVG in text editor and remove unnecessary information. 
**  See `sass/images/icon.svg`s for examples.
3. Use [this online converter](https://codepen.io/jakob-e/pen/doMoML) to get optimized base64 encoding.

## Angle Down
background: no-repeat center center
	url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='%23FFFFFF' d='M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z'%3E%3C/path%3E%3C/svg%3E");

## Angle Right
background: no-repeat center center
	url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 512'%3E%3Cpath fill='%23FFFFFF' d='M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z'%3E%3C/path%3E%3C/svg%3E");

## Plus Sign
background: no-repeat center center
	url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='%23FFFFFF' d='M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z'%3E%3C/path%3E%3C/svg%3E");

## Minus Sign
background: no-repeat center center 
	url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='%23FFFFFF' d='M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z'%3E%3C/path%3E%3C/svg%3E");

## Hamburger
background: no-repeat center center
	url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='%23FFFFFF' d='M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z'%3E%3C/path%3E%3C/svg%3E");

## Separator 
background: no-repeat center center
