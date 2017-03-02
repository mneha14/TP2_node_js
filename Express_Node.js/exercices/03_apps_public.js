var express = require('express');
var app = express();
// on défini le chemin du dossier «public» on aura pas besoin de spécifier «public» dans l'url
app.use(express.static('public'));

app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})