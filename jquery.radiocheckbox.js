/*
 * jquery.radiocheckbox.js
 * https://github.com/warfox/jquery-commons
 *
 * Copyright (c) 2010 Deepu Mohan Puthrote
 * Licensed under the MIT license.
 */

/**
 * This plugin can be used to change the behaviour of checkbox group to that of
 * a radio button group.
 * The checkbox group is identified by the name attribute of chebkbox element.
 * Each checkbox must have a unique id
 */
jQuery.fn.RadioCheckBox = function () {

    return this.each(function() {

        $(this).change(function() {

        	var checked =  $(this).is(':checked');
            var name = $(this).attr('name');
            var val = $(this).val();
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
