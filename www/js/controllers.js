angular.module('app.controllers', [])
  
.controller('indicadorMDicoCtrl', function($scope, $ionicNavBarDelegate, $http) {
	var isIOS = ionic.Platform.isIOS();
	$ionicNavBarDelegate.showBackButton(isIOS);

	$scope.especialidades = [];
	$http.get('http://apmsantos.org.br/indicadorMedico/webservice/especialidades')
	.success(function(especialidades){
		$scope.especialidades = especialidades;
	}).error(function(erro){
		console.log(erro);
	})
})
   
.controller('especialidadeCtrl', function($scope) {
	
})
   
.controller('mDicoCtrl', function($scope) {

})