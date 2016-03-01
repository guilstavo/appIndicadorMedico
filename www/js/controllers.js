angular.module('app.controllers', [])
  
.controller('indicadorMedicoCtrl', function($scope, $ionicNavBarDelegate, getEspecialidades, $ionicFilterBar) {
	var isIOS = ionic.Platform.isIOS();
	$ionicNavBarDelegate.showBackButton(isIOS);
	//window.localStorage.clear();

	var filterBarInstance;
	$scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.especialidades,
        update: function (filteredItems, filterText) {
          $scope.especialidades = filteredItems;
          if (filterText) {
            console.log(filterText);
          }
        }
      });
    };

	$scope.filtro = '';

	$scope.especialidades = [];
	especialidades = JSON.parse(window.localStorage.getItem( 'especialidades' ));
	if(especialidades != null){
		$scope.especialidades = especialidades;
	}else{
		getEspecialidades.buscar()
		.then(function(dados){
			window.localStorage.setItem( 'especialidades', JSON.stringify(dados.especialidades) );
			$scope.especialidades = dados.especialidades;
		})
	};
	$scope.doRefresh = function() {

		getEspecialidades.buscar()
		.then(function(dados){
			window.localStorage.setItem( 'especialidades', JSON.stringify(dados.especialidades) );
			$scope.especialidades = dados.especialidades;
		}).finally(function() {
	       $scope.$broadcast('scroll.refreshComplete');
	     });
	};
})
   
.controller('especialidadeCtrl', function($scope, $stateParams, getMedicos) {
	var id = $stateParams.especialidadeId;
	medicos = JSON.parse(window.localStorage.getItem( 'medicos' + id ));
	if(medicos != null){
		$scope.medicos = medicos;
	}else{
		$scope.nomeEspecialidade = $stateParams.especialidadeNome;
		getMedicos.buscar(id)
		.then(function(dados){
			window.localStorage.setItem( 'medicos' + id, JSON.stringify(dados.medicos) );
			$scope.medicos = dados.medicos;
		})
	};
	$scope.doRefresh = function() {
		getMedicos.buscar($stateParams.especialidadeId)
		.then(function(dados){
			window.localStorage.setItem( 'medicos' + id, JSON.stringify(dados.medicos) );
			$scope.medicos = dados.medicos;
		}).finally(function() {
	       $scope.$broadcast('scroll.refreshComplete');
	     });
	};
})
   
.controller('medicoCtrl', function($scope, $stateParams, getDadosDoMedico) {
	$scope.medico = [];
	var id = $stateParams.medicoId;
	medico = JSON.parse(window.localStorage.getItem( 'medico'+ id));
	if(medico != null){
		$scope.medico = medico;
	}else{
		getDadosDoMedico.buscar(id)
		.then(function(dados){
			window.localStorage.setItem( 'medico'+ id, JSON.stringify(dados.medico) );
			$scope.medico = dados.medico;
		})
	}
	$scope.doRefresh = function() {
		getDadosDoMedico.buscar(id)
		.then(function(dados){
			window.localStorage.setItem( 'medico'+ id, JSON.stringify(dados.medico) );
			$scope.medico = dados.medico;
		}).finally(function() {
	       $scope.$broadcast('scroll.refreshComplete');
	     });
	};
})