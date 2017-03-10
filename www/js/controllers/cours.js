angular.module('simplelearn.controllers')

    .controller('coursCtrl', function($scope, StorageService, numAleatoire, Cours, $ionicLoading, $stateParams) {
        $scope.stockageLocal = StorageService.getAll();
        //Numero aletoire pour futur choix leçon
        $scope.nAleat = numAleatoire.getNaleat();
        //récupération de l'id du cours
        $scope.idCours = $stateParams.idCours;

        //fonction permettant de savoir si la leçon a déjà été enregistré dans le localstorage
        var doublonTest = function (numTest) {
            if ($scope.stockageLocal.length > 0) {
                for (var i = 0; i < StorageService.length(); i++) {
                    if ($scope.stockageLocal[i] == numTest) {
                        return true;
                    }
                }
            }
        }
        //Permet d'afficher le bouton quiz ou un message à la place dans cours.html
        //on test si le cours a déjà été vu.
        if ($scope.stockageLocal.length > 0) {
            $scope.doublon = doublonTest($scope.idCours);
            console.log($scope.doublon);
        } else {
            $scope.doublon = "false";
        }
        // Crée un Object listCours
        $scope.coursItems = {};

        // Récupération de la liste du fichier Json
        // pour le passer au scope

        $scope.$on('$ionicView.enter', function(){
            $ionicLoading.show();

            // Récupération de la liste du fichier Json par le service Cours
            // pour le passer au scope
            Cours.getCours().then(function(response){
                if ($scope.idCours !== null) {
                    //Si on passe par liste cours on va reprendre l'id passé en paramètre
                    $scope.coursItems = response.data.coursItems[$scope.idCours-1];

                } else{
                    //Autrement c'est que nous sommes sur la leçon du jour donc numéro aléatoire
                    $scope.coursItems = response.data.coursItems[$scope.nAleat];
                }

            }).catch(function(response){
                console.log(response);
            }).finally(function(){
                $ionicLoading.hide();
            });
        });
    })


      
