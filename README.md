BackEnd
1) Creation d'un serveur NodeJs qui communique avec une DB MongoDB .

1.Si vous n'êtes pas encore inscrit à Mongo Atlas. Créer un nouveau compte.
/////*************************************///////////////
2.Cliquez sur: Create Cluster -> Go for the free one for this demo project -> Cliquez sur Create-> Keep the default specifications -> Cliquez sur create cluster.
/////*************************************///////////////
3.Nous devons maintenant ajouter l'utilisateur pour accéder à la base de données. Cela revient à créer un profil pour accéder à une ressource.
Accédez à Accès à la base de données -> Définissez le nom d'utilisateur et le mot de passe-> Enfin, ajoutez l'utilisateur.
/////*************************************///////////////
4.Nous devons également ajouter l'adresse IP que nous utiliserons pour accéder à la base de données.
Accédez à Accès réseau-> Aller pour ajouter une IP -> Ajouter l'IP actuelle.
/////*************************************///////////////
5.Nous devrons attendre que le cloud de la base de données MongoDB soit déployé.
/////*************************************///////////////
6.Une fois déployé, nous devons aller dans les clusters -> puis cliquer sur se connecter -> Cliquer sur se connecter à une application-> Nous spécifions ensuite l'application-> Nous devons copier l'URL.
/////*************************************///////////////
7.Dans l'URL, nous devons remplacer le nom d'utilisateur et le mot de passe et les transmettre en tant que chaîne constante.
/////*************************************///////////////
sudo apt update
sudo apt install nodejs
sudo apt install npm

nodejs -v
npm -v
2)Construire l'application
Pour créer une application, nous devons d'abord lancer le gestionnaire de paquets de nœuds dans le dossier en utilisant:
npm init
/////*************************************///////////////
Ensuite, nous devons installer les dépendances requises pour Node JS à l'aide de npm install <nom_package>.
/////*************************************///////////////
Pour une application CRUD simple, nous avons besoin de bibliothèques spécifiques. Elles sont:
1. Express: Comme nous l'avons vu, Express JS est requis, nous devons donc l'installer. Installation: npm install express

2. Nodemon: Cette bibliothèque permet de mettre à jour le serveur automatiquement chaque fois que nous apportons des modifications au code source. 
Installation: npm installe nodemon.

3.Mongoose: Il aide à établir des connexions et à interroger MongoDB. Installation: npm install mangouste.
"start": "nodemon index.js"
/////*************************************///////////////
Des systèmes comme Node JS fonctionnent actuellement sur une architecture MVC (Model View Controller). 
C'est un modèle de conception.
L'idée est que cela permet de se concentrer sur une partie spécifique de l'application et de la construire sur une base modulaire. 
Les composants sont:
Modèle-Vue-Contrôleur
/////*************************************///////////////
Donc, nous créons d'abord un fichier «index.js», qui est notre page de script de lancement.
Dans le fichier «index.js», nous incluons express et mangouste, et initialisons l'application express:
const express= require('express');
const mongoose= require('mongoose');
const app=express();
/////*************************************///////////////
Ensuite, nous devons établir une connexion à la base de données avec notre serveur MongoDB:

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
/////*************************************///////////////
héberger l'application.
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
/////*************************************///////////////
créer un modèle, nous devons utiliser les fonctions Schema et model de la bibliothèque Mongoose.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
    nom : {type : String , required : true},
    email : {type : String , required : true},
    password : {type:String , required : true, minlength: 3},
    id : {type : Number , required : true},
    //team:
});
const User = mongoose.model('User', userSchema);
module.exports = User;
/////*************************************///////////////
Ensuite, nous passons aux deux parties les plus importantes: les routes et les contrôleurs.
avec les requêtes HTTP:
GET est utilisé pour demander des données à une ressource spécifiée.

POST est utilisé pour envoyer des données à un serveur pour créer / mettre à jour une ressource.

HEAD: Identique à GET, mais il ne transfère que la ligne d'état et la section d'en-tête.

PUT: remplace toutes les représentations actuelles de la ressource cible par le contenu téléchargé.

DELETE: supprime toutes les représentations actuelles de la ressource cible données par l'URI.

CONNECT: établit un tunnel vers le serveur identifié par un URI donné.

PATCH: la méthode PATCH applique des modifications partielles à une ressource
