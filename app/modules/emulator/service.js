angular.module('EmulatorApp').service('EmulatorService', EmulatorService); 

EmulatorService.$inject = ['$timeout', '$q', '$log'];


function EmulatorService($timeout, $q, $log) {

  var Datastore = require('nedb'), db = {};
  db.emulators = new Datastore({ filename: 'app/data/emulators.json', autoload: true });

  
  var Emulator = {
    list: list,
    insert: insert,
    get: get,
    update: update
  }

  return Emulator;

  function list(){

    var deferred = $q.defer();
    
    setTimeout(function(){
      
      db.emulators.find({}, function(err, result){
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
    return db.emulators.insert(obj, function(err, newDoc){
      return newDoc;
    });
  }

  function get(obj){
    var deferred = $q.defer();
    
    setTimeout(function(){
      
      db.emulators.findOne(obj, function(err, result){
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

  function update(obj){
    var deferred = $q.defer();
    
    setTimeout(function(){ 
      console.log(obj._id);
      
      db.emulators.update({_id: obj._id}, { $set: obj }, {upsert: true}, function(err, numReplaced){
        if(numReplaced){
          deferred.resolve(numReplaced);
        }else{
          $log.error(err);
          deferred.reject(err);
        }
      });
      
    }, 30);

    return deferred.promise;
  }

}