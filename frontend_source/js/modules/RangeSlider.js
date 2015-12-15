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
		document.getElementsByClassName('payment__top')[0].innerHTML = vars().top;

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

		if ( ( vars().top - vars().average ) < 4 ) {
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

	var init = function() {

		slider();
		changeAmount();
		moveProgress();
		placeMilestones();

	};

	return {
		init: init,
	};

}());