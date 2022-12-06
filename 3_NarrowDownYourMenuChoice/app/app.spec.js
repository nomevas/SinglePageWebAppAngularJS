'use strict';

describe('NarrowDownYourMenuChoiceApp', function () {
    var narrowDownYourMenuChoiceController;
    var menuCategoriesServiceMock;
    var $scope;
    
    beforeEach(function () {
        module('NarrowDownYourMenuChoiceApp');

        inject(function ($controller, _$rootScope_) {
            $scope = _$rootScope_.$new();
            menuCategoriesServiceMock = jasmine.createSpyObj('menuCategories', ['getMenuCategories', 'getMenuForCategory']);
            narrowDownYourMenuChoiceController = $controller('NarrowDownYourMenuChoiceController', {   
                    $scope: $scope,
                    MenuCategories : menuCategoriesServiceMock 
            });
        });
    });


    describe('NarrowDownYourMenuChoiceController.narrowItDownForMe', function () {
        it('Get all categories, for each category get items and list matching items', inject(function ($q, $http) {
            const menuCategoryItems = ['Lunch', 'Dessert'];
            const menuItems = { "menu_items": [] };
            menuCategoriesServiceMock.getMenuCategories.and.returnValue($q.when({data: menuCategoryItems}));
            menuCategoriesServiceMock.getMenuForCategory.and.returnValue($q.when({data: menuItems}));
            
            narrowDownYourMenuChoiceController.searchTerm = "Soup";
            narrowDownYourMenuChoiceController.narrowItDownForMe();
            $scope.$apply();

            expect(menuCategoriesServiceMock.getMenuCategories).toHaveBeenCalledTimes(1);
            expect(menuCategoriesServiceMock.getMenuForCategory).toHaveBeenCalledTimes(2);
        }));
    });


    describe('NarrowDownYourMenuChoiceController.updateFoundItems', function () {
        it('Filter matching items and append them in found array', inject(function () {
            narrowDownYourMenuChoiceController.searchTerm = "Soup";
            narrowDownYourMenuChoiceController.updateFoundItems({"menu_items": [
                { "id": 877, "short_name": "A1", "name": "Won Ton Soup with Chicken", "description": "chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions", "price_small": 2.55, "price_large": 5.0, "small_portion_name": "pint", "large_portion_name": "quart" },
                { "id": 878, "short_name": "A2", "name": "Tommato Soup", "description": "tommato soup", "price_small": 2.55, "price_large": 5.0, "small_portion_name": "pint", "large_portion_name": "quart" },
                { "id": 888, "short_name": "D1", "name": "Cake 1", "description": "tasty food", "price_small": 2.55, "price_large": 5.0, "small_portion_name": "pint", "large_portion_name": "quart" },
                { "id": 889, "short_name": "D2", "name": "Cake 2", "description": "tasty food", "price_small": 2.55, "price_large": 5.0, "small_portion_name": "pint", "large_portion_name": "quart" }]});

            expect(narrowDownYourMenuChoiceController.found.map(item => item.short_name)).toEqual(["A1", "A2"]);
        }));
        
        it('Filter out items with the same short name', inject(function () {
            narrowDownYourMenuChoiceController.searchTerm = "Soup";
            narrowDownYourMenuChoiceController.updateFoundItems({"menu_items": [
                { "id": 877, "short_name": "A1", "name": "Won Ton Soup with Chicken", "description": "chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions", "price_small": 2.55, "price_large": 5.0, "small_portion_name": "pint", "large_portion_name": "quart" },
                { "id": 878, "short_name": "A2", "name": "Tommato Soup", "description": "tommato soup", "price_small": 2.55, "price_large": 5.0, "small_portion_name": "pint", "large_portion_name": "quart" }
            ]});
            narrowDownYourMenuChoiceController.updateFoundItems({"menu_items": [
                { "id": 877, "short_name": "A1", "name": "Won Ton Soup with Chicken", "description": "chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions", "price_small": 2.55, "price_large": 5.0, "small_portion_name": "pint", "large_portion_name": "quart" },
                { "id": 878, "short_name": "A2", "name": "Tommato Soup", "description": "tommato soup", "price_small": 2.55, "price_large": 5.0, "small_portion_name": "pint", "large_portion_name": "quart" }
            ]});

            console.log(narrowDownYourMenuChoiceController.found);
            expect(narrowDownYourMenuChoiceController.found.map(item => item.short_name)).toEqual(["A1", "A2"]);
        }));
    });

});
