
// START Customizations
var panelInfo = function () {
    // Temp unhide so we can get info
    currentPanel.setAttribute('aria-hidden', 'false')
    // Grab the info
    var isHeight = currentPanel.scrollHeight + 'px'
    // Re-hide panel
    currentPanel.setAttribute('aria-hidden', 'true')
    // Return info  
    return isHeight       
}

var panelHeight = panelInfo() // Get the natural height


// if closed
currentPanel.velocity({ 
	height: panelHeight,
	scale: 1,
	opacity: 1,
}, { duration: 400 })

currentPanel.velocity({ 
	height: [ panelHeight, 0 ],
	transform: [ "scaleY(1)", "scaleY(0)" ],
	opacity: [ 1, 0 ],  
}, { duration: 400 })


// if opened
currentPanel.velocity({ 
	height: 0,
	scale: 0,
	opacity: 0,
}, { duration: 400 })

currentPanel.velocity({ 
	opacity: [ 0, 1 ], 
	transform: [ "scaleY(0)", "scaleY(1)" ],               
	height: [ 0, panelHeight ], 
}, { duration: 400 })
