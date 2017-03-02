var express = require('express');
var app = express();
/* on utilise le module «body-parser» pour traiter le formulaire transmis  par POST */
var bodyParser = require('body-parser');

// Créer le parser « application/x-www-form-urlencoded » 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/html/05_form.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "05_form.htm" );
})

app.post('/traiter_post', urlencodedParser, function (req, res) {
   // Preparer l'output en format JSON 
   reponse = {
      prenom:req.body.prenom,
      nom:req.body.nom,
      lamethode: "POST"
   };
   console.log('reponse');
   res.end(JSON.stringify(reponse));
})

	var server = app.listen(8081, function () {
   	var host = server.address().address
   	var port = server.address().port
   
   	console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})