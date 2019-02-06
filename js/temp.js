
var panelHeight = panelInfo()

// currentPanel.velocity({"height": panelHeight })
// currentPanel.velocity({"transform": "scale(2)" })
// currentPanel.velocity({"opacity": "1" })


currentPanel.velocity({ 
	height: [ 0, panelHeight ],
	transform: [ scale(0), scale(1) ],
	opacity: [ 0, 1 ],	
})

// currentPanel.velocity({"height": "0"})
// currentPanel.velocity({"transform": "scale(0)" })
// currentPanel.velocity({"opacity": "0" })

currentPanel.velocity({ 
	height: [ 0 ],
	transform: [ scale(1), scale(0) ],
	opacity: [ 1, 0 ],	
})

currentPanel.velocity("slideUp", {
    duration: 350
})



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
        if(currentButton.getAttribute('aria-expanded') === 'false') {
            // Switch classes
            currentButton.setAttribute('aria-expanded', 'true')
            currentPanel.setAttribute('aria-hidden', 'false')
            // Get height to open to
            currentPanel.style.height = panelHeight 
            // After delay to allow transition, remove inline height
            window.setTimeout(function () {
                currentPanel.style.height = ''
            }, 350);

        // if opened
        } else {
            // Get height to close from
            currentPanel.style.height = currentPanel.scrollHeight + 'px'
            // After short delay, set height to 0 
            window.setTimeout(function () {
                currentPanel.style.height = '0px'
            }, 1)
            // After another delay to allow transition, switch classes
            // and remove inline height
            window.setTimeout(function () {
                currentButton.setAttribute('aria-expanded', 'false')
                currentPanel.setAttribute('aria-hidden', 'true')
                currentPanel.style.height = ''
            }, 350)
        }
        // END Customizations


