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
					if (strokeDashArray == strokeDashOffset) {
						circle.style.display = 'none';
					}
					if (animate) {
						circle.setAttribute('stroke-dashoffset', strokeDashArray);
						circle.style.display = 'none';
					}
				}

				if (animate && strokeDashArray != strokeDashOffset) {
					const animTimeout = animate[1] != '' ? animate[1] : 0;
					const animDuration = animate[0] != '' ? animate[0] : 3000;
					const animName = animate[2] != '' ? animate[2] : '';
					setTimeout(() => {
						circle.style.display = 'block';
						animation({
							duration: animDuration,
							timing(timeFraction) {
								return typeAnimation(animName, timeFraction);
							},
							draw(progress) {
								if (Math.round(procent * progress) > 100) {
									elementNumber.innerHTML = '100%';
								} else if (Math.round(procent * progress) < 0) {
									elementNumber.innerHTML = '0%';
								} else {
									elementNumber.innerHTML = Math.round(procent * progress) + '%';
								}

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
			const c1 = 1.70158;
			const c2 = c1 * 1.525;
			const c3 = c1 + 1;
			const c4 = (2 * PI) / 3;
			const c5 = (2 * PI) / 4.5;
			const n1 = 7.5625;
			const d1 = 2.75;

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

			function easeInQuint(x) {
				return x * x * x * x * x;
			}
			function easeOutQuint(x) {
				return 1 - Math.pow(1 - x, 5);
			}
			function easeInOutQuint(x) {
				return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
			}
			function easeInExpo(x) {
				return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
			}
			function easeOutExpo(x) {
				return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
			}
			function easeInOutExpo(x) {
				return x === 0
					? 0
					: x === 1
						? 1
						: x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
							: (2 - Math.pow(2, -20 * x + 10)) / 2;
			}

			function easeInCirc(x) {
				return 1 - Math.sqrt(1 - Math.pow(x, 2));;
			}
			function easeOutCirc(x) {
				return Math.sqrt(1 - Math.pow(x - 1, 2));;
			}
			function easeInOutCirc(x) {
				return x < 0.5
					? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
					: (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
			}
			function easeInBack(x) {
				return c3 * x * x * x - c1 * x * x;
			}
			function easeOutBack(x) {
				return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
			}
			function easeInOutBack(x) {
				return x < 0.5
					? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
					: (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
			}

			function easeInElastic(x) {
				return x === 0
					? 0
					: x === 1
						? 1
						: -(Math.pow(2, 10 * x - 10)) * Math.sin((x * 10 - 10.75) * c4);
			}
			function easeOutElastic(x) {
				return x === 0
					? 0
					: x === 1
						? 1
						: Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
			}
			function easeInOutElastic(x) {
				return x === 0
					? 0
					: x === 1
						? 1
						: x < 0.5
							? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
							: (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
			}
			function easeInBounce(x) {
				return 1 - easeOutBounce(1 - x);
			}
			function easeOutBounce(x) {
				if (x < 1 / d1) {
					return n1 * x * x;
				} else if (x < 2 / d1) {
					return n1 * (x -= 1.5 / d1) * x + 0.75;
				} else if (x < 2.5 / d1) {
					return n1 * (x -= 2.25 / d1) * x + 0.9375;
				} else {
					return n1 * (x -= 2.625 / d1) * x + 0.984375;
				}
			}
			function easeInOutBounce(x) {
				return x < 0.5
					? (1 - easeOutBounce(1 - 2 * x)) / 2
					: (1 + easeOutBounce(2 * x - 1)) / 2;
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

			if (name == 'easeInQuint') {
				return easeInQuint(x);
			}
			if (name == 'easeOutQuint') {
				return easeOutQuint(x);
			}
			if (name == 'easeInOutQuint') {
				return easeInOutQuint(x);
			}
			if (name == 'easeInExpo') {
				return easeInExpo(x);
			}
			if (name == 'easeOutExpo') {
				return easeOutExpo(x);
			}
			if (name == 'easeInOutExpo') {
				return easeInOutExpo(x);
			}

			if (name == 'easeInCirc') {
				return easeInCirc(x);
			}
			if (name == 'easeOutCirc') {
				return easeOutCirc(x);
			}
			if (name == 'easeInOutCirc') {
				return easeInOutCirc(x);
			}
			if (name == 'easeInBack') {
				return easeInBack(x);
			}
			if (name == 'easeOutBack') {
				return easeOutBack(x);
			}
			if (name == 'easeInOutBack') {
				return easeInOutBack(x);
			}

			if (name == 'easeInElastic') {
				return easeInElastic(x);
			}
			if (name == 'easeOutElastic') {
				return easeOutElastic(x);
			}
			if (name == 'easeInOutElastic') {
				return easeInOutElastic(x);
			}
			if (name == 'easeInBounce') {
				return easeInBounce(x);
			}
			if (name == 'easeOutBounce') {
				return easeOutBounce(x);
			}
			if (name == 'easeInOutBounce') {
				return easeInOutBounce(x);
			}

			return x;

		}
		// ? END Формулы типа анимации
	}
}
// TODO END Круглый прогресс бар