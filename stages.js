// don't instantiate this directly
class Stage {
  constructor(rootElement, nextStage) {
    this.rootElement = rootElement
    this.nextStage = nextStage
  }

  begin() {
    throw new Error('you must override begin()')
  }

  cleanUp() {
    throw new Error('you must override cleanUp()')
  }
}

class TextStage extends Stage {
  begin() {
    // set this.text when overriding
    let text = this.text()
    let color = this.color()
    let delay = this.delay()
    let fontSize = this.fontSize()
    let animate = this.animate()
    let script = this.script()
    let el = document.createElement('h1')
    el.innerHTML = text
    el.setAttribute('style', `
text-align: center;
font-family: Arial;
font-size: ${fontSize};
color: ${color}
    `)

    let that = this

    if (animate) {
    	el.classList.add('animated')
    	for (var i = animate.length - 1; i >= 0; i--) {
    		el.classList.add(animate[i])
    	}
    	el.addEventListener('animationend', () => {
    		setTimeout(function () {
      			that.nextStage()
    		}, delay)
    	})
    	this.rootElement.appendChild(el)
    } else {
    	setTimeout(function () {
      		that.nextStage()
    	}, delay)
    	this.rootElement.appendChild(el)
    }

    if (script) {
    	script()
    }
    
  }

  delay() {
    return 1000 // default delay
  }

  color() {
  	return "#000000"
  }

  fontSize() {
  	return "80px"
  }

  animate() {
  	return false
  }

  script() {
  	return false
  }

  cleanUp() {
    this.rootElement.innerHTML = ''
  }
}

class EpilWarning extends TextStage {
 text() { return 'warning: fast flashing lights.'}
 delay() { return 2000 } 
}



class IntroPreface0 extends TextStage {
  text() { return '...' }
}

class IntroPreface1 extends TextStage {
  text() { return 'initializing' }
  color() { return '#2d77ef'}
  delay() { return 500 }
}

class IntroPreface2 extends TextStage {
  text() { return 'initializing hack' }
  delay() { return 800 }
}

class IntroPreface3 extends TextStage {
  text() { return 'initializing hack the' }
  delay() { return 800 }
}

class IntroPreface4 extends TextStage {
  text() { return 'initializing hack the planet..' }
  delay() { return 1250 }
}

class Intro extends Stage {
  begin() {
    let that = this

    let cdmx = document.createElement('h1')
    cdmx.textContent = 'BUILD'

    that.rootElement.appendChild(cdmx)

    let speed = 1

    let yDirection = 1
    let xDirection = 1

    let x = 0
    let y = 0

    let fontSize = 48

    let fontColor = 'white'
    let bgColor = 'black'

    let fontWeight = 'normal'

    const frameInterval = 1000 / 60 // every 60th of a second

    let frameAnim
    let colorChangeAnim
    let textChangeAnim

    const executeFrame = function () {
      const style = `
font-family: Arial;
font-size: ${fontSize}px;
font-weight: ${fontWeight};
color: ${fontColor};
position: absolute;
top: ${y}px;
left: ${x}px;
margin: 0;
padding: 0;
      `

      cdmx.setAttribute('style', style)

      that.rootElement.setAttribute('style', `
background-color: ${bgColor};
      `)

      // below screen
      if (x + cdmx.scrollWidth > window.innerWidth) {
        xDirection = -1
      }

      // above screen
      if (x <= 0) {
        xDirection = 1
      }

      // right of screen
      if (y + cdmx.scrollHeight > window.innerHeight) {
        yDirection = -1
      }

      // left of screen
      if (y <= 0) {
        yDirection = 1
      }

      x += xDirection * speed
      y += yDirection * speed
      if (/Mobi|Android/i.test(navigator.userAgent)) {
      	speed = speed * 1.015
      	fontSize = fontSize * 1.005
	  } else {
	  	speed = speed * 1.005
      	fontSize = fontSize * 1.002
	  }

      frameAnim = setTimeout(executeFrame, frameInterval)
    }

    const colorChangeInterval = 1000 / 2 // every 0.5 seconds
    const executeColorChange = function () {
      if (fontColor == 'white') {
        fontColor = 'black'
        fontWeight = 'bold'
      } else {
        fontColor = 'white'
        fontWeight = 'normal'
      }

      if (bgColor == 'white') {
        bgColor = 'black'
      } else {
        bgColor = 'white'
      }

      colorChangeAnim = setTimeout(executeColorChange, colorChangeInterval)
    }

    let textChangeInterval = 1000 / 3 // every 3rd of a second, increasing below
    const executeTextChange = function () {
    	let current = cdmx.textContent
    	if (current == 'BUILD') {
    		current = 'MAKE'
    	} else if (current == 'MAKE') {
    		current = 'DO'
    	} else if (current == 'DO') {
    		current = 'BUILD'
    	}

    	cdmx.textContent = current
    	textChangeInterval = textChangeInterval / 1.005

    	textChangeAnim = setTimeout(executeTextChange, textChangeInterval)
    }

    frameAnim = setTimeout(executeFrame, frameInterval)
    colorChangeAnim = setTimeout(executeColorChange, colorChangeInterval)
    textChangeAnim = setTimeout(executeTextChange, textChangeInterval)

    // cancel animation
    setTimeout(function () {
      clearTimeout(frameAnim)
      clearTimeout(colorChangeAnim)
      clearTimeout(textChangeAnim)

      that.nextStage()
    }, 15500)
  }

