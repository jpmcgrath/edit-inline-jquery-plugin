#######################################################################
#
# Edit Inline - A jQuery Plugin to allow editing content inline
# http://jamespmcgrath.com/projects/edit-inline-jquery-plugin/
#
# Version: 0.1.1
# Copyright 2012 James P. McGrath - http://jamespmcgrath.com
#
# Dual licensed under MIT or GPLv2 licenses
#   http://en.wikipedia.org/wiki/MIT_License
#   http://en.wikipedia.org/wiki/GNU_General_Public_License
#
#######################################################################
jQuery.fn.editInline = (options) ->
  editable = jQuery(this)
  
  options.method ||= 'put'
  options.dataType ||= 'json'
  options.fieldName ||= editable.attr('name')
  options.fieldName ||= "value"
  options.color ||= editable.css("color")
  
  editable.css
    position: 'relative'
  
  linkStyle = "position: absolute; top: 2px; right: 2px; font-size: 12px; text-transform: lowercase;  display: inline-block;"
  linkStyle += "color:" + options.color + ";" if !!options.color
  
  # insert an edit button that will display on hover
  editLink = jQuery '<a/>'
    href: '#edit' 
    class: 'edit_inline_link' 
    style: linkStyle
    html: "edit"
    
  # hide the link if visibility is set to "hide" or it is not defined
  editLink.hide() if !options.linkVisibility || options.linkVisibility == "hide"
  
  editable.append(editLink)
  
  if !options.linkVisibility
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
    editableStyle = editable.attr('style') +
      "background-color:#{editable.css('background-color')};" +
      "font-size: #{editable.css('font-size')};" +
      "font-weight: #{editable.css('font-weight')};" +
      "font-family: #{editable.css('font-family')};" +
      "color: #{editable.css('color')};" +
      "height: #{height}px;" +
      "width: #{weight}px;" +
      "text-transform: #{editable.css('text-transform')};" +
      "font-style: #{editable.css('font-style')};" +
      "border: #{borderWidth}px solid #{options.color};" +
      "display: inline-block;" +
      "padding: 0;" +
      "z-index: 1000;"
    
    # create the edit field - if the text is a single line, then make it an text field
    editField = ""
    editableFontSize = parseFloat(editable.css('font-size'))
    
    if options.fieldType == "textarea" or editable.height() > editableFontSize*1.5
      # need a textarea
      editField  = jQuery '<textarea/>'
        name: editable.attr('name')
        style: editableStyle
    else
      editField  = jQuery '<input/>'
        type: 'text'
        name: editable.attr('name')
        style: editableStyle
    
    contentClone = editable.clone()
    contentClone.find(".edit_inline_link").remove()
    originalContent = jQuery.trim(contentClone.html())
    originalContent = originalContent.replace("&nbsp;","")
    #editField.val(content)
    editable.html(editField.clone().wrap('<div>').parent().html())
    editField = editable.find("input[type='text'], textarea")
    editField.val(originalContent)
    editField.focus()
    
    # call back
    options.callbackAfterShow() if !!options.callbackAfterShow
    
    # keyboard shortcuts
    # ESC - remove focus
    editField.keypress (e) ->
      # if the key is the ESC key, stop editing - replace with original value
      if e.which is 0
        e.preventDefault()
        jQuery(this).val(originalContent).blur()
        
      # test if the key is the ENTER key
      else if e.which is 13
        # stop the regular action that is fired by the enter key (i.e. form submit)
        e.preventDefault()
        jQuery(this).blur()
    
    # when focus leaves the field, remove the field and take the content
    # and stick it in the editable element
    editField.focusout ->
      # find the input and get the content
      editField = editable.find("input[type='text'], textarea")
      newContent = jQuery.trim(editField.val())
      editable.html(newContent + "&nbsp;")
        
      # now the edit field has been removed, call the callback
      options.callbackAfterHide() if !!options.callbackAfterHide
        
      # setup the link again
      editable.editInline(options)
      
      # only do the ajax if the content has changed
      if newContent != originalContent
        ajaxArgs = 
          url: options.url
          type: options.method
          dataType: options.dataType
          data:
            {}
          success: (data, text) ->
            options.callbackAjaxSuccess() if !!options.callbackAjaxSuccess 
  
          error: (request, status, error) ->
            options.callbackAjaxError() if !!options.callbackAjaxError 
        
        ajaxArgs["data"][options.fieldName] = newContent
  
        # post the content back via ajax
        jQuery.ajax(ajaxArgs)
        
        
      