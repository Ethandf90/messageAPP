var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {templateUrl: '/partials/home.html', controller: 'AppCtrl', access: {restricted: true}})
    .when('/login', {templateUrl: 'partials/login.html', controller: 'loginController', access: {restricted: false}})
    .when('/logout', {controller: 'logoutController', access: {restricted: true}})
    .when('/register', {templateUrl: 'partials/register.html', controller: 'registerController', access: {restricted: false}})
    .otherwise({redirectTo: '/'});
});

//The $routeChangeStart event happens before the actual route change occurs. 
//So, whenever a route is accessed, before the view is served, ensure that the user is logged in. 
app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.access.restricted && AuthService.isLoggedIn() === false) {
      $location.path('/login');
      $route.reload();
    }
  });
});