angular.module('app.controllers', [])
  
.controller('indicadorMDicoCtrl', function($scope, $ionicNavBarDelegate, $http) {
	var isIOS = ionic.Platform.isIOS();
	$ionicNavBarDelegate.showBackButton(isIOS);
	//window.localStorage.clear();
	$scope.especialidades = [];
	especialidades = JSON.parse(window.localStorage.getItem( 'especialidades' ));
	if(especialidades != null){
		$scope.especialidades = especialidades;
	}else{
		$http.get('http://apmsantos.org.br/indicadorMedico/webservice/especialidades')
		.success(function(especialidades){
			window.localStorage.setItem( 'especialidades', JSON.stringify(especialidades) );
			$scope.especialidades = especialidades;
		}).error(function(erro){
			console.log(erro);
		})
	}
})
   
.controller('especialidadeCtrl', function($scope, $stateParams, $http) {
	$scope.medicos = [];
	medicos = JSON.parse(window.localStorage.getItem( 'medicos'+ $stateParams.especialidadeId ));
	if(medicos != null){
		$scope.medicos = medicos;
	}else{
		$scope.nomeEspecialidade = $stateParams.especialidadeNome;
		$http.get('http://apmsantos.org.br/indicadorMedico/webservice/medicosEspecialistas/' + $stateParams.especialidadeId)
		.success(function(medicos){
			window.localStorage.setItem( 'medicos'+ $stateParams.especialidadeId, JSON.stringify(medicos) );
			$scope.medicos = medicos;
		}).error(function(erro){
			console.log(erro);
		})
	}
})
   
.controller('medicoCtrl', function($scope, $stateParams, $http) {
	$scope.medico = [];
	medico = JSON.parse(window.localStorage.getItem( 'medico'+ $stateParams.medicoId ));
	if(medico != null){
		console.log(medico);
		$scope.medico = medico;
	}else{
		$http.get('http://apmsantos.org.br/indicadorMedico/webservice/medico/' + $stateParams.medicoId)
		.success(function(medico){
			window.localStorage.setItem( 'medico'+ $stateParams.medicoId, JSON.stringify(medico) );
			$scope.medico = medico;
		}).error(function(erro){
			console.log(erro);
		})
	}
})