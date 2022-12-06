'use strict';

var MenuCategoriesService = angular.module('MenuCategoriesService', [])
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .service('MenuCategories', MenuCategoriesService);

MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
function MenuCategoriesService($http, ApiBasePath) {
    var service = this;

    service.getMenuCategories = function () {
        var response = $http({
            method: "GET",
            url: (ApiBasePath + "/categories.json")
        });

        return response;
    };

    service.getMenuForCategory = function (shortName) {
        var response = $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json"),
            params: {
                category: shortName
            }
        });

        return response;
    };
};