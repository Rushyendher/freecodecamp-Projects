var app = angular.module("top100",[]);
app.controller("Top100Campers",function($scope,$http){
	let url = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
	$http.get(url).then((response) => {
		console.log(response);
		$scope.details = response.data;
	});

	$scope.columnName = '-recent';
	$scope.reverseSort = false;

	$scope.sortColumn = function(column){
		$scope.reverseSort = ($scope.columnName == column) ? !$scope.reverseSort : false;
		$scope.columnName = column;
	}
});