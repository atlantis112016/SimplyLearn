angular.module('simplelearn.controllers')

    .controller('rdvCtrl', function ($scope, $ionicLoading, listeRDV) {
        // Crée les Objets de la listeRDV
        $scope.rdvs = {};
        $scope.nDate = {};

        // Initialise les modèles avec une chaîne vide
        $scope.rdvs = '';
        $scope.nDate = '';

        //Récupère la date sytème en timestamp
        var dateNow = Date.now();
        //pour filtrer dans la vue les dates qui seront sup à la date du jour
        $scope.nDate = dateNow;

        // Récupération de la liste du fichier Json
        // pour le passer au scope
        $scope.$on('$ionicView.enter', function(){
            $ionicLoading.show();
            // Récupération de la liste du fichier Json
            // pour le passer au scope
            listeRDV.getRdv().then(function(response){

                //Renvoie les RDVS
                $scope.rdvs = response.data.rdvs;

                //Si il n'y a pas de RDV
                if ($scope.rdvs.length == 0){
                    $scope.infoSiVide = "Vous n'avez pas encore de RDV";
                }

            }).catch(function(response){
                console.log(response);
            }).finally(function(){
                $ionicLoading.hide();
            });
        });
    })
