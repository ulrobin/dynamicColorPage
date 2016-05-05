/* Please visit https://github.com/ulrobin/dynamicColorPage/ for detailed documentation and license information */

var colors = {
    standard: "#F34E36",
    red: "#F34E36",
    green: "#B5D947",
    purple: "#9d6fc8",
    blue: "#4abcdd",
    turquoise: "#1abc9c",
    pink: "#C61C72",
    orange: "#f4a622",
    emerald: "#2ecc71"
};
var color_tiles_per_row = 2;
var colorChangerOldColor = "";
var useCookiesFeature = true;

/* Don't change any code below! */
/* Don't change any code below! */
/* Don't change any code below! */

window.addEventListener("load", pageLoadComplete);

function pageLoadComplete() {
    // Append DOM element for colorChanger to the body element
    var colorChangerDiv = document.createElement("div");
    colorChangerDiv.className = "color_changer";
    document.body.appendChild(colorChangerDiv);

    // Append DOM element for colorChanger trigger button to the body element
    var colorChangerTrigger = document.createElement("button");
    colorChangerTrigger.className = "color_changer-toggle";
    document.body.appendChild(colorChangerTrigger);

    // Events for expanding colorChanger-DOM element
    document.body.addEventListener("click", function(e) {
        if(colorChangerExpanded && !hasClass(e.target, "color_changer-toggle")) {
            removeClass(document.getElementsByClassName("color_changer")[0], "expanded");
            colorChangerExpanded = false;
        }
    });
    document.getElementsByClassName("color_changer-toggle")[0].addEventListener("click", function(e) {
        if(colorChangerExpanded) {
            removeClass(document.getElementsByClassName("color_changer")[0], "expanded");
            colorChangerExpanded = false;
        }
        else {
            addClass(document.getElementsByClassName("color_changer")[0], "expanded");
            colorChangerExpanded = true;
        }
    });

    // Create relevant DOM and css strings
    var domElementContent = '<div class="color_changer_row">';
    var color_tiles_counter = 0;
    for(var key in colors) {
        if(colors.hasOwnProperty(key)) {
            var property_value = colors[key];
            if(key == "standard") key = "";
            else {
                if(color_tiles_counter < (color_tiles_per_row - 1))
                {
                    color_tiles_counter = (color_tiles_counter + 1);
                    domElementContent = domElementContent + '<div class="color_tile dbg' + key + '" data-color="' + key + '"></div>';
                }
                else
                {
                    domElementContent = domElementContent + '<div class="color_tile dbg' + key + '" data-color="' + key + '"></div>';
                    domElementContent = domElementContent + "</div><div class='color_changer_row'>";
                    color_tiles_counter = 0;
                }
            }
            var plainKeyStyling_printed = false;
            for(var h = -100; h < 101; h += 10) {
                if(!plainKeyStyling_printed)
                {
                    css_string = css_string + ".dcl" + key + "{color:" + property_value + "}";
                    css_string = css_string + ".dclHover" + key + ":hover{color:" + property_value + "}";
                    css_string = css_string + ".dbg" + key + "{background-color:" + property_value + "}";
                    plainKeyStyling_printed = true;
                }
                css_string = css_string + ".dcl" + key + h + "{color:" + colorLuminance(property_value, (h / 100)) + "}";
                css_string = css_string + ".dclHover" + key + h + ":hover{color:" + colorLuminance(property_value, (h / 100)) + "}";
                css_string = css_string + ".dbg" + key + h + "{background-color:" + colorLuminance(property_value, (h / 100)) + "}";
            }
        }
    }
    domElementContent = domElementContent + "</div>";
    document.getElementsByClassName("color_changer")[0].innerHTML = domElementContent;

    var old_dcl_elements;
    var old_dclHover_elements;
    var old_dbg_elements;
    var this_element;

    // Events for clicking one of the color tiles
    for(var i = 0; i < document.getElementsByClassName("color_tile").length; i++)
    {
        document.getElementsByClassName("color_tile")[i].addEventListener("click", function(e) {
            changeColor(e.target.getAttribute("data-color"));
        });
    }

    // Include generated css string into document
    var cssStringStyle = document.createElement("style");
    cssStringStyle.type = "text/css";
    cssStringStyleInner = document.createTextNode(css_string);
    cssStringStyle.appendChild(cssStringStyleInner);
    document.head.appendChild(cssStringStyle);

    // Auto get/set cookies to use the last selected color in the page automatically again
    if(useCookiesFeature && getCookie("color_changer_LastSelectedColor") != "") {
        if(colors.hasOwnProperty(getCookie("color_changer_LastSelectedColor"))) changeColor(getCookie("color_changer_LastSelectedColor"));
    }

    // Save memory, so tidy up unused variables
    css_string = "";
    domElementContent = "";
    old_dcl_elements = "";
    old_dclHover_elements = "";
    old_dbg_elements = "";
    this_element = "";
}
function changeColor(new_color) {
    // Change old dcl class to new one
    old_dcl_elements = document.getElementsByClassName("dcl" + colorChangerOldColor);
    for(var b = 0; b < old_dcl_elements.length; b++)
    {
        this_element = old_dcl_elements[b];
        if(hasClass(this_element, "color_tile")) return;
        removeClass(this_element, "dcl" + colorChangerOldColor);
        addClass(this_element, "dcl" + new_color);
    }
    // Change old dclHover class to new one
    old_dclHover_elements = document.getElementsByClassName("dclHover" + colorChangerOldColor);
    for(var b = 0; b < old_dclHover_elements.length; b++)
    {
        this_element = old_dclHover_elements[b];
        if(hasClass(this_element, "color_tile")) return;
        removeClass(this_element, "dclHover" + colorChangerOldColor);
        addClass(this_element, "dclHover" + new_color);
    }
    // Change old dbg class to new one
    old_dbg_elements = document.getElementsByClassName("dbg" + colorChangerOldColor);
    for(var b = 0; b < old_dbg_elements.length; b++)
    {
        this_element = old_dbg_elements[b];
        if(hasClass(this_element, "color_tile")) return;
        removeClass(this_element, "dbg" + colorChangerOldColor);
        addClass(this_element, "dbg" + new_color);
    }
    old_dcl_elements = "";
    old_dclHover_elements = "";
    old_dbg_elements = "";// Change old luminanceStep-classes to new ones
    for(var j = -100; j < 101; j += 10) {
        // Change old luminanceStep-dcl class to new one
        old_dcl_elements = document.getElementsByClassName("dcl" + colorChangerOldColor + j);
        for(var b = 0; b < old_dcl_elements.length; b++)
        {
            this_element = old_dcl_elements[b];
            if(hasClass(this_element, "color_tile")) return;
            removeClass(this_element, "dcl" + colorChangerOldColor + j);
            addClass(this_element, "dcl" + new_color + j);
        }
        // Change old luminanceStep-dclHover class to new one
        old_dclHover_elements = document.getElementsByClassName("dclHover" + colorChangerOldColor + j);
        for(var b = 0; b < old_dclHover_elements.length; b++)
        {
            this_element = old_dclHover_elements[b];
            if(hasClass(this_element, "color_tile")) return;
            removeClass(this_element, "dclHover" + colorChangerOldColor + j);
            addClass(this_element, "dclHover" + new_color + j);
        }
        // Change old luminanceStep-dbg class to new one
        old_dbg_elements = document.getElementsByClassName("dbg" + colorChangerOldColor + "" + j);
        for(var b = 0; b < old_dbg_elements.length; b++)
        {
            this_element = old_dbg_elements[b];
            if(hasClass(this_element, "color_tile")) return;
            removeClass(this_element, "dbg" + colorChangerOldColor + "" + j);
            addClass(this_element, "dbg" + new_color + "" + j);
        }
    }
    colorChangerOldColor = new_color;
    if(useCookiesFeature) setCookie("color_changer_LastSelectedColor", new_color, 365);
}


