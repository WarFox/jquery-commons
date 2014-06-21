/*
 * jquery.assert.js
 * https://github.com/warfox/jquery-commons
 *
 * Copyright (c) 2010 Deepu Mohan Puthrote
 * Licensed under the MIT license.
 */

jQuery.fn.debug = function() {
  return this.each(function(){
    alert(this);
  });
};
jQuery.log = function(message) {
  if(window.console) {
     console.debug(message);
  } else {
     alert(message);
  }
};



jQuery.fn.AssertNumber = function(msg,settings) {

  // define defaults and override with options, if available
  // by extending the default settings, we don't modify the argument
  settings = jQuery.extend({
     min_length: 0,
     assert_length: 0,
     max_val : -9999
  }, settings);

    //No need of maxlengh here
    var min_length = settings.min_length;
    var assert_length = settings.assert_length;
    var max_val = settings.max_val;

    return this.each(function(){
        //$.log("AssertNumber: "+this.id+ " , " +min_length+' : '+ assert_length);

        $(this).keypress(function(event) {

            var keyCode = event.keyCode;

            //alert(this.id+' : '+"pressed"+" : "+event.keyCode);
            if(!(keyCode>=48 && keyCode<=57)) {

                event.preventDefault();
            }
        });
    }).blur(function () {

        var strRegExp = "[^0-9]";
        var val=$(this).val();
        var charpos = val.search(strRegExp);
        if(val.length > 0 &&  charpos >= 0) {
            if(msg && msg.length>0) {
                alert(msg);
            } else {
                alert('Please enter only numbers.');
            }
            $(this).focus();
            return;
        }//if

        /*assert_length*/
        if(val.length>0 && assert_length!==0) {

            if(val.length != assert_length) {
                alert('Please enter '+assert_length+' digits.');
                $(this).focus();
                return;
            }
        }

        /*min_length*/
        if(val.length>0 && min_length!==0) {

            if(val.length < min_length) {
                alert('Please enter atleast '+min_length+' digits.');
                $(this).focus();
                return;
            }
        }

        /*max_val*/
        if(val.length>0 && max_val!=-9999) {

            if( val>max_val ) {
                alert('Please enter a two digit number less than or equal to '+max_val);
                $(this).focus();
                return;
            }
        }


    });
};


jQuery.fn.AssertAlpha = function(msg) {

    return this.each(function(){
        //alert("AssertAlpha: "+this.id);
        $(this).keypress(function(event) {

            var keyCode = event.keyCode;

            //alert(this.id+' : '+"pressed"+" : "+event.keyCode);
            if(!( (keyCode>=65 && keyCode<=90) || (keyCode>=97 && keyCode<=122))) {
                event.preventDefault();
            }
        });
    }).blur(function () {

        var strRegExp = "[^A-Za-z]";
        var val=$(this).val();
        var charpos = val.search(strRegExp);
        if(val.length > 0 &&  charpos >= 0)
        {
            if(msg && msg.length>0) {
                alert(msg);
            } else {
                alert('Please enter only alphabets.(Spaces and special characters not allowed)');
            }
            $(this).focus();
        }//if
    });
};

jQuery.fn.AssertAlphaSpace = function(msg) {

    return this.each(function(){
        //alert("AssertAlphaSpace: "+this.id);
        $(this).keypress(function(event) {

            var keyCode = event.keyCode;

            //alert(this.id+' : '+"pressed"+" : "+event.keyCode);
            if(!( (keyCode>=65 && keyCode<=90) || (keyCode>=97 && keyCode<=122) || keyCode==32 ) ) {
                event.preventDefault();
            }
        });
    }).blur(function () {
        var strRegExp = "[^A-Za-z\\s]";
        var val=$(this).val();
        var charpos = val.search(strRegExp);
        if(val.length > 0 &&  charpos >= 0) {
            if(msg && msg.length>0) {
                alert(msg);
            } else {
                alert('Please enter only alphabets.(Spaces and special characters not allowed)');
            }
            $(this).focus();
        }//if
    });
};


jQuery.fn.AssertEmail = function(msg) {

    return this.each(function(){

        $(this).blur(function () {

            var email = $(this).val();
            var strRegExp = "\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b";
            var charpos = email.match(strRegExp);
            if(email.length && !validateEmail(email)) {//if(email.length > 0 &&  charpos == null) {
                if(msg && msg.length>0) {
                    alert(msg);
                } else {
                    alert("Please enter a valid email address. Email cannot be more than 40 characters.");
                }
                $(this).focus();
            }
        });
    });
};


jQuery.fn.AssertAlphaNumeric = function(msg) {

    return this.each(function () {

        $(this).keypress(function(event) {

            var keyCode = event.keyCode;

            //alert(this.id+' : '+"pressed"+" : "+event.keyCode);
            if(!( (keyCode>=65 && keyCode<=90) ||
                  (keyCode>=97 && keyCode<=122)||
                  (keyCode>=48 && keyCode<=57)
                 )
             ) {
                 event.preventDefault();
               }
        });

    }).blur(function () {

        var strRegExp = "[^A-Za-z0-9]";
        var val=$(this).val();
        var charpos = val.search(strRegExp);
        if(val.length > 0 &&  charpos >= 0)
        {
            if(msg && msg.length>0) {
                alert(msg);
            } else {
                alert('Please enter only alphabets and numbers. (Spaces and special characters not allowed)');
            }
            $(this).focus();
        }//if
    });
};

/*
Alpha numeric: [^A-Za-z0-9]
alphanumeric_space:  [^A-Za-z0-9\\s]
numeric:    [^0-9]
decimal: [^0-9\.]
alphabetic: [^A-Za-z]
Alphabetic_space: [^A-Za-z\\s]
email: \b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b
*/
