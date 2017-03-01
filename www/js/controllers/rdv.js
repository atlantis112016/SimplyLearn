angular.module('simplelearn.controllers')

    .controller('rdvCtrl', function ($scope, $ionicLoading, listeRDV) {
       /* $scope.add = function() {
            // Récupération de la liste du fichier Json
            // pour le passer au scope
            $http.get("data/listeRDV.json")
                .success(function(data) {
                    //Renvoie les RDVS
                    $scope.rdvs = data.rdvs;

                })
            var alarmTime = new Date();
            alarmTime.setMinutes(alarmTime.getMinutes() + 1);
            $cordovaLocalNotification.add({
                id: "1234",
                date: alarmTime,
                message: "Votre prochaine leçon est dans une heure",
                title: "Rappel de leçon",
                autoCancel: true,
                sound: null
            }).then(function (add) {
                console.log("Cette notification a bien été paramétrée");
                alert("Notification 1234 ajoutée: " + add);
            });
        };*/

        // Crée un Object listCours
        $scope.rdvs = {};

        // Initialise le modèle avec une chaîne vide
        $scope.rdvs = '';
        // Récupération de la liste du fichier Json
        // pour le passer au scope
        $scope.$on('$ionicView.enter', function(){
            $ionicLoading.show();
            // Récupération de la liste du fichier Json
            // pour le passer au scope
            listeRDV.getRdv().then(function(response){
                //Renvoie les RDVS
                $scope.rdvs = response.data.rdvs;
            }).catch(function(response){
                console.log(response);
            }).finally(function(){
                $ionicLoading.hide();
            });
        });
    })
