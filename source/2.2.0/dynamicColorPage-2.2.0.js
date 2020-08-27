/* Please visit https://github.com/ulrichrobin/dynamicColorPage/ for detailed documentation and license information */
/* Live demo available at https://drohnen-videograf.de/dynamicColorPage/ */
/* dynamicColorPage@2.2.0 */

const dynamicColorPage_colors = {
    standard: '#f34e36',
    red: '#f34e36',
    green: '#b5d947',
    purple: '#9d6fc8',
    blue: '#4abcdd',
    turquoise: '#1abc9c',
    pink: '#c61c72',
    orange: '#f4a622',
    emerald: '#2ecc71'
};
const dynamicColorPage_useCookiesFeature = true; // Default value: true
const dynamicColorPage_cookieExpiresAfterDays = 365; // Default value: 365
const dynamicColorPage_colorTilesPerRow = 2; // Default value: 2
var dynamicColorPage_activeColor = ''; // Default value: ''

/* Don't change any code below! */
/* Don't change any code below! */
/* Don't change any code below! */

window.addEventListener('load', dynamicColorPage_pageLoad);

function dynamicColorPage_pageLoad() {
  // Append DOM element for colorChanger to the body element
  var colorChangerDiv = document.createElement('div');
  colorChangerDiv.className = 'color_changer';
  document.body.appendChild(colorChangerDiv);

  // Append DOM element for colorChanger trigger button to the body element
  var colorChangerTrigger = document.createElement('button');
  colorChangerTrigger.className = 'color_changer-toggle';
  document.body.appendChild(colorChangerTrigger);

  // Events for closing colorChanger-DOM element when clicking anywhere on body
  document.body.addEventListener('click', function(e) {
    if(dynamicColorPage_hasClass(document.getElementsByClassName('color_changer')[0], 'expanded') && !dynamicColorPage_hasClass(e.target, 'color_changer-toggle')) {
      dynamicColorPage_removeClass(document.getElementsByClassName('color_changer')[0], 'expanded');
    }
  });
  // Events for expanding colorChanger-DOM element
  document.getElementsByClassName('color_changer-toggle')[0].addEventListener('click', function(e) {
    if(dynamicColorPage_hasClass(document.getElementsByClassName('color_changer')[0], 'expanded')) {
      dynamicColorPage_removeClass(document.getElementsByClassName('color_changer')[0], 'expanded');
    }
    else {
      dynamicColorPage_addClass(document.getElementsByClassName('color_changer')[0], 'expanded');
    }
  });

  // Create relevant DOM and css strings
  var domElementContent = '<div class="color_changer_row">';
  var color_tiles_counter = 0;
  for(var key in dynamicColorPage_colors) {
    if(dynamicColorPage_colors.hasOwnProperty(key)) {
      var property_value = dynamicColorPage_colors[key];
      if(key == 'standard') key = '';
      else {
        if(color_tiles_counter < (dynamicColorPage_colorTilesPerRow - 1)) {
          color_tiles_counter = (color_tiles_counter + 1);
          domElementContent = domElementContent + '<div style="background-color:' + property_value + '" class="color_tile" data-color="' + key + '"></div>';
        }
        else {
          domElementContent = domElementContent + '<div style="background-color:' + property_value + '" class="color_tile" data-color="' + key + '"></div>';
          domElementContent = domElementContent + '</div><div class="color_changer_row">';
          color_tiles_counter = 0;
        }
      }
      var plainKeyStyling_printed = false;
      for(var h = -100; h < 101; h += 10) {
        if(!plainKeyStyling_printed) {
          css_string = css_string + '.dcl' + key + '{color:' + property_value + '}';
          css_string = css_string + '.dclHover' + key + ':hover{color:' + property_value + '}';
          css_string = css_string + '.dbg' + key + '{background-color:' + property_value + '}';
          plainKeyStyling_printed = true;
        }
        css_string = css_string + '.dcl' + key + h + '{color:' + colorLuminance(property_value, (h / 100)) + '}';
        css_string = css_string + '.dclHover' + key + h + ':hover{color:' + colorLuminance(property_value, (h / 100)) + '}';
        css_string = css_string + '.dbg' + key + h + '{background-color:' + colorLuminance(property_value, (h / 100)) + '}';
      }
    }
  }
  domElementContent = domElementContent + '</div>';
  document.getElementsByClassName('color_changer')[0].innerHTML = domElementContent;

  var this_element;

  // Events for clicking one of the color tiles
  for(var i = 0; i < document.getElementsByClassName('color_tile').length; i++) {
    document.getElementsByClassName('color_tile')[i].addEventListener('click', function(e) {
      dynamicColorChange_changeColor(e.target.getAttribute('data-color'));
    });
  }

  // Include generated css string into document
  var cssStringStyle = document.createElement('style');
  cssStringStyle.type = 'text/css';
  cssStringStyleInner = document.createTextNode(css_string);
  cssStringStyle.appendChild(cssStringStyleInner);
  document.head.appendChild(cssStringStyle);

  // Auto get/set cookies to use the last selected color in the page automatically again
  if(dynamicColorPage_useCookiesFeature && dynamicColorPage_getCookie('dynamicColorPage_activeColor') != '') {
    if(dynamicColorPage_colors.hasOwnProperty(dynamicColorPage_getCookie('dynamicColorPage_activeColor'))) dynamicColorChange_changeColor(dynamicColorPage_getCookie('dynamicColorPage_activeColor'));
  }
}
function dynamicColorChange_changeColor(dynamicColorPage_newColor) {
  if(dynamicColorPage_activeColor == dynamicColorPage_newColor) return;
  // Change old dcl class to new one
  while(document.getElementsByClassName('dcl' + dynamicColorPage_activeColor).length != 0) {
    this_element = document.getElementsByClassName('dcl' + dynamicColorPage_activeColor)[0];
    dynamicColorPage_removeClass(this_element, 'dcl' + dynamicColorPage_activeColor);
    dynamicColorPage_addClass(this_element, 'dcl' + dynamicColorPage_newColor);
  }
  // Change old dclHover class to new one
  while(document.getElementsByClassName('dclHover' + dynamicColorPage_activeColor).length != 0) {
    this_element = document.getElementsByClassName('dclHover' + dynamicColorPage_activeColor)[0];
    dynamicColorPage_removeClass(this_element, 'dclHover' + dynamicColorPage_activeColor);
    dynamicColorPage_addClass(this_element, 'dclHover' + dynamicColorPage_newColor);
  }
  // Change old dbg class to new one
  while(document.getElementsByClassName('dbg' + dynamicColorPage_activeColor).length != 0) {
    this_element = document.getElementsByClassName('dbg' + dynamicColorPage_activeColor)[0];
    dynamicColorPage_removeClass(this_element, 'dbg' + dynamicColorPage_activeColor);
    dynamicColorPage_addClass(this_element, 'dbg' + dynamicColorPage_newColor);
  }
  // Change old luminanceStep-classes to new ones
  for(var j = -100; j < 101; j += 10) {
    // Change old luminanceStep-dcl class to new one
    while(document.getElementsByClassName('dcl' + dynamicColorPage_activeColor + j).length != 0) {
      this_element = document.getElementsByClassName('dcl' + dynamicColorPage_activeColor + j)[0];
      dynamicColorPage_removeClass(this_element, 'dcl' + dynamicColorPage_activeColor + j);
      dynamicColorPage_addClass(this_element, 'dcl' + dynamicColorPage_newColor + j);
    }
    // Change old luminanceStep-dclHover class to new one
    while(document.getElementsByClassName('dclHover' + dynamicColorPage_activeColor + j).length != 0) {
      this_element = document.getElementsByClassName('dclHover' + dynamicColorPage_activeColor + j)[0];
      dynamicColorPage_removeClass(this_element, 'dclHover' + dynamicColorPage_activeColor + j);
      dynamicColorPage_addClass(this_element, 'dclHover' + dynamicColorPage_newColor + j);
    }
    // Change old luminanceStep-dbg class to new one
    while(document.getElementsByClassName('dbg' + dynamicColorPage_activeColor + j).length != 0) {
      this_element = document.getElementsByClassName('dbg' + dynamicColorPage_activeColor + j)[0];
      dynamicColorPage_removeClass(this_element, 'dbg' + dynamicColorPage_activeColor + j);
      dynamicColorPage_addClass(this_element, 'dbg' + dynamicColorPage_newColor + j);
    }
  }
  dynamicColorPage_activeColor = dynamicColorPage_newColor;
  if(dynamicColorPage_useCookiesFeature) dynamicColorPage_setCookie('dynamicColorPage_activeColor', dynamicColorPage_newColor);
}


