/*------------------------------------------------------------------------------
Document   : jquery.commons.js
$Rev::                                                $: Revision of last commit
$Author::                                             $: Author of last commit
$Date::                                               $: Date of last commit
--------------------------------------------------------------------------------
Modification History
--------------------------------------------------------------------------------
Date            Version     Author          Description
--------------------------------------------------------------------------------
05-OCT-2010     1.0         Deepu Mohan P   Initial version
30-MAR-2011     1.1         Deepu Mohan P   Formatted code and comments.
                                            Removed re-declaration of variables.
                                            Removed unused variables.
------------------------------------------------------------------------------*/


/**
 * Plugin to center any element in page.
 * This will automatically center an element based on the options given.
 * By default it will center the element both vertically and horizontally.
 * direction : both (default), horiz, vert
 * onResize: true, false (default)
 * container: selector of the container. default is window
 */
jQuery.fn.center = function (options) {

    var settings = {
        direction : 'both',
        onResize: false ,
        container : window
    };

    jQuery.extend(settings, options);

    var container = settings.container;
    var direction = settings.direction;
    var onResize = settings.onResize;
    var obj = this;

    this.css("position","absolute");

    if (direction == 'both') {
        this.css("top", ( $(container).height() - this.height() ) / 2+$(container).scrollTop() + "px");
        this.css("left", ( $(container).width() - this.width() ) / 2+$(container).scrollLeft() + "px");
    } else if (direction == 'horiz') {
        this.css("left", ( $(container).width() - this.width() ) / 2+$(container).scrollLeft() + "px");
    } else if (direction == 'vert') {
        this.css("top", ( $(container).height() - this.height() ) / 2+$(container).scrollTop() + "px");
    }

    if(onResize == true) {
        $(container).resize(function() {
            jQuery.extend(options, {
                onResize: false
            });
            $(obj).center(options);
        });
    }
    return this;
};
//------------------------------------------------------------------------------

/**
 * Plugin to populate values in a select box.
 * Here the selected element must be select box
 * This will also check if '_default' is selected in check box on blur
 * Parameters:
 * 1. names - Required. '~' seperated names(options)
 * 2. values - Required. '~' seperated values
 * 3. options - {defaultVal: , defaultOption: , msg: }
 */
jQuery.fn.populateOptions = function (names, values,options) {

    var settings = {
        defaultVal:'_default',
        defaultOption:'Select',
        msg: 'Please select an option',
        DATASEP:'~'
    };

    //merge settings and options
    jQuery.extend(settings,options);

    return this.each(function() {
        //get settings
        var defaultVal = settings.defaultVal;
        var defaultOption = settings.defaultOption;
        var msg = settings.msg;
        var DATASEP = settings.DATASEP;

        //initialize variables
        var l_names = new Array();
        l_names = names.split(DATASEP);
        var l_values = new Array();
        l_values = values.split(DATASEP);
        var len = 0;

        if (l_names && l_values) {
            if(l_names.length == l_values.length)
                len = l_names.length;
        }

        var selectbox = "<option value = '"+defaultVal+"' selected='selected'>"+defaultOption+"</option>";

        for (var i =0 ;i  < len ; i++ ) {
            selectbox += "<option value = "+l_values[i]+">"+l_names[i]+"</option>";
        }

        $(this).html(selectbox);

        $(this).blur(function () {
            var v = $(this).val();
            if(v=='_default') {
                alert(msg);
                $(this).focus();
            }
        });
    });
};
//------------------------------------------------------------------------------

jQuery.fn.RadioCheckBox = function () {

	return this.each(function() {

        $(this).change(function() {

            var checked =  $(this).is(':checked');
            var name = $(this).attr('name');
            var id = $(this).attr('id');

            if(checked) {
                $(':checkbox[name='+name+']').each(function() {

                    if(id!=$(this).attr('id')) {
                        $(this).attr('checked',false).trigger('change');
                    }
                });
            }
        }).change();
    });
};
//------------------------------------------------------------------------------
//
//                           End of File
//
//          $Id$
//------------------------------------------------------------------------------
