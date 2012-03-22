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
  if (!options.linkVisibility || options.linkVisibility === "hide") {
    editLink.hide();
  }
  editable.append(editLink);
  if (!options.linkVisibility) {
    editable.mouseenter(function() {
      var link;
      link = jQuery(this).children(".edit_inline_link");
      return link.show();
    }).mouseleave(function() {
      var link;
      link = jQuery(this).children(".edit_inline_link");
      return link.hide();
    });
  }
  url = editable.attr('update_url');
  return jQuery(".edit_inline_link").click(function(event) {
    var borderWidth, contentClone, editField, editableFontSize, editableStyle, height, originalContent, weight;
    editable = jQuery(this).parent();
    event.preventDefault();
    borderWidth = 1;
    height = editable.height() - 2 * borderWidth;
    weight = editable.width() - 2 * borderWidth;
    editableStyle = editable.attr('style') + ("background-color:" + (editable.css('background-color')) + ";") + ("font-size: " + (editable.css('font-size')) + ";") + ("font-weight: " + (editable.css('font-weight')) + ";") + ("font-family: " + (editable.css('font-family')) + ";") + ("color: " + (editable.css('color')) + ";") + ("height: " + height + "px;") + ("width: " + weight + "px;") + ("text-transform: " + (editable.css('text-transform')) + ";") + ("font-style: " + (editable.css('font-style')) + ";") + ("border: " + borderWidth + "px solid " + options.color + ";") + "display: inline-block;" + "padding: 0;" + "z-index: 1000;";
    editField = "";
    editableFontSize = parseFloat(editable.css('font-size'));
    if (options.fieldType === "textarea" || editable.height() > editableFontSize * 1.5) {
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
    originalContent = jQuery.trim(contentClone.html());
    originalContent = originalContent.replace("&nbsp;", "");
    editable.html(editField.clone().wrap('<div>').parent().html());
    editField = editable.find("input[type='text'], textarea");
    editField.val(originalContent);
    editField.focus();
    if (!!options.callbackAfterShow) options.callbackAfterShow();
    editField.keypress(function(e) {
      if (e.which === 0) {
        e.preventDefault();
        return jQuery(this).val(originalContent).blur();
      } else if (e.which === 13) {
        e.preventDefault();
        return jQuery(this).blur();
      }
    });
    return editField.focusout(function() {
      var ajaxArgs, newContent;
      editField = editable.find("input[type='text'], textarea");
      newContent = jQuery.trim(editField.val());
      editable.html(newContent + "&nbsp;");
      if (!!options.callbackAfterHide) options.callbackAfterHide();
      editable.editInline(options);
      if (newContent !== originalContent) {
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
        ajaxArgs["data"][options.fieldName] = newContent;
        return jQuery.ajax(ajaxArgs);
      }
    });
  });
};
