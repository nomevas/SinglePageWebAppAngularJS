'use strict';

angular.module('NarrowDownYourMenuChoiceApp', ['MenuCategoriesService'])
    .controller('NarrowDownYourMenuChoiceController', NarrowDownYourMenuChoiceController)
    .service('MenuCategoriesService', MenuCategoriesService);

NarrowDownYourMenuChoiceController.$inject = ['MenuCategories'];
function NarrowDownYourMenuChoiceController(menuCategories) {
    const narrowDownYourMenuChoiceController = this;

    narrowDownYourMenuChoiceController.searchTerm = "";
    narrowDownYourMenuChoiceController.found = [];

    narrowDownYourMenuChoiceController.updateFoundItems = function(newItems) {
        const existingMenuItemIDs = narrowDownYourMenuChoiceController.found.map(item => item.short_name);
        const searchTerm = narrowDownYourMenuChoiceController.searchTerm.toLowerCase();
        const newMenuItems = newItems.menu_items.filter(item => (
            !existingMenuItemIDs.includes(item.short_name) &&     
            (
                item.name.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm)
            )
        ));
        narrowDownYourMenuChoiceController.found.push(...newMenuItems);
    }

    narrowDownYourMenuChoiceController.narrowItDownForMe = function () {
        menuCategories.getMenuCategories().then(function(result) {
            result.data.forEach(function(category) {
                menuCategories.getMenuForCategory(category).then(function(result) {
                    narrowDownYourMenuChoiceController.updateFoundItems(result.data);
                });
            });
        });
    }
}