angular.module('artResizr',[]);

angular.module('artResizr')
    .directive('artResizr',['$parse', '$document', '$http', '$timeout', '$compile',
        function($parse, $document, $http, $timeout, $compile){
            return {
                restrict: 'A',
                scope: {
                    resizrType: "@", // the other one is "css",
                    resizrCallback: "&", //It can be set to true so it will be collapsed on first load
                    resizrCollapsed: "=", //It can be set to true so it will be collapsed on first load
                    resizrAppearHover: "=", //It can be set to true so it will be collapsed on first load
                    resizrRatio: "@", // [width] / [height] in %
                    resizrPosition: "@", // "bottom-right", "right", "left", "top-left", "top-right"
                    resizrBorder: "@", // The other option is a color
                    resizrParentClass: "=", // 'col-md-4'
                    resizrParentLevel: "=", // '2' will mean the component will go 2 parents up and change that class
                    resizrAdjacent: '@',
                    resizrTimeout: '@'
                },
                link: function(scope, element, attrs) {

                    // template
                    var template =
                    "<button class='art-typeahead-button' ng-class='{collapsed: artResizrCollapsed}' ng-click='artResizrToggle()'>" +
                        "<i ng-if='!artResizrCollapsed' class='fa fa-compress' aria-hidden='true'></i>" +
                        "<i ng-if='artResizrCollapsed' class='fa fa-expand' aria-hidden='true'></i>" +
                    "</button>";

                    // functions
                    var compileButton = function(){
                        element.append(template);
                        $compile(element)(scope);

                        if (settings.resizrBorder === 'true') {
                            angular.element(element).children('.art-typeahead-button').css({'background-color': settings.resizrBorder});
                        } else if (settings.resizrBorder === 'false') {
                            angular.noop();
                        } else if (settings.resizrBorder) {
                            angular.element(element).children('.art-typeahead-button').css({'background-color': settings.resizrBorder});
                        } else {
                            angular.noop();
                        }
                    };

                    var handleToggle = function(settings, state) {

                        if (state) {
                            //Means it's collapsed
                            if (settings.resizrType === 'zoom') {
                                element.addClass(classes.zoom);
                            }
                            element.addClass(classes.collapsed);
                        } else {
                            //Means it's open
                            if (settings.resizrType === 'zoom') {
                                element.removeClass(classes.zoom);
                            }
                            element.removeClass(classes.collapsed);
                        }

                    };

                    var addPositionClass = function(settings) {
                        switch (settings.resizrPosition) {
                            case 'left':
                                element.addClass(classes.left);
                                break;
                            case 'right':
                                element.addClass(classes.right);
                                break;
                            case 'bottom-left':
                                element.addClass(classes.bottomL);
                                break;
                            case 'bottom-right':
                                element.addClass(classes.bottomR);
                                break;
                            case 'top-left':
                                element.addClass(classes.topL);
                                break;
                            case 'top-right':
                                element.addClass(classes.topR);
                                break;
                            case false:
                                element.addClass(classes.bottomR);
                                break;
                        }
                    };

                    var originalSize = [];
                    originalSize[0] = element.width();
                    originalSize[1] = element.height();

                    //Get the width / height of element after a certain event fires
                    if (scope.resizrTimeout) {
                      $timeout(function(){
                        console.log('Fire ', scope.resizrRecalcEvent);
                        originalSize[0] = element.width();
                        originalSize[1] = element.height();
                      }, parseInt(scope.resizrTimeout));
                    }

                    var handleParentsAdjacents = function(level, elClass, adjacent, state) {

                      var elLevel = parseInt(level);
                      var actionElement = element;


                      for(var i = 0; i <= elLevel; i++) {
                        actionElement = element.parent();
                      }

                      if (adjacent) {
                        //actionElement becomes an array of elements that need resized
                        actionElement = actionElement.parent().children();
                      }

                      if (elClass) {
                        // If the class element is present and the class
                        if (!state) {
                            actionElement.removeClass(elClass);
                        } else {
                            actionElement.addClass(elClass);
                        }

                      } else {
                        // If the class element is not present resize elements with css
                        if (!state) {
                          actionElement.css({width: '', display: ''});
                          actionElement.removeAttr('width');
                          actionElement.removeAttr('display');
                        } else {
                          actionElement.css({width: actionElement.parent().width() / actionElement.length + 'px', display: 'inline-block'});
                        }
                      }


                    };

                    var handleSizes = function(rawRatio, type, state){
                        // Only if ratio is present
                        var ratio = [];

                        rawRatio.split('/').forEach(function(value){
                            ratio.push(parseInt(value));
                        });

                        if (type === 'zoom') {
                            // If nothing reset to 1
                            if (!state) {
                                element.css({"zoom": 1});
                            } else {
                                element.css({"zoom": JSON.stringify(ratio[0] / 100)});
                            }
                        } else if (type === 'css') {

                            if (!state) {
                                element.css({"width": originalSize[0] + 'px', "height": originalSize[1] + 'px'});
                            } else {
                                element.css({"width": element.width() * (ratio[0] / 100) + 'px', "height": element.height() * (ratio[1] / 100) + 'px'});
                            }
                        }
                    };

                    var classes = {
                        container: 'art-typeahead-container',
                        hover: 'art-typeahead-hover',
                        zoom: 'art-typeahead-zoom',
                        border: 'art-typeahead-border',
                        collapsed: 'art-typeahead-collapsed',
                        left: 'art-typeahead-left',
                        right: 'art-typeahead-right',
                        bottomL: 'art-typeahead-bottom-left',
                        bottomR: 'art-typeahead-bottom-right',
                        topL: 'art-typeahead-top-left',
                        topR: 'art-typeahead-top-right'
                    };

                    var defaults = {
                        resizrType: "css", // the other one is "css",
                        resizrCallback: false, //It can be set to true so it will be collapsed on first load
                        resizrCollapsed: false, //It can be set to true so it will be collapsed on first load
                        resizrAppearHover: false, //It can be set to true so it will be collapsed on first load
                        resizrRatio: "50/50", // [width] / [height] in %
                        resizrPosition: "bottom-left", // "bottom-right", "right", "left", "top-left", "top-right"
                        resizrBorder: false, // The other option is a color
                        resizrParentClass: false, // 'col-md-4'
                        resizrParentLevel: false, // '2' will mean the component will go 2 parents up and change that class
                        resizrAdjacent: false // true will mean that we go up to the desired parent and make the two blocks fit on the same row
                    };

                    /*console.log('scope', scope);
                    console.log('element', element);
                    console.log('attrs', attrs);*/


                    attrs = angular.extend(angular.copy(defaults), attrs);

                    // Cover string and bool
                    if(attrs.resizrCollapsed === 'true') {
                        scope.artResizrCollapsed = true;
                    } else if(attrs.resizrCollapsed === 'false'){
                        scope.artResizrCollapsed = false;
                    } else if (attrs.resizrCollapsed) {
                        scope.artResizrCollapsed = true;
                    } else {
                        scope.artResizrCollapsed = false;
                    }

                    var settings = attrs;


                    scope.artResizrToggle = function () {

                        // Toggle Collapse
                        scope.artResizrCollapsed = !scope.artResizrCollapsed;

                        // Handle collapse type
                        handleToggle(settings, scope.artResizrCollapsed);

                        if (settings.resizrParentLevel) {
                          //Handle the special cases with parents and adjacent resizing
                          handleParentsAdjacents(settings.resizrParentLevel, settings.resizrParentClass, settings.resizrAdjacent, scope.artResizrCollapsed);
                        } else {
                          //Normally handle the sizes
                          handleSizes(settings.resizrRatio, settings.resizrType, scope.artResizrCollapsed);
                        }


                        if (settings.resizrCallback) {
                            console.log( typeof scope.resizrCallback() === 'function' );
                            scope.resizrCallback()(scope.artResizrCollapsed);
                        }
                    };

                    var hookDirective = function(){
                        // Add the main class to the container
                        element.addClass(classes.container);

                        //Means it appears only on hover

                        if (settings.resizrAppearHover === 'true') {
                            element.addClass(classes.hover);
                        } else if (settings.resizrAppearHover === 'false') {
                            angular.noop();
                        } else if (settings.resizrAppearHover) {
                            element.addClass(classes.hover);
                        }

                        //Means we'll have a border
                        if (settings.resizrBorder === 'true') {
                            element.addClass(classes.border);
                            element.css({'border-color': settings.resizrBorder});
                        } else if (settings.resizrBorder === 'false') {
                            angular.noop();
                        } else if (settings.resizrBorder) {
                            element.addClass(classes.border);
                            element.css({'border-color': settings.resizrBorder});
                        } else {
                            angular.noop();
                        }

                        // Add the position class
                        addPositionClass(settings);

                        // Compile the button in the element
                        compileButton();



                        if (scope.artResizrCollapsed) {
                            //Run once handleToogle to have all the classes in place
                            handleToggle(settings, scope.artResizrCollapsed);

                            if (settings.resizrParentLevel) {
                              //Handle the special cases with parents and adjacent resizing
                              handleParentsAdjacents(settings.resizrParentLevel, settings.resizrParentClass, settings.resizrAdjacent, scope.artResizrCollapsed);
                            } else {
                              //Normally handle the sizes
                              handleSizes(settings.resizrRatio, settings.resizrType, scope.artResizrCollapsed);
                            }

                            // If it should be collapsed at the beginning
                            if (settings.resizrCallback) {
                                //Run the callback function if any
                                scope.resizrCallback()(scope.artResizrCollapsed);
                            }
                        }


                    };

                    // Start the whole deal
                    if (!angular.element(element).hasClass(classes.container)){
                        hookDirective();
                    }

                }
            };
        }
    ]);
