# agular-yearselector [![Build Status](https://travis-ci.org/arthurianx/angular-yearselector.png?branch=master)](https://travis-ci.org/arthurianx/angular-yearselector)

> Show busy/loading indicators on any $http or $resource request, or on any promise.

## Demo

[Live Demo](http://arthurianx.github.io/angular-yearselector/demo)

## Getting Started

Install with Bower or download the files directly from the dist folder in the repo.

```bash
bower install agular-yearselector --save
```

Add `dist/angular-yearselector.js` and `dist/angular-yearselector.css` to your index.html.

*IMPORTANT*: At this point, `year-selector` depends on `moment.js`. Please add it as a dependency.

Add `yearSelector` as a module dependency for your module.

```js
angular.module('your_app', ['yearSelector']);
```

## Options

The `year-selector` directive, by default, expects only the model object, which will give you the selected date or range

You can use it like this:

```html
<div year-selector="{model: 'myModel'}"></div>
```
*IMPORTANT*: The model scope variable needs to be entered as a string.

There's also a full set of options:

* `years` - Optional.  Defaults to `10` years. You can input a number of years from which you can select or a scope variable with the length you need. Mind you, if you put 40 years in a really small container it won't look good. This is a TODO.
* `model` - Required.  The scope variable or what have you to pass the selected date / range.
* `attachTo` - Optional.  Defaults to `false`. Accepts selectors with their respective punctuation (`.class`, `#someId`, `someTag`). In case you want to display the selector at a later point, and on another element that did not exist previously, you need to set here a selector on which the yearSelector will attach itself on.
* `attachNow` - Optional (but required when `attachTo` is defined). Defaults to `false`, only `bool`. This is a listener object that when changed from your scope it will attach the yearSelector on the previously set selector.
* `externalCallback` - Optional. Defaults to `false`. On each selection of a year this callback will fire a callback with the selected year, and the whole range if it exists.
* `range` - Optional. Defaults to `true`. There is the option to select a range of years.
* `drag` - Optional. Defaults to `true`. There is the option to enable dragging of the `active` years with the mouse for a easier selection.

A full usage would look like this: `<div year-selector="{model: 'myModel', years: 15, attachTo: '.mySelector', attachNow: triggerAttachment, externalCallback: updateYearSelection, range: false, drag: false}"></div>`


## Delayed / Triggered attachment

I made this a thing because the functionality I needed to use the library requires me to hook it up on a element that appears at a later point, in my case a jQuery driven daterangepicker (:-1:) that is triggered at another point.

The way this works is that it takes from the configuration file a `selector` and when the selector is triggered the directive does a search for that `selector`. If the selector is found, it attaches the directive to it.

If `attachTo` has a selector in it, the directive won't show at all, only on triggering.



## Release History
 * v0.1.0 - Initial release.
