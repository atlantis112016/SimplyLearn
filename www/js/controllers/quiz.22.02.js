// Crée un Object listCours
var rdvs = {};
var daterdv = {};
// Initialise le modèle avec une chaîne vide
rdvs = '';
daterdv ='';
var dateSyst = JSON.stringify(new Date().toLocaleString());
var dateSystFormat = dateSyst.substring(1,11);
var dateAlarm ='';
console.log('dateSystFormat = ', dateSystFormat);
listeRDV.getRdv().then(function(response){
    //Renvoie les RDVS
    rdvs = response.data.rdvs;
    //boucle pour passer les rdvs et comparer avec la date système
    for (var i = 0; i < rdvs.length; i++) {
        daterdv = rdvs[i].daterdv;
        var heurerdv = rdvs[i].heurerdv;
        if (daterdv == dateSystFormat) {
            //console.log (' heurerdv = ', heurerdv);
            //alarmTime = new Date((new Date) - 1000*3600);

            dateAlarm = toDate(heurerdv, "h:m");
            //console.log('dateAlarm = ', dateAlarm);

            function toDate(dStr, format) {
                var now = new Date();
                if (format == "h:m") {
                    //Enlève une heure par rapport à l'heure du RDV du fichier JSON
                    now.setHours(dStr.substr(0, dStr.indexOf(":")));
                    now.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
                    now.setSeconds(0);
                    return now;
                } else
                    return "Invalid Format";
            }
        }
    }
})



angular.module('simplelearn.controllers')

    .controller('quizCtrl', function($scope, $stateParams, $state, StorageService, QuizAleat, Quiz, resultats, $ionicLoading) {
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

        $scope.$on('$ionicView.beforeEnter', function(){
        //récupération de l'idCour
            $scope.idCours = $stateParams.idCours;
            //Si Il y a des cours déjà suivi
            if (StorageService.getAll() !== 0) {
                //récupération des questions des autres cours déjà vue
                QuizAleat.getQuizAleat().then(function(){
                    //Boucle pour ajouter les questions/réponses des autres leçons déjà vues à listeQuest
                    for (var i = 0; i < QuizAleat.getMaxAleat(); i++) {
                        //   listeQuest.push(QuizAleat.getQuestionAleat(i));
                        liste2.push(QuizAleat.getQuestionAleat(i))
                    }

                })
            } else {
                //autrement tableau liste 2 est vide
                liste2 = [];
            }
            $ionicLoading.show();

            // Récupération du quiz du fichier Json par rapport à l'idCour
            // pour le passer au scope
            Quiz.getQuiz().then(function(){
                //Boucle pour ajouter les questions/réponses à listeQuest
                for (var i = 0; i < Quiz.getMax(); i++) {
                 //   listeQuest.push(Quiz.getQuestion(i));
                    liste1.push(Quiz.getQuestion(i));
                }
                //on ajoute la liste1 des questions/réponses au tableau listeQuest
                Array.prototype.push.apply(listeQuest, liste1);
                //on ajoute la liste2 des questions/réponses au tableau listeQuest si il n'est pas vide
                //Ce sont les questions Aléatoire
                    if (liste2.length !== 0){
                        Array.prototype.push.apply(listeQuest, liste2);
                    }

                console.log("liste question = ", listeQuest )
                //on met la taille du tableau dans le scope, pour comparer avec les step
                $scope.totalQuestions = listeQuest.length;

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

                    //Si on arrive à la fin di questionnaire on renvoi vers la page score
                    //if(Quiz.getMax() == step) {
                    if(listeQuest.length == step) {
                        //$scope.iconeBouton = 'ion-wand';
                        //$scope.texteBouton = 'Votre score';
                        //step = -1;
                        //StorageService.add($scope.idCours);
                         $state.go("score", {idCours: $scope.idCours});
                    }
                };

                //Bouton suivant pour avancer dans les questions
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

            }).catch(function(response){
                console.log(response);
            }).finally(function(){
                $ionicLoading.hide();
            });

        });
    })


      
