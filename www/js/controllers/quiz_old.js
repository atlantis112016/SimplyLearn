angular.module('simplelearn.controllers')


//To add to the local storage method, you can use JSON.stringify(myData) to store it as a string and JSON.parse(localStorage['my-data')
    .controller('quizCtrl', function($scope, $ionicLoading, $stateParams, Quiz, resultats, $state) {
        //Récupération du numéro du questionnaire pour faire correspondre le numéro du quizz
        $scope.idCours = $stateParams.idCours;
        //console.log('quizz numéro :' +$stateParams.idCours)
        $scope.question = '';
        $scope.reponses = {};
        $scope.vrai = 0;
        $scope.red = [];
        $scope.green = [];
        $scope.bouton = false;
        $scope.disabled = false;
        $scope.texteBouton = 'Question suivante';
        $scope.iconeBouton = 'ion-android-arrow-forward';
        resultats.resetVrai();
        resultats.resetFaux();
        var step = 0;

        $scope.$on('$ionicView.enter', function(){
            $ionicLoading.show();
            // Récupération de la liste du fichier Json par le service Cours
            // pour le passer au scope
            Quiz.getQuiz().then(function(response){
                //Récupération du nombre de question
                $scope.totalQuestions = Quiz.getMax();
                //console.log("total question = " + $scope.totalQuestions)
                $scope.choix = function (index) {
                    $scope.disabled = true;
                    $scope.bouton = true;
                    if(index == $scope.vrai) {
                        // Bonne réponse
                        $scope.green[index] = true;
                        resultats.incrementeVrai();
                    } else {
                        // Mauvaise réponse
                        $scope.red[index] = true;
                        $scope.green[$scope.vrai] = true;
                        resultats.incrementeFaux();
                    }
                    if(Quiz.getMax() == step) {
                        $scope.iconeBouton = 'ion-wand';
                        $scope.texteBouton = 'Votre score';
                        //step = -1;
                        $state.go("score", {idCours: $scope.idCours});
                    }
                };

                $scope.suivant = function () {
                    if(step == -1) {
                        step = 0;
                        $scope.texteBouton = 'Question suivante';
                        $scope.iconeBouton = 'ion-android-arrow-forward';
                        resultats.resetVrai();
                        resultats.resetFaux();
                    }
                    getQuestion();
                };

                var getQuestion = function () {
                    var item = Quiz.getQuestion(step);
                    $scope.bouton = false;
                    $scope.disabled = false;
                    $scope.question = item.question;
                    $scope.reponses = item.reponses;
                    $scope.vrai = item.vrai;
                    $scope.red = [];
                    $scope.green = [];
                    for (var i = 0; i < item.reponses.length; i++) {
                        $scope.red.push(false);
                        $scope.green.push(false);
                    }
                    ++step;
                    //Récupération de l'étape
                    $scope.etape = step;
                }
                $scope.suivant();

            }).catch(function(response){
                console.log("reponseQuiz = " +response);
            }).finally(function(){
                $ionicLoading.hide();
            });

        });
    })


      
