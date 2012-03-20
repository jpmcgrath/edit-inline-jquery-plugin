Inline Edit - A jQuery Plugin
=============================

This jQuery plugin aims to make it easy to make any text content into an editable form that posts changes to
your application via AJAX.

Overview
--------

Why another inline editing jquery plugin?

In short: Customising existing options looked like more work than building my own.

After looking at a number of plugins, none of them had the user interface that I desired (simple, no buttons etc) and they all interferred with the page layout when activated making content jump all over the place.

The major aims of this project are:
1. ease of use for developers
1. minimal disruption to the page layout on activation
1. minimal controls

This plugin is written in CoffeeScript, then translated/compiled into Javascript. I prefer taking contributions in CoffeeScript, but javascript is fine also.

Requirements
------------
jQuery 1.4+


Installation
------------

Copy jquery.editinline.js (or jquery.editinline.js.coffee if you have an asset pipeline) into a public directory in your application.

Usage
-----
    $('inline-editable').editInline(postURL, linkColor)
    
where:
  postURL => url for the AJAX to post the result to
  linkColor => the color of the edit link

Home
----

You can find this plugin's home at [jamespmcgrath.com](http://jamespmcgrath.com/projects/edit-inline-jquery-plugin)

Contribution
------------

I welcome contributions, so please [say hello](http://jamespmcgrath.com/hello).

