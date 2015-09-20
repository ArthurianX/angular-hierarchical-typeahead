angular.module('app', ['ngAnimate','yearSelector']);

angular.module('app').controller('DemoCtrl',function($scope,$http){

	$scope.delay = 0;
	$scope.minDuration = 0;
	$scope.message = 'Please Wait...';
	$scope.backdrop = true;
	$scope.promise = null;
    $scope.triggerAttach = false;

	$scope.demo = function(){

        console.log($scope);
		$scope.promise = $http.get('http://httpbin.org/delay/3');

        $scope.message = 'Munm';

	};

    $scope.trigger = function(){
        console.log('Should trigger');
        $scope.triggerAttach = true;
    };

////////////////////////////////////////////////


    $scope.defaultModel = 'Year / Range Model';
    $scope.ctrYears = 10;

    $scope.ctrAttachTo = false;
    $scope.ctrAttachToEnable = function(){

        if ($scope.ctrAttachTo == '.delayed-attachment') {
            $scope.ctrAttachTo = false;
        } else {
            $scope.ctrAttachTo = '.delayed-attachment';
        }
    };

    $scope.ctrAttachNow = false;
    $scope.ctrCallback = false;
    $scope.ctrRange = true;
    $scope.ctrDrag = true;







});