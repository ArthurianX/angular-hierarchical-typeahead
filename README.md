# angular-hierarchical-typeahead [![Build Status](https://travis-ci.org/arthurianx/angular-hierarchical-typeahead.png?branch=master)](https://travis-ci.org/arthurianx/angular-hierarchical-typeahead)

> Multiple breadcrumb like selection typeahead component.

## Demo

[Live Demo](http://arthurianx.github.io/angular-hierarchical-typeahead/demo)

## Getting Started

Install with Bower or download the files directly from the dist folder in the repo.

```bash
bower install angular-hierarchical-typeahead --save
```

Add `dist/angular-hierarchical-typeahead.js` and `dist/angular-hierarchical-typeahead.css` to your index.html.


Add `artTypeahead` as a module dependency for your module.

```js
angular.module('your_app', ['artTypeahead']);
```

## Options


You can use it like this:

```html
<div art-typeahead ></div>
```

There's also a full set of options:

<table class="table table-bordered">

* `art-typeahead` - Main directive declaration
* `typeahead-callback` - Optional.  Accepted values are 'zoom' and 'css'. 'zoom' uses the zoom css property while 'css' just resizes the container

A full usage would look like this: ```html
                                    <div id="container4"
                                         art-typeahead
                                         >
                                     </div>```


## Release History
 * v0.1.1 - Launch gh-pages.
 * v0.1.0 - Initial release.
