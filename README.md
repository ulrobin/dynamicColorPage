# dynamicColorPage
Tiny jQuery pluugin to easily adapt the page's styling

## What is it for?
dynamicColorPage was made to give the visitors of a website the possibility to choose their favourite style colors.
All you have to do, is to add the class "dcl" (for dynamic color) or "dbg" (for dynamic background-color) to all elements, 
that should apply the given color scheme. The extended functionality applies some other classes, if you add a number 
(-100, -90, -80, -70, -60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100) at the end of the class.

## Dependences:
The js-code represents only a tiny plugin to jQuery, so you have to include jQuery before loading/executing this script.

## Installation:
The script only has to be included anywhere in the page. Then it automatically adds all the necessary elements and stylesheets, 
that are automatically generated out of the given "colors" object.

## Options / Customization:
The script contains was made to be easy to use. As a result, you can only customize three options.

# JS - "colors"-object
This object defines the choosable colors. These colors are automatically applied to the page and will get listed in the color-
changer are by default. The "default" property sets the standard style, when the page is loaded.
# JS - "color_tiles_per_row" - int
This variable defines, how many color tiles are in one row of the color-changer element.
# JS - "colorChangerOldColor" - String
With this variable you can define another standard color class, the script should look for, if the color is changed.
For exaple if this variable is "grey", then you have to add "dclgrey" or "dbggrey" as classes to your elements to active the script
and the color-change-functionality for these elements. For default the value is "", so you can just use "dcl" and "dbg" as classes.
