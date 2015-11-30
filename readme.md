# dynamicColorPage
Tiny jQuery pluugin to easily adapt the page's styling

## What is it for?
dynamicColorPage was made to give the visitors of a website the possibility to choose their favourite style colors.
All you have to do, is to add the class "dcl" (for dynamic color) or "dbg" (for dynamic background-color) to all elements, 
that should apply the given color scheme. The extended functionality applies some other classes, if you add a number 
(-100, -90, -80, -70, -60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100) at the end of the class (e.g. "dbg-70"). 

These colors are lighted or darked color versions of the basic color for the selected color.

## Dependences:
The code represents only a tiny plugin to jQuery, so you have to include jQuery first and then load/execute this script.

## Installation:
The script only has to be included anywhere in the page. Then it automatically adds all the necessary elements and stylesheets, 
that are automatically generated out of the given "colors" object.

## Options / Customization:
The script contains was made to be easy to use. As a result, you can only customize three options.

### JS - "colors" - Data type: object
This object defines the choosable colors. These colors are automatically applied to the page and will get listed in the color-
changer are by default. The "default" property sets the standard style, when the page is loaded.
### JS - "color_tiles_per_row" - Data type: int
This variable defines, how many color tiles are in one row of the color-changer element.
### JS - "colorChangerOldColor" - Data type: String
With this variable you can define another standard color class, the script should look for, if the color is changed.
For exaple if this variable is "grey", then you have to add "dclgrey" or "dbggrey" as classes to your elements to active the script
and the color-change-functionality for these elements. For default the value is "", so you can just use "dcl" and "dbg" as classes.

### CSS - Styling
The only possibility to change the direct css code of the color-changer, you have to adapt the css code, that is part of the javascript
code and that is stored in the variable "css_string".

## How it works:
The script just replaces the previous "dcl" or "dbg" class of all elements and replaces this with the new color name.
If the default color is set to "" and that is changed to "green", then every "dcl" and every "dbg" class is replaced with "dclgreen" 
or "dbggreen" class. The same procedure is applied to all color shades.
