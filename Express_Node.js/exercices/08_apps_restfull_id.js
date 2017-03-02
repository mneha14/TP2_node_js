var express = require('express');
var app = express();
var fs = require("fs");
/* on sélectionne un usager en particulier */
app.get('/:id', function (req, res) {
   // Premièrement on lit l'ensemble des usagers.
   fs.readFile( __dirname + "/public/data/" + "usagers.json", 'utf8', function (err, data) {
       users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)

})