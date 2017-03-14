angular.module('simplelearn.controllers')

  .controller('listeCoursCtrl', function($scope, numAleatoire, Cours, $ionicLoading, StorageService) {

        //Numero aletoire pour futur choix leçon
        $scope.nAleat = numAleatoire.getNaleat();
        //Récupération du tableau où sont stockés les cours déjà suivis avec quiz validés
        $scope.elements = StorageService.getAll();
        //console.log('storageService = ' + $scope.elements)
        // Crée un Object listCours
         $scope.Cours = {};

        // Initialise le modèle avec une chaîne vide
        $scope.Cours = '';

        $scope.$on('$ionicView.enter', function(){
            $ionicLoading.show();
            // Récupération de la liste du fichier Json
            // pour le passer au scope
            Cours.getCours().then(function(response){
                //filtre personnalisé pour mettre par ordre croissant
                var filterBy =  $scope.elements;
                $scope.monFilterBy = function(e) {
                    return filterBy.indexOf(e.id) !== -1;
                }
                $scope.Cours = response.data.coursItems;

                //si le local storage est vide, message pour dire à l'utilisateur qu'il n'a pas encore suivi de leçons
                        if (StorageService.length() == 0){
                            $scope.infoSiVide = "Vous n'avez pas encore suivi de cours";
                        }

            }).catch(function(response){
                console.log(response);
            }).finally(function(){
                $ionicLoading.hide();
            });
        });

    })

      
