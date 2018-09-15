'use strict';
function Cart() {
    return {
        'cartId': '',
        'cartItem': []
    };
}

app.value('sessionService', {
    cart: new Cart(),
    clear: function () {
        this.cart = new Cart();
    },
    save: function (session) {
        this.cart = session.cart;
    },
    updateCart: function (beerId, beerQty) {

        if (this.cart.cartItem.length > 0) {

            this.cart.cartItem.forEach(function (item, index, theArray) {
                if (item.beerId == beerId) {
                    console.log('present in cart');
                    item.beerQty += beerQty;
                }
                else{
                    theArray.push({
                        'beerId': beerId,
                        'beerQty': beerQty
                    });
                }
            });
        }
        else{
            this.cart.cartItem.push({
                'beerId': beerId,
                'beerQty': beerQty
            });
        }

    },
    removeItem: function (id) {
        this.cart.cartItem = this.cart.cartItem.filter(function (item) {
            return item.beerId != id;
        });
    },
    getCart: function () {
        return this.cart.cartItem;
    }
});