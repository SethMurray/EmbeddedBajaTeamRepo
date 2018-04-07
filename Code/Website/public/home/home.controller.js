(function() {
    'use strict';

    angular.module('app')
        .controller('homeController', homeController);

    homeController.$inject = ['$http'];
    function homeController($http) {
        let vm = this;
        vm.temperatures = [];
        vm.labels = [];
        vm.tempChart = null;

        let success = function (response) {
            console.log(response);
            response.data.forEach(function(row) {
                vm.temperatures.push(row.fahrenheit);
                vm.labels.push(new Date(row.timestamp));
            });
            let chartDiv = document.getElementById('tempChart').getContext('2d');
            let config = {
                type: 'line',
                data: {
                    labels: vm.labels,
                    datasets: [{
                        label: "Temperature",
                        data: vm.temperatures,
                        backgroundColor: '#000000',
                        fill: false
                    }],
                },
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Transmission Temperature'
                    },
                    tooltips: {
                        mode: 'nearest',
                    },
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                parser: 'll HH:mm:ss',
                                tooltipFormat: 'll HH:mm:ss'
                            },
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Time'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Temperature'
                            }
                        }]
                    }
                }
            };
            vm.tempChart = new Chart(chartDiv, config);

            //Update graph every 2 seconds
            vm.interval = setInterval(vm.updateTempChart, 2000);
        };

        let error = function (response) {
            console.log(response);
        };

        $http.get('/api/temperatures').then(success, error);

        vm.updateTempChart = function () {
            if (vm.tempChart != null) {
                let success = function(response) {
                    console.log(response);
                    //Update chart
                    if (response.data.length > 0) {
                        vm.tempChart.data.datasets[0].data.push(response.data[0].fahrenheit);
                        vm.tempChart.data.labels.push(new Date(response.data[0].timestamp));
                        vm.tempChart.update();
                    }
                };

                let error = function(resonse) {
                    console.log(error);
                };
                $http.get('/api/lastTemp').then(success, error);
            }
        };

        vm.stopInterval = function() {
            clearInterval(vm.interval);
        }
    }

})();