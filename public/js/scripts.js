"use strict";

function initScripts() {
	document.removeEventListener('DOMContentLoaded', initScripts);
	function init() {
		initProgressBar();
	}

	// TODO Круглый прогресс бар
function initProgressBar() {
	const progressBars = document.querySelectorAll('[data-cpb]');
	if (progressBars.length > 0) {

		progressBars.forEach(progressBar => {
			const setting = progressBar.getAttribute('data-cpb') ? progressBar.getAttribute('data-cpb').split(',') : false;
			if (setting) {
				const size = setting[0]; // размер круга
				const barWidth = setting[2]; // ширина прогресс бара
				const radius = (size / 2) - (barWidth / 2); // радиус круга
				const outerSize = setting[3]; // радиус внутреннего круга
				const procent = setting[1]; // Процент заполнения круга
				const strokeDashArray = Math.round(2 * 3.14 * radius); // Общий размер прогресс линии
				const strokeDashOffset = Math.round(strokeDashArray - (strokeDashArray * (procent / 100))); // Размер заполнения прогресс линии

				const elementNumber = progressBar.querySelector('[data-cpb-number]');
				const circle = progressBar.querySelector('circle');
				const outer = progressBar.querySelector('[data-cpb-outer]');
				const inner = progressBar.querySelector('[data-cpb-inner]');
				const animate = progressBar.getAttribute('data-cpb-animate') ? progressBar.getAttribute('data-cpb-animate').split(',') : false;

				progressBar.style.width = size + 'px';
				progressBar.style.height = size + 'px';

				if (elementNumber) {
					elementNumber.innerHTML = procent + '%';
					if (animate) {
						elementNumber.innerHTML = '0%';
					}
				}

				if (outer) {
					outer.style.borderWidth = outerSize + 'px';

					if (barWidth > outerSize) {
						inner.style.width = size - (2 * barWidth) + 'px';
						inner.style.height = size - (2 * barWidth) + 'px';
						inner.style.margin = `${barWidth - outerSize}px 0 0 ${barWidth - outerSize}px`;
					} else if (barWidth <= outerSize) {
						inner.style.width = size - (2 * outerSize) + 'px';
						inner.style.height = size - (2 * outerSize) + 'px';
					}

				}

				if (circle) {
					circle.setAttribute('cx', size / 2);
					circle.setAttribute('cy', size / 2);
					circle.setAttribute('r', radius);
					circle.setAttribute('stroke-width', barWidth);
					circle.setAttribute('stroke-dasharray', strokeDashArray);
					circle.setAttribute('stroke-dashoffset', strokeDashOffset);
					if (animate) {
						circle.setAttribute('stroke-dashoffset', strokeDashArray);
					}
				}

				if (animate) {
					const animTimeout = animate[1] != '' ? animate[1] : 0;
					const animDuration = animate[0] != '' ? animate[0] : 3000;
					const animName = animate[2] != '' ? animate[2] : '';
					setTimeout(() => {
						animation({
							duration: animDuration,
							timing(timeFraction) {
								return typeAnimation(animName, timeFraction);
							},
							draw(progress) {
								elementNumber.innerHTML = Math.round(procent * progress) + '%';
								circle.setAttribute('stroke-dashoffset', Math.round((strokeDashArray - (progress * (strokeDashArray - strokeDashOffset)))));
							}
						});
					}, animTimeout);
				}
			}
		});

		// ? START Функция анимации
		function animation(options) {

			var start = performance.now();

			requestAnimationFrame(function animate(time) {
				// timeFraction от 0 до 1
				var timeFraction = (time - start) / options.duration;
				if (timeFraction > 1) timeFraction = 1;

				// текущее состояние анимации
				var progress = options.timing(timeFraction)

				options.draw(progress);

				if (timeFraction < 1) {
					requestAnimationFrame(animate);
				}

			});
		}
		// ? END Функция анимации

		// ? START Формулы типа анимации
		function typeAnimation(name, x) {
			const PI = 3.14;

			function easeInSine(x) {
				return 1 - Math.cos((x * PI) / 2);
			}
			function easeOutSine(x) {
				return Math.sin((x * PI) / 2);
			}
			function easeInOutSine(x) {
				return -(Math.cos(PI * x) - 1) / 2;
			}
			function easeInQuad(x) {
				return x * x;
			}
			function easeOutQuad(x) {
				return 1 - (1 - x) * (1 - x);
			}
			function easeInOutQuad(x) {
				return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
			}

			function easeInCubic(x) {
				return x * x * x;
			}
			function easeOutCubic(x) {
				return 1 - Math.pow(1 - x, 3);
			}
			function easeInOutCubic(x) {
				return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
			}
			function easeInQuart(x) {
				return x * x * x * x;
			}
			function easeOutQuart(x) {
				return 1 - Math.pow(1 - x, 4);
			}
			function easeInOutQuart(x) {
				return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
			}

			if (name == 'easeInSine') {
				return easeInSine(x);
			}
			if (name == 'easeOutSine') {
				return easeOutSine(x);
			}
			if (name == 'easeInOutSine') {
				return easeInOutSine(x);
			}
			if (name == 'easeInQuad') {
				return easeInQuad(x);
			}
			if (name == 'easeOutQuad') {
				return easeOutQuad(x);
			}
			if (name == 'easeInOutQuad') {
				return easeInOutQuad(x);
			}

			if (name == 'easeInCubic') {
				return easeInCubic(x);
			}
			if (name == 'easeOutCubic') {
				return easeOutCubic(x);
			}
			if (name == 'easeInOutCubic') {
				return easeInOutCubic(x);
			}
			if (name == 'easeInQuart') {
				return easeInQuart(x);
			}
			if (name == 'easeOutQuart') {
				return easeOutQuart(x);
			}
			if (name == 'easeInOutQuart') {
				return easeInOutQuart(x);
			}

			return x;

		}
		// ? END Формулы типа анимации
	}
}
// TODO END Круглый прогресс бар

	init();
}
document.addEventListener('DOMContentLoaded', initScripts);
