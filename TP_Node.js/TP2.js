//contantes
const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
const ObjectID = require('mongodb').ObjectID;

app.set('view engine', 'ejs'); // générateur de template 
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))  // pour utiliser le dossier public

var db // variable qui contiendra le lien sur la BD

//LIEN VERS LA BASE DE DONNÉE
MongoClient.connect('mongodb://127.0.0.1:27017/carnet_adresse', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(8081, () => {//localhost:8081
    console.log('Connexion à la base de donnée')
    console.log('Connexion au localhost:8081')
  })
})

//AJOUTER
app.post('/adresse',  (req, res) => {
  db.collection('adresse').save(req.body, (err, result) => {
      if (err) return console.log(err)
      console.log('sauvegarder dans la BD')
      res.redirect('/')// redirige vers la route qui affiche la collection
    })
})//fin ajouter


//MODIFIER
app.post('/modifier', (req, res) => {
var id = req.params.id
 //console.log(id)
 console.log(req.body)
 db.collection('adresse').findOneAndUpdate({"_id": ObjectID(req.body._id)}, {"nom" : req.body.nom, "prenom" : req.body.prenom, "telephone" : req.body.telephone, "ville" : req.body.ville, "codepostal" : req.body.codepostal}, (err, resultat) => {

if (err) return console.log(err)
 res.redirect('/')  // redirige vers la route qui affiche la collection
 })
})//fin modifier

//SUPPRIMER
app.get('/detruire/:id', (req, res) => {
 var id = req.params.id
 console.log(id)
 db.collection('adresse')
 .findOneAndDelete({"_id": ObjectID(req.params.id)}, (err, resultat) => {

if (err) return console.log(err)
 res.redirect('/')  // redirige vers la route qui affiche la collection
 })
})//fin supprimer

//AFFICHE LE DOCUMENT
app.get('/',  (req, res) => {
   console.log('la route route get / = ' + req.url)
 
    var cursor = db.collection('adresse').find().toArray(function(err, resultat){
       if (err) return console.log(err)
    // renders index.ejs
    // affiche le contenu de la BD
    res.render('index.ejs', {adresse: resultat})

    }) 
    
})


/*app.get('/formulaire',  (req, res) => {
   console.log('la route  get / = ' + req.url)
   res.sendFile(__dirname + "/public/html/forme.htm")
})*/


