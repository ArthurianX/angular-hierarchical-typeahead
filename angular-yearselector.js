"use strict";
angular.module('yearSelector',[]);

angular.module('yearSelector')
    .directive('yearSelector',['$compile','$templateCache',
    function($compile,$templateCache){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                /**
                 * Options:
                 * attachTo: element or the assigned element
                 * compileOnCallback: function that triggers the directive on the attached element
                 * years: how many years should the inline selector be
                 * range: this will enable range selection
                 * */


           /*     startDate = moment(moment().subtract('years', 10)).startOf('year');
                endDate = moment()
                yearsNumber = moment().year() - moment(startDate).year()

      `
        scope.yearsSelDRP = [];
                var i;
                for (i=1; i <= yearsNumber; i ++) {
                    scope.yearsSelDRP.push({year: moment().year() - (yearsNumber-i), active: false, inbetween: false})
                }
                console.log('MAta e curva', scope.yearsSelDRP);
                var activeMap = [];
                var checkInterval = function(arr, clicked){

                    var cleanInbetween = function(){
                        var i;
                        for(i=0; i < arr.length; i++) {

                            arr[i].inbetween = false;

                        }
                    };

                    var activateInbetween = function(){
                        cleanInbetween();

                        var i,j;
                        if (activeMap[0] - activeMap[1] >= 0) {
                            // >

                            for (i = activeMap[0] + 1; i < activeMap[1]; i++) {
                                arr[i].inbetween = true;
                            }

                        } else {
                            // <
                            for (j = activeMap[0] + 1; j > activeMap[1]; j--) {
                                arr[j].inbetween = true;
                            }

                        }
                    };

                    if (activeMap.length == 2) {
                        activateInbetween()
                    } else if (activeMap.length > 2){
                        scope.yearsSelDRP[activeMap[0]].active = false;
                        activeMap.slice(0,1);
                        activateInbetween()
                    }
                };
                scope.selectYear = function(year) {
                    activeMap.push(_.findIndex(scope.yearsSelDRP, { 'year': year}))
                    scope.yearsSelDRP[_.findIndex(scope.yearsSelDRP, { 'year': year})].active = true;\
          checkInterval(scope.yearsSelDRP, year);
                };

      `
      console.log $event
                yearSelector = angular.element('body').find('.year-selectordrp')
                console.log yearSelector
                $timeout ->
                $compile(yearSelector)(scope);
                , 100
*/

            }
        };
    }
]);

