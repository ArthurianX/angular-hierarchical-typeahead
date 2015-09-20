"use strict";
angular.module('yearSelector',[]);

angular.module('yearSelector')
    .directive('yearSelector',['$parse', '$document', '$http', '$timeout', '$compile','$templateCache',
        function($parse, $document, $http, $timeout, $compile, $templateCache){
            return {
                restrict: 'A',
                templateUrl: 'angular-yearselector.html',
                link: function(scope, element, attrs) {

                    /** Utilities */

                    function findIndex(array, property, value) {
                        var index = -1,
                            length = array ? array.length : 0;

                        var iterate = function(arrEl, objProp, val, index){
                            if (arrEl[objProp] === val) {
                                return index;
                            } else {
                                return;
                            }
                        };

                        while (++index < length) {
                            if (iterate(array[index], property, value, index) > -1) {
                                return index;
                            }
                        }
                        return -1;
                    }

                    function momentify(arr) {
                        return arr;
                    }

                    /** Defaults */

                    var defaults = {
                        years: 10,
                        model: '',
                        attachTo: false,
                        attachNow: false,
                        externalCallback: false,
                        range: true,
                        drag: true,
                        templateUrl: 'angular-yearselector.html'
                    };

                    /** Initialisation */

                    var activeMap = [];
                    scope.yearsSelDRP = [];
                    scope.dragEnabled = false;
                    scope.buttonSize = 40;
                    var isRanged = true;
                    var startDate, yearsNumber, setModel, blockWidth ;


                    var checkInterval = function(arr){

                        var cleanInbetween = function(){
                            var i;
                            for(i=0; i < arr.length; i++) {
                                arr[i].inbetween = false;
                            }
                        };

                        var checkPosition = function(arr) {

                            var position;

                            if (arr[0] < arr[1]) {
                                position = true; //Left 2 Right
                            } else {
                                position = false; //Right 2 Left
                            }

                            var half = Math.floor(position ? arr[1]-arr[0] : arr[0] - arr[1]);

                            //console.log('Position ', position, 'Half ', half, 'Array ', arr);

                            //Far right LR case
                            if (position && (arr[2] > arr[1])) {
                                return [arr[1], '1'];
                            }

                            //Far left LR case
                            if (position && (arr[2] < arr[0])) {
                                return [arr[0], '0'];
                            }

                            //Far left RL case
                            if (!position && (arr[2] < arr[0])) {
                                return [arr[0], '0'];
                            }

                            //Far right RL case
                            if (!position && (arr[2] > arr[1])) {
                                return [arr[1], '1'];
                            }

                            //Middle Case - Slice the most close part.

                            if ((position && ((arr[2] < arr[1])&&(arr[2] > arr[0]))) ||
                                (!position && ((arr[2] > arr[0])&&(arr[2] < arr[1])))) {
                                //console.log('Should drop in the middle case');
                                if ( (arr[1] - half) > (arr[0] - half)) {
                                    return [arr[0], '0'];
                                } else {
                                    return [arr[1], '1'];
                                }

                            }
                        };

                        var activateInbetween = function(){
                            cleanInbetween();

                            var i,j;

                            if (activeMap[1] - activeMap[0] > 1) {
                                // >
                                for (i = activeMap[0] + 1; i < activeMap[1]; i++) {
                                    arr[i].inbetween = true;
                                }
                            } else if (activeMap[1] - activeMap[0] < 0){
                                // <
                                for (j = activeMap[1] + 1; j < activeMap[0]; j++) {
                                    arr[j].inbetween = true;
                                }
                            }
                        };

                        if (activeMap.length === 2) {
                            activateInbetween();
                        } else if (activeMap.length > 2){

                            var deselect = checkPosition(activeMap);
                            deselect[1] = parseInt(deselect[1]);

                            scope.yearsSelDRP[deselect[0]].active = false;
                            activeMap.splice(deselect[1],1);

                            activateInbetween();
                        }
                    };

                    /** Years Selection */

                    scope.selectYear = function(year) {
                        //TODO: Disable / Enable range
                        var indexToPush = findIndex(scope.yearsSelDRP, 'year', year);

                        if (activeMap.indexOf(indexToPush) > -1) {
                            //Means we're clicking the same element
                            return;
                        }

                        activeMap.push(indexToPush);

                        scope.yearsSelDRP[indexToPush].active = true;

                        checkInterval(scope.yearsSelDRP, year);

                        setModel(momentify(activeMap));
                    };

                    var dragSelect = function(before, after) {
                        //console.log('Start dragselect with ', before, after);

                        if (activeMap.indexOf(after) > -1) {
                            //Means we're dragging over the same element
                            //Just leave it selected.
                            return;
                        }

                        scope.yearsSelDRP[before].active = false;
                        activeMap.splice(activeMap.indexOf(before), 1);

                        scope.yearsSelDRP[after].active = true;
                        activeMap.push(after);

                        checkInterval(scope.yearsSelDRP);

                        setModel(momentify(activeMap));
                        scope.$apply();
                    };

                    /** Sizing logic */

                    var buttonSizing = function(element){

                        blockWidth = element.prop('offsetWidth');

                        scope.buttonSize = (blockWidth / scope.yearsSelDRP.length) - 4;

                    };

                    /** Dragging Logic */

                    var enableDragging = function(element){

                        scope.dragEnabled = true;

                        var startX, startY, x, y, startDrag, endDrag;
                        var cursor = angular.element(element.children().children()[0]);
                        var offsetLeft = element[0].getBoundingClientRect().left;

                        element.on('mousedown', function(event){

                            var handle = angular.element(event.srcElement);
                            if (handle.hasClass('active')){
                                startDrag = handle[0].tabIndex;
                                cursor.css('left', handle.prop('offsetLeft') + 'px');
                                $timeout(function(){
                                    $document.on('mousemove', mousemove);
                                    $document.on('mouseup', mouseup);
                                }, 100);
                            }

                        });

                        function mousemove(event) {
                            x = event.pageX - offsetLeft - ( ( scope.buttonSize + 4 ) / 2 );
                            cursor.css('left',  x + 'px');
                        }

                        function mouseup(event) {
                            $document.unbind('mousemove', mousemove);
                            $document.unbind('mouseup', mouseup);
                            cursor.css('left', '-500px');
                            var positionInBlock = event.pageX - offsetLeft;

                            dragSelect (startDrag, Math.round(positionInBlock / scope.buttonSize) -1);
                        }

                    };

                    /** Delayed attaching */

                    var startAttaching = function(el){

                        var attachEl = angular.element($document[0].querySelector(el));

                        buttonSizing(attachEl);

                        $http.get(defaults.templateUrl, {cache: $templateCache}).success(function(template){

                            attachEl.append(template);
                            console.log(attachEl);
                            $compile(attachEl)(scope);
                            enableDragging(attachEl);

                        });


                    };



                    scope.$watch(attrs.yearSelector,function(options){

                        options = angular.extend(angular.copy(defaults), options);

                        startDate = moment(moment().subtract('years', options.years)).startOf('year');
                        yearsNumber = moment().year() - moment(startDate).year();

                        scope.yearsSelDRP = [];
                        for (var i=1; i <= yearsNumber; i ++) {
                            scope.yearsSelDRP.push({year: moment().year() - (yearsNumber-i), active: false, inbetween: false});
                        }

                        if (!options.range) {
                            isRanged = false;
                        }

                        if (options.drag && !options.attachTo) {
                            //Enable if dragging is enabled and no attachment
                            enableDragging(element);
                        }

                        if (options.attachTo) {

                            //Remove directive's DOM elements but leave the handlers.
                            element.remove();

                            if (options.attachNow) {
                                startAttaching(options.attachTo);
                            }

                        } else {
                            //Do the size calculation only if it's not attached.
                            buttonSizing(element);
                        }

                        setModel = function(param){
                            scope[options.model] = param;
                        };
                    });
                }
            };
        }
    ]);


angular.module('yearSelector').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('angular-yearselector.html',
    "<div class=\"ar-year-selector\">\n" +
    "    <div class=\"cursor\" ng-style=\"{'width': (buttonSize + 4) + 'px'}\">\n" +
    "\n" +
    "    </div>\n" +
    "    <button href=\"javascript:;\"\n" +
    "       ng-repeat=\"year in yearsSelDRP track by $index\"\n" +
    "       ng-class=\"{'active': year.active, 'inbetween': year.inbetween, 'draggable': dragEnabled}\"\n" +
    "       ng-click=\"selectYear(year.year)\"\n" +
    "       ng-style=\"{'width': buttonSize + 'px'}\"\n" +
    "       tabindex=\"{{$index}}\">\n" +
    "        {{year.year}}\n" +
    "    </button>\n" +
    "</div>"
  );

}]);
