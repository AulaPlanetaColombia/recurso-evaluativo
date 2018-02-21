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
app.controller('contenedor', ['datos', function(datos){
    console.log('contenedor');
    var cont = this;
    cont.estados = ['exposicion','examen','revisionAlumno','revisionProfesor'];
    cont.layout = {
        'header': 'views/header.html',
        'body': 'views/body.html',
        'footer': 'views/footer.html'
    };
    datos.getJSON().then(function(resp){
        console.log(resp);
    });
}]);
app.controller('header', [function(){
    console.log('header');
    var hr = this;
}]);
app.controller('body', [function(){
    console.log('body');
    var bd = this;
}]);
app.controller('footer', [function(){
    console.log('footer');
    var fr = this;
}]);
app.service('datos',['$http',function($http){
    var datos = {
        getJSON: function() {
            var promesa = $http.get('data.json').then(function(resp){
                return resp.data;
            }, function(resp){
                return resp.data;
            });
            return promesa;
        }
    }
    return datos;
}]);
