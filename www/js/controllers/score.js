angular.module('simplelearn.controllers')

    .controller('scoreCtrl', function($scope, $rootScope, resultats, $stateParams, StorageService) {
        $scope.elements = StorageService.getAll();
        var newThing = $stateParams.idCours;
          $scope.setResults = function () {
            $scope.vrai = resultats.getVrai();
            $scope.faux = resultats.getFaux();
        };

        var doublonTest = function (numTest) {
            if (StorageService.length() > 0) {
                for (var i = 0; i < StorageService.length(); i++) {
                    if ($scope.elements[i] == numTest) {
                        return true;
                    }
                }
            }
        }
       /* si il n'y a pas de doublon entre le numéro de cours et ceux stockés dans le local storage alors on ajoute
         au local storage le nouveau numéro de cour*/
        if (doublonTest(newThing) !== true) {
            StorageService.add(newThing);
        }

    })