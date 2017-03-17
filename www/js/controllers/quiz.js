angular.module('simplelearn.controllers')

    .controller('quizCtrl', function($rootScope, StorageService, $ionicLoading, $scope, $stateParams, $state, Quiz, resultats) {
        var listeQuest = [];
        var liste1 = [];
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


        //récupération de l'idCour pour faire correspondre le questionnaire
            $scope.idCours = $stateParams.idCours;

            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show();
                // Récupération du quiz du fichier Json par rapport à l'idCour
                // pour le passer au scope
                Quiz.getQuiz().then(function () {
                    //Boucle pour ajouter les questions/réponses à liste1
                    for (var i = 0; i < Quiz.getMax(); i++) {
                        liste1.push(Quiz.getQuestion(i));
                    }

                    //on ajoute la liste1 des questions/réponses au tableau listeQuest
                    Array.prototype.push.apply(listeQuest, liste1);
                    //si le $rootscope n'est pas vide ça ajoute, les questions déjà stockées dedans à listeQuest
                    //pour alimenter le questionnaire des questions des anciens cours.
                   if ($rootScope.questions.length !== 0) {
                        Array.prototype.push.apply(listeQuest, $rootScope.questions);
                   }

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

                        //Si on arrive à la fin du questionnaire on renvoi vers la page score et on tire une question
                        //aléatoire pour l'ajouter au $rootscope
                        //puis on va sur la page score

                        if (listeQuest.length == step) {
                            $scope.bouton = false;
                            $rootScope.questions.push(listeQuest[2]);
                            $state.go("score", {idCours: $scope.idCours});
                        }
                    };

                    //Bouton Question suivante pour avancer dans les questions
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


      
