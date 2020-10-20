# Common - the shared library

## Base classes
This library contains base classes for the NG-Geotoolkit:

[AbstractComponent](./classes/abstractcomponent.html) - defines base behavior

[ToolAbstractDirective](./classes/toolabstractdirective.html) - defines base behavior for tools directives,
such as [ToolCrosshairDirective](./classes/toolcrosshairdirective.html) or [ToolDomDirective](./classes/tooldomdirective.html)

##Directives

**Important:** Not all the components necessary support all listed directives. 
If a directive is not supported by a widget, it simply has no effect on a widget.

###[ToolCrosshairDirective](./classes/toolcrosshairdirective.html)
The simple directive that enables or disables crosshair on the components in the library.


###[ToolRubberZoomDirective](./classes/toolrubberzoomdirective.html)
The simple directive that enables or disables rubber-band components zooming.

###[ToolDomDirective](./classes/tooldomdirective.html)
The simple directive to handle DOM events (see Carnac's manual for details)



 
