angular.module('yearSelector').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('angular-yearselector.html',
    "<div class=\"year-selectordrp passing-over\">\n" +
    "    <a href=\"javascript:;\"\n" +
    "       ng-repeat=\"year in yearsSelDRP track by $index\"\n" +
    "       ng-class=\"{\\'active\\': year.active, \\'inbetween\\': year.inbetween}\"\n" +
    "       ng-click=\"selectYear(year.year)\">\n" +
    "        {{year.year}}\n" +
    "    </a>\n" +
    "\n" +
    "</div>"
  );

}]);
