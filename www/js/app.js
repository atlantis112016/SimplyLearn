// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('simplelearn', ['ionic','simplelearn.controllers', 'simplelearn.services', 'ngCordova', 'ngStorage'])


    .run(function($ionicPlatform, $rootScope) {
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

          //initialise l'objet pour le stockage des questions des autres quiz
          $rootScope.questions = [];
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
           .state('score', {
                  cache: false,
                  url: '/score/:idCours',
                  templateUrl: 'views/score.html',
                  controller: 'scoreCtrl'
           });

        $urlRouterProvider.otherwise('/home');
    });
