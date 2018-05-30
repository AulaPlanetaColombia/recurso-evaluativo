/* global angular */
var app = angular.module('app', [
    'ngAnimate',
    'ngAria',
    'ngRoute',
    'ngSanitize',
    'ngMaterial'
]);
app.controller('main', [function(){
    console.log('main');
}]);
app.controller('contenedor', ['datos', function(datos){
    console.log('contenedor');
    var cont = this;
    cont.estados = ['exposicion','examen','revisionAlumno','revisionProfesor'];
    cont.estado = cont.estados[0];
    cont.layout = {
        'header': 'views/header.html',
        'body': 'views/body.html',
        'footer': 'views/footer.html'
    };
    datos.interfaz().then(function(resp){
        cont.interfaz = resp;
        datos.contenido().then(function(resp){
            cont.titulo = resp.titulo;
            cont.numPregunta = 0;
            cont.preguntas = procesaBancos(resp);
            cont.valorXpregunta = Number(cont.interfaz.valorMax)/cont.preguntas.length;
            cont.puntajeTotal = 0;
        });
    });
    cont.enviar = function(){
        var totalPreg = cont.preguntas.length;
        for (var i = 0; i < totalPreg;i++) {
            var preg = cont.preguntas[i];
            var totalResp = preg.respuestas.length;
            var numCorrectas = 0;
            var valorXrespuesta, resp, e;
            for (e = 0; e < totalResp;e++) {
                resp = preg.respuestas[e];
                if (resp.correcta) {
                    numCorrectas++;
                }
            }
            valorXrespuesta = cont.valorXpregunta/numCorrectas;
            for (e = 0; e < totalResp;e++) {
                resp = preg.respuestas[e];
                console.log('respuesta '+i+'-');
                if (cont.resultado[i][e] && resp.correcta) {
                    cont.puntajeTotal = cont.puntajeTotal + valorXrespuesta;
                    cont.resultResp[i][e] = 'correcto';
                } else {
                    cont.resultResp[i][e] = 'incorrecto';
                }
            }
        }
        cont.estadoCalif++;
    };
    function procesaBancos(resp) {
        var preguntas = [];
        var totalBancos = resp.bancos.length;
        var idPregunta = 0;
        for (var e = 0;e < totalBancos;e++) {
            var banco = resp.bancos[e];
            var todasPreguntas = banco.preguntas;
            var numPreg = banco.numPreguntas;
            for (var i = 0;i < numPreg;i++) {
                var azar = Math.floor(Math.random() * todasPreguntas.length);
                var miPregunta = todasPreguntas.splice(azar,1)[0];
                if (banco.mediaComun.tipo) {
                    miPregunta.media = {
                        'tipo': banco.mediaComun.tipo,
                        'contenido': banco.mediaComun.contenido
                    };
                }
                miPregunta.id = idPregunta;
                miPregunta.respuestas = randomiza(miPregunta.respuestas);
                preguntas.push(miPregunta);
                idPregunta++;
            }
        }
        return preguntas;
    }
    function randomiza(array) {
        var salida = [];
        var num = array.length;
        var elem;
        var id = 0;
        while (num) {
            elem = array.splice(Math.floor(Math.random() * array.length),1)[0];
            elem.id = id;
            salida.push(elem);
            id++;
            num--;
        }
        return salida;
    }
}]);
app.controller('header', [function(){
    console.log('header');
    var hr = this;
}]);
app.controller('body', [function(){
    console.log('body');
    var bd = this;
    bd.rutaMedia = 'media/';
}]);
app.controller('footer', [function(){
    console.log('footer');
    var fr = this;
}]);
app.service('datos',['$http',function($http){
    var datos = {
        contenido: function() {
            var promesa = $http.get('data.json').then(function(resp){
                return resp.data;
            }, function(resp){
                return resp.data;
            });
            return promesa;
        },
        interfaz: function() {
            var promesa = $http.get('assets/json/interfaz.json').then(function(resp){
                return resp.data;
            }, function(resp){
                return resp.data;
            });
            return promesa;
        }
    }
    return datos;
}]);