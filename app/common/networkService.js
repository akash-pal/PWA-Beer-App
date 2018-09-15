app.service('networkService',networkService);

function networkService($http,$q){

    this.getData = function(){
        
        var defer = $q.defer();

        $http.get('http://starlord.hackerearth.com/beercraft').then(function(success){
            defer.resolve(success);
        },function(error){
            defer.reject(error);
        });

        return defer.promise;
    }
}