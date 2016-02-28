angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('indicadorMDico', {
    url: '/index',
    templateUrl: 'templates/indicadorMDico.html',
    controller: 'indicadorMDicoCtrl'

  })

  .state('especialidade', {
    url: '/listaMedicos/:especialidadeId',
    templateUrl: 'templates/especialidade.html',
    controller: 'especialidadeCtrl'
  })

  .state('mDico', {
    url: '/medico:medicoId',
    templateUrl: 'templates/mDico.html',
    controller: 'mDicoCtrl'
  })

$urlRouterProvider.otherwise('/index')

  

});