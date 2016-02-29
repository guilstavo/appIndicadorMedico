angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('indicadorMedico', {
    url: '/index',
    templateUrl: 'templates/indicadorMedico.html',
    controller: 'indicadorMedicoCtrl'

  })

  .state('especialidade', {
    url: '/listaMedicos/:especialidadeId?especialidadeNome',
    templateUrl: 'templates/especialidade.html',
    controller: 'especialidadeCtrl'
  })

  .state('medico', {
    url: '/medico/:medicoId',
    templateUrl: 'templates/medico.html',
    controller: 'medicoCtrl'
  })

$urlRouterProvider.otherwise('/index')

  

});