/* Helper functions */
function dynamicColorPage_removeClass(element, classToRemove) {
  var reg = new RegExp('(\\s|^)' + classToRemove + '(\\s|$)');
  element.className = (element.className.replace(reg, ' ')).trim();
}
function dynamicColorPage_addClass(element, classToAdd) {
  element.className = (element.className + " " + classToAdd).trim();
}
function dynamicColorPage_hasClass(element, classToCheckFor) {
  return (element.className.indexOf(classToCheckFor) >= 0);
}
function colorLuminance(color_hex, factor) {
  color_hex = String(color_hex).replace(/[^0-9a-f]/gi, '');
	if(color_hex.length < 6) color_hex = color_hex[0] + color_hex[0] + color_hex[1] + color_hex[1] + color_hex[2] + color_hex[2];
	factor = factor || 0;
    var rgb='#', c, i;
	for(var i = 0; i < 3; i++) {
		c = parseInt(color_hex.substr(i * 2, 2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * factor)), 255)).toString(16);
		rgb += ('00' + c).substr(c.length);
	}
	return rgb;
}
function dynamicColorPage_setCookie(cookieName, cookieValue) {
  var date = new Date();
  date.setTime(date.getTime() + (dynamicColorPage_cookieExpiresAfterDays*1000*60*60*24));
  document.cookie = cookieName + '=' + cookieValue + '; expires=' + date.toUTCString();
}
function dynamicColorPage_getCookie(cookieName) {
  cookieName = cookieName + '=';
  var cookiesArray = document.cookie.split(';');
  for(var i = 0; i < cookiesArray.length; i++) {
    var currentIndex = cookiesArray[i];
    while(currentIndex.charAt(0) == ' ') currentIndex = currentIndex.substring(1);
    if(currentIndex.indexOf(cookieName) == 0) return currentIndex.substring(cookieName.length, currentIndex.length);
  }
  return '';
}

/* Write css strings here, to have a better order in the code */
var css_string = '.color_changer-toggle{border:0px solid transparent;background-color:transparent;position:fixed;right:10px;bottom:10px;z-index:10000;width:38px;height:38px;background-repeat:no-repeat;background-size:contain;}.color_changer{position:fixed;right:10px;bottom:55px;z-index:10000;max-height:0vh;overflow:hidden;transition:all 1s ease-out, background-color linear 1ms 1s;border:1px solid transparent;padding:5px;margin-bottom:0px;border-radius:4px;}.color_changer.expanded{transition:all 1s ease-in, background-color linear 1ms;max-height:100vh;border:1px solid gray;background-color:white;}.color_changer_row .color_tile{width:25px;height:25px;border-radius:4px;float:left;margin:5px;cursor:pointer}';
css_string = css_string + '.color_changer-toggle{background-image:url("data:image/png;base64,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");}';
