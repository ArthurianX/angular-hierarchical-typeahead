angular.module('artTypeahead').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('angular-hierarchical-typeahead.html',
    "<div class=\"art-typeahead-container\">\n" +
    "    <div class=\"art-search\">\n" +
    "        <div class=\"levels\"\n" +
    "             ng-repeat=\"level in levelsActive track by $index\"\n" +
    "             ng-if=\"level.isVisible\"\n" +
    "             ng-class=\"{active: level.isActive}\"\n" +
    "             ng-click=\"actionLevel(level, $index)\"\n" +
    "             style=\"background-color: {{level.bColor}}; border-color: {{level.bColor}}\"\n" +
    "        >\n" +
    "            <i style=\"color: {{level.color}}\" class=\"{{level.icon}}\" aria-hidden=\"true\"></i> {{level.activeName || level.name}}\n" +
    "        </div>\n" +
    "        <span class=\"text-clone\"></span>\n" +
    "        <input ng-style=\"hideInput(lastLevel)\" type=\"text\" ng-model=\"query\" ng-model-options=\"{ debounce: 500 }\" class=\"levels search-bar\" placeholder=\"Search for {{currentPlaceholder}}\">\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"art-results\" ng-if=\"results\">\n" +
    "        <ul kb-list>\n" +
    "            <li ng-repeat=\"item in results\" kb-item kb-invoke=\"selectItem(item, $index, $event)\">\n" +
    "                {{item.name}}\n" +
    "            </li>\n" +
    "            <li ng-if=\"pagination\" class=\"load-more\">\n" +
    "                <i class=\"fa fa-plus\" aria-hidden=\"true\"></i> Load More\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"art-results no-results\" ng-if=\"!results && !loading\">\n" +
    "        <ul>\n" +
    "            <li>\n" +
    "                <i class=\"fa fa-ban\" aria-hidden=\"true\"></i> No Results\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"art-results no-results\" ng-if=\"!results && loading\">\n" +
    "        <div class=\"art-loader\">\n" +
    "            <svg class=\"art-circular\" viewBox=\"25 25 50 50\">\n" +
    "                <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n" +
    "            </svg>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div style=\"text-align: right; clear: both\" class=\"art-tooltip-helper\" ng-click=\"showTooltip = !showTooltip\">\n" +
    "        <i class=\"fa fa-question-circle\" aria-hidden=\"true\"></i>\n" +
    "        <small ng-if=\"results && showTooltip\" class=\"art-tooltip\">\n" +
    "\n" +
    "            <table class=\"table table-bordered\" style=\"width: 50%; float: right\">\n" +
    "                <thead>\n" +
    "                <tr>\n" +
    "                    <th>Action</th>\n" +
    "                    <th>Description</th>\n" +
    "                </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                <tr>\n" +
    "                    <td><i class=\"fa fa-arrow-down\" aria-hidden=\"true\"></i> & <i class=\"fa fa-arrow-up\" aria-hidden=\"true\"></i></td>\n" +
    "                    <td valign=\"middle\">Move up and down on the list with keyboard arrows</td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td><i class=\"fa fa-mouse-pointer\" aria-hidden=\"true\"></i> CLICK</td>\n" +
    "                    <td rowspan=\"2\" valign=\"middle\">Load the {{currentPlaceholder}} into view</td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td><i class=\"fa fa-keyboard-o\" aria-hidden=\"true\"></i> SPACE</td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td><i class=\"fa fa-mouse-pointer\" aria-hidden=\"true\"></i> + <i class=\"fa fa-mouse-pointer\" aria-hidden=\"true\"></i> DOUBLE-CLICK</td>\n" +
    "                    <td rowspan=\"2\" valign=\"middle\">Open the {{currentPlaceholder}}</td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td><i class=\"fa fa-keyboard-o\" aria-hidden=\"true\"></i> ENTER</td>\n" +
    "                </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </small>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "</div>"
  );

}]);
