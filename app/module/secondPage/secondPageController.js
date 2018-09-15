
app.controller('secondPageController', secondPageController);

function secondPageController($scope,$mdDialog,sessionService, BeerFactory) {


    $scope.clearCart = function () {
        sessionService.clear();
        showAlert('Cart Cleared');
        checkcart();
    }

    $scope.removeItem = function (id) {
        sessionService.removeItem(id);
        showAlert('Removed from cart');
        checkcart();
    }

    function checkcart() {

        $scope.cart = sessionService.getCart();

        $scope.cart.forEach(function (item, index, theArray) {
            theArray[index].detail = BeerFactory.getBeer(item.beerId)[0];
            if ($scope.cart.length == theArray.length) {
                $scope.showCart = true;
            }
        });
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

    checkcart();


}
