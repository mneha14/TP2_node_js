var express = require('express');
var app = express();
var fs = require("fs");

var user = {
   "user4" : {
      "nom" : "Sestier",
      "motpass" : "motpasse4",
      "profession" : "Ingénieur",
      "id": 4
   }
}






app.get('/ajouter/', function (req, res) {
   // On récupere l'usagers 4.
   var monUtilisateur = JSON.stringify(user["user4"])
   // on l'ajoute au fichier
   fs.appendFile( __dirname + "/public/data/" + "usagers.json",monUtilisateur,  'utf8', function (err) {

       console.log( monUtilisateur );
       res.end("<h1>Ajout completer</h1>");
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})

