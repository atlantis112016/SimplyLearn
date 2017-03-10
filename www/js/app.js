// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('simplelearn', ['ionic','simplelearn.controllers', 'simplelearn.services', 'ngCordova', 'ngStorage'])


    .run(function($ionicPlatform, $rootScope, $timeout, $cordovaLocalNotification) {
      $ionicPlatform.ready(function() {
          if (window.cordova && window.cordova.plugins.Keyboard) {
              // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
              // for form inputs)
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

              // Don't remove this line unless you know what you are doing. It stops the viewport
              // from snapping when text inputs are focused. Ionic handles this internally for
              // a much nicer keyboard experience.
              cordova.plugins.Keyboard.disableScroll(true);
          }
          if (window.StatusBar) {
              StatusBar.styleDefault();
          }

          window.plugin.notification.local.onadd = function (id, state, json) {
              var notification = {
                  id: id,
                  state: state,
                  json: json
              };
              $timeout(function() {
                  $rootScope.$broadcast("$cordovaLocalNotification:added", notification);
              });
          };
          //initialise l'objet pour le stockage des questions des autres quiz
          $rootScope.questions = [];

         /* $localStorage = $localStorage.$default({
              dateAlarmsFinal: []
          });
          function toDate(dStr, format) {
              var theDate = new Date();
              if (format == "h:m") {
                  //Enlève une heure par rapport à l'heure du RDV du fichier JSON
                  theDate.setHours(dStr.substr(0, dStr.indexOf(":")));
                  theDate.setMinutes(dStr.substr(dStr.indexOf(":") + 1));
                  theDate.setSeconds(0);
                  return theDate;
              } else
                  return "Invalid Format";
          }
// Crée un Object listCours
          var rdvs = {};
          var daterdv = {};
// Initialise le modèle avec une chaîne vide
          rdvs = '';
          daterdv ='';
          var dateSyst = JSON.stringify(new Date().toLocaleString());
          var dateSystFormat = dateSyst.substring(1,11);
          var dateAlarm ='';

          listeRDV.getRdv().then(function(response){
              //Renvoie les RDVS
              rdvs = response.data.rdvs;
              //boucle pour passer les rdvs et comparer avec la date système
              for (var i = 0; i < rdvs.length; i++) {
                  daterdv = rdvs[i].daterdv;
                  var heurerdv = rdvs[i].heurerdv;
                  if (daterdv == dateSystFormat) {
                      console.log (' heurerdv = ', heurerdv);
                      //alarmTime = new Date((new Date) - 1000*3600);
                      //Date rdv - 1 heure
                      dateAlarm = new Date((toDate(heurerdv, "h:m")));

                      var test = new Date((dateAlarm) - 2000 * 3600);
                      $localStorage.dateAlarmsFinal = Date.parse(test);
                      console.log('toDate(heurerdv, "h:m")',toDate(heurerdv, "h:m"), 'test', test.toLocaleString());
                  }
              }
          })
          var toto = $localStorage.dateAlarmsFinal;
         var alarmTime2 = toto;
         //alarmTime2.setHours(alarmTime2.getHours() + 1);*/

        /**  var now = new Date().getTime();
          var _10SecondsFromNow = new Date(now + 10 * 1000);
          var alarmTime = new Date();
          alarmTime.setMinutes(alarmTime.getMinutes() + 1);
          console.log('alarmTime', alarmTime);
          console.log('alarmTime2', new Date(new Date(alarmTime2).getTime() + 1000 * 3600));
         $cordovaLocalNotification.add({
              id: 1,
              //date: '08/03/2017 15:45',
              title: 'Rappel de cours',
              text: 'Votre leçon est dans 1 heure',
              at: _10SecondsFromNow,
              autocancel: true
          }).then(function () {
              console.log("Notification ajoutée: " + add);
          });**/
      })

    })
    //Permet d'autoriser les urls youtube
    .config(function($sceDelegateProvider)
    {
        $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);
    })
    .config(function ($ionicConfigProvider) {
        $ionicConfigProvider.views.maxCache(0);
    })

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
           .state('home', {
                  url: '/home',
                  templateUrl: 'views/home.html',
                  controller: 'homeCtrl'
            })
           .state('cours', {
                  url: '/cours/:idCours',
                  templateUrl: 'views/cours.html',
                  controller: 'coursCtrl'
           })
            .state('listecours', {
                url: '/listecours',
                templateUrl: 'views/listeCours.html',
                controller: 'listeCoursCtrl'
            })
           .state('quiz', {
                  url: '/quiz/:idCours',
                  reload: true,
                  templateUrl: 'views/quiz.html',
                  controller: 'quizCtrl',
           })
           .state('contact', {
                  url: '/contact',
                  templateUrl: 'views/contact.html',
                  controller: 'contactCtrl'
           })
           .state('rdv', {
                  url: '/rdv',
                  templateUrl: 'views/rdv.html',
                  controller: 'rdvCtrl'
           })
            .state('pushNotif', {
                url: '/pushNotif',
                templateUrl: 'views/pushNotif.html',
                controller: 'pushNotifCtrl'
            })
           .state('score', {
                  cache: false,
                  url: '/score/:idCours',
                  templateUrl: 'views/score.html',
                  controller: 'scoreCtrl'
           });

        $urlRouterProvider.otherwise('/home');
    });
