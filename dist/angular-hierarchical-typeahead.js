/* jshint ignore:start */
"use strict";angular.module("keyboard.focus",[]),angular.module("keyboard",["keyboard.focus"]),angular.module("keyboard").constant("undefined"),angular.module("keyboard").factory("KbContainerController",["undefined","$log",function(e,t){function n(t){this.identifier="[kb-container]",this.ngModel=e,this.selected=[],this.multiple=!1,this.cyclic=!1,this.active=e,this._element=t[0]}return n.$inject=["$element"],angular.extend(n.prototype,{initialize:function(e){this.multiple=angular.isDefined(e.attrs.multiple),this.cyclic=angular.isDefined(e.attrs.kbCyclic),angular.extend(this,e),this.ngModel&&(this.ngModel.$render=function(){this.multiple?(this.selected=this.ngModel.$viewValue,angular.isArray(this.selected)===!1&&(angular.isDefined(this.selected)&&t.error(this.identifier,"ng-model(multiple) must be an array, got:",this.selected),this.selected=[])):this.selected[0]=this.ngModel.$viewValue;for(var e in this.selected){var n=this._locate(this.selected[e]);if(n){this.active=n;break}}}.bind(this))},select:function(e){this.ngModel&&(this.multiple?this.isSelected(e)===!1&&(this.selected.push(e),this.ngModel.$setViewValue(this.selected)):(this.selected[0]=e,this.ngModel.$setViewValue(e)))},deselect:function(t){if(this.ngModel){var n=this.selected.indexOf(t);n!==-1&&(this.selected.splice(n,1),this.multiple?this.ngModel.$setViewValue(this.selected):this.ngModel.$setViewValue(e))}},toggle:function(e){this.isSelected(e)?this.deselect(e):this.select(e)},isSelected:function(e){return this.selected.indexOf(e)!==-1},previous:function(){var e=this._getSiblingItems(this.active).previous;return!!e&&(this.active=e,!0)},next:function i(){var i=this._getSiblingItems(this.active).next;return!!i&&(this.active=i,!0)},activate:function(e,n){return t.$error(this.identifier,"activate() is not implemented"),!1},invoke:function(e){return t.$error(this.identifier,"invoke() is not implemented"),!1},_locate:function(e){for(var t=this._element.querySelectorAll("[kb-item]"),n=0;n<t.length;n++){var i=angular.element(t.item(n)).controller("kbItem");if(i.model===e)return i}},_getSiblingItems:function(e){for(var t=e.element[0],n=this._element.querySelectorAll("[kb-item]"),i=0;i<n.length;i++){var o=n.item(i);if(o===t){var l={};return 0!==i&&(l.previous=angular.element(n.item(i-1)).controller("kbItem")),i<n.length-1&&(l.next=angular.element(n.item(i+1)).controller("kbItem")),l}}return{}},_first:function(){var e=this._element.querySelector("[kb-item]");if(e)return angular.element(e).controller("kbItem")},_last:function(){var e=this._element.querySelectorAll("[kb-item]");if(e.length)return angular.element(e[e.length-1]).controller("kbItem")}}),n}]),angular.module("keyboard").factory("KbItemController",["kbScroll","undefined",function(e,t){function n(e){this.model=t,this.element=e}return n.$inject=["$element"],n}]),angular.module("keyboard.focus").directive("kbFocus",["kbFocus","$log",function(e,t){return function(e,t,n){e.$watch(n.kbAutofocus,function(e){t.prop("autofocus",!!e)})}}]),angular.module("keyboard.focus").directive("kbFocus",["kbFocus","$log",function(e,t){return function(n,i,o){n.$watch(e.get,function(e){e===o.kbFocus&&(""===e?t.error("[kb-focus] Invalid label in",i[0]):(i[0].focus(),document.activeElement!==i[0]&&setTimeout(function(){i[0].focus()})))}),i.on("focus",function(){e(o.kbFocus),n.$root.$$phase||n.$apply()}),i.on("blur",function(){e.get()===o.kbFocus&&(e.reset(),n.$root.$$phase||n.$apply())})}}]),angular.module("keyboard").directive("kbItem",["KbItemController","$animate","$log",function(e,t,n){return{controller:e,require:["kbItem","?^kbList","?^kbSelect"],link:function(e,i,o,l){function r(e,t,n){return"left"===e&&n.left<t.left?t.left-n.left:"up"===e&&n.top<t.top?t.top-n.top:"right"===e&&n.left>t.left?n.left-t.left:"down"===e&&n.top>t.top?n.top-t.top:0}for(var a=l[0],c=l[1],s="A"===i[0].tagName||"BUTTON"===i[0].tagName||"AREA"===i[0].tagName,u=1;u<l.length;u++)l[u]&&(c=l[u]);if(!c)return void n.error("Controller 'kbList' or 'kbSelect', required by directive 'kbItem', can't be found!");var f=o.kbSelectedClass||"kb-selected",d=o.kbActiveClass||"kb-active";a.model=e.$eval(o.kbItem),e.$watch(o.kbItem,function(e){a.model=e}),"undefined"==typeof c.active?c.active=a:c.isSelected(a.model)&&c.isSelected(c.active.model)===!1&&(c.active=a),e.$watch(function(){return c.isSelected(a.model)},function(e){e?t.addClass(i,f):t.removeClass(i,f)}),e.$watch(function(){return c.active===a},function(e){e?(i.attr("tabindex",0),t.addClass(i,d)):(t.removeClass(i,d),s?i.attr("tabindex",-1):i.removeAttr("tabindex"))});var h={37:"left",38:"up",39:"right",40:"down"};i.on("keydown",function(t){var n=!1,l=!1;if(t.which>=37&&t.which<=40){var s=c._getSiblingItems(a),u=i[0].getBoundingClientRect();if(s.previous&&r(h[t.which],u,s.previous.element[0].getBoundingClientRect())&&(c.activate(s.previous),n=!0),s.next&&r(h[t.which],u,s.next.element[0].getBoundingClientRect())&&(c.activate(s.next),n=!0),!(n!==!1||s.next&&s.previous)){var f=t.which,d=!1;t.which<=38?f+=2:f-=2,s.next&&r(h[f],u,s.next.element[0].getBoundingClientRect())&&(c.cyclic?(c.activate(c._last()),n=!0):d="kbReachedBegin"),s.previous&&r(h[f],u,s.previous.element[0].getBoundingClientRect())&&(c.cyclic?(c.activate(c._first()),n=!0):d="kbReachedEnd"),d&&c.attrs[d]&&angular.element(c._element).scope().$eval(c.attrs[d],{$event:t})}n&&t.preventDefault()}else 32===t.which?(t.preventDefault(),l=!0):13===t.which&&(l=!0);(n||l)&&(l&&(c.invoke(a),o.kbInvoke&&e.$eval(o.kbInvoke,{$event:t})),e.$apply())}),i.on("click",function(t){c.activate(a),c.invoke(a),o.kbInvoke&&e.$eval(o.kbInvoke,{$event:t}),e.$apply()}),e.$on("$destroy",function(){c.active=c._first()})}}}]),angular.module("keyboard").directive("kbList",["KbContainerController","kbScroll",function(e,t){return{controller:e,require:["kbList","?ngModel"],link:function(e,n,i,o){var l=o[0];l.initialize({identifier:"[kb-list]",ngModel:o[1],attrs:i,activate:function(e){this.active=e,this.select(e.model),t.focus(e.element[0])},invoke:function(){return!1}})}}}]),angular.module("keyboard").directive("kbSelect",["KbContainerController","kbScroll",function(e,t){return{controller:e,require:["kbSelect","ngModel"],link:function(e,n,i,o){var l=o[0];l.initialize({identifier:"[kb-select]",ngModel:o[1],attrs:i,activate:function(e){this.active=e,t.focus(e.element[0])},invoke:function(e){return this.toggle(e.model),!0}})}}}]),angular.module("keyboard.focus").factory("kbFocus",["$log",function(e){var t="",n=function i(e){return 0===arguments.length?t:void i.set(e)};return n.get=function(){return t},n.set=function(n){"string"==typeof n?t=n:e.error("[kbFocus] label must be a string, got",n)},n.reset=function(){t=""},n}]),angular.module("keyboard").service("kbScroll",["$window",function(e){var t="BODY";navigator.userAgent.toLowerCase().indexOf("firefox")>-1&&(t="HTML");var n=this;this.change=function(e,t,n,i){if(i&&angular.element.prototype.animate){var o=angular.element(e),l={};return l[t]=n,o.animate(l,i),function(){o.stop(!0,!0)}}return e[t]=n,angular.noop},this.getScrollParent=function(e){for(var n=e.parentElement;n.nodeName!==t;){var i=getComputedStyle(n),o=i.overflow+i.overflowX+i.overflowY;if(o.match(/scroll|hidden/))break;n=n.parentElement}return n},this.to=function(i,o,l){var r=angular.noop,a=n.getScrollParent(i),c=i.getBoundingClientRect(),s={top:Math.ceil(c.top),right:Math.ceil(c.right),bottom:Math.ceil(c.bottom),left:Math.ceil(c.left)};if(a.nodeName===t)var u={top:0,right:e.innerWidth,bottom:e.innerHeight,left:0};else var f=a.getBoundingClientRect(),u={top:Math.ceil(f.top),right:Math.ceil(f.right),bottom:Math.ceil(f.bottom),left:Math.ceil(f.left)};var d=s.top-u.top,h=u.right-s.right,g=u.bottom-s.bottom,m=s.left-u.left;if(d+o.top<0?(r=n.change(a,"scrollTop",a.scrollTop+d+o.top,l),g+=d,d=0):g+o.bottom<0&&(r=n.change(a,"scrollTop",a.scrollTop-g+o.bottom,l),d+=g,g=0),m+o.left<0?(r=n.change(a,"scrollLeft",a.scrollLeft+m+o.left,l),h+=m,m=0):h+o.right<0&&(r=n.change(a,"scrollLeft",a.scrollLeft-h+o.right,l),m+=h,h=0),a.nodeName===t)return r;var v=n.to(a,{top:d,right:d,bottom:g,left:m},l);return function(){r(),v()}};var i=angular.noop;this.focus=function(e){i();var t=this.getScrollParent(e),n={top:t.scrollTop,left:t.scrollLeft};e.hasAttribute("tabindex")||e.setAttribute("tabindex",0),e.focus(),t.scrollTop===n.top&&t.scrollLeft===n.left||(t.scrollTop=n.top,t.scrollLeft=n.left,i=this.to(e,{top:0,right:0,bottom:0,left:0},200))}}]);
/* jshint ignore:end */
angular.module('artTypeahead',['keyboard']);



