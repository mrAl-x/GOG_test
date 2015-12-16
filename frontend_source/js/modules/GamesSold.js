var App = App || {};		// If App is not defined make it an empty object

App.GamesSold = (function() {

	var totalSells = '22576';

	var gamesSold = function() {

		var counter = document.getElementsByClassName('sold__number');
		var zeroes = 6 - totalSells.length;

		while ( zeroes > 0 ) {
			totalSells = '0' + totalSells;
			zeroes--;
		}
		
		for ( var i = 1; i <= 6; i++ ) {
			document.getElementsByClassName('sold__number--' + i )[0].innerHTML = totalSells[i - 1];

			if ( totalSells[i - 1] === '1' ) {
				document.getElementsByClassName('sold__number--' + i )[0].style.left = '6px';
			}
		}

	}


	var init = function() {

		gamesSold();

	};

	return {
		init: init,
	};

}());