var express = require('express');
var router = express.Router();
//const mysql = require('mysql');


/* const connection = mysql.createConnection({
 	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'groupe2'
});
 

 GET home page. 
router.get('/', function(req, res, next) {
	// Page de connexion

	connection.query(`select * from users where name= ?`,[req.body.toto], function (error, results, fields) {
	 	 res.render('admin', { 
	 	 	title: 'Express',
	 	 	error : JSON.stringify(error),
	 	 	results:  JSON.stringify(results), 
	 	 	fields : JSON.stringify(fields)
	 	 	 });
 	 
	});

  
});
*/


let users = [{
	"name" : 'admin',
	"mdp"  : '123' 

}];


router.post('/', function(req, res, next) {
	// Ici on gère les informations de l'utilisateur

	//res.send(req.body.username);
	//res.send(req.body['username']);

	// Tester si l'utilisateur existe en BDD  -> Comparer le nom (login) / le password
	let login= req.body.username;
	let password = req.body.password ;
	// select name, password from users where name='${var}' and password='wild';
	//` text ${var} fzoeijfzeoj ${var2}` 

	/* connection.query(`select * from users where name= "${login}" 
		and password="${password}"`, function (error, results, fields) {
 	 if (results.length==0) {
 	 	res.send("Erreur");
 	 }else{
 	 	req.session.connect=true;
 	 	res.redirect("/admin");

 	 }
 	 
	}); */

	if (login == users[0].name && password == users[0].mdp) {
 	 	req.session.connect=true;
 	 	res.redirect("/admin");
 	 }else{
 	 	res.send("Erreur");

 	 }


	// Si faux on lui envoie un message pour l'informer 
	// Si vrai -> On ouvre la session & on le redirige sur /admin 

  	 
});

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

module.exports = router;
