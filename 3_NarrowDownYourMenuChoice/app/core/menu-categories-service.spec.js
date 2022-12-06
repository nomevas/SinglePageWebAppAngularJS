'use strict';

describe('MenuCategoriesService', function () {
  var menuCategoriesService;
  var $httpBackend;
  var ApiBasePath;

  beforeEach(function () {
    module('MenuCategoriesService');

    inject(function ($injector) {
      menuCategoriesService = $injector.get('MenuCategories');
      $httpBackend = $injector.get('$httpBackend');
      ApiBasePath = $injector.get('ApiBasePath');
    });
  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('menuCategoriesService.getMenuCategories', function () {
    it('should return categories list', inject(function ($http, ApiBasePath) {
      $httpBackend.whenGET(ApiBasePath + '/categories.json').respond(['Lunch', 'Dessert']);
      menuCategoriesService.getMenuCategories().then(function (response) {
        expect(response.data).toEqual(['Lunch', 'Dessert']);
      });
      $httpBackend.flush();
    }));
  });

  describe('menuCategoriesService.getMenuForCategory', function () {
    it('should return menu categories items', inject(function ($http, ApiBasePath) {
      const menuItemsResponseData = { "menu_items": [{ "id": 877, "short_name": "A1", "name": "Won Ton Soup with Chicken", "description": "chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions", "price_small": 2.55, "price_large": 5.0, "small_portion_name": "pint", "large_portion_name": "quart" }] };
      $httpBackend.whenGET(ApiBasePath + '/menu_items.json?category=Lunch').respond(menuItemsResponseData);
      menuCategoriesService.getMenuForCategory('Lunch').then(function (response) {
        expect(response.data).toEqual(menuItemsResponseData);
      });
      $httpBackend.flush();
    }));
  });

});
