/*!
 * skip-link-focus-fix.js (C) 1989, 1991 Free Software Foundation, Inc.
 *
 * Borrowed from Automatic _s Theme
 * https://github.com/Automattic/_s/blob/master/js/skip-link-focus-fix.js
 * 
 * GNU General Public License v2.0
 * https://github.com/Automattic/_s/blob/master/LICENSE
 * 
 * Learn more about the issue this script handles
 * https://git.io/vWdr2
 * 
 */

( function() {
	var isIe = /(trident|msie)/i.test( navigator.userAgent );

	if ( isIe && document.getElementById && window.addEventListener ) {
		window.addEventListener( 'hashchange', function() {
			var id = location.hash.substring( 1 ),
				element;

			if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
				return;
			}

			element = document.getElementById( id );

			if ( element ) {
				if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false );
	}
} )();
