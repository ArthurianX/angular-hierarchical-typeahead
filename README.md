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

Add `yearSelector` as a module dependency for your module.

```js
angular.module('your_app', ['yearSelector']);
```

## Options

The `year-selector` directive expects either a template or a configuration object.

In other words.  You may do this:

```html
<div year-selector="mySmt"></div>
```

or this:

```html
<div year-selector="{}"></div>
```
* `message` - Optional.  Defaults to 'Please Wait...'.  The message to show in the indicator.  This value may be updated while the promise is active.  The indicator will reflect the updated values as they're changed.

## Release History
 * v0.1.0 - Initial release.