/* Helper functions */
function removeClass(element, classToRemove) {
    var reg = new RegExp('(\\s|^)' + classToRemove + '(\\s|$)');
    element.className = (element.className.replace(reg, ' ')).trim();
}
function addClass(element, classToAdd) {
    element.className = (element.className + " " + classToAdd).trim();
}
function hasClass(element, classToCheckFor) {
    return (element.className.indexOf(classToCheckFor) >= 0);
}
function colorLuminance(color_hex, factor) {
    color_hex = String(color_hex).replace(/[^0-9a-f]/gi, '');
	if(color_hex.length < 6) color_hex = color_hex[0] + color_hex[0] + color_hex[1] + color_hex[1] + color_hex[2] + color_hex[2];
	factor = factor || 0;
    var rgb="#", c, i;
	for(var i = 0; i < 3; i++) {
		c = parseInt(color_hex.substr(i * 2, 2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * factor)), 255)).toString(16);
		rgb += ("00" + c).substr(c.length);
	}
	return rgb;
}
function setCookie(cookieName, cookieValue, daysToExpiration) {
    var date = new Date();
    date.setTime(date.getTime() + (daysToExpiration*1000*60*60*24));
    document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toUTCString();
}
function getCookie(cookieName) {
    cookieName = cookieName + "=";
    var cookiesArray = document.cookie.split(";");
    for(var i = 0; i < cookiesArray.length; i++) {
        var currentIndex = cookiesArray[i];
        while(currentIndex.charAt(0) == " ") currentIndex = currentIndex.substring(1);
        if(currentIndex.indexOf(cookieName) == 0) return currentIndex.substring(cookieName.length, currentIndex.length);
    }
    return "";
}

/* Write css strings here, to have a better order in the code */
var colorChangerExpanded = false;
var css_string = ".color_changer-toggle{border:0px solid transparent;background-color:transparent;position:fixed;right:10px;bottom:10px;z-index:10000;width:38px;height:38px;background-repeat:no-repeat;background-size:contain;}.color_changer{position:fixed;right:10px;bottom:55px;z-index:10000;max-height:0vh;overflow:hidden;transition:all 1s ease-out;border:1px solid transparent;padding:5px;margin-bottom:0px;border-radius:4px;}.color_changer.expanded{transition:all 1s ease-in;max-height:100vh;border:1px solid gray;}.color_changer_row .color_tile{width:25px;height:25px;border-radius:4px;float:left;margin:5px;cursor:pointer}";
css_string = css_string + ".color_changer-toggle{background-image:url('data:image/png;base64,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');}";
