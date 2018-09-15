app.factory('BeerFactory', BeerFactory);

function BeerFactory() {

    var store = {};

    var beers = [];

    store.setBeers = function (item) {
        beers = item;
    }

    store.getBeers = function () {
        return beers;
    }

    store.getBeer = function(id){

        return beers.filter(function(item){
            return item.id == id;
        });
    }

    return store;
}
