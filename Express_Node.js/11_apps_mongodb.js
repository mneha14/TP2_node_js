const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
app.set('view engine', 'ejs'); // générateur de template 
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))  // pour utiliser le dossier public

var db // variable qui contiendra le lien sur la BD

//base de données locale
MongoClient.connect('mongodb://127.0.0.1:27017/carnet_adresse', (err, database) => {
  if (err) return console.log(err)//si erreur -> affiche message d'erreur
  db = database
  app.listen(8081, () => {//si non affiche ce message
    console.log('connexion à la BD et on écoute sur le port 8081')
  })
})


app.get('/',  (req, res) => {
   console.log('la route route get / = ' + req.url)
    //va chercher toutes les adresses dans la table adresse , puis les retourne en array
    var cursor = db.collection('adresse').find().toArray(function(err, resultat){
       if (err) return console.log(err)
    // renders index.ejs
    // affiche le contenu de la BD dans le fichier html index.ejs
    res.render('index.ejs', {adresse: resultat})

    }) 
    

})

//va chercher le modele de formulaire dans forme.html
app.get('/formulaire',  (req, res) => {
   console.log('la route  get / = ' + req.url)
   res.sendFile(__dirname + "/public/html/forme.htm")
})

//sauvegarde les informations entrées dans le formulaire puis les affiche dans la page
app.post('/adresse',  (req, res) => {
  db.collection('adresse').save(req.body, (err, result) => {
      if (err) return console.log(err)
      console.log('sauvegarder dans la BD')
      res.redirect('/')
    })
})

