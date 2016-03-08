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
   
.controller('medicoCtrl', function($scope, $stateParams, getDadosDoMedico, $ionicLoading, $ionicModal) {
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
	var strFavorites = window.localStorage.getItem('favorites');
	
	if (strFavorites == null) {
    	var favorites = [0];
    	$scope.favoriteClass = "ion-ios-heart-outline";
	}else{
		var favorites = strFavorites.split(",");
		if(favorites.indexOf(id) < 0){
			$scope.favoriteClass = "ion-ios-heart-outline";
		}else{
			$scope.favoriteClass = "ion-ios-heart";
		}
	}
	$scope.favorites = favorites;

	$scope.doFavorite = function() {
		var id = $stateParams.medicoId;
		var favorites = $scope.favorites;
		var index = favorites.indexOf(id);
		if(index < 0){
			favorites.push(id);
			$scope.favoriteClass = "ion-ios-heart";
		}else{
			favorites.splice(index, 1);
			$scope.favoriteClass = "ion-ios-heart-outline";
		}
		$scope.favorites = favorites;
		window.localStorage.setItem( 'favorites', favorites );
	};

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

	$scope.calendarData = {};

	$ionicModal.fromTemplateUrl('templates/calendar.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.closeCalendar = function() {
		$scope.modal.hide();
	};

	$scope.calendar = function() {
		$scope.modal.show();
	};

	$scope.doCalendar = function() {
		console.log('Doing calendar', $scope.calendarData);

		$timeout(function() {
			$scope.closeCalendar();
		}, 1000);
	};

	// $scope.showMap = function(){
	// 	$ionicLoading.show({
	//       template: '<ion-spinner icon="android"/>'
	//     });
	// 	launchnavigator.navigate(
	// 		medico.endereco,
	// 		'',
	// 		function(){
	// 	    	//alert("Plugin success");
	// 	    	$scope.hide = function(){
	// 		    $ionicLoading.hide();
	// 		  };
	// 		},
	// 		function(error){
	// 	    	alert("Plugin error: "+ error);
	// 		}
	// 		,
	// 		{
	//     		preferGoogleMaps: true
	// 		}
	// 	);
	// }
})
.controller('favoritosCtrl', function($scope, $stateParams, getDadosDoMedico, $ionicLoading) {

	var strFavorites = window.localStorage.getItem('favorites');
	
	if (strFavorites == null) {
    	alert("Você ainda não possui nenhum favorito na lista.");
	}else{
		$ionicLoading.show({
	    	template: '<ion-spinner icon="android"/>'
	    });
	    var favorites = strFavorites.split(",");
		favorites.splice(0, 1);
		var medicos = [];
		favorites.forEach(function(id) {
		    getDadosDoMedico.buscar(id)
			.then(function(dados){
				medico = {medid:dados.medico.medid, nome:dados.medico.nome}
				medicos.push(medico);
			})
		});
		$scope.medicos = medicos;
		$ionicLoading.hide();
		
	}

})

