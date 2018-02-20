/* global angular */
var app = angular.module('app', [
    'ngAnimate',
    'ngAria',
    'ngRoute',
    'ngMaterial'
]);
app.controller('main', [function(){
    console.log('main');
}]);
app.controller('contenedor', [function(){
    console.log('contenedor');
    var cont = this;
    cont.estados = ['exposicion','examen','revisionAlumno','revisionProfesor'];
    cont.layout = {
        'header': 'views/header.html'
    };
}]);
app.controller('header', [function(){
    console.log('header');
    var hr = this;
}]);
