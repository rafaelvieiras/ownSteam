angular.module('OwnSteamApp')
  .config(
    ['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'modules/emulator/views/index.html',
            module: 'EmulatorApp',
            controller: 'EmulatorCtrl as emulatorctrl'
          })
          .when('/emulator', {
            templateUrl: 'modules/emulator/views/index.html',
            module: 'EmulatorApp',
            controller: 'EmulatorCtrl as emulatorctrl'
          })
          .when('/emulator/:id', {
            templateUrl: 'modules/emulator/views/show.html',
            module: 'EmulatorApp',
            controller: 'EmulatorShowCtrl as emulatorctrl'
          })
          .when('/rom/:id', {
            templateUrl: 'modules/rom/views/show.html',
            module: 'RomApp',
            controller: 'RomShowCtrl as romctrl'
          })
          .otherwise({
            redirectTo: '/'
          });
      }
    ]
  );