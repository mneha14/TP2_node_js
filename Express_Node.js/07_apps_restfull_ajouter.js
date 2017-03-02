var express = require('express');
var app = express();
var fs = require("fs");
app.use(express.static('public'));
var user = {
   "user4" : {
      "nom" : "François",
      "motpasse" : "motpasse_4",
      "profession" : "ingénieur",
      "id": 4
   }
}

app.get('/ajouter', function (req, res) {
   // On récupere la liste des usagers.
   fs.readFile( __dirname + "/public/data/" + "usagers.json", 'utf8', function (err, data) {
       console.log( data );
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log(data);
       res.end( JSON.stringify(data));
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})