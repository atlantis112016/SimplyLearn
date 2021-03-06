angular.module('simplelearn.controllers')

    .controller('homeCtrl', function($scope, $rootScope, $ionicLoading, $state, numAleatoire, StorageService, $ionicPlatform, listeRDV, $cordovaLocalNotification) {
        $ionicPlatform.ready(function () {
            //pour remettre à zéro le local storage avec bouton dans la vue
            $scope.reset = function () {
                StorageService.removeAll();
                window.location.reload();
            };

            //Tirer un numéro aleatoire, en utilisant le service
            var numAleat = numAleatoire.getNaleat();
            //Récupère tous les éléments du local storage
            $scope.elements = StorageService.getAll();

            //Récupère le numéro aléatoire dans la vue
            $scope.nAleat = numAleat;

            $scope.$on('$ionicView.enter', function(){

                $ionicLoading.show();
                // Crée les Objets de la listeRDV
                $scope.rdvs = {};
                $scope.timestamp = {};

                // Initialise les modèles avec une chaîne vide
                $scope.rdvs = '';
                $scope.timestamp = '';

                //Récupère la date sytème en timestamp
                var dateNow = Date.now();

                //utiliser  le service pour récupérer la liste de RDV
                listeRDV.getRdv().then(function(response){
                    //Renvoie les RDVS
                    $scope.rdvs = response.data.rdvs;
                    //boucle pour passer les rdvs et comparer avec la date système
                    for (var i = 0; i < $scope.rdvs.length; i++) {
                        //Récupération des données timestamp dans le fichier JSON
                        $scope.timestamp = $scope.rdvs[i].timeStamp;

                        //on enlève une heure aux données timestamp du fichier JSON
                        var datej = ($scope.timestamp - 1000 * 3600);
                        //Permet d'incrementer id $cordovaLocalNotification
                        var id = 1 + i
                        //Si date système est inférieur à date listeRDV - 1 heure
                        if (dateNow < datej) {
                            var _1HeureFromNow = new Date($scope.timestamp - 1000 * 3600);
                           //ajout notif
                            $cordovaLocalNotification.add({
                                id: id,
                                at: _1HeureFromNow,
                                title: 'Rappel de cours',
                                text: 'Votre leçon est dans 1 heure'
                            }).then(function () {
                                alert("Notification ajoutée: " + add);
                            });
                        }
                    }

                }).catch(function(response){
                    console.log(response);
                }).finally(function(){
                    $ionicLoading.hide();
                });
            });


        })
    })