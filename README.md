Inline Edit - A jQuery Plugin
=============================

This jQuery plugin aims to make it easy to make any text content into an editable form that posts changes to
your application via AJAX.

Overview
--------

Why another inline editing jquery plugin?

In short: Customising existing options looked like more work than building my own.

After looking at a number of plugins, none of them had the user interface that I 
desired (simple, no buttons etc) and they all interferred with the page layout when 
activated making content jump all over the place.

The major aims of this project are:
1. ease of use for developers
1. minimal disruption to the page layout on activation
1. minimal controls

This plugin is written in CoffeeScript, then translated/compiled into Javascript. 
I prefer taking contributions in CoffeeScript, but javascript is fine also.

Features / Behaviour
--------------------
* Displays a "edit" link on hover over the editable element
* When focus leaves the edit field, changes are commited via AJAX (no change = no ajax)
* Copies the current styling of the text to the edit field so as to "look" the same as the content being edited
* Keyboard shortcuts:
  * ESC - stop editing and return content to original state (does not fire ajax)
  * ENTER - stop editing and commit changes


Requirements
------------
jQuery 1.4+


Installation
------------

Copy jquery.editinline.js (or jquery.editinline.js.coffee if you have an asset 
pipeline) into a public directory in your application.

Usage
-----

The plugin works by replacing the content of the selected DOM element with an
input field. Currently only input[type='text'], textarea support will be added
in a future release.

The name attribute of the field will be the same as the name attribute of the 
selected DOM element. If no name attribute is set, the name of the field will
be "value".

Example use:

    <span id='pageTitle' name='title'>Enter the title here</span>

For the element that you want 

    $('#pageTitle').editInline(options)
        
where options is an array of options:

* *url* => url for the AJAX to post the result to
* *method* => the http method to use for AJAX e.g. PUT, POST
* *color* => the color of the edit link and text editing field outline. By default this will be the color of the text of the selected DOM element
* *fieldName* => the name of the field/parameter that the data is sent back with (takes preceedence over the name attribute of the DOM element)
* *linkVisibility* => If undefined, the edit link will appear when the user hovers their mouse over the editable element. If "hide" the link will always be hidden (useful if you need to trigger showing the link yourself). If "show" the link will always show.

The option can also include a number of callback functions

* *callbackAjaxSuccess* => This callback will be called when the ajax returns success
* *callbackAjaxError* => This callback will be called when the ajax returns an error
* *callbackAfterShow* => This callback will be called when the edit field is shown
* *callbackAfterHide* => This callback will be called when the edit field is hidden

Home
----

You can find this plugin's home at [jamespmcgrath.com](http://jamespmcgrath.com/projects/edit-inline-jquery-plugin)

Licence
-------

Inline Edit is dual licensed under [MIT](http://en.wikipedia.org/wiki/MIT_License) or [GPLv2](http://en.wikipedia.org/wiki/GNU_General_Public_License) licenses

Contribution
------------

I welcome contributions, bug fixes and feature requests. Please [say hello](http://jamespmcgrath.com/hello).

