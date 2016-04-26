angular.module('artResizr',[]);

angular.module('artResizr')
    .directive('artResizr',['$parse', '$document', '$http', '$timeout', '$compile','$templateCache',
        function($parse, $document, $http, $timeout, $compile, $templateCache){
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {

                    // template
                    var template =
                    "<button class='art-resizr-button' ng-click='artResizrToggle()'>" +
                        "<i ng-if='artResizrCollapsed' class='fa fa-compress' aria-hidden='true'></i>" +
                        "<i ng-if='!artResizrCollapsed' class='fa fa-expand' aria-hidden='true'></i>" +
                    "</button>";

                    // functions
                    var compileButton = function(){
                        element.append(template);
                        $compile(element)(scope);

                        if (settings.resizrBorder == 'true') {
                            angular.element(element).children('.art-resizr-button').css({'background-color': settings.resizrBorder});
                        } else if (settings.resizrBorder == 'false') {

                        } else if (settings.resizrBorder) {
                            angular.element(element).children('.art-resizr-button').css({'background-color': settings.resizrBorder});
                        } else {

                        }
                    };

                    var handleToggle = function(settings, state) {

                        if (state) {
                            //Means it's collapsed
                            if (settings.resizrType == 'zoom') {
                                element.addClass(classes.zoom);
                            }
                            element.addClass(classes.collapsed);
                        } else {
                            //Means it's open
                            if (settings.resizrType == 'zoom') {
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
                        }
                    };

                    var classes = {
                        container: 'art-resizr-container',
                        hover: 'art-resizr-hover',
                        zoom: 'art-resizr-zoom',
                        border: 'art-resizr-border',
                        collapsed: 'art-resizr-collapsed',
                        left: 'art-resizr-left',
                        right: 'art-resizr-right',
                        bottomL: 'art-resizr-bottom-left',
                        bottomR: 'art-resizr-bottom-right',
                        topL: 'art-resizr-top-left',
                        topR: 'art-resizr-top-right'
                    };

                    var defaults = {
                        resizrType: "zoom", // the other one is "css",
                        resizrCallback: false, //It can be set to true so it will be collapsed on first load
                        resizrCollapsed: false, //It can be set to true so it will be collapsed on first load
                        resizrAppearHover: false, //It can be set to true so it will be collapsed on first load
                        resizrRatio: "50/50", // [width] / [height] in %
                        resizrPosition: "bottom-left", // "bottom-right", "right", "left", "top-left", "top-right"
                        resizrBorder: false, // The other option is a color
                        resizrParentClass: false, // 'col-md-4'
                        resizrParentLevel: false // '2' will mean the component will go 2 parents up and change that class
                    };

                    /*console.log('scope', scope);
                    console.log('element', element);
                    console.log('attrs', attrs);*/


                    attrs = angular.extend(angular.copy(defaults), attrs);

                    // Cover string and bool
                    if(attrs.resizrCollapsed == 'true') {
                        scope.artResizrCollapsed = true;
                    } else if(attrs.resizrCollapsed == 'false'){
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

                        if (settings.resizrCallback) {
                            scope[settings.resizrCallback](scope.artResizrCollapsed);
                        }
                    };

                    var hookDirective = function(){
                        // Add the main class to the container
                        element.addClass(classes.container);

                        //Means it appears only on hover

                        if (settings.resizrAppearHover == 'true') {
                            element.addClass(classes.hover);
                        } else if (settings.resizrAppearHover == 'false') {

                        } else if (settings.resizrAppearHover) {
                            element.addClass(classes.hover);
                        }

                        //Means we'll have a border
                        if (settings.resizrBorder == 'true') {
                            element.addClass(classes.border);
                            element.css({'border-color': settings.resizrBorder});
                        } else if (settings.resizrBorder == 'false') {

                        } else if (settings.resizrBorder) {
                            element.addClass(classes.border);
                            element.css({'border-color': settings.resizrBorder});
                        } else {

                        }

                        // Add the position class
                        addPositionClass(settings);

                        // Compile the button in the element
                        compileButton();



                        if (scope.artResizrCollapsed) {
                            //Run once handleToogle to have all the classes in place
                            handleToggle(settings, scope.artResizrCollapsed);

                            // If it should be collapsed at the beginning
                            if (settings.resizrCallback) {
                                //Run the callback function if any
                                scope[settings.resizrCallback](scope.artResizrCollapsed);
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