/*******************************************************************
* Edit Inline - A jQuery Plugin to allow editing content inline
* http://jamespmcgrath.com/projects/edit-inline-jquery-plugin/
*
* Version: 0.0.2
* Copyright 2012 James P. McGrath - http://jamespmcgrath.com
*
* Compiled from coffeescript
*
* Dual licensed under MIT or GPLv2 licenses
*   http://en.wikipedia.org/wiki/MIT_License
*   http://en.wikipedia.org/wiki/GNU_General_Public_License
*
* Date: Tues 20th March
*******************************************************************/

jQuery.fn.editInline = function(options) {
  var editLink, editable, linkStyle, url;
  editable = jQuery(this);
  options.method || (options.method = 'put');
  options.dataType || (options.dataType = 'json');
  options.fieldName || (options.fieldName = editable.attr('name'));
  options.fieldName || (options.fieldName = "value");
  editable.css({
    position: 'relative'
  });
  linkStyle = editable.attr('style');
  linkStyle += "top: 2; right: 2px; position: absolute; font-size: 12px; text-transform: lowercase;  display: inline-block;";
  if (!!options.color) linkStyle += "color:" + options.color + ";";
  editLink = jQuery('<a/>', {
    href: '#edit',
    "class": 'edit_inline_link',
    style: linkStyle,
    html: "edit"
  });
  editLink.hide();
  editable.append(editLink);
  editable.mouseenter(function() {
    var link;
    link = jQuery(this).children(".edit_inline_link");
    return link.show();
  }).mouseleave(function() {
    var link;
    link = jQuery(this).children(".edit_inline_link");
    return link.hide();
  });
  url = editable.attr('update_url');
  return jQuery(".edit_inline_link").click(function(event) {
    var borderWidth, content, contentClone, editField, editableStyle, height, weight;
    editable = jQuery(this).parent();
    event.preventDefault();
    borderWidth = 1;
    height = editable.height() - 2 * borderWidth;
    weight = editable.width() - 2 * borderWidth;
    editableStyle = "background-color:" + editable.css('background-color') + ";" + "font-size:" + editable.css('font-size') + ";" + "font-weight:" + editable.css('font-weight') + ";" + "font-family:" + editable.css('font-family') + ";" + "color:" + editable.css('color') + ";" + "height:" + height + "px;" + "width:" + weight + "px;" + "text-transform:" + editable.css('text-transform') + ";" + "font-style:" + editable.css('font-style') + ";" + "border:" + borderWidth + "px solid " + options.color + ';';
    "display: inline-block;";
    editField = jQuery('<input/>', {
      type: 'text',
      name: editable.attr('name'),
      style: editableStyle
    });
    contentClone = editable.clone();
    contentClone.find(".edit_inline_link").remove();
    content = contentClone.html();
    editable.html(editField.clone().wrap('<div>').parent().html());
    editField = editable.find("input[type='text']");
    editField.val(content);
    editField.focus();
    return editField.focusout(function() {
      var ajaxArgs, fieldName;
      editField = editable.find("input[type='text']");
      content = editField.val();
      editable.html(content);
      editable.editInline(options);
      fieldName = options.fieldName;
      ajaxArgs = {
        url: options.url,
        type: options.method,
        dataType: options.dataType,
        data: {},
        success: function(data, text) {
          var success;
          return success = true;
        },
        error: function(request, status, error) {
          return window.showAlert("Error communicating with the server. Content \"" + content + "\" is not saved.");
        }
      };
      ajaxArgs["data"][fieldName] = content;
      return jQuery.ajax(ajaxArgs);
    });
  });
};
