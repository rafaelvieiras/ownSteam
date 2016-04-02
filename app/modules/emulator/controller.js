angular.module('EmulatorApp').controller('EmulatorCtrl', EmulatorCtrl);

EmulatorCtrl.$inject = ['EmulatorService']

function EmulatorCtrl(EmulatorService) {
  var vm = this;

  vm.emulators = {};

  EmulatorService.list().then(function(data){
    vm.emulators = data;
  });

}




angular.module('EmulatorApp').controller('EmulatorShowCtrl', EmulatorShowCtrl);

EmulatorShowCtrl.$inject = ['$scope', '$routeParams', '$filter', '$http', 'electron', '$mdDialog', '$mdMedia', 'EmulatorService', 'RomService'];


function EmulatorShowCtrl($scope, $routeParams, $filter, $http, electron, $mdDialog, $mdMedia, EmulatorService, RomService) {
  var vm = this;

  vm.emulator = {};
  vm.roms = [];
  vm.getEmulator = getEmulator;
  vm.getRoms = getRoms;
  vm.configure = configure;

  start();


  function configure(){
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;
    $mdDialog.show({
      controller: 'EmulatorConfigureCtrl',
      controllerAs: 'ctrl',
      templateUrl: 'modules/emulator/views/configure.html',
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: useFullScreen,
      locals: {
        emulator: vm.emulator
      }
    })
    .then(function(answer) {
      _update(answer);
    }, function() {
      vm.status = 'You cancelled the dialog.';
    });

    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      vm.customFullscreen = (wantsFullScreen === true);
    });


    function _update(obj){
      //       $$hashKey: "object:25"
      // aliases: null
      // api_detail_url: "http://www.giantbomb.com/api/game/3030-4157/"
      // date_added: "2008-04-01 01:48:16"
      // date_last_updated: "2012-12-13 21:35:40"
      // deck: "Lord of the Rings: The Fellowship of the Ring is an action role-playing game that is based on the book of the same name."
      // description: "<h2>Gameplay</h2><p style="">The three playable characters in this game are: <a data-ref-id="3005-1546" href="/frodo-baggins/3005-1546" slug="frodo-baggins">Frodo Baggins</a>, <a data-ref-id="3005-2280" href="/aragorn/3005-2280" slug="aragorn">Aragorn</a>, and <a data-ref-id="3005-1535" href="/gandalf/3005-1535" slug="gandalf">Gandalf the Grey</a>. They each have their own weapons, items, and powers which change throughout the game. The Lord of the Rings: The Fellowship of the Ring plays like a <a data-ref-id="3015-469" href="/hack-and-slash/3015-469" slug="hack-and-slash">hack and slash</a> type game. The player runs through the levels killing any <a data-ref-id="3015-492" href="/orc/3015-492" slug="orc">orcs</a> stupid enough to get in your way, as well as several different bosses. The game's structure is very <a data-ref-id="3015-383" href="/linear-gameplay/3015-383" slug="linear-gameplay">linear</a>, allowing little deviation from the set path.</p><p style="">The game received generally poor reviews, partially due to the fact that the game wasn't published with movie rights associated with the <a data-ref-id="3025-1574" href="/lord-of-the-rings-online/3025-1574" slug="lord-of-the-rings-online">franchise's</a> other releases: <a data-ref-id="3030-21334" href="/the-lord-of-the-rings-the-two-towers/3030-21334" slug="the-lord-of-the-rings-the-two-towers">The Two Towers</a>, <a data-ref-id="3030-17686" href="/the-lord-of-the-rings-the-return-of-the-king/3030-17686" slug="the-lord-of-the-rings-the-return-of-the-king">The Return of the King</a>, and <a data-ref-id="3030-2959" href="/the-lord-of-the-rings-the-third-age/3030-2959" slug="the-lord-of-the-rings-the-third-age">The Third Age</a> which many fans of the franchise had come to expect. This game did however follow the plot line of the book more closely than it's <a data-ref-id="3015-755" href="/games-based-on-movies/3015-755" slug="games-based-on-movies">movie-based</a> counterparts. The game does take the player through several familiar (untapped) book locations such as <a data-ref-id="3035-1861" href="/old-forest/3035-1861" slug="old-forest">The Old Forest</a>, the Barrow Downs, and <a data-ref-id="3035-1180" href="/bree/3035-1180" slug="bree">Bree</a> just to name a few. While playing through these locations the player is allowed to fight Old Man Willow as well as Barrow-wights and even meet with <a data-ref-id="3005-9134" href="/tom-bombadil/3005-9134" slug="tom-bombadil">Tom Bombadil</a>.</p><p style="">This title refers to three different games: an <a data-ref-id="3045-32" href="/xbox/3045-32" slug="xbox">Xbox</a> version developed by <a data-ref-id="3010-2915" href="/wxp-inc/3010-2915" slug="wxp-inc">WXP</a>, a <a data-ref-id="3045-94" href="/pc/3045-94" slug="pc">PC</a> and <a data-ref-id="3045-19" href="/playstation-2/3045-19" slug="playstation-2">PS2</a> version developed by <a data-ref-id="3010-2612" href="/surreal-software-inc/3010-2612" slug="surreal-software-inc">Surreal</a>, and a <a data-ref-id="3045-4" href="/game-boy-advance/3045-4" slug="game-boy-advance">GBA</a> version developed by <a data-ref-id="3010-4432" href="/pocket-studios/3010-4432" slug="pocket-studios">Pocket Studio</a>.</p>"
      // expected_release_day: null
      // expected_release_month: null
      // expected_release_quarter: null
      // expected_release_year: null
      // id: 4157
      // image: Object
      // image: Object
      // icon_url: "http://static.giantbomb.com/uploads/square_avatar/8/87790/2276088-box_tlotrtfotr.png"
      // medium_url: "http://static.giantbomb.com/uploads/scale_medium/8/87790/2276088-box_tlotrtfotr.png"
      // screen_url: "http://static.giantbomb.com/uploads/screen_medium/8/87790/2276088-box_tlotrtfotr.png"
      // small_url: "http://static.giantbomb.com/uploads/scale_small/8/87790/2276088-box_tlotrtfotr.png"
      // super_url: "http://static.giantbomb.com/uploads/scale_large/8/87790/2276088-box_tlotrtfotr.png"
      // thumb_url: "http://static.giantbomb.com/uploads/scale_avatar/8/87790/2276088-box_tlotrtfotr.png"
      // tiny_url: "http://static.giantbomb.com/uploads/square_mini/8/87790/2276088-box_tlotrtfotr.png"
      // name: "The Lord of the Rings: The Fellowship of the Ring"
      // number_of_user_reviews: 0
      // original_game_rating: Array[2]
      // original_release_date: "2002-09-24 00:00:00"
      // platforms: Array[4]
      // resource_type: "game"
      // site_detail_url:
      // var description = obj.description;
      // var description = description.split("</h2>");
      // var tmp = document.createElement("DIV");
      // tmp.innerHTML = description[1];
      
      // $scope.rom.name = obj.name;
      // $scope.rom.giantbombId = obj.id;
      // $scope.rom.release = obj.original_release_date;
      // $scope.rom.resume = obj.deck;
      // $scope.rom.description = tmp.textContent || tmp.innerText || "";

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


  function start(){

    getEmulator().then(function(data){
      console.log("Get All Emulator Data");
    },
    function(error){
      console.log("Ocorreu um Error: "+ error);
    });

    getRoms().then(function(){
      console.log("All roms get");
    },
    function(error){
      console.log("Ocorreu um Error: "+ error);
    });

  }

  function getRoms(){
    /**
     * Call Rom Service, and use action list to list all roms in emulator
     * @return
     */
    return RomService.list().then(function(data){
      vm.roms = data;
      return vm.roms;
    });
  }

  function getEmulator(){
    /**
     * Call Emulator Service, and use action get to put emulator data in vm
     * @return
     */
    return EmulatorService.get({ _id: $routeParams.id }).then(function(data){
      vm.emulator = data;

      if(!data.slug)
        vm.emulator.slug = $filter('escape')(data.name);

      if(!data.romsext)
        vm.emulator.romsext = [];

      return vm.emulator;
    });
  }

}