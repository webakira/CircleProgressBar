"use strict";

function initScripts() {
	document.removeEventListener('DOMContentLoaded', initScripts);
	function init() {
		initBreadcrumbsSlider();
	}

	// TODO Название элемента

// ? END Название элемента

	init();
}
document.addEventListener('DOMContentLoaded', initScripts);
