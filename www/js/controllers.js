angular.module('app.controllers', [])
  
.controller('indicadorMDicoCtrl', function($scope, $ionicNavBarDelegate) {
	var isIOS = ionic.Platform.isIOS();
	$ionicNavBarDelegate.showBackButton(isIOS);
})
   
.controller('especialidadeCtrl', function($scope) {
	
})
   
.controller('mDicoCtrl', function($scope) {

})