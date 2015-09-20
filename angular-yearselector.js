"use strict";
angular.module('yearSelector',[]);

angular.module('yearSelector')
    .directive('yearSelector',['$document', '$timeout', '$compile','$templateCache',
        function($document, $timeout, $compile, $templateCache){
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

                    /**
                     * Options:
                     * attachTo: element or the assigned element
                     * compileOnCallback: function that triggers the directive on the attached element
                     * years: how many years should the inline selector be
                     * range: this will enable range selection
                     * standalone: replaces the container, if false it will append itself to the last element of the contain
                     * model:
                     * */

                    var defaults = {
                        years: 10,
                        model: '',
                        attachTo: false,
                        compileOnCallback: false,
                        range: true,
                        drag: true
                    };

                    //scope.$watchCollection(attrs.yearSelector,function(options){

                    scope.$watch(attrs.yearSelector,function(options){
                        console.log(options);
                        options = angular.extend(angular.copy(defaults), options);


                        //options.compileOnCallback();
                    });



                    //$http.get(defaults.templateUrl, {cache: $templateCache}).success(function(indicatorTemplate){});

                    var startDate = moment(moment().subtract('years', 10)).startOf('year');
                    var yearsNumber = moment().year() - moment(startDate).year();

                    scope.yearsSelDRP = [];
                    var i;
                    for (i=1; i <= yearsNumber; i ++) {
                        scope.yearsSelDRP.push({year: moment().year() - (yearsNumber-i), active: false, inbetween: false});
                    }

                    //This is a map of all active years.
                    var activeMap = [];

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

                            console.log('Position ', position, 'Half ', half, 'Array ', arr);

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
                                console.log('Should drop in the middle case');
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
                            console.log('We have 2 active, inbetween go.');
                            activateInbetween();
                        } else if (activeMap.length > 2){

                            var deselect = checkPosition(activeMap);
                            deselect[1] = parseInt(deselect[1]);

                            scope.yearsSelDRP[deselect[0]].active = false;
                            activeMap.splice(deselect[1],1);

                            activateInbetween();
                        }
                    };

                    scope.selectYear = function(year) {
                        var indexToPush = findIndex(scope.yearsSelDRP, 'year', year);

                        if (activeMap.indexOf(indexToPush) > -1) {
                            //Means we're clicking the same element
                            return;
                        }

                        activeMap.push(indexToPush);

                        scope.yearsSelDRP[indexToPush].active = true;

                        checkInterval(scope.yearsSelDRP, year);
                    };

                    var dragSelect = function(before, after) {
                        console.log('Start dragselect with ', before, after);

                        if (activeMap.indexOf(after) > -1) {
                            //Means we're dragging over the same element
                            //Just leave it selected.
                            return;
                        }
                        console.log('Not canceleed', activeMap);

                        scope.yearsSelDRP[before].active = false;
                        activeMap.splice(activeMap.indexOf(before), 1);

                        scope.yearsSelDRP[after].active = true;
                        activeMap.push(after);

                        checkInterval(scope.yearsSelDRP);

                        console.log('Should be finished', activeMap);
                        scope.$apply();
                    };

                    /** Sizing logic */

                    var blockWidth = element.prop('offsetWidth');

                    scope.buttonSize = (blockWidth / scope.yearsSelDRP.length) - 4;
                    console.log(blockWidth, scope.buttonSize);


                    /** Dragging Logic */

                    var startX, startY, x, y, startDrag, endDrag;
                    var cursor = angular.element(element.children().children()[0]);
                    console.log(cursor);
                    var offsetLeft = element[0].getBoundingClientRect().left;

                    element.on('mousedown', function(event){


                        var handle = angular.element(event.srcElement);
                        console.log(handle);

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

                    //$compile(yearSelector)(scope);


                }
            };
        }
    ]);

