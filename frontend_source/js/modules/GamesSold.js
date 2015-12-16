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

	};

	var unlock = function(num) {
		document.querySelectorAll('.sold__item--' + num)[0].classList.add('sold__check--active');
		document.querySelectorAll('.sold__item--' + num + ' .sold__check')[0].classList.add('sold__check--active');
		document.querySelectorAll('.sold__item--' + num + ' .sold__value')[0].classList.add('sold__value--inactive');

		// Hide percentage
		document.querySelectorAll('.sold__circle--' + num)[0].classList.add('sold__circle--inactive');

		document.querySelectorAll('.sold__item--' + num)[0].classList.remove('sold__item--active');
		( num < 5 ) 
			? document.querySelectorAll('.sold__item--' + (num + 1))[0].classList.add('sold__item--active')
			: num;
	};

	var unlockText = function() {

		// Hide & show text
		if ( totalSells < 10000 ) {
			document.getElementById('sold__subtitle--1').classList.remove('sold__subtitle--inactive');
			document.getElementById('sold__description--1').classList.remove('sold__description--inactive');
		}

		else if ( totalSells >= 10000 && totalSells < 25000 ) {
			document.getElementById('sold__subtitle--2').classList.remove('sold__subtitle--inactive');
			document.getElementById('sold__description--2').classList.remove('sold__description--inactive');
		}

		else if ( totalSells >= 25000 && totalSells < 50000 ) {
			document.getElementById('sold__subtitle--3').classList.remove('sold__subtitle--inactive');
			document.getElementById('sold__description--3').classList.remove('sold__description--inactive');
		}

		else if ( totalSells >= 50000 && totalSells < 80000 ) {
			document.getElementById('sold__subtitle--4').classList.remove('sold__subtitle--inactive');
			document.getElementById('sold__description--4').classList.remove('sold__description--inactive');
		}

		else if ( totalSells >= 80000 ) {
			document.getElementById('sold__subtitle--5').classList.remove('sold__subtitle--inactive');
			document.getElementById('sold__description--5').classList.remove('sold__description--inactive');
		}


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

	var moveVideos = function() {

		document.getElementsByClassName('sold__button--left')[0]
			.addEventListener('click', function() {

			var videoNum = Number( document.getElementsByClassName('sold__videosContainer')[0].classList[1].substr(23, 1) );
			if ( videoNum > 1 ) {
				document.getElementsByClassName('sold__videosContainer')[0].classList.remove('sold__videosContainer--' + videoNum);
				document.getElementsByClassName('sold__videosContainer')[0].classList.add('sold__videosContainer--' + (videoNum - 1) );
			}

		});

		document.getElementsByClassName('sold__button--right')[0]
			.addEventListener('click', function() {

				var videoNum = Number( document.getElementsByClassName('sold__videosContainer')[0].classList[1].substr(23, 1) );
				if ( videoNum < 5 ) {
					document.getElementsByClassName('sold__videosContainer')[0].classList.remove('sold__videosContainer--' + videoNum);
					document.getElementsByClassName('sold__videosContainer')[0].classList.add('sold__videosContainer--' + (videoNum + 1) );
				}

		});

	};

	var createSvg = function( num, percent ) {

		percent = percent * 2 * 0.01;

		var canvas = document.getElementById('canvas-' + num);
      var context = canvas.getContext('2d');
      var centerX = canvas.width / 2;
      var centerY = canvas.height / 2;
      var radius = 37;

      context.beginPath();
      context.arc(centerX, centerY, radius, 0, percent * Math.PI, false);
      context.lineWidth = 6;
      context.strokeStyle = '#CCC';
      context.stroke();

	};

	var calcPercentage = function( totalSells, value, num ) {

		var percent = (totalSells / value) * 100;
		createSvg( num, percent );

		return Math.round(percent) + '%';

	};

	var sellsPercentage = function() {

		if ( totalSells < 10000 ) {
			document.querySelectorAll('.sold__circle--1 .sold__percentage')[0].innerHTML = calcPercentage( totalSells, 10000, 1 );
		}

		if ( totalSells < 25000 ) {
			document.querySelectorAll('.sold__circle--2 .sold__percentage')[0].innerHTML = calcPercentage( totalSells, 25000, 2 );
		}

		if ( totalSells < 50000 ) {
			document.querySelectorAll('.sold__circle--3 .sold__percentage')[0].innerHTML = calcPercentage( totalSells, 50000, 3 );
		}

		if ( totalSells < 80000 ) {
			document.querySelectorAll('.sold__circle--4 .sold__percentage')[0].innerHTML = calcPercentage( totalSells, 80000, 4 );
		}

		if ( totalSells < 120000 ) {
			document.querySelectorAll('.sold__circle--5 .sold__percentage')[0].innerHTML = calcPercentage( totalSells, 120000, 5 );
		}

	};

	var init = function() {

		gamesSold();
		unlockVideos();
		unlockText();
		moveVideos();
		sellsPercentage();

	};

	return {
		init: init,
	};

}());