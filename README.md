# agular-artResizr [![Build Status](https://travis-ci.org/arthurianx/angular-resizr.png?branch=master)](https://travis-ci.org/arthurianx/angular-resizr)

> Multi purpose container resizer.

## Demo

[Live Demo](http://arthurianx.github.io/angular-resizr/demo)

## Getting Started

Install with Bower or download the files directly from the dist folder in the repo.

```bash
bower install agular-resizr --save
```

Add `dist/angular-resizr.js` and `dist/angular-resizr.css` to your index.html.


Add `artResizr` as a module dependency for your module.

```js
angular.module('your_app', ['artResizr']);
```

## Options


You can use it like this:

```html
<div art-resizr ></div>
```

There's also a full set of options:

<table class="table table-bordered">

                            <td>Values accepted are colors, when present the container will have a border with the specified color, the controls will have the same colors.</td>
                            <td>resizr-parent-class</td>
                            <td>string</td>
                            <td>Name of class to be replaced</td>
                            <td>resizr-parent-level</td>
                            <td>integer</td>
                            <td># of parents to go up for the `resizr-parent-class` property, default is `0`</td>


* `art-resizr` - Main directive declaration
* `resizr-type` - Optional.  Accepted values are 'zoom' and 'css'. 'zoom' uses the zoom css property while 'css' just resizes the container
* `resizr-collapsed` - Optional.  When 'true', the container is collapsed to begin with.
* `resizr-callback` - Optional.  If present, this will callback a function inside your controller with the current state, you can use it to hide show elements in your container
* `resizr-appear-hover` - Optional. When true, the controls are hidden and will appear on hover.
* `resizr-ratio` - Optional.  Default is `50/50`, the ratio with which the container will be resized [width]/[height].
* `resizr-position` - Optional.  Position of the controls button: "bottom-left", "bottom-right", "right", "left", "top-left", "top-right".
* `resizr-border` - Optional.  Values accepted are colors, when present the container will have a border with the specified color, the controls will have the same colors.
* `resizr-parent-class` - Optional. Name of class to be replaced.
* `resizr-parent-level` - Optional.  # of parents to go up for the `resizr-parent-class` property, default is `0`.

A full usage would look like this: ```html
                                    <div id="container4"
                                         art-resizr
                                         resizr-type="css"
                                         resizr-callback="resizeCallback4"
                                         resizr-collapsed="false"
                                         resizr-appear-hover="true"
                                         resizr-ratio="50/40"
                                         resizr-position="right"
                                         resizr-border="#222"
                                         style="height: 400px; margin: 0 auto">
                                     </div>```


## Release History
 * v0.1.0 - Initial release.
