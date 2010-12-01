/*
    Plugin to center any element in page.
    This will automatically center an element based on the options given.
    By default it will center the element both vertically and horizontally.
    direction : both (default), horiz, vert
    onWindowResize: true, false (default)
	placeholder: id of the placeholder. default is window
*/
jQuery.fn.center = function (options) {

    var settings = {   direction : 'both', onWindowResize: false , placeholder : window};
    
    jQuery.extend(settings, options);
    
	var placeholder = settings.placeholder;
    var direction = settings.direction;
    var onWindowResize = settings.onWindowResize;
    var obj = this;

    this.css("position","absolute");    
    
    if (direction == 'both') {
        this.css("top", ( $(placeholder).height() - this.height() ) / 2+$(placeholder).scrollTop() + "px");
        this.css("left", ( $(placeholder).width() - this.width() ) / 2+$(placeholder).scrollLeft() + "px");    
    } else if (direction == 'horiz') {
        this.css("left", ( $(placeholder).width() - this.width() ) / 2+$(placeholder).scrollLeft() + "px");
    } else if (direction == 'vert') {
        this.css("top", ( $(placeholder).height() - this.height() ) / 2+$(placeholder).scrollTop() + "px");
    }
    
    if(onWindowResize == true) {
        $(placeholder).resize(function() {
            jQuery.extend(options,{ onWindowResize: false});
            $(obj).center(options);
        });        
    }
    return this;
};