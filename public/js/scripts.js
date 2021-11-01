"use strict";

function initScripts() {
	document.removeEventListener('DOMContentLoaded', initScripts);
	function init() {
		initProgressBar();
	}

	// TODO Название элемента
function initProgressBar() {
	const progressBars = document.querySelectorAll('[data-cpb]');
	if (progressBars.length > 0) {
		progressBars.forEach(progressBar => {
			const setting = progressBar.getAttribute('data-cpb') ? progressBar.getAttribute('data-cpb').split(',') : false;
			if (setting) {
				const width = setting[0]; // ширина круга
				const height = setting[0]; // высота круга
				const barWidth = setting[2]; // ширина прогресс бара
				const radius = (setting[0] / 2) - (setting[2] / 2); // радиус круга
				const outerSize = setting[3]; // радиус внутреннего круга
				const procent = setting[1]; // Процент заполнения круга
				const animate = setting[4] ? true : false; // Анимировать или нет?
				const animateDashArray = Math.round(2 * 3.14 * radius); // Общий размер прогресс линии
				const strokeDashOffset = Math.round(animateDashArray - (animateDashArray * (procent / 100))); // Размер заполнения прогресс линии

				const elementNumber = progressBar.querySelector('[data-cpb-number]');
				const circle = progressBar.querySelector('circle');
				const outer = progressBar.querySelector('[data-cpb-outer]');
				const inner = progressBar.querySelector('[data-cpb-inner]');

				progressBar.style.width = width + 'px';
				progressBar.style.height = height + 'px';

				if (elementNumber) {
					elementNumber.innerHTML = procent + '%';
				}

				if (outer) {
					outer.style.borderWidth = outerSize + 'px';
				}

				if (outer) {

					if (barWidth > outerSize) {
						inner.style.width = width - (2 * barWidth) + 'px';
						inner.style.height = height - (2 * barWidth) + 'px';
						inner.style.margin = `${barWidth - outerSize}px 0 0 ${barWidth - outerSize}px`;
					} else if (barWidth <= outerSize) {
						inner.style.width = width - (2 * outerSize) + 'px';
						inner.style.height = height - (2 * outerSize) + 'px';
					}

				}

				if (circle) {
					//circle.setAttribute('style', `cx="${width / 2}" cy="${width / 2}" r="${radius}"`);
					circle.setAttribute('cx', width / 2);
					circle.setAttribute('cy', height / 2);
					circle.setAttribute('r', radius);
					circle.setAttribute('stroke-width', barWidth);
					circle.setAttribute('stroke-dasharray', animateDashArray);
					circle.setAttribute('stroke-dashoffset', strokeDashOffset);

				}

			}
		});
	}
}
// ? END Название элемента

	init();
}
document.addEventListener('DOMContentLoaded', initScripts);
