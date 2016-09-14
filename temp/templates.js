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
    "        <input ng-style=\"hideInput(lastLevel)\" type=\"text\" ng-model=\"query\" ng-model-options=\"{ debounce: 500 }\" class=\"levels search-bar\" placeholder=\"{{translations.SEARCH_FOR}} {{currentPlaceholder}}\" autofocus>\n" +
    "        <a ng-style=\"hideClearInput(lastLevel)\" href=\"javascript:;\" class=\"art-clear-text\" ng-click=\"query = ''\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></a>\n" +
    "    </div>\n" +
    "    <div class=\"art-loader\" ng-if=\"loading\">\n" +
    "        <svg class=\"art-circular\" viewBox=\"25 25 50 50\">\n" +
    "            <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n" +
    "        </svg>\n" +
    "    </div>\n" +
    "    <div style=\"text-align: right;\" class=\"art-tooltip-helper\" ng-click=\"showTooltip = !showTooltip\" ng-class=\"{'art-open': showTooltip}\">\n" +
    "        <i class=\"fa fa-question-circle\" aria-hidden=\"true\"></i>\n" +
    "        <small class=\"art-tooltip\">\n" +
    "\n" +
    "            <table class=\"table table-bordered\" style=\"width: 95%; float: right\">\n" +
    "                <thead>\n" +
    "                <tr>\n" +
    "                    <th>{{translations.HELP_ACTION}}</th>\n" +
    "                    <th>{{translations.HELP_DESCRIPTION}}</th>\n" +
    "                </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                <tr>\n" +
    "                    <td><i class=\"fa fa-arrow-down\" aria-hidden=\"true\"></i> & <i class=\"fa fa-arrow-up\" aria-hidden=\"true\"></i></td>\n" +
    "                    <td valign=\"middle\">{{translations.HELP_ARROWS_TEXT}}</td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td><i class=\"fa fa-mouse-pointer\" aria-hidden=\"true\"></i> {{translations.HELP_CLICK}}</td>\n" +
    "                    <td rowspan=\"2\" valign=\"middle\">{{translations.HELP_LOAD}} {{currentPlaceholder}} {{translations.HELP_VIEW}}</td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td><i class=\"fa fa-keyboard-o\" aria-hidden=\"true\"></i> {{translations.HELP_SPACE}}</td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td><i class=\"fa fa-external-link-square\" aria-hidden=\"true\"></i> {{translations.HELP_CLICK}}</td>\n" +
    "                    <td rowspan=\"2\" valign=\"middle\">{{translations.HELP_OPEN}} {{currentPlaceholder}} {{translations.HELP_LEVEL}}</td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td><i class=\"fa fa-keyboard-o\" aria-hidden=\"true\"></i> {{translations.HELP_ENTER}}</td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td><i class=\"fa fa-keyboard-o\" aria-hidden=\"true\"></i> {{translations.HELP_BACKSPACE}}</td>\n" +
    "                    <td valign=\"middle\">{{translations.HELP_GO_BACK}}</td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td><i class=\"fa fa-mouse-pointer\" aria-hidden=\"true\"></i> {{translations.HELP_CLICK}} {{translations.HELP_LEVEL2}}</td>\n" +
    "                    <td valign=\"middle\">{{translations.HELP_GO_BACK_CLICKED}}</td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td><i class=\"fa fa-keyboard-o\" aria-hidden=\"true\"></i> {{translations.HELP_ANY_KEY}}</td>\n" +
    "                    <td valign=\"middle\">{{translations.HELP_ANY_KEY_PART1}} {{currentPlaceholder}} {{translations.HELP_ANY_KEY_PART2}}</td>\n" +
    "                </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </small>\n" +
    "    </div>\n" +
    "    <div class=\"art-results\" ng-class=\"{'art-loading': loading, 'art-tooltip-open': showTooltip}\">\n" +
    "        <ul kb-list ng-if=\"results\">\n" +
    "\n" +
    "            <li ng-if=\"allData == 'false'\" ng-repeat=\"item in results track by $index\" kb-item kb-invoke=\"selectItem(item, $index, $event)\" data-has-index=\"{{$index}}\" ng-keydown=\"focusOnSearch($event)\" ng-dblclick=\"selectItem(item, $index, $event)\">\n" +
    "                {{item.name}}\n" +
    "            </li>\n" +
    "\n" +
    "            <!-- Map all the existing properties into display if there's no mapping object for this level-->\n" +
    "\n" +
    "            <li class=\"art-no-height\" ng-if=\"::allData == 'true'\">\n" +
    "\n" +
    "                <table class=\"table\">\n" +
    "                    <thead>\n" +
    "                        <tr>\n" +
    "                            <th ng-if=\"::!mappings[activeLevel] && key != 'id'\" ng-repeat=\"(key, value) in ::results[0]\">{{key}}</th>\n" +
    "                            <th ng-if=\"::mappings && mappings[activeLevel]\" ng-repeat=\"heading in ::mappings[activeLevel]\">\n" +
    "                                {{heading.name}}\n" +
    "                            </th>\n" +
    "                        </tr>\n" +
    "                    </thead>\n" +
    "                    <tbody>\n" +
    "                        <tr ng-repeat=\"item in results track by $index\" kb-item kb-invoke=\"selectItem(item, $index, $event)\" data-has-index=\"{{$index}}\" ng-keydown=\"focusOnSearch($event)\" ng-dblclick=\"selectItem(item, $index, $event)\">\n" +
    "                            <!-- THIS SECTION HAS ALL THE ELEMENTS BOUND ONLY ONCE -->\n" +
    "                            <td ng-repeat=\"(key, value) in ::item\" ng-if=\"::key != 'id' && key != 'artCustom'\" valign=\"middle\">\n" +
    "\n" +
    "                                <!-- IF is the name cell, show the load next level icon -->\n" +
    "                                <span class=\"open-level\" ng-if=\"::key == 'name' && !lastLevel && levelsActive.length > 1\" ng-click=\"selectItem(item, $index, $event, true)\"><i class=\"fa fa-external-link-square\" aria-hidden=\"true\"></i></span>\n" +
    "\n" +
    "                                <!-- IF there's no callback involved, just show the text itself -->\n" +
    "                                <span ng-if=\"::!item[key].hasCallback && mappings[activeLevel] && !item[key].artCustom\" ng-style=\"{color: item[key].color}\"> <i ng-if=\"::item[key].icon\" class=\"{{::item[key].icon}}\" aria-hidden=\"true\"></i> {{::item[key].value}}</span>\n" +
    "\n" +
    "                                <span ng-if=\"::!item[key].hasCallback && mappings[activeLevel] && item[key].artCustom\"> <i ng-if=\"::item[key].artCustom.icon\" ng-style=\"{color: item[key].artCustom.color}\" class=\"{{::item[key].artCustom.icon}}\" aria-hidden=\"true\"></i> {{::item[key].value}}</span>\n" +
    "\n" +
    "                                <span ng-if=\"::!item[key].hasCallback && !mappings[activeLevel]\">{{item[key]}}</span>\n" +
    "\n" +
    "                                <!-- IF there's a callback involved, show a button with the action on it -->\n" +
    "                                <span ng-if=\"::item[key].hasCallback\">\n" +
    "                                    <button class=\"art-inner-callback-button\" ng-click=\"item[key].callback($event, item)\" ng-style=\"{'background-color': item[key].color}\">\n" +
    "                                        <i ng-if=\"::item[key].icon\" class=\"{{::item[key].icon}}\" aria-hidden=\"true\"></i>\n" +
    "                                        {{::item[key].action}}\n" +
    "                                    </button>\n" +
    "                                </span>\n" +
    "                            </td>\n" +
    "                        </tr>\n" +
    "                    </tbody>\n" +
    "                </table>\n" +
    "            </li>\n" +
    "\n" +
    "            <li ng-if=\"pagination && loadMore\" class=\"load-more\" ng-click=\"getOutsideData(false, true)\">\n" +
    "                <i class=\"fa fa-plus\" aria-hidden=\"true\"></i> {{translations.LOAD_MORE}}\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "        <ul>\n" +
    "            <li ng-if=\"!results && !loading && !tooMany\">\n" +
    "                <i class=\"fa fa-ban\" aria-hidden=\"true\"></i> {{translations.NO_RESULTS}}\n" +
    "            </li>\n" +
    "\n" +
    "            <li ng-if=\"!results && !loading && tooMany\">\n" +
    "                <i class=\"fa fa-ban\" aria-hidden=\"true\"></i> {{translations.TOO_MANY_RESULTS}}\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <div class=\"art-elements-added\" ng-if=\"pagination && addedElements\"> <!--&& addedElements-->\n" +
    "        <i class=\"fa fa-plus\" aria-hidden=\"true\"></i>{{elementsAdded}}\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "</div>"
  );

}]);
