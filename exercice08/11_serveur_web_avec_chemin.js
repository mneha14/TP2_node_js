var http = require('http');
var fs = require('fs');
var url = require('url');


// Créer un serveur
//fontion executée losqu'on accede au localhost
http.createServer( function (request, response) {  
   // On extrait de la requête «request» le chemin  qui nous donnera le nom de fichier
   var pathname = url.parse(request.url).pathname;
   console.log("hfg");

   for (p in request){

      console.log("attribut de request = " + p);
   }
   
 
   console.log("request.url = " + request.url)
   console.log("url.parse(request.url).pathname = " + url.parse(request.url).pathname)
  // affiche le nom du fichier pour laquelle la requête a été généré
   console.log("Request for " + pathname + " received.");
   

   // Lire par le «fs» (file système) le fichier de la requête 
   // le slice(1) permet de retirer le premier caractère
   //on rajoute l'extension .json au nom tapé dans l'url
   //data = contenu du fihcier json
   fs.readFile(pathname.slice(1) + ".json", function (err, data) {
      if (err) {
         console.log(err);
         // HTTP Status: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else { 
         var obj = JSON.parse(data); //convertir le contenu du fichier en JSON
         var tableauProvince = ""; //tableau pour stocker les provinces

         for (propriete in obj){

            //ajoute les provinces dans un td
            tableauProvince += ("<td>"+ propriete + '-' + obj[propriete] + "</td>");
      
         }
         
         //Page found   
         // HTTP Status: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});  
         
         // affiche le contenu du fichier json dans la page HTML
         response.write("<table><tr>" + tableauProvince + "</tr></table>");   
      }
      // transmet la reponse  
      response.end();
   });   
}).listen(8081);

// message console
console.log('Serveur se trouvant à http://127.0.0.1:8081/');

