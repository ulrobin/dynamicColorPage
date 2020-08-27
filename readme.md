# dynamicColorPage v2.2.0
dynamicColorPage was previously a tiny jQuery plugin to easily adopt the page's color styling.
Due to a rewrite, it is now a pure javascript "plugin" with some awesome new features!

## Demo:
Please visit
https://drohnen-videograf.de/dynamicColorPage
to view an example page. The important button is the small blue one in the right bottom corner of the website.

## What is it for?
dynamicColorPage was made to give the visitors of a website the possibility to choose their favourite style colors.
All you have to do, is to add the class "dcl" (for dynamic text color), "dclHover" (for dynamic text color on hovering the element) or "dbg" (for dynamic background-color) to all elements, that should apply the given color scheme. 

The extended functionality applies some additional classes, in combination with an appended number 
(-100, -90, -80, -70, -60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100) at the end of the class (e.g. "dbg-70").
These colors are darked or lighted color versions of the basic color for the selected color.

## What's new in v2.2?
The button got a new design. Function and variable names prefixed with dynamicColorPage_ to avoid collisions with existing functions. The release now includes a minified version again. 

## What's new in v2.1?
Now the script doesn't crash the browser when the already active color is clicked again.

## What's new in v2.0?
Now the selected color is automatically stored in a cookie on the webpage, so a reload, or navigating to another page on the same server won't reset the selected color! 

## Dependences:
The script is written without the usage of any dependences! There is no jQuery or anything else needed for releases from dynamicColorPage@2.0.0 on.

## Installation:
The script only has to be included anywhere in the page. Then it automatically adds all the necessary DOM elements and stylesheets, 
that are automatically generated out of the given "colors" object.

## Options / Customization:
The script was made to be easy to use. As a result, you can only customize four options.

### JS - "colors" - Data type: object
This object defines the choosable colors. These colors are automatically applied to the page and will get listed in the color-
changer are by default. The "default" property (don't remove it!) sets the standard style, when the page is loaded.
### JS - "color_tiles_per_row" - Data type: int
This variable defines, how many color tiles should be in one row of the color-changer element.
### JS - "colorChangerOldColor" - Data type: String
With this variable you can define another standard color class, the script should look for, if the color is changed.
For exaple if this variable is "grey", then you have to add "dclgrey" or "dbggrey" as classes to your elements to active the script
and the color-change-functionality for these elements. For default the value is "", so you can just use "dcl" and "dbg" as classes.
### JS - "useCookiesFeature" - Data type: Boolean
With this variable you can define, whether the script should store the currently selected color in a cookie and automatically re-use this stored color, when the page is reloaded or the user navigates to another page with this script included.


### CSS - Styling
The only possibility to directly change the css code of the color-changer, is, to adapt the css code that is written at the end of the javascript code and that is stored in the variable "css_string".

## How it works:
When the user picks a new color, the script just replaces the previous "dcl", "dclHover" or "dbg" class of all elements and replaces this with the new color name. 
For example (colorChangerOldColor="", new_color="red"):
  "dcl" gets replaced with "dclred",
  "dclHover-50" gets replaced with "dclHoverred-50",
  ...

## Questions, suggestions, problems, etc.?
Please create a new issue on Github :)
