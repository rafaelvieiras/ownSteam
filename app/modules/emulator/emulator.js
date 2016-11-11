angular
    .module('EmulatorApp')
    .config([
        '$basePathProvider',
        '$stateProvider',

        function(
            $basePathProvider,
            $stateProvider
        ){

            $basePathProvider.setBasePath('emulator', '/application/modules/book/');

            $stateProvider
            .state('emulator', {
                views: {
                    "main-content@admin": {
                        templateUrl: "{book}/views/list.html",
                        controller: "BookListController",
                        controllerAs: "bookList"
                    }
                }
            });
        }
    ]);
