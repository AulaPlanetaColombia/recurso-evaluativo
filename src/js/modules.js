/* global angular */
var app = angular.module('app', [
    'ngAnimate',
    'ngAria',
    'ngRoute'
]);
app.controller('main', [function(){
    console.log('main');
}]);
app.controller('contenedor', [function(){
    console.log('contenedor');
    var cont = this;
}]);
