angular.module('RomApp').controller('RomConfigureCtrl', RomConfigureCtrl);

RomConfigureCtrl.$inject = ['$scope', '$routeParams', '$filter', '$http', 'electron', '$mdDialog', '$mdMedia', 'EmulatorService', 'RomService', 'rom', 'update'];

function RomConfigureCtrl($scope, $routeParams, $filter, $http, electron, $mdDialog, $mdMedia, EmulatorService, RomService, rom, update){
  var vm = this;

  vm.rom = rom;
  vm.update = update;
  vm.scraper = scraper;

  function scraper(){
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;
    $mdDialog.show({
      controller: RomScraperController,
      controllerAs: 'ctrl',
      templateUrl: 'modules/rom/views/scraper.html',
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: useFullScreen,
      locals: {
        rom: vm.rom
      }
    })
    .then(function(update) {
      _update(update);
    }, function() {
      vm.status = 'You cancelled the dialog.';
    });

    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      vm.customFullscreen = (wantsFullScreen === true);
    });


    function _update(obj){
      console.log(obj)
      var description = obj.description;
      // var description = description.split("<p style=\"\">");
      var tmp = document.createElement("DIV");
      tmp.innerHTML = obj.description;
      
      vm.rom.name = obj.name;
      vm.rom.giantbombId = obj.id;
      vm.rom.release = new Date(obj.original_release_date);
      vm.rom.resume = obj.deck;
      vm.rom.description = tmp.textContent || tmp.innerText || "";


      vm.update();

      // var img = obj.image.super_url;

      // $http.get(img).then(function(response){
      //   var newFile = __dirname + '/data/images/emulator/' + $scope.emulator.slug +'/'+ $filter('escape')(obj.name) + img.split('.').pop();
      //   response.pipe(electron.fs.createWriteStream(newFile));
      //   // console.log(response);
      // },
      // function(error){
      //   console.log("Ocorreu um Error: "+ error);
      // });

      // var newFile = __dirname + '/data/images/emulator/' + $scope.emulator.slug + electron.path.extname(path);

      // console.log(electron.fs.createReadStream(path[0]).pipe(electron.fs.createWriteStream(newFile)));
      
      // var exist = electron.fs.existsSync(newFile);
      
      // if(exist)
      //   $scope.emulator.mainImage = 'data/images/emulator/' + $scope.emulator.slug + electron.path.extname(path);

      // console.log(rom);

    }

  }


  





  

}


function RomScraperController($mdDialog, RomService, rom){
    var vm = this;
    vm.rom = rom;
    vm.scraper = scraper;
    vm.update = update;
  
  function scraper(){
    RomService.scraper(vm.rom.name).then(function(response){
      console.log(response.data.results);
      vm.roms = response.data.results;
    },
    function(error){
      console.log("Ocorreu um Error: "+ error);
    });
  }

  function update(update) {
    $mdDialog.hide(update);
  };
}
