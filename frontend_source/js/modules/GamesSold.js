var App = App || {};		// If App is not defined make it an empty object

App.GamesSold = (function() {

	var totalSells = '120000';

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

	};

	var unlock = function(num) {
		document.querySelectorAll('.sold__item--' + num)[0].classList.add('sold__check--active');
		document.querySelectorAll('.sold__item--' + num + ' .sold__check')[0].classList.add('sold__check--active');
		document.querySelectorAll('.sold__item--' + num + ' .sold__value')[0].classList.add('sold__value--inactive');

		document.querySelectorAll('.sold__item--' + num)[0].classList.remove('sold__item--active');
		( num < 5 ) 
			? document.querySelectorAll('.sold__item--' + (num + 1))[0].classList.add('sold__item--active')
			: num;
	};

	var unlockVideos = function() {

		if ( totalSells < 10000 ) {
			document.querySelectorAll('.sold__item--1')[0].classList.add('sold__item--active');
		}

		if ( totalSells >= 10000 ) {
			unlock(1);
		}

		if ( totalSells >= 25000 ) {
			unlock(2);
		}

		if ( totalSells >= 50000 ) {
			unlock(3);
		}

		if ( totalSells >= 80000 ) {
			unlock(4);
		}

		if ( totalSells >= 120000 ) {
			unlock(5);
		}

	};


	var init = function() {

		gamesSold();
		unlockVideos();

	};

	return {
		init: init,
	};

}());