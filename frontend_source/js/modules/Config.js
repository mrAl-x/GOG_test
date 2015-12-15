var App = App || {};		// If App is not defined make it an empty object

App.Config = (function() {

	const limit = '23:59:59';

	var countdown = function() {
		
		var time = limit.split(':');
		var hh = time[0],
		mm     = time[1],
		ss     = time[2];

		setInterval( function() {

			(ss < 10) ? ss = '0' + ss : ss;
			document.getElementById('countdown').innerHTML = hh + ':' + mm + ':' + ss;

			if ( ss == '00' ) {
				ss = 59;

				if ( mm !== '00' ) {
					mm = Number(mm) - 1;
					(mm < 10) ? mm = '0' + mm : mm;
				}

				else {

					mm = 59;

					if ( hh !== '00' ) {
						hh = Number(hh) - 1;
						(hh < 10) ? hh = '0' + hh : hh;
					}

					else {
						hh = 00;
					}
				}
			}

			else {
				ss--;
			}

		}, 1000);

	};

	var init = function() {

		countdown();

	};

	return {
		init: init,
	};

}());