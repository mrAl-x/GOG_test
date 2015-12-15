var App = App || {};		// If App is not defined make it an empty object

App.Config = (function() {

	const limit = '24:00:12';

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
				}

				else {

					mm = 59;

					if ( hh !== '00' ) {
						hh = Number(hh) - 1;
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