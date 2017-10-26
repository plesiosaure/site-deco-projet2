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

 //GET home page
router.get('/', function(req, res, next) {
	// Page de connexion

	/*connection.query(`select * from users where name= ?',[req.body.toto], function (error, results, fields) {
	 	 res.render('admin', {
	 	 	title: 'Express',
	 	 	error : JSON.stringify(error),
	 	 	results:  JSON.stringify(results),
	 	 	fields : JSON.stringify(fields)
	 	 	 });

	});


});
*/





router.post('/', function(req, res, next) {
	// Ici on gère les informations de l'utilisateur

	//res.send(req.body.username);
	//res.send(req.body['username']);

	// Tester si l'utilisateur existe en BDD  -> Comparer le nom (login) / le password
	let login= req.body.username;
	let password = req.body.password ;

	/*connection.query('select * from users where name= "${login}"
		and password="${password}"', function (error, results, fields) {
 	 if (results.length==0) {
 	 	res.send("Erreur");
 	 }else{
 	 	req.session.connect=true;
 	 	res.redirect("/admin");

	}

	});

	if (login == users[0].name && password == users[0].mdp) {
 	 	req.session.connect=true;
 	 	res.redirect("/admin");
 	 }else{
 	 	res.send("Erreur");

 	 }


	// Si faux on lui envoie un message pour l'informer
	// Si vrai -> On ouvre la session & on le redirige sur /admin


});



router.get("/logout", function(req, res, next) {
  req.session.connect = false;
  res.redirect("/login");

});

router.get('/produit-:productID(\\d+)', function(req, res, next) {
  connection.query('select * from products where id = ?' , [req.params.productID], function (error, results, fields);
  res.render('produit', {
		informations: products[req.params.productID]
	});

router.get('/produits', function(req,req,next) {
	res.render('produit',{
		informations: products
	});
});

module.exports = router;
