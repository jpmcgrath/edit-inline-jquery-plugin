/*******************************************************************
* Edit Inline - A jQuery Plugin to allow editing content inline
* http://jamespmcgrath.com/projects/edit-inline-jquery-plugin/
*
* Version: 0.0.1
* Copyright 2012 James P. McGrath - http://jamespmcgrath.com
*
* Dual licensed under MIT or GPLv2 licenses
*   http://en.wikipedia.org/wiki/MIT_License
*   http://en.wikipedia.org/wiki/GNU_General_Public_License
*
* Date: Tues 20th March
*******************************************************************/
  jQuery.fn.editInline = function(postURL, linkColor) {
    var editLink, editable, linkStyle, url;
    editable = jQuery(this);
    editable.css({
      position: 'relative'
    });
    linkStyle = "top: 2; right: 2px; position: absolute; font-size: 12px; text-transform: lowercase;  display: inline-block;";
    if (!!linkColor) linkStyle += "color:" + linkColor + ";";
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
      editableStyle = "background-color:" + editable.css('background-color') + ";" + "font-size:" + editable.css('font-size') + ";" + "font-weight:" + editable.css('font-weight') + ";" + "font-family:" + editable.css('font-family') + ";" + "color:" + editable.css('color') + ";" + "height:" + height + "px;" + "width:" + weight + "px;" + "text-transform:" + editable.css('text-transform') + ";" + "font-style:" + editable.css('font-style') + ";" + "border:" + borderWidth + "px solid " + linkColor + ';';
      "display: inline-block;";
      editField = jQuery('<input/>', {
        type: 'text',
        name: 'editable',
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
        content = editable.find("input[type='text']").val();
        editable.html(content);
        editable.editInline(postURL, linkColor);
        return jQuery.ajax({
          url: postURL,
          type: "POST",
          dataType: "json",
          data: {
            value: content
          },
          success: function(data, text) {
            var success;
            return success = true;
          },
          error: function(request, status, error) {
            return window.showAlert("Error communicating with the server. Content \"" + content + "\" is not saved.");
          }
        });
      });
    });
  };

      