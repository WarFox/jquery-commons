/* jQuery timepicker
 * replaces a single text input with a set of pulldowns to select hour, minute, and AM/PM
 *
 * Copyright (c) 2007 Jason Huck/Core Five Creative (http://www.corefive.com/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version 1.1 -- Customised by Deepu Mohan P WarFox
 * Changes: 1. Exception throwing bug fix
 *          2. Setting the initial value
 *          3. ParseInt(string, radix) {set radix to 10, because stirng beginning with 0 is considered as octal}
 */

(function($){
	jQuery.fn.timepicker = function(){
		this.each(function(){
			// get the ID and value of the current element
			var i = this.id;
			var v = $(this).val();

			// the options we need to generate
			var hrs = new Array('01','02','03','04','05','06','07','08','09','10','11','12');
			var mins = new Array('00','15','30','45');
			var ap = new Array('AM','PM');

			// default to the current time
			var d = new Date;
			var h = d.getHours();
			var m = d.getMinutes();
			var p = (h >= 12 ? 'PM' : 'AM');

                        h = ' ';
                        m = ' ';
                        p = ' ';

			// adjust hour to 12-hour format
			if(h > 12) h = h - 12;

			// round minutes to nearest quarter hour
			for(mn in mins){
				if(m <= parseInt(mins[mn])){
					m = parseInt(mins[mn]);
					break;
				}
			}

			// increment hour if we push minutes to next 00
			if(m > 45){
				m = 0;

				switch(h){
					case(11):
						h += 1;
						p = (p == 'AM' ? 'PM' : 'AM');
						break;

					case(12):
						h = 1;
						break;

					default:
						h += 1;
						break;
				}
			}

			// override with current values if applicable
			if(v.length == 8){
				h = parseInt(v.substr(0,2));
				m = parseInt(v.substr(3,2));
				p = v.substr(6);
			}

			// build the new DOM objects
			var output = '';

			output +='<table><tbody><tr><td>';

			output += '<select id="h_' + i + '" class="h timepicker">';
                        var hval;
			for(hr in hrs){
				output += '<option value="' + hrs[hr] + '"';
				if(parseInt(hrs[hr],10) == h) { output += ' selected="selected"'; hval=h; }
				output += '>' + hrs[hr] + '</option>';
			}
			output += '</select></td><td>';

			output += '<select id="m_' + i + '" class="m timepicker">';
                        var mval;
			for(mn in mins){
				output += '<option value="' + mins[mn] + '"';
				if(parseInt(mins[mn],10) == m) { output += ' selected="selected"'; mval = m; }
				output += '>' + mins[mn] + '</option>';
			}
			output += '</select></td><td>';

			output += '<select id="p_' + i + '" class="p timepicker">';
                        var pval;
			for(pp in ap){
				output += '<option value="' + ap[pp] + '"';
				if(ap[pp] == p) { output += ' selected="selected"'; pval= p; }
				output += '>' + ap[pp] + '</option>';
			}
			output += '</select></td></tr></tbody></table>';

			// hide original input and append new replacement inputs
			//Fix bug 'Exception thrown and not caught' - Deepu -Starts
			//$(this).attr('type','hidden').after(output);
			$(this).hide().after(output);
			//Fix bug 'Exception thrown and not caught' - Deepu -Ends

                        //set initial value
			var hval = $('#h_' + i).val();
			var mval = $('#m_' + i).val();
			var pval = $('#p_' + i).val();
			var val = hval + ':' + mval +' '+ pval;
                        $(this).val(val);

		});

		$('select.timepicker').change(function(){
			var i = this.id.substr(2);
			var h = $('#h_' + i).val();
			var m = $('#m_' + i).val();
			var p = $('#p_' + i).val();
			var v = h + ':' + m +' '+ p;
			$('#' + i).val(v);
			//alert(i+' : '+v)
		});

		return this;
	};
})(jQuery);
