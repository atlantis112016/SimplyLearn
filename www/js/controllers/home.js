angular.module('simplelearn.controllers')

    .controller('homeCtrl', function($scope, $rootScope, $state, numAleatoire, StorageService) {
        var numAleat = numAleatoire.getNaleat();
        $scope.elements = StorageService.getAll();
    //pour remettre à zéro le local storage
        $scope.reset = function () {
            StorageService.removeAll();
            window.location.reload();
        };


            $scope.nAleat = numAleat;

        //StorageService.removeAll();
        console.log('storageService = ' + $scope.elements.length);
       // console.log('$rootScope = ', $rootScope.questions.length);
    })