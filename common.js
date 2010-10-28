/*
Modification History
________________________________________________________________________________
Date            Version     Author          Description
________________________________________________________________________________
05-OCT-2010     1.0         Deepu Mohan P   Initial version
*/


/*
    Plugin to center any element in page.
    This will automatically center an element based on the options given.
    By default it will center the element both vertically and horizontally.
    direction : both (default), horiz, vert
    onWindowResize: true, false (default)
*/
jQuery.fn.center = function (options) {

    var settings = {   direction : 'both', onWindowResize: false };
    
    jQuery.extend(settings, options);
    
    var direction = settings.direction;
    var onWindowResize = settings.onWindowResize;
    var obj = this;
    
    //alert(direction+' : '+onWindowResize);

    this.css("position","absolute");    
    
    if (direction == 'both') {
        this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");
        this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");    
    } else if (direction == 'horiz') {
        this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
    } else if (direction == 'vert') {
        this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");
    }
    
    if(onWindowResize == true) {
        $(window).resize(function() {
            jQuery.extend(options,{ onWindowResize: false});
            $(obj).center(options);
        });        
    }    
        
    return this;
}


/*
    Plugin to populate values in a select box.
    Here the selected element must be select box
    This will also check if '_default' is selected in check box on blur
    Parameters:
        1. names - Required. '~' seperated names(options)
        2. values - Required. '~' seperated values
        3. options - {defaultVal: , defaultOption: , msg: }
*/
jQuery.fn.populateOptions = function (names, values,options) {    

    var settings = {defaultVal:'_default',
                    defaultOption:'Select',
                    msg: 'Please select an option',
                    DATASEP:'~'};

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
        var l_names = names.split(DATASEP);
        var l_values = new Array();
        var l_values = values.split(DATASEP);
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



jQuery.fn.RadioCheckBox = function () {

    return this.each(function() {
       
        $(this).change(function() {
        
            var checked =  $(this).is(':checked')
            var name = $(this).attr('name');
            var val = $(this).val();
            var id = $(this).attr('id');
            
            if(checked) {
            //alert(name+' : '+id+' : '+val+' : '+checked);
                $(':checkbox[name='+name+']').each(function() {
                
                    if(id!=$(this).attr('id')) {
                        $(this).attr('checked',false).trigger('change');
                    }                
                });
            }
        }).change();
    });
};

