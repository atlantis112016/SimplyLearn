angular.module('simplelearn.services', ['ngStorage'])
    //Création du numéro aléatoire de la leçon en cours
    .service('numAleatoire', function(){
        var o = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            function shuffle(o){
                for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
                return o;
            }

            return {
                getNaleat:function(){
                    return shuffle(o)[0];
                }
            }
    })

    //Récupère la liste des cours
    .factory('Cours', function ($http) {
        var dataSource = 'data/listeCours.json';
        return {
            getCours: function() {
                return $http.get(dataSource);
            }
        }
    })

    //Récupère la liste des RDV
    .factory('listeRDV', function ($http) {
        var dataSource = 'data/listeRDV.json';
        return {
            getRdv: function() {
                return $http.get(dataSource);
            }
        }
    })

    //Récupère le bon quiz en fonction de la leçon encours
    .factory('Quiz',function( $stateParams, $http){
       var listeQuestions = [];
       var quizSource = "";

       var loadQuiz = function () {
           //Récupération du fichier quiz dans dossier data par rapport au numéro de la leçon suivi
           quizSource = "data/quiz"+ $stateParams.idCours +".json";

           // on charge la liste des cours à partir du fichier Json
           $http.get(quizSource)
               .success(function (data) {
                   listeQuestions = data.questions; // for UI
               })
               .error(function (data) {
                   console.log('Echec du chargement du fichier');
               });
       }
        loadQuiz();
        return{
            getQuiz: function () {
                loadQuiz();
                return $http.get(quizSource);
            },
            getQuestion: function (index) {
                loadQuiz();
                return listeQuestions[index];
            },
            getMax: function () {
                loadQuiz();
                return listeQuestions.length;
            }

        };
    })

    //Calcul du score du quiz
    .service('resultats', [function(){
        var vrai = 0;
        var faux = 0
        return {
            getVrai: function () {
                return vrai;
            },
            incrementeVrai: function () {
                ++vrai;
            },
            resetVrai: function () {
                vrai = 0;
            },
            getFaux: function () {
                return faux;
            },
            incrementeFaux: function () {
                ++faux;
            },
            resetFaux: function () {
                faux = 0;
            }
        }
    }])
    //Stockage de variable dans le local du téléphone
    .service('StorageService', function ($localStorage) {

        $localStorage = $localStorage.$default({
            elements: []
        });
        //Renvoie les valeurs stockées dans le local
        var _getAll = function () {
            return $localStorage.elements;
        };
        //renvoi le nombre d'élément dans le local
        var _length = function () {
            return $localStorage.elements.length;
        };
        //Ajoute dans le local
        var _add = function (element) {
            $localStorage.elements.push(element);
        }
        //supprime dans le local 1 élément
        var _remove = function (element) {
            $localStorage.elements.splice($localStorage.elements.indexOf(element), 1);
        }
        //supprime tous les éléments du local
        var _removeAll = function () {
            $localStorage.$reset();
        }

        return {
            getAll: _getAll,
            add: _add,
            remove: _remove,
            removeAll: _removeAll,
            length: _length
        };

})






