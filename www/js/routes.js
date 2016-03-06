angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })


  .state('app.indicadorMedico', {
    url: '/index',
    views: {
      'menuContent': {
        templateUrl: 'templates/indicadorMedico.html',
        controller: 'indicadorMedicoCtrl'
      }
    }
  })

  .state('app.especialidade', {
    url: '/listaMedicos/:especialidadeId?especialidadeNome',
    views: {
      'menuContent': {
        templateUrl: 'templates/especialidade.html',
        controller: 'especialidadeCtrl'
      }
    }
  })

  .state('app.medico', {
    url: '/medico/:medicoId',
    views: {
      'menuContent': {
        templateUrl: 'templates/medico.html',
        controller: 'medicoCtrl'
      }
    }
  })

  .state('app.favoritos', {
    url: '/favoritos',
    views: {
      'menuContent': {
        templateUrl: 'templates/especialidade.html',
        controller: 'favoritosCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/app/index')

  

});