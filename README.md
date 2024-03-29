# Circle Progress Bar #

Круглый прогресс бар который можно анимировать.

[Посмотреть демо](https://webakira.github.io/CircleProgressBar/public/index.html)



## HTML разметка ##

```html
<div>
	
	<div class="skill" data-cpb="200,100,20,10" data-cpb-animate="3000,0,easeInOutBack">
		<div class="skill__outer" data-cpb-outer>
			<div class="skill__inner" data-cpb-inner>
				<div class="skill__number" data-cpb-number>
				</div>
			</div>
		</div>
		<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
			<circle></circle>
		</svg>
	</div>
	
</div>
```

### Описание аттрибутов ###

__data-cpb__="size,percent,innerBarSize,outerBarSize"

Это обязательный аттрибут, для работы прогресс бара. Все его значения необходимо заполнить.

* *size* - Высота и ширина прогресс бара
* *percent* - Процент заполнения прогресс бара
* *innerBarSize* - Ширина линии, которая будет заполняться
* *outerBarSize* - Ширина линии, которая будет всегда заполнена на 100%

__data-cpb-outer__

Это обязательный аттрибут. Необходим для просчета внутренней ширины и высоты, учитывая ширину *outerBarSize*.

__data-cpb-inner__

Это обязательный аттрибут. Необходим для просчета внутренней ширины и высоты, учитывая ширину *innerBarSize* и *outerBarSize*.

__data-cpb-number__

Это обязательный аттрибут. Сюда вставляются проценты *percent*.

__data-cpb-animate__="duration,delay,property"

Это НЕ обязательный аттрибут. Отвечает за анимированное заполнени.

* *duration* - Длительность анимации
* *delay* - Задержка перед стартом
* *property* - Тип анимации (Типы анимации смотрите ниже)

__data-cpb-animate-stop__

Это НЕ обязательный аттрибут. Отвечает за [запуск анимации по событию](#JS-Запуск-анимации-по-событию).

#### Типы анимации ####

[Примеры всех анимаций](https://easings.net/ru)

* easeInSine
* easeOutSine
* easeInOutSine
* easeInQuad
* easeOutQuad
* easeInOutQuad
* easeInCubic
* easeOutCubic
* easeInOutCubic
* easeInQuart
* easeOutQuart
* easeInOutQuart
* easeInQuint
* easeOutQuint
* easeInOutQuint
* easeInExpo
* easeOutExpo
* easeInOutExpo
* easeInCirc
* easeOutCirc
* easeInOutCirc
* easeInBack
* easeOutBack
* easeInOutBack
* easeInElastic
* easeOutElastic
* easeInOutElastic
* easeInBounce
* easeOutBounce
* easeInOutBounce

## JS Запуск анимации по событию ##

Часто бывают задачи, когда нужно запустить анимацию по определённому событию. 

Для этого:
1. Добавляем аттрибут __data-cpb-animate-stop__ к нужному прогрессбару;
2. При срабатывагии нужного события, удаляем, у конкретного прогрессбара, аттрибут __data-cpb-animate-stop__;
3. Запускаем функцию прогрессбара, только для текущего элемента;

> __! Важно__ - Функция прогрессбара *progressBarStart(array)* принимает только массивы.

 __Выглядеть это будет примерно так:__

### HTML ###

```html
	<div class="skill" data-cpb-animate-stop data-cpb="200,100,20,10" data-cpb-animate="3000,0,easeInOutBack">
		...
	</div>
```

### JS ###

```javascript
	const startElements = document.querySelectorAll('[data-cpb-animate-stop]');
	if (startElements.length > 0) {
		startElements.forEach(el => {
			el.addEventListener('click', function (e) {
				if (el.getAttribute('data-cpb-animate-stop') != null) {
					el.removeAttribute('data-cpb-animate-stop');
					progressBarStart([el]);
				}
			});
		});
	}
```	

---

> ## Структура GULP ##
> ### Как запустить ###
> 1. Устанавливаем Node.js
> 2. Копируем все файлы из репозитория на ваш PC
> 3. Запускаем консоль в той папке, куда вы скачали все файлы
> 4. Устанавливаем все необходимые пакеты с помощью команды: __npm i__
> 5. Запускаем сборку с помощью команды: __gulp__
> 
> ### Иерархия файлов ###
> * __#src__
>   * __fonts__
>   * __html__
>     * _head.html
>     * _index.html
>     * _scripts.html
>   * __img__
>   * __js__
>     * plugins
>     * function.js
>     * scripts.js
>   * __scss__
>     * __basis__
>       * _FONTS.scss
>       * _MIXINS.scss
>       * _NULL.scss
>     * __plugins__
>     * element-theme.scss
>     * element.scss
>     * visual-page.scss
>     * style.scss
>   * index.html
> * __dist__
> * __public__
> * __node_modules__
> * .gitignore
> * README.md
> * gulpfile.js
> * package-lock.json
> * package.json
> > ---
> > #### #src ####
> > Папка __#src__ предназначина для удобной разработики элементов для будующих проектов. Именно из этой папки собираются папки __dist__ и __public__
> > 1. __fonts__
> >
> >     Здесь размещен основной шрифт, который я использую.
> >
> > 2. __html__
> > 
> >     Сюда входят три файла, которые подключаются в файле __index.html__
> >     * _head.html - Тут содержание тега <head>, а также подключение css файлов
> >     * _index.html - Тут вся разметка элемента
> >     * _scripts.html - Тут подключаю все необходимые скрипты
> >
> > 3. __img__
> > 
> >     Тут могут находится необходимые для работы элемента изображения
> >
> > 4. __js__
> > 
> >     Сюда входят два файла и папка для плагинов
> >     * plugins - Папка для хранения неободимых плагинов
> >     * function.js - Функция, где описана логика работы созданного элемента
> >     * scripts.js - Запуск js кода
> >
> > 5. __scss__
> > 
> >     Стили для демонстрации и работы элемента
> >     * __basis__ - Папка для основных настроек страницы
> >       * _FONTS.scss - Подключение шрифта
> >       * _MIXINS.scss - Подключение миксинов
> >       * _NULL.scss - Обнуление стилей
> >     * __plugins__ - Папка для хранения неободимых плагинов
> >     * element-theme.scss - Стили для визульного оформления элемента
> >     * element.scss - Стили, необходимые для работы элемента
> >     * visual-page.scss - Стили, для оформления страницы демонстрации
> >     * style.scss - Тут подключаюстся все вышеперечисленные стили
> >
> > 5. __index.html__
> > 
> >     Основная HTML разметка всей страницы. Тут подключаются три файла: _head.html, _index.html, _scripts.html.
> > ---
> > #### dist ####
> > Папка __dist__ предназначина для удобного копирования, лишь необходимых для работы элемента, файлов.
> >
> > element-theme.scss - Эти стили можно не копировать, если хотим реализовать полностью свой визуальный стиль. 
> >
> > ---
> > #### public ####
> > Папка __public__ предназначина для демонстрации работы элемента.
> >
> > ---
> > #### Остальные файлы ####
> > Нижеперечисленные файлы предназначены для запуска GULP сборки и/или github. Для работы элемента они не нужны. Все необходимые файлы для работы элемента находятся в папке __dist__ .
> > * __node_modules__
> > * .gitignore
> > * README.md
> > * gulpfile.js
> > * package-lock.json
> > * package.json
> > ---
