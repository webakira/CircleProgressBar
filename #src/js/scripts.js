"use strict";

function initScripts() {
	document.removeEventListener('DOMContentLoaded', initScripts);
	function init() {
		initProgressBar();
	}

	@@include('function.js')

	init();
}
document.addEventListener('DOMContentLoaded', initScripts);
