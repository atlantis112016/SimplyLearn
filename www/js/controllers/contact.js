angular.module('simplelearn.controllers')

    .controller('contactCtrl', function($scope) {
        $scope.sendMail = function(){
            var mailWindow = window.open('mailto:mon.prof@simplelearn.com?subject=Help sur le cours');
            mailWindow.close();
        }

        $scope.sendCall = function(){
            var callWindow = window.open('tel:0200000000');
            callWindow.close();
        }

    })