angular.module('artTypeahead')
    .directive('artTypeahead',['$parse', '$document', '$http', '$timeout', '$compile',
        function(){
            return {
                restrict: 'E',
                scope: {
                    levels: "=artLevels", // the levels the component can go too, array of e.g.: {name: "Organisation", icon: "fa fa-users", color: "#fff", bColor: "#222"}
                    callOutside: "&artTrigger", //It will do an outside callback with the selected element id and level, e.g.: {level: 'Building', id: 123}
                    source: "=artSource", //Service that will be called to fetch data depending on the level
                    pagination: "@artPagination",
                    minQuery: '@artMinQuery',
                    maxResults: '@artMaxResults'
                },
                transclude: false,
                templateUrl: 'angular-hierarchical-typeahead.html',
                controller: function($scope, $timeout) {
                    // Initialization
                    $scope.loading = false;
                    $scope.query = null;
                    $scope.lastLevel = false;
                    $scope.addedElements = false;
                    $scope.elementsAdded = 0;
                    $scope.tooMany = false;
                    var previouslySelectedID = 0;

                    //TODO: Check the keyCode's on all the browsers.

                    var defaultValues = {
                        maxResults: 200,
                        dblClickTime: 400,
                        minQuery: 2,
                        defaultLevels: [{name: "Level1", icon: "fa fa-users", color: "#3f3f3f", bColor: "#a6b5bd"},
                            {name: "Level2", icon: "fa fa-building-o", color: "#3f3f3f", bColor: "#c5d7e0"},
                            {name: "Level3", icon: "fa fa-tachometer", color: "#3f3f3f", bColor: "#e8eff3"}]
                    };

                    // Configuration
                    $scope.currentPlaceholder = $scope.levels[0].name;
                    
                    if ($scope.minQuery) {
                        defaultValues.minQuery = parseInt($scope.minQuery); 
                    }

                    if ($scope.maxResults) {
                        defaultValues.maxResults = parseInt($scope.maxResults);
                    }

                    // Utilities

                    $scope.whichLevel = function whichLevel(){
                        //Always set by default to last level, so when we're at the end the last level will be returned.
                        var rightIndex = $scope.levelsActive.length -1;

                        $scope.levelsActive.forEach(function(item, index){
                            if (item.isVisible && !item.activeName) {
                                rightIndex = index;
                            }
                        });

                        return rightIndex;
                    };


                    // Select an item, send it outside with callOutside
                    var timeStamp = 0;
                    $scope.selectItem = function selectItem(item, index, event){
                        //console.log('Selected item', item, index, event);

                        previouslySelectedID = item.id;

                        var detectDoubleClick = function detectDoubleClick(lastStamp, currentStamp){
                            // People instinctively double-click when single click does not work, calculate here.
                            if ( (currentStamp - lastStamp) < defaultValues.dblClickTime  ) {
                                return true;
                            } else {
                                return false;
                            }
                        };

                        // Get the current active level
                        var rightIndex = $scope.whichLevel();

                        //Move to next level only on space, enter or double click
                        if (event.keyCode === 13 || detectDoubleClick(timeStamp, event.timeStamp)) {

                            // Do the whole loading of a new level
                            $scope.levelsActive[rightIndex].activeName = item.name;
                            $scope.levelsActive[rightIndex].isActive = true;
                            $scope.query = null;

                            // Show the next level
                            if (rightIndex < $scope.levelsActive.length - 1) {
                                //console.log('Calling level', rightIndex);
                                //Call outside the choice made
                                //$scope.callOutside({id: item.id, type: $scope.levels[rightIndex+1].name});

                                $scope.levelsActive[rightIndex+1].isVisible = true;
                                //Animate the display of the next level

                                // Change the placeholder
                                $scope.currentPlaceholder = $scope.levels[rightIndex+1].name;
                                //Get Data for that level
                                getOutsideData(false);
                                $scope.focusOnSearch();
                            } else if (parseInt(rightIndex) === $scope.levelsActive.length - 1) {
                                //Call outside the choice made
                                //console.log('End of levels', rightIndex, {id: item.id, type: $scope.levels[rightIndex].name});
                                $scope.lastLevel = true;
                                $scope.callOutside({id: item.id, type: $scope.levels[rightIndex].name});
                            }

                        } else if (event.keyCode === 32 || !detectDoubleClick(timeStamp, event.timeStamp)) {

                            // Just call outside the current selection
                            if (rightIndex < $scope.levelsActive.length - 1) {
                                $scope.callOutside({id: item.id, type: $scope.levels[rightIndex+1].name});
                            } else if (parseInt(rightIndex) === $scope.levelsActive.length - 1) {
                                //Call outside the choice made
                                $scope.callOutside({id: item.id, type: $scope.levels[rightIndex].name});
                                $scope.lastLevel = true;
                                $scope.query = null;
                                $scope.levelsActive[rightIndex].activeName = item.name;
                                $scope.levelsActive[rightIndex].isActive = true;
                            }

                        }

                        timeStamp = event.timeStamp;

                        //$scope.transitElement(rightIndex); TODO: This does not work well yet, fix.
                    };

                    $scope.actionLevel = function actionLevel(level, index, resetBackspace){
                        if (!level.activeName && !resetBackspace) {
                            return false;
                        }

                        // Get the current active level
                        var rightIndex = $scope.whichLevel();

                        if (index < rightIndex) {
                            // Means we have more stuff to reset, e.g. we have all levels selected, I click the first, all need to reset
                            for (var i = index ; i < $scope.levelsActive.length; i++) {
                                $scope.levelsActive[i].activeName = false;
                                $scope.levelsActive[i].isActive = false;
                                $scope.levelsActive[i].isVisible = false;
                            }
                        }

                        level.activeName = false;
                        level.isActive = true;
                        level.isVisible = true;
                        $scope.lastLevel = false;
                        $scope.currentPlaceholder = level.name;
                        getOutsideData(false);
                        $scope.focusOnSearch();

                        if (resetBackspace) {
                            $scope.$apply();
                        }
                    };

                    var getOutsideData = function getOutsideData(query, pagination){
                        
                        $scope.loading = true;
                        if (!pagination) {
                            $scope.results = false;
                        }

                        var rightIndex = $scope.whichLevel();

                        $scope.source($scope.levels[rightIndex].name, query, pagination, previouslySelectedID).then(function(results){
                            //console.error($scope.levels[rightIndex].name);
                            //console.log(results);
                            $scope.tooMany = false;
                            if (results.length > 0) {

                                if (!pagination) {

                                    $scope.results = results;
                                    $scope.callOutside({id: results[0].id, type: $scope.levels[rightIndex].name});
                                    $scope.levels[rightIndex].dataSet = results;
                                    
                                } else {
                                    
                                    $scope.results = $scope.results.concat(results);
                                    $scope.addedElements = true;
                                    $scope.elementsAdded = results.length;
                                    $timeout(function(){
                                        $scope.addedElements = false;
                                    }, 700);
                                    
                                    // If the user loads too many elements, hide everything and suggest filtering
                                    if ($scope.results.length > defaultValues.maxResults) {
                                        $scope.tooMany = true;
                                        $scope.results = false;
                                    }
                                }

                            } else {
                                // If there's no pagination, delete the results, if there's pagination leave the results intact
                                if (!pagination) {
                                    $scope.results = false;    
                                } 
                                
                            }
                            $scope.loading = false;
                        }, function(reject){
                            //console.log('rejected', reject);
                            $scope.results = false;
                            $scope.loading = false;
                        });
                        
                    };

                    $scope.getOutsideData = getOutsideData;


                    $scope.$watch('query', function(newVal){
                        if (newVal && newVal.length > defaultValues.minQuery) {
                            getOutsideData(newVal);

                            //When you search for something, deselect the current item
                            var rightIndex = $scope.whichLevel();
                            $scope.levelsActive[rightIndex].activeName = false;
                        } else if (newVal && newVal.length <= defaultValues.minQuery) {
                            getOutsideData(false);
                        }
                    });

                    /* Animation Layer */

                    // Hide search input when last level is reached / item selected.
                    $scope.hideInput = function hideInput(lastLevel){
                        if (lastLevel && !$scope.query) {
                            return {
                                flex: 0,
                                width: '0px',
                                opacity: 0
                            };
                        } else {
                            return {
                                flex: 1,
                                width: 'initial',
                                opacity: 1
                            };
                        }

                    };



                    //TODO: When Last level is active the input should disappear.
                    //TODO: Clicking on a level will reset the search to that level


                    // Process levels
                    $scope.levelsActive = angular.copy($scope.levels);
                    $scope.levelsActive = $scope.levelsActive.map(function(item){
                        //{name: "Organisation", icon: "fa fa-users", color: "#fff", bColor: "#222"}
                        return {
                            name: item.name,
                            icon: item.icon,
                            color: item.color,
                            bColor: item.bColor,
                            isActive: false,
                            isVisible: false,
                            activeName: false
                        };
                    });


                    /* Init Actions
                     * - Make first level visible, with no name
                     * - Get first batch of items in the list
                     * */
                    $scope.levelsActive[0].isVisible = true;
                    getOutsideData(false);

                },
                link: function(scope, element, attrs) {

                    var transitionElementWidth = function(element) {
                        /* jshint ignore:start */
                        console.log('transitioning element', element);
                        var prevWidth = element.style.width;
                        element.style.width = 'auto';
                        var endWidth = getComputedStyle(element).width;
                        element.style.width = prevWidth;
                        element.offsetWidth;// force repaint
                        element.style.transition = 'width .5s ease-in-out';
                        element.style.width = endWidth;
                        element.addEventListener('transitionend', function transitionEnd(event) {
                            if (event.propertyName === 'width') {
                                element.style.transition = '';
                                element.style.width = 'auto';
                                element.removeEventListener('transitionend', transitionEnd, false)
                            }
                        }, false);
                        /* jshint ignore:end */
                    };

                    scope.transitElement = function(rightIndex) {
                        var transitionElement = angular.element(element[0].querySelector('.levels'))[rightIndex];
                        transitionElementWidth(transitionElement);
                    };


                    element[0].querySelector('.levels.search-bar').addEventListener('keydown', function searchDown(event) {

                        if (event.keyCode === 40 && scope.results) {
                            event.stopPropagation();
                            event.preventDefault();
                            element[0].querySelectorAll('.art-results li')[1].click();
                        }

                        if (event.keyCode === 8 && (!scope.query)  ) {
                            // Go back one level
                            console.log('Fire back event');
                            var rightIndex = scope.whichLevel();
                            if (rightIndex > 0) {
                                scope.actionLevel(scope.levelsActive[rightIndex-1], rightIndex-1, true);
                            }
                        }

                    }, false);

                    scope.focusOnSearch = function focusOnSearch(event){

                        if (event) {
                            // Respond only to keyboard inputs
                            if (event.keyCode && event.keyCode !== 13 && event.keyCode !== 32 && event.keyCode !== 38 && event.keyCode !== 40) {
                                console.log(event.keyCode);
                                element[0].querySelector('.search-bar').focus();
                            }

                        } else {
                            element[0].querySelector('.search-bar').focus();
                        }


                    };
                }
            };
        }
    ]);

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
    "        <input ng-style=\"hideInput(lastLevel)\" type=\"text\" ng-model=\"query\" ng-model-options=\"{ debounce: 500 }\" class=\"levels search-bar\" placeholder=\"Search for {{currentPlaceholder}}\" autofocus>\n" +
    "    </div>\n" +
    "    <div class=\"art-loader\" ng-if=\"loading\">\n" +
    "        <svg class=\"art-circular\" viewBox=\"25 25 50 50\">\n" +
    "            <circle class=\"path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n" +
    "        </svg>\n" +
    "    </div>\n" +
    "    <div class=\"art-results\" ng-class=\"{'loading': loading}\">\n" +
    "        <ul kb-list ng-if=\"results\">\n" +
    "            <li ng-repeat=\"item in results\" kb-item kb-invoke=\"selectItem(item, $index, $event)\" ng-keydown=\"focusOnSearch($event)\">\n" +
    "                {{item.name}}\n" +
    "            </li>\n" +
    "            <li ng-if=\"pagination\" class=\"load-more\" ng-click=\"getOutsideData(false, true)\">\n" +
    "                <i class=\"fa fa-plus\" aria-hidden=\"true\"></i> Load More\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "        <ul>\n" +
    "            <li ng-if=\"!results && !loading && !tooMany\">\n" +
    "                <i class=\"fa fa-ban\" aria-hidden=\"true\"></i> No results.\n" +
    "            </li>\n" +
    "\n" +
    "            <li ng-if=\"!results && !loading && tooMany\">\n" +
    "                <i class=\"fa fa-ban\" aria-hidden=\"true\"></i> Too many results, please use the search function.\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <div class=\"art-elements-added\" ng-if=\"pagination && addedElements\"> <!--&& addedElements-->\n" +
    "        <i class=\"fa fa-plus\" aria-hidden=\"true\"></i>{{elementsAdded}}\n" +
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
    "                    <td rowspan=\"2\" valign=\"middle\">Open the {{currentPlaceholder}} in a new Level</td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td><i class=\"fa fa-keyboard-o\" aria-hidden=\"true\"></i> ENTER</td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td><i class=\"fa fa-keyboard-o\" aria-hidden=\"true\"></i> BACKSPACE</td>\n" +
    "                    <td valign=\"middle\">Go back one level</td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td><i class=\"fa fa-mouse-pointer\" aria-hidden=\"true\"></i> CLICK on a Level</td>\n" +
    "                    <td valign=\"middle\">Go back to the clicked Level</td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td><i class=\"fa fa-keyboard-o\" aria-hidden=\"true\"></i> ANY KEY</td>\n" +
    "                    <td valign=\"middle\">While on the {{currentPlaceholder}} list any key you press will focus the search input and make a new search.</td>\n" +
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