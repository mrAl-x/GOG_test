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

	var placeMilestones = function() {



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