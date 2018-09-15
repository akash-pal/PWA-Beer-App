
app.controller('firstPageController', firstPageController);

function firstPageController($scope, $location, $mdDialog, BeerFactory, networkService, sessionService) {

    $scope.styleName = "";
    $scope.beerName = "";
    $scope.totalDisplayed = 20;

    $scope.loadMore = function () {
        $scope.totalDisplayed += 20;
    };

    if (BeerFactory.getBeers().length != 0) {
        $scope.beers = BeerFactory.getBeers();
    }
    else {

        networkService.getData().then(function (response) {
            console.log(response);
            $scope.beers = response.data;
            BeerFactory.setBeers(response.data);
        },function(error){
            
        });
    }


    $scope.sort = function (type) {
        if (type == "ascending") {
            $scope.orderParam = '-abv';
        }
        else {
            $scope.orderParam = 'abv';
        }
    }

    $scope.filter = function (name) {
        $scope.styleName = name;
    }


    $scope.criteriaMatch = function (criteria) {
        return function (input) {

            var style = input.name.toLowerCase();
            $scope.beerName = $scope.beerName.toLowerCase();

            if ($scope.beerName == '') {
                return input;
            } else {
                var regex = new RegExp('\\b' + $scope.beerName + '\\b');
                if (style.search(regex) > -1) {
                    return input;
                }
            }

        };
    }


    $scope.selectedBeer = function (value) {
        if (value != null || value != undefined || value != '') {
            $scope.beerName = value.title;
            // $scope.$broadcast('angucomplete-alt:clearInput');
        }
    }

    $scope.purchaseBeer = function (id, qty) {
        if (qty > 0) {
            console.log(id);
            sessionService.updateCart(id, qty);
            showAlert('Beer added to Cart');
        }
        else {
            showAlert('Select quantity first');
        }
    }

    $scope.goCart = function () {
        $location.path('view2');
    }

    $scope.decrement = function (item) {
        if (item.counter > 0) {
            item.counter -= 1;
        }
    }

    $scope.increment = function (item) {
        item.counter += 1;
    }

    $scope.setCounter = function (item) {
        item.counter = 0;
    }

    function showAlert(message) {
        alert = $mdDialog.alert({
            title: '',
            textContent: message,
            ok: 'Close'
        });

        $mdDialog
            .show(alert)
            .finally(function () {
                alert = undefined;
            });
    }

}
