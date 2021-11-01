"use strict";

function initScripts() {
	document.removeEventListener('DOMContentLoaded', initScripts);
	function init() {
		initBreadcrumbsSlider();
	}

	@@include('function.js')

	init();
}
document.addEventListener('DOMContentLoaded', initScripts);
