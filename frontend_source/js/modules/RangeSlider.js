var App = App || {};		// If App is not defined make it an empty object

App.RangeSlider = (function() {

	var vars = function() {
		var slider = document.getElementById('price'),
		amount     = document.getElementById('amount'),
		tooltip    = document.getElementsByClassName('payment__tooltip')[0],
		progress   = document.getElementsByClassName('payment__progressContainer')[0];

		return {
			slider  : slider,
			amount  : amount,
			tooltip : tooltip,
			progress: progress,
			average : '7.67',
			top     : '18.31'
		};
	};

	var slider = function() {
		var width,
			 percent,
			 newPlace;

		vars().slider.addEventListener('input', function() {

			// Always display two decimal places
			vars().amount.value = parseFloat(this.value).toFixed(2);
			moveProgress()

		});

	};

	var milestoneValue = function() {

		document.getElementsByClassName('payment__average')[0].innerHTML = vars().average;
		document.getElementsByClassName('payment__average')[1].innerHTML = vars().average;
		document.getElementsByClassName('payment__top')[0].innerHTML = vars().top;
		document.getElementsByClassName('payment__top')[1].innerHTML = vars().top;

	};

	var defaultValue = function() {
		document.getElementById('price').value = vars().top;
		document.getElementById('amount').value = vars().top;
		moveProgress();
	};

	var placeMilestones = function() {

		var top = document.querySelectorAll('.payment__milestone--top .payment__milestone')[0],
		average = document.querySelectorAll('.payment__milestone--average .payment__milestone')[0],
		textTop = document.querySelectorAll('.payment__milestone--top .payment__milestonesText')[0],
		textAverage = document.querySelectorAll('.payment__milestone--average .payment__milestonesText')[0];

		milestoneValue();

		// Range width with the slide handle offset
		var width = vars().slider.clientWidth - 25;

		// Figure out placement percentage between left and right of input
		topPercentage     = (vars().top - vars().slider.getAttribute("min")) / (vars().slider.getAttribute("max") - vars().slider.getAttribute("min"));
		averagePercentage = (vars().average - vars().slider.getAttribute("min")) / (vars().slider.getAttribute("max") - vars().slider.getAttribute("min"));
		

		var topPos = width * parseFloat( topPercentage ).toFixed(3) + 10;
		var averagePos = width * parseFloat( averagePercentage ).toFixed(3) + 10;

		top.style.left = topPos + 'px';
		average.style.left = averagePos + 'px';

		textTop.style.left = topPos + 'px';
		textAverage.style.left = averagePos + 'px';

		// Lifts the top milestone text
		if ( ( vars().top - vars().average ) < 5 ) {
			textTop.style.top = '-28px';
		}

	};

	var moveTooltip = function( newPos ) {

		vars().tooltip.style.left = newPos + 'px';

	};

	var moveProgress = function( newPos ) {

		// Range width with the slide handle offset
		width = vars().slider.clientWidth - 19.5;

		// Figure out placement percentage between left and right of input
		percent = (vars().slider.value - vars().slider.getAttribute("min")) / (vars().slider.getAttribute("max") - vars().slider.getAttribute("min"));

		newPos = width * parseFloat( percent ).toFixed(3) + 10;

		vars().progress.style.width = newPos + 'px';

		if ( vars().amount.value > 5 && vars().amount.value <= 47 ) {
			moveTooltip( newPos );
		}

		unlockGames();

	};

	var changeAmount = function() {

		amount.addEventListener('change', function() {

			( amount.value < '0.99' ) ? amount.value = '0.99' : amount.value;
			vars().slider.value = amount.value;

			if ( amount.value <= 5 ) {
				vars().tooltip.style.left = '72.3px';
			}

			else if ( amount.value >= 47 ) {
				vars().tooltip.style.left = '724.1px';
			}

			moveProgress();

		});

	};

	var unlockGames = function() {

		if ( vars().amount.value < Number(vars().average) ) {
			document.querySelectorAll('.featuring__item--middle .featuring__gameCover')[0].classList.add('featuring__gameCover--inactive');
			document.querySelectorAll('.featuring__item--right .featuring__gameCover')[0].classList.add('featuring__gameCover--inactive');

			document.querySelectorAll('.featuring__item--middle .featuring__message')[0].classList.remove('featuring__message--check');
			document.querySelectorAll('.featuring__item--right .featuring__message')[0].classList.remove('featuring__message--check');


		}

		else if ( vars().amount.value >= Number(vars().average) && vars().amount.value < Number(vars().top) ) {
			document.querySelectorAll('.featuring__item--middle .featuring__gameCover')[0].classList.remove('featuring__gameCover--inactive');
			document.querySelectorAll('.featuring__item--right .featuring__gameCover')[0].classList.add('featuring__gameCover--inactive');

			document.querySelectorAll('.featuring__item--middle .featuring__message')[0].classList.add('featuring__message--check');
			document.querySelectorAll('.featuring__item--right .featuring__message')[0].classList.remove('featuring__message--check');
		}

		else if ( vars().amount.value >= Number(vars().top) ) {
			document.querySelectorAll('.featuring__item--middle .featuring__gameCover')[0].classList.remove('featuring__gameCover--inactive');
			document.querySelectorAll('.featuring__item--right .featuring__gameCover')[0].classList.remove('featuring__gameCover--inactive');	

			document.querySelectorAll('.featuring__item--middle .featuring__message')[0].classList.add('featuring__message--check');
			document.querySelectorAll('.featuring__item--right .featuring__message')[0].classList.add('featuring__message--check');
		}

	};

	var init = function() {

		slider();
		changeAmount();
		moveProgress();
		placeMilestones();
		defaultValue();
		unlockGames();

	};

	return {
		init: init,
	};

}());