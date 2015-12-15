var App = App || {};		// If App is not defined make it an empty object

App.RangeSlider = (function() {

	var dom = function() {
		var slider = document.getElementById('price'),
		amount     = document.getElementById('amount'),
		tooltip    = document.getElementsByClassName('payment__tooltip')[0],
		progress   = document.getElementsByClassName('payment__progressContainer')[0];

		return {
			slider  : slider,
			amount  : amount,
			tooltip : tooltip,
			progress: progress
		};
	};

	var moveProgress = function( newPos ) {

		// Range width with the slide handle offset
		width = dom().slider.clientWidth - 19.5;

		// Figure out placement percentage between left and right of input
		percent = (dom().slider.value - dom().slider.getAttribute("min")) / (dom().slider.getAttribute("max") - dom().slider.getAttribute("min"));

		newPos = width * parseFloat( percent ).toFixed(3) + 10;

		dom().progress.style.width = newPos + 'px';


		if ( dom().amount.value > 5 && dom().amount.value <= 47 ) {
			moveTooltip( newPos );
		}

	};

	var moveTooltip = function( newPos ) {

		dom().tooltip.style.left = newPos + 'px';

	};

	var slider = function() {
		var width,
			 percent,
			 newPlace;

		dom().slider.addEventListener('input', function() {

			// Always display two decimal places
			dom().amount.value = parseFloat(this.value).toFixed(2);
			moveProgress()

		});

	};

	var changeAmount = function() {

		amount.addEventListener('change', function() {

			( amount.value < '0.99' ) ? amount.value = '0.99' : amount.value;
			dom().slider.value = amount.value;
			moveProgress();

		});

	};

	var init = function() {

		slider();
		changeAmount();
		moveProgress();

	};

	return {
		init: init,
	};

}());