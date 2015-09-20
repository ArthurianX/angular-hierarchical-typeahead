angular.module('yearSelector').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('angular-yearselector.html',
    "<div class=\"ar-year-selector\">\n" +
    "    <div class=\"cursor\" ng-style=\"{'width': (buttonSize + 4) + 'px'}\">\n" +
    "\n" +
    "    </div>\n" +
    "    <button href=\"javascript:;\"\n" +
    "       ng-repeat=\"year in yearsSelDRP track by $index\"\n" +
    "       ng-class=\"{'active': year.active, 'inbetween': year.inbetween, 'draggable': dragEnabled, 'first-el': $index == 0, 'last-el': $index == (yearsSelDRP.length - 1) }\"\n" +
    "       ng-click=\"selectYear(year.year)\"\n" +
    "       ng-style=\"{'width': buttonSize + 'px'}\"\n" +
    "       tabindex=\"{{$index}}\">\n" +
    "        {{year.year}}\n" +
    "    </button>\n" +
    "</div>"
  );

}]);
