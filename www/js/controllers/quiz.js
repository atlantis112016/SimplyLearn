angular.module('simplelearn.controllers')

    .controller('quizCtrl', function(StorageService, $scope, $rootScope, $stateParams, $state, numAleaQuiz, Quiz, resultats, $ionicLoading) {
        var listeQuest = [];
        var liste1 = [];
        var liste2 =[];
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

 //       $scope.$on('$ionicView.beforeEnter', function(){
        //récupération de l'idCour
            $scope.idCours = $stateParams.idCours;
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show();
                // Récupération du quiz du fichier Json par rapport à l'idCour
                // pour le passer au scope
                Quiz.getQuiz().then(function () {
                    //Boucle pour ajouter les questions/réponses à listeQuest
                    for (var i = 0; i < Quiz.getMax(); i++) {
                        //   listeQuest.push(Quiz.getQuestion(i));
                        liste1.push(Quiz.getQuestion(i));

                    }

                    //on ajoute la liste1 des questions/réponses au tableau listeQuest
                    Array.prototype.push.apply(listeQuest, liste1);
                    //on ajoute la liste2 des questions/réponses au tableau listeQuest si il n'est pas vide
                    //Ce sont les questions Aléatoire
                    if ($rootScope.questions.length !== 0) {
                        Array.prototype.push.apply(listeQuest, $rootScope.questions);
                    }

                 //   console.log("liste question = ", listeQuest)
                    //on met la taille du tableau dans le scope, pour comparer avec les step
                    $scope.totalQuestions = listeQuest.length;

                    $scope.choix = function (index) {
                        $scope.disabled = true;
                        $scope.bouton = true;
                        if (index == $scope.vrai) {
                            // Bonne réponse
                            $scope.green[index] = true;
                            resultats.incrementeVrai();
                        } else {
                            // Mauvaise réponse
                            $scope.red[index] = true;
                            $scope.green[$scope.vrai] = true;
                            resultats.incrementeFaux();
                        }

                        //Si on arrive à la fin di questionnaire on renvoi vers la page score
                        //if(Quiz.getMax() == step) {
                        if (listeQuest.length == step) {
                            liste2.push(listeQuest[numAleaQuiz.getNaleatQuiz()]);
                            $rootScope.questions.push(listeQuest[numAleaQuiz.getNaleatQuiz()]);
                            $state.go("score", {idCours: $scope.idCours});
                        }
                    };

                    //Bouton suivant pour avancer dans les questions
                    $scope.suivant = function () {
                        if (step == -1) {
                            step = 0;
                            $scope.texteBouton = 'Question suivante';
                            $scope.iconeBouton = 'ion-android-arrow-forward';
                            resultats.resetVrai();
                            resultats.resetFaux();
                        }
                        getQuestion();
                    };
                    //charge le questionnaire et récupère individuellement chaque question avec ses réponses
                    var getQuestion = function () {
                        // var item = Quiz.getQuestion(step);
                        var item = listeQuest[step];
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

                }).catch(function (response) {
                    console.log(response);
                }).finally(function () {
                    $ionicLoading.hide();
                });
            });
 //       });
    })


      
