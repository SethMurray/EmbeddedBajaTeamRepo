(function() {
    'use strict';

    angular.module('app')
        .controller('homeController', homeController);

    homeController.$inject = ['$http'];
    function homeController($http) {
        let vm = this;

        vm.getTemperatures = function () {
            console.log('Getting Temp');
            let success = function (response) {
                console.log(response);
                vm.temperatures = response.data;
            };

            let error = function (response) {
                console.log(response);
            };

            $http.get('/api/temperatures').then(success, error);
        };
    }

})();