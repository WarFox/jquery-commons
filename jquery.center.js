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
};