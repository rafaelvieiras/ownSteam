angular.module('EmulatorApp').controller('EmulatorConfigureCtrl', function($scope, $routeParams, $filter, $http, electron, $mdDialog, EmulatorService, RomService, emulator){
  
  $scope.emulator = emulator;
  
  $scope.changePhoto = changePhoto;

    /**
   * Change Main Emulator Photo
   * @return
   */
  function changePhoto(){
    var path = electron.dialog.showOpenDialog({ 
      properties: [ 'openFile' ], 
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
      ] 
    });

    var newFile = __dirname + '/data/images/emulator/' + $scope.emulator.slug + electron.path.extname(path);

    console.log(electron.fs.createReadStream(path[0]).pipe(electron.fs.createWriteStream(newFile)));
    
    if(electron.fs.existsSync(newFile))
      $scope.emulator.mainImage = 'data/images/emulator/' + $scope.emulator.slug + electron.path.extname(path);
    // console.log(exist);
  }


    /**
   * Set Emulator Executable Path
   * @return
   */
  $scope.setPath = function() {
    var path = electron.dialog.showOpenDialog({ properties: [ 'openFile' ] });
    if(path)
      $scope.emulator.path = path[0];
  };


  $scope.newRomPath = function() {
    var path = electron.dialog.showOpenDialog({ properties: [ 'openDirectory' ] }),
        havethis = false;
    if(!electron.fs.statSync(path[0]).isDirectory()){
      path = electron.path.dirname(path);
    }else{
      path = path[0];
    }

    if(typeof $scope.emulator.romspath !== "undefined"){
      angular.forEach($scope.emulator.romspath, function(value, key) {
          if(value == path){
              havethis = true;
          }
      });
    }

    var paths = $scope.emulator.romspath || [];

    if(!havethis)
      paths.push(path);

    if(paths.length > 0)
      $scope.emulator.romspath = paths;

  };

  $scope.removeRomPath = function(index) {

    var paths = $scope.emulator.romspath || [];

    paths.splice(index, 1);

    if(paths.length > 0)
      $scope.emulator.romspath = paths;

  };

  $scope.newRomExt = function() {
    var path = electron.dialog.showOpenDialog({ properties: [ 'openFile' ] }),
        havethis = false;
    // if(!electron.fs.statSync(path[0]).isDirectory()){
    //   path = electron.path.dirname(path);
    // }else{
    //   path = path[0];
    // }
    path = electron.path.extname(path[0]);

    if(typeof $scope.emulator.romsext !== "undefined"){
      angular.forEach($scope.emulator.romsext, function(value, key) {
          if(value == path){
              havethis = true;
          }
      });
    }

    var paths = $scope.emulator.romsext || [];

    if(!havethis)
      paths.push(path);

    if(paths.length > 0)
      $scope.emulator.romsext = paths;

  };

  $scope.removeRomExt = function(index) {

    var paths = $scope.emulator.romsext || [];

    paths.splice(index, 1);

    if(paths.length > 0)
      $scope.emulator.romsext = paths;

  };

  /**
   * Update Emulator with all $scope.emulator data
   * @return
   */
  $scope.update = function(){
    EmulatorService.update($scope.emulator).then(function(data){
      console.log(data);
      console.log($scope.emulator);
    },
    function(error){
      console.log("Ocorreu um Error: "+ error);
    });
  }


  $scope.findRoms = function(){

    function listFolder(folder, ext) {
      var files = electron.fs.readdirSync(folder);
      var results = [];

      for(var i in files) {
          // console.log(files[i]);
        if(electron.path.extname(files[i]).toLowerCase() === ".gba") {
          results.push(folder +'/'+ files[i]);
        }
      }

      return results;
    }

    angular.forEach($scope.emulator.romspath, function(path, key) {
      angular.forEach($scope.emulator.romsext, function(ext, key){

        var files = listFolder(path, ext)
        
        for (var i = 0; i < files.length; i++) {

          var fileData = electron.fs.statSync(files[i]);
          
          var obj = {
            path: files[i],
            name: electron.path.basename(files[i], ext),
            playTimes: 0,
            file: {ctime: fileData.ctime, size: fileData.ctime},
            emulator: $scope.emulator._id
          }

          RomService.update({path: obj.path}, obj).then(function(data){
            console.log(data);
            // console.log($scope.emulator);
          },
          function(error){
            console.log("Ocorreu um Error: "+ error);
          });
        }

        // console.log(listFolder(path, ext));
        // 
        
      });
    });

    RomService.list().then(function(data){
      console.log(data);
      $scope.roms = data;
    },
    function(error){
      console.log("Ocorreu um Error: "+ error);
    });

  }

});