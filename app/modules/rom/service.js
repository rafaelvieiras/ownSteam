angular.module('RomApp').service('RomService', RomService);

RomService.$inject = ['$timeout', '$q', '$log', '$http'];

function RomService($timeout, $q, $log, $http) {
  var Datastore = require('nedb'), db = {};
  db.roms = new Datastore({ filename: 'app/data/roms.json', autoload: true });
  
  var Rom = {
    list: list,
    insert: insert,
    get: get,
    update: update,
    scraper: scraper
  }

  return Rom;


  

  function list(){

    var deferred = $q.defer();
    
    setTimeout(function(){
      
      db.roms.find({}, function(err, result){
        if(result){
          deferred.resolve(result);
        }else{
          $log.error(err);
          deferred.reject(err);
        }
      });
      
    }, 30);

    return deferred.promise;
  }

  function insert(obj){
    return db.roms.insert(obj, function(err, newDoc){
      return newDoc;
    });
  }

  function get(obj){
    var deferred = $q.defer();
    
    setTimeout(function(){
      
      db.roms.findOne(obj, function(err, result){
        if(result){
          deferred.resolve(result);
        }else{
          $log.error(err);
          deferred.reject(err);
        }
      });
      
    }, 30);

    return deferred.promise;
  }

  function update(query, obj){
    var deferred = $q.defer();
    
    setTimeout(function(){ 
      
      db.roms.update(query, { $set: obj }, {upsert: true}, function(err, numReplaced){
        if(numReplaced){
          deferred.resolve(numReplaced);
        }else{
          $log.error(err);
          deferred.reject(err);
        }
      });

      db.roms.persistence.compactDatafile();
      
    }, 30);

    return deferred.promise;
  }

  function scraper(gameName){
    // var url = "http://api.giantbomb.com/search?api_key=1a9e013e098e34c1cf3f9b5bc723ae5f74c0e164&format=json&query="+encodeURI(gameName)+"&resources=game";
    return $http({method: 'GET', url: "http://api.giantbomb.com/search?api_key=1a9e013e098e34c1cf3f9b5bc723ae5f74c0e164&format=json&query="+encodeURI(gameName)+"&resources=game", dataType: 'json'});
  }

}