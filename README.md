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
* `art-levels` - Mandatory. Object. An object containing levels description. Object accepted: `[{name: "Organisation", icon: "fa fa-users", color: "#3f3f3f", bColor: "#a6b5bd"}]`
* `art-levels-map` - Optional. Object. A mapping object for each level or for any level, but if you to make a map for the second level, the object must look like [[],[{map}]]. When a map is set, only the keys from the map will be displayed, you can also send a callback button for a row. A map example looks like this: `$scope.tiersMappings = [[{name: "Building Code", value: 'buildingCode'}, {name: "Building Name", value: 'name'}, {name: 'Action', value: $scope.customMapAction, actionName: 'Set Active Organisation'}]]`. The callback function will send the item clicked back in the controller, you can do actions like activate something separate than the normal click / space call.
* `art-display-all` - Optional. Boolean. If set to true it will display all the properties of the data received in a table.
* `art-trigger` - Mandatory.  Function. A function to callback the choice selected in the controller, response is two parameters, `id` and `type`, the latter being the level name.
* `art-source` - Mandatory.  Promise-enabled function. The service that is called to get the data, parameters are `type`, `query` and `pagination`, `type` is the current level, `pagination` is a Boolean. The logic is on you in the controller. The received data should be arrays like [{id: 12, name: 'SomeItem'}], preprocess in the controller if necessary.
* `art-pagination` - Optional. Boolean. If `true`, there will be a load more list item, and the `source` call will contain a true pagination parameter. The logic is on you in the controller.
* `art-min-query` - Optional. Integer. Query length to trigger a search.
* `art-max-results` - Optional. Integer. Max results to show before displaying the user a message to user the search bar.
* `art-translations` - Optional. Object. An object with translations for the whole component static messages / text that * needs * to look like this ```{
                                                                                                                                                                SEARCH_FOR: 'Search for',
                                                                                                                                                                LOAD_MORE: 'Load More',
                                                                                                                                                                NO_RESULTS: 'No results.',
                                                                                                                                                                TOO_MANY_RESULTS: 'Too many results, please use the search function',
                                                                                                                                                                HELP_ACTION: 'Action',
                                                                                                                                                                HELP_DESCRIPTION: 'Description',
                                                                                                                                                                HELP_CLICK: 'Click',
                                                                                                                                                                HELP_SPACE: 'Space',
                                                                                                                                                                HELP_ENTER: 'Enter',
                                                                                                                                                                HELP_BACKSPACE: 'Backspace',
                                                                                                                                                                HELP_DOUBLE_CLICK: 'Double Click',
                                                                                                                                                                HELP_ANY_KEY: 'Any key',
                                                                                                                                                                HELP_ARROWS_TEXT: 'Move up and down on the list with keyboard arrows',
                                                                                                                                                                HELP_LOAD: 'Load the',
                                                                                                                                                                HELP_VIEW: 'into view',
                                                                                                                                                                HELP_OPEN: 'Open the',
                                                                                                                                                                HELP_LEVEL: 'in a new level',
                                                                                                                                                                HELP_LEVEL2: 'on a level',
                                                                                                                                                                HELP_GO_BACK: 'Go back one level',
                                                                                                                                                                HELP_GO_BACK_CLICKED: 'Go back to the selected level',
                                                                                                                                                                HELP_ANY_KEY_PART1: 'While on the',
                                                                                                                                                                HELP_ANY_KEY_PART2: 'list any key you press will focus the search input and make a new search.'
                                                                                                                                                            }```




## Release History
 * v0.1.1 - Launch gh-pages.
 * v0.1.0 - Initial release.

## TODO
 * v0.2.x - Make all the texts as dynamic parameters from the outside to support `i18n` options.
 * v0.3.x - `source` service response mapping, to feed it whatever data and to provide a map on how to use that data.
 * v0.4.x - Crossbrowser testing & fixes.
 * v0.5.x - TBD


