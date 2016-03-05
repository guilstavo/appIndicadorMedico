angular.module('app.controllers', [])

.controller('AppCtrl', function($scope) {

})
  
.controller('indicadorMedicoCtrl', function($scope, $ionicNavBarDelegate, getEspecialidades, $ionicFilterBar, $ionicLoading) {
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

	$scope.especialidades = [];
	especialidades = JSON.parse(window.localStorage.getItem( 'especialidades' ));
	if(especialidades != null){
		$scope.especialidades = especialidades;
	}else{
		$ionicLoading.show({
	      template: '<ion-spinner icon="android"/>'
	    });
		getEspecialidades.buscar()
		.then(function(dados){
			window.localStorage.setItem( 'especialidades', JSON.stringify(dados.especialidades) );
			$scope.especialidades = dados.especialidades;
			$ionicLoading.hide();
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
   
.controller('especialidadeCtrl', function($scope, $stateParams, getMedicos, $ionicLoading) {
	var id = $stateParams.especialidadeId;
	medicos = JSON.parse(window.localStorage.getItem( 'medicos' + id ));

	$scope.nomeEspecialidade = $stateParams.especialidadeNome;
	if(medicos != null){
		$scope.medicos = medicos;
	}else{
		$ionicLoading.show({
	      template: '<ion-spinner icon="android"/>'
	    });
		getMedicos.buscar(id)
		.then(function(dados){
			window.localStorage.setItem( 'medicos' + id, JSON.stringify(dados.medicos) );
			$scope.medicos = dados.medicos;
			$ionicLoading.hide();
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
   
.controller('medicoCtrl', function($scope, $stateParams, getDadosDoMedico, $ionicLoading) {
	$scope.medico = [];
	var id = $stateParams.medicoId;
	medico = JSON.parse(window.localStorage.getItem( 'medico'+ id));
	if(medico != null){
		$scope.medico = medico;
	}else{
		$ionicLoading.show({
	      template: '<ion-spinner icon="android"/>'
	    });
		getDadosDoMedico.buscar(id)
		.then(function(dados){
			window.localStorage.setItem( 'medico'+ id, JSON.stringify(dados.medico) );
			$scope.medico = dados.medico;
			$scope.$apply();
			$ionicLoading.hide();
		})
	}
	$scope.doRefresh = function() {
		getDadosDoMedico.buscar(id)
		.then(function(dados){
			window.localStorage.setItem( 'medico'+ id, JSON.stringify(dados.medico) );
			$scope.medico = dados.medico;
			$scope.$apply();
		}).finally(function() {
	       $scope.$broadcast('scroll.refreshComplete');
	     });
	};

	$scope.showMap = function(){
		$ionicLoading.show({
	      template: '<ion-spinner icon="android"/>'
	    });
		launchnavigator.navigate(
			medico.endereco,
			'',
			function(){
		    	//alert("Plugin success");
		    	$scope.hide = function(){
			    $ionicLoading.hide();
			  };
			},
			function(error){
		    	alert("Plugin error: "+ error);
			}
			// ,
			// {
	  //   		preferGoogleMaps: true
			// }
		);
	}
})