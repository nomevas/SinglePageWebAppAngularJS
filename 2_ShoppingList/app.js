(function () {
    'use strict';
    
    angular.module('ShoppingListApp', [])
    .controller('BuyItemsListController', BuyItemsListController)
    .controller('BoughtItemsListController', BoughtItemsListController)
    .service('ShoppingCartService', ShoppingCartService)
    .filter('AddPluralExtension', AddPluralExtensionFilterFactory);
    
    BuyItemsListController.$inject = ['ShoppingCartService'];
    function BuyItemsListController(ShoppingCartService) {
        var buyItemsList = this;

        buyItemsList.items = ShoppingCartService.getItemsToBuy();

        buyItemsList.buyItem = function(index) {
            ShoppingCartService.buyItem(index);
        }
    }

    BoughtItemsListController.$inject = ['ShoppingCartService'];
    function BoughtItemsListController(ShoppingCartService) {
        var boughtItemsList = this;

        boughtItemsList.items = ShoppingCartService.getBoughtItems();
    }

    function ShoppingCartService() {
        var shoppingCartService = this;
        var itemsToBuy = [{
                name: "cookie", quantity: 10
            },{
                name: "milk", quantity: 2
            },{
                name: "bread", quantity: 1
            },{
                name: "appel", quantity: 1
            },{
                name: "cheese", quantity: 2
            }];
        var boughtItems = [];

        shoppingCartService.getItemsToBuy = function() {
            return itemsToBuy;            
        }

        shoppingCartService.getBoughtItems = function() {
            return boughtItems;
        }

        shoppingCartService.buyItem = function(index) {
            boughtItems.push(itemsToBuy[index]);
            itemsToBuy.splice(index, 1);
        }
    }

    function AddPluralExtensionFilterFactory() {
        return function(quantity) {
            return quantity > 1 ? "s" : "";
        }
    }
})();
    
