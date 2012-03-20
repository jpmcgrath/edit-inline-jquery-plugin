######################################################
# Edit Inline - A jQuery Plugin to allow editing content inline
# http://jamespmcgrath.com/projects/edit-inline-jquery-plugin/
#
# Version: 0.0.1
# Copyright 2012 James P. McGrath - http://jamespmcgrath.com
#
# Dual licensed under MIT or GPLv2 licenses
#   http://en.wikipedia.org/wiki/MIT_License
#   http://en.wikipedia.org/wiki/GNU_General_Public_License
#
# Date: Tues 20th March

jQuery.fn.editInline = (postURL, linkColor) ->
  
  editable = jQuery(this)
  editable.css
    position: 'relative'
  
  linkStyle = "top: 2; right: 2px; position: absolute; font-size: 12px; text-transform: lowercase;  display: inline-block;"
  linkStyle += "color:" + linkColor + ";" if !!linkColor
  
  # insert an edit button that will display on hover
  editLink = jQuery '<a/>'
    href: '#edit' 
    class: 'edit_inline_link' 
    style: linkStyle
    html: "edit"
    
  editLink.hide()
  editable.append(editLink)
    
  editable.mouseenter(->
    link = jQuery(this).children(".edit_inline_link")
    link.show()
  ).mouseleave ->
    link = jQuery(this).children(".edit_inline_link")
    link.hide()

  # get the url from the attribute of the item
  url = editable.attr('update_url')
  
  jQuery(".edit_inline_link").click (event) ->
    editable = jQuery(this).parent()
    event.preventDefault()
    borderWidth = 1    
    # border is 1px on each side
    height = editable.height() - 2*borderWidth
    weight = editable.width() - 2*borderWidth
    
    # replace the text with a text field of the same color and shape as the text
    editableStyle = "background-color:" + editable.css('background-color') + ";" +
      "font-size:" + editable.css('font-size') + ";" +
      "font-weight:" + editable.css('font-weight') + ";" +
      "font-family:" + editable.css('font-family') + ";" +
      "color:" + editable.css('color') + ";" +
      "height:" + height + "px;" +
      "width:" + weight + "px;" +
      "text-transform:" + editable.css('text-transform') + ";" +
      "font-style:" + editable.css('font-style') + ";" +
      "border:" + borderWidth + "px solid " + linkColor + ';'
      "display: inline-block;"
    
    editField  = jQuery '<input/>'
      type: 'text'
      name: editable.attr('name')
      style: editableStyle
    
    contentClone = editable.clone()
    contentClone.find(".edit_inline_link").remove()
    content = contentClone.html()
    #editField.val(content)
    editable.html(editField.clone().wrap('<div>').parent().html())
    editField = editable.find("input[type='text']")
    editField.val(content)
    editField.focus()

    editField.focusout ->
      # find the input and get the content
      editField = editable.find("input[type='text']")
      content = editField.val()
      fieldName = editField.attr('name')
      fieldName ||= "value"
      editable.html(content)
      editable.editInline(postURL, linkColor)
      
      # post the content back via ajax
      jQuery.ajax
        url: postURL
        type: "POST"
        dataType: "json"
        data:
          fieldName : content
        success: (data, text) ->
          success = true
        error: (request, status, error) ->
          window.showAlert "Error communicating with the server. Content \"" + content + "\" is not saved."
      
      