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
   
.controller('especialidadeCtrl', function($scope, $stateParams, $http) {
	$scope.nomeEspecialidade = $stateParams.especialidadeNome;
	$scope.medicos = [];
	$http.get('http://apmsantos.org.br/indicadorMedico/webservice/medicosEspecialistas/' + $stateParams.especialidadeId)
	.success(function(medicos){
		$scope.medicos = medicos;
	}).error(function(erro){
		console.log(erro);
	})
})
   
.controller('medicoCtrl', function($scope, $stateParams, $http) {
	$scope.medico = [];
	$http.get('http://apmsantos.org.br/indicadorMedico/webservice/medico/' + $stateParams.medicoId)
	.success(function(medico){
		$scope.medico = medico;
	}).error(function(erro){
		console.log(erro);
	})
})