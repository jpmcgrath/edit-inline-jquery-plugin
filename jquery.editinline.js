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
  options.color || (options.color = editable.css("color"));
  editable.css({
    position: 'relative'
  });
  linkStyle = "position: absolute; top: 2px; right: 2px; font-size: 12px; text-transform: lowercase;  display: inline-block;";
  if (!!options.color) linkStyle += "color:" + options.color + ";";
  editLink = jQuery('<a/>', {
    href: '#edit',
    "class": 'edit_inline_link',
    style: linkStyle,
    html: "edit"
  });
  editLink.hide();
  editable.append(editLink);
  editable.mouseover(function() {
    var link;
    link = jQuery(this).children(".edit_inline_link");
    return link.show();
  }).mouseout(function() {
    var link;
    link = jQuery(this).children(".edit_inline_link");
    return link.hide();
  });
  url = editable.attr('update_url');
  return jQuery(".edit_inline_link").click(function(event) {
    var borderWidth, content, contentClone, editField, editableFontSize, editableStyle, height, weight;
    editable = jQuery(this).parent();
    event.preventDefault();
    borderWidth = 1;
    height = editable.height() - 2 * borderWidth;
    weight = editable.width() - 2 * borderWidth;
    editableStyle = editable.attr('style') + ("background-color:" + (editable.css('background-color')) + ";") + ("font-size: " + (editable.css('font-size')) + ";") + ("font-weight: " + (editable.css('font-weight')) + ";") + ("font-family: " + (editable.css('font-family')) + ";") + ("color: " + (editable.css('color')) + ";") + ("height: " + height + "px;") + ("width: " + weight + "px;") + ("text-transform: " + (editable.css('text-transform')) + ";") + ("font-style: " + (editable.css('font-style')) + ";") + ("border: " + borderWidth + "px solid " + options.color + ";");
    "display: inline-block;" + "z-index: 1000;";
    editField = "";
    editableFontSize = parseFloat(editable.css('font-size'));
    if (editable.height() > editableFontSize * 1.5) {
      editField = jQuery('<textarea/>', {
        name: editable.attr('name'),
        style: editableStyle
      });
    } else {
      editField = jQuery('<input/>', {
        type: 'text',
        name: editable.attr('name'),
        style: editableStyle
      });
    }
    contentClone = editable.clone();
    contentClone.find(".edit_inline_link").remove();
    content = jQuery.trim(contentClone.html());
    editable.html(editField.clone().wrap('<div>').parent().html());
    editField = editable.find("input[type='text'], textarea");
    editField.val(content);
    editField.focus();
    if (!!options.callbackAfterShow) options.callbackAfterShow();
    return editField.focusout(function() {
      var ajaxArgs;
      editField = editable.find("input[type='text'], textarea");
      content = jQuery.trim(editField.val());
      editable.html(content);
      if (!!options.callbackAfterHide) options.callbackAfterHide();
      editable.editInline(options);
      ajaxArgs = {
        url: options.url,
        type: options.method,
        dataType: options.dataType,
        data: {},
        success: function(data, text) {
          if (!!options.callbackAjaxSuccess) {
            return options.callbackAjaxSuccess();
          }
        },
        error: function(request, status, error) {
          if (!!options.callbackAjaxError) return options.callbackAjaxError();
        }
      };
      ajaxArgs["data"][options.fieldName] = content;
      return jQuery.ajax(ajaxArgs);
    });
  });
};