  cleanUp() {
    this.rootElement.removeAttribute('style')
    this.rootElement.innerHTML = ''
  }
}

class Bait extends TextStage {
  text() { return "hey." }
}

class Bait1 extends TextStage {
  text() { return 'Hey.' }
}

class Bait2 extends TextStage {
  text() { return 'HEY YOU!' }
  fontSize() { return '112px' }
  delay() { return 1250 }
}
class ItsBig extends TextStage {
  text() { return 'something' }
  fontSize() { return '128px' }
}

class ItsBig2 extends TextStage {
	text() { return '<b>BIG</b>' }
	fontSize() { return '160px' }
	animate() { return ["zoomInDown", "faster"] }
	delay() { return 1200 }
}

class Happening extends TextStage {
	text() { return 'is happening' }
	delay() { return 1200 }
}

class Happening2 extends TextStage {
	text() { return 'on Wednesday' }
	delay() { return 1200 }
}

class Win extends TextStage {
	text() { return 'You\'ll have the chance to win...' }
	delay() { return 1500 }
}

class Win2 extends TextStage {
	text() { return '$50'}
	fontSize() { return '200px' }
	delay() { return 2000 }
}

class YouIn extends TextStage {
	text() { return 'You down?' }
	delay() { return 1500 }
}

class Cool extends TextStage {
	text() { return 'Cool.' }
	delay() { return 1200 }
}

class Cool2 extends TextStage {
	text() { return 'We thought you would be.' }
	delay() { return 2000 }
}

class Gimme extends TextStage {
	text() { return `
		We'll text you tomorrow.
		<br>
		<input type="number" id="number" name="number" placeholder="1-508-222-3333" style="font-size: 50px; text-align: center"><br>
		<button id="submit" style="font-size: 50px; border-radius: 15px;"><p style="
    padding-left: 5px;
    padding-top: 5px;
    padding-right: 5px;
    padding-bottom: 5px;
    margin: 0px;
">Submit</p></button>
		<p style="font-size: 25px">To be clear: we actually have $50 to give away & this is approved by WHS admin. We promise to never spam you & we'll delete your number on Thursday.</p>
		<p style="font-size: 15px">(We promise to never spam you, and your number will be deleted from our system on Friday. We'll also reveal who we are.)</p>
		
		`}

	script() { return function() {
			$("#submit").click(() => {
				axios.post('https://quilled-caterpillar.glitch.me/ping', {number: $("#number").val()}).then(() => {
					$("#root").empty()

			$("#root").append(`
					<h1 style="text-align: center;
font-family: Arial;
font-size: 80px;">👋 See you tomorrow!
<p style="font-size: 10px;">b64 cHNvIGx6bXZuIGZuLgoKZ2NhYXJxdW8hIHR3dSBndiBtYWxlZnpyZSAoZm5mZWZqZCAiYm1jdnUhIikgaWEgbmJtIG1ndm4gd3N1ZSB6dCBwamogcGFrZ24gcWlrYyB2bW5wIGlmYyBzZCB4Z2MgYWR2bnJ3YmN2ZHVvLgoKYWRsdm9uaiBpdXd3IGN3cWZ2IGFkIGZuLgoKYSdmYyBwZXFseiB1d3Uu</p>
<p style="font-size: 10px;">key is hack</p>
</h1>



				`)
				})

			})



		}
	}
}

