angular.module('Book', ['restangular', 'ngRoute']).
  config(function($routeProvider, RestangularProvider) {
    $routeProvider.
      when('/', {
        controller:ListCtrl, 
        templateUrl:'list.html'

      }).
      when('/edit/:objectId', {
        controller:EditCtrl,
        templateUrl:'detail.html',
        resolve: {
          book: function(Restangular, $route){
            return Restangular.one('Book', $route.current.params.objectId).get();
          }
        }
      }).
      when('/new', {controller:CreateCtrl, templateUrl:'detail.html'}).
      otherwise({redirectTo:'/'});
         RestangularProvider.setBaseUrl('https://api.parse.com/1/classes/' );
         RestangularProvider.setDefaultRequestParams({ apiKey: 'W4sSfi363thgMytTv0z83CzSdmWOzgHcs2Ws1Ywq'});
          RestangularProvider.setRestangularFields({
           id: 'objectId'
      });
      RestangularProvider.setRequestInterceptor(function(elem, operation, what) {

        if (operation === 'put') {
          elem._id = undefined;
          return elem;
        }
        return elem;
      })
  });


function ListCtrl($scope, $http, Restangular) {
    $http.defaults.headers.common['X-Parse-Application-Id'] = 'LPohFnTOjNuISjt8xy1PmcAKYRxawebNIMHZrHtP';
    $http.defaults.headers.common['X-Parse-REST-API-Key'] = 'W4sSfi363thgMytTv0z83CzSdmWOzgHcs2Ws1Ywq';
    $scope.books =  Restangular.all("Book").getList().$object;

 }


function CreateCtrl($scope, $location, Restangular,$http) {
$http.defaults.headers.common['X-Parse-Application-Id'] = 'LPohFnTOjNuISjt8xy1PmcAKYRxawebNIMHZrHtP';
$http.defaults.headers.common['X-Parse-REST-API-Key'] = 'W4sSfi363thgMytTv0z83CzSdmWOzgHcs2Ws1Ywq';

  $scope.save = function() {
    Restangular.all('Book').post($scope.book).then(function(book) {
      $location.path('/list');
    });
  }
}

function EditCtrl($scope, $location, Restangular, book, $http) {
$http.defaults.headers.common['X-Parse-Application-Id'] = 'LPohFnTOjNuISjt8xy1PmcAKYRxawebNIMHZrHtP';
$http.defaults.headers.common['X-Parse-REST-API-Key'] = 'W4sSfi363thgMytTv0z83CzSdmWOzgHcs2Ws1Ywq';


  var original = book;
  $scope.book = Restangular.copy(original);

  $scope.isClean = function() {
    return angular.equals(original, $scope.book);
  }

  $scope.destroy = function() {
    original.remove().then(function() {
       $location.path('/list');
    });
  };

  $scope.save = function() {
    $scope.book.put().then(function() {
       $location.path('/');
    });
  };
}