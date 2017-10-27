var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'tmp/'});


var connection = mysql.createConnection({
 	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'mydb'
});

connection.connect();


router.get("/logout", function(req, res, next) {
  req.session.connect = false;
  res.redirect("/login");

});


router.get('/edit-article', function(req, res, next) {
  // res.sendFile(__dirname+'/public/index1.html');
  res.render('edit-article');
});





// GET /admin/
router.get('/', function(req, res, next) {	
	connection.query('SELECT DISTINCT article.idarticle, article.*, media.sourceName FROM article, media, category, article_has_category WHERE idarticle=article_has_category.article_idarticle AND article_has_category.category_idcategory=idcategory AND idarticle=media.article_idarticle ;', function (error, results, fields) {
	  if (error) throw error;
	  //console.log(results)
		res.render('admin-index', {products:results});
	  //console.log(results);
	});
	// Afficher la liste des produits de la table 'products' 
	//;
});

// GET /admin/create-product 
router.get('/create-product', function(req, res, next) {
	res.render('admin-create');
});

// POST /admin/create-product 
router.post('/create-product', upload.single('product_sourceName'), function(req, res, next) {
	// Ajouter un produit dans la table 'products'
	console.log(req.file);
	if (req.file.size < (3*1024*1024) && (req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpg' || req.file.mimetype == 'image/jpeg') ) {
		fs.rename(req.file.path,'public/img/'+req.file.originalname);
		
	} else {
		res.send('Vous avez fait une erreur dans le téléchargement')
	}

	connection.query('insert into article values(null, 1, ?, ?, NOW());',[req.body.title,req.body.text], function (error, results, fields) {
	  if (error) throw error;
		res.redirect('/admin');
	  //console.log(results);
	});

	
	console.log(req.body);

});

// req.params -> /monlien-:id 
// req.body -> POST 
// req.query -> monlien?id=1

// GET /admin/delete-product 
router.get('/delete-product', function(req, res, next) {
	// Supprimer le produit en recupérant l'id dans la query 
	//delete from products where id=
	connection.query('delete from article where idarticle=?',[req.query.id],function (error, results, fields) {
	  if (error) throw error;
		res.redirect('/admin');
	  //console.log(results);
	});
});


module.exports = router;



