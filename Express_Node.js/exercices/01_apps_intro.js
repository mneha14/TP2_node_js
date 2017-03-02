var express = require('express');//va chercher le module express
var app = express();//création d'un objet express

app.get('/', function (req, res) {
   res.send('<h1>Hello World</h1>');
})

var server = app.listen(8081, function () {
	// for (var p in serveur.adress()) {console.log(p)}
   var host = server.address().address
   var port = server.address().port
   
   console.log("Exemple l'application écoute sur http://%s:%s", host, port)
})