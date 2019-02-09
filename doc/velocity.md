# Velocity 2.0.3

This theme is written using vanilla JavaScript and animated using Velocity.js.

* @file /js/velocity.2.0.3.min.js
* @author Julian Shapiro
* @licence MIT
* @link https://github.com/julianshapiro/velocity


## CDN

	<script src="//cdn.jsdelivr.net/npm/velocity-animate@2.0/velocity.min.js"></script>

	<script src="//cdnjs.cloudflare.com/ajax/libs/velocity/2.0.3/velocity.min.js"></script>


## Global

	var elements = document.querySelector("div")
	Velocity(elements, {"color": "red"})


## Chaining

	document.querySelector("div").velocity({"color": "red"});



## Properties + Options

	element.velocity({
	    width: "500px"
	    height: "*=2" // Double the current height
	    top: 50, // Defaults to the px unit type
	    left: "50%",  
	}, {
	    duration: 400,
	    easing: "swing",
	    queue: "",
	    begin: undefined,
	    progress: undefined,
	    complete: undefined,
	    loop: false,
	    delay: false
	})


	element.velocity({
	    properties: { opacity: 1 },
	    options: { duration: 500 }
	});


## Comma Separated

	$element.velocity({ top: 50 }, 1000);
	$element.velocity({ top: 50 }, 1000, "swing");
	$element.velocity({ top: 50 }, "swing");
	$element.velocity({ top: 50 }, 1000, function() { alert("Hi"); });







