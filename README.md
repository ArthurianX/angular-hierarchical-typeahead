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



* `art-typeahead` - The main directive declaration. Example usage `<art-typeahead levels="tiers" pagination="true" trigger="callbackID(id, type)" source="dataEndpoint"></art-typeahead>`
* `levels` - Mandatory. Object. An object containing levels description. Object accepted: `[{name: "Organisation", icon: "fa fa-users", color: "#3f3f3f", bColor: "#a6b5bd"}]`
* `trigger` - Mandatory.  Function. A function to callback the choice selected in the controller, response is two parameters, `id` and `type`, the latter being the level name.
* `source` - Mandatory.  Promise-enabled function. The service that is called to get the data, parameters are `type`, `query` and `pagination`, `type` is the current level, `pagination` is a Boolean. The logic is on you in the controller. The received data should be arrays like [{id: 12, name: 'SomeItem'}], preprocess in the controller if necessary.
* `pagination` - Optional. Boolean. If `true`, there will be a load more list item, and the `source` call will contain a true pagination parameter. The logic is on you in the controller.
* `min-query` - Optional. Integer. Query length to trigger a search.
* `max-results` - Optional. Integer. Max results to show before displaying the user a message to user the search bar.




## Release History
 * v0.1.1 - Launch gh-pages.
 * v0.1.0 - Initial release.

## TODO
 * v0.1.2 - Make all the texts as dynamic parameters from the outside to support `i18n` options.
 * v0.1.3 - `source` service response mapping, to feed it whatever data and to provide a map on how to use that data.
 * v0.1.4 - Crossbrowser testing & fixes.
 * v0.1.5 - TBD


