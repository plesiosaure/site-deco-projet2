var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const multer = require('multer');
const fs = require('fs');
const upload = multer({ det: 'tmp/'});


var connection = mysql.createConnection({
 	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'mydb'
});

connection.connect();

router.get('/', function(req, res, next) {
	// Hello session !
	// res.send(req.session.connect);
	// Si la personne est connectée on affiche la page
	// Si la personne n'est pas connectée on le redirige sur la page de connexion
  if(req.session.connect) {
  	res.render('admin');
  } else {
  	res.redirect("/login");
  }
});





router.post('/', function(req, res, next) {
	// Ici on gère les informations de l'utilisateur

	//res.send(req.body.username);
	//res.send(req.body['username']);

	// Tester si l'utilisateur existe en BDD  -> Comparer le nom (login) / le password
	let login= req.body.username;
	let password = req.body.password ;

	connection.query(`select * from user where pseudo= ? and password= ?` ,[login, password], function (error, results, fields) {
            if (results.length==0) {
                   res.send("Erreur");
            }else{

            }
     });
});



router.get("/logout", function(req, res, next) {
  req.session.connect = false;
  res.redirect("/login");

});




router.get('/ajout-article', function(req, res, next) {
  // res.sendFile(__dirname+'/public/index1.html');
  connection.query('select * from category', function(error, results){
	res.render('ajout-produit', {
		categories : results
	});
});
  res.render('ajout-article');
});

router.get('/edit-article', function(req, res, next) {
  // res.sendFile(__dirname+'/public/index1.html');
  res.render('edit-article');
});

module.exports = router;



