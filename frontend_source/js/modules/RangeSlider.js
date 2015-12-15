var App = App || {};		// If App is not defined make it an empty object

App.RangeSlider = (function() {

	var dom = function() {
		var slider = document.getElementById('price'),
		amount     = document.getElementById('amount'),
		tooltip    = document.getElementsByClassName('payment__tooltip')[0];

		return {
			slider : slider,
			amount : amount,
			tooltip: tooltip
		};
	};

	var slider = function() {
		var elem,
			 width,
			 percent,
			 newPlace;

		dom().slider.addEventListener('input', function() {

			elem = this;
			// Always display two decimal places
			dom().amount.value = parseFloat(elem.value).toFixed(2);
			moveTooltip( elem, width );

		});

	};

	var changeAmount = function() {

		amount.addEventListener('change', function() {
			dom().slider.value = amount.value;
		});

	};

	var moveTooltip = function( elem, width ) {

		// dom().tooltip.style.left = dom().amount.value + 'px';

		// Range width
		width = elem.clientWidth - 20;

		// Figure out placement percentage between left and right of input
		percent = (elem.value - elem.getAttribute("min")) / (elem.getAttribute("max") - elem.getAttribute("min"));

		newPos = width * parseFloat( percent ).toFixed(3);

		dom().tooltip.style.left = newPos + 'px';
		dom().tooltip.style.marginLeft = '-56px';

	};

	var init = function() {

		slider();
		changeAmount();
		// moveTooltip();

	};

	return {
		init: init,
	};

}());