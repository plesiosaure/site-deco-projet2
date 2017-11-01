var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const multer = require('multer');
const fs = require('fs');

const upload = multer({ dest: 'tmp/'});
const nodemailer = require('nodemailer');

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



// GET /admin/   Afficher la liste des produits de la table 'products'
router.get('/', function(req, res, next) {
connection.query(`SELECT distinct (a.idarticle), a.title, a.text, c.name, m.*
FROM article a
JOIN article_has_category ac
ON a.idarticle = ac.article_idarticle
JOIN category c
ON ac.category_idcategory = c.idcategory
LEFT JOIN media m
ON a.idarticle = m.article_idarticle;`, function (error, results, fields) {
	  if (error) throw error;
	  //console.log(results)
		res.render('admin-index', {
      product:results
    });
	  //console.log(results);
	});
});





// GET /admin/create-product
router.get('/create-product', function(req, res, next) {
	res.render('admin-create');
});

// POST /admin/create-product
router.post('/create-product', upload.single('product_sourceName'), function(req, res, next) {
	// Ajouter un produit dans la table 'products'
	//console.log(req.file);
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
	//console.log(req.body);

});

//GET/admin/  edition article
router.get('/edit-product/:idarticle(\\d+)', function(req, res) {
  //console.log('editer un produit');
  connection.query('select * from article where idarticle=?', [req.params.idarticle], function(error, results) {
    if (error) throw error;
      res.render('admin-edit', {
        product:results[0]
      });
  })


});

router.post('/edit-product/:idarticle(\\d+)', function(req, res, next) {
  connection.query('update article set title = ?, text = ? where idarticle=?',[req.body.title, req.body.text, req.bod.idarticle], function(error, results, fields) {
console.log(results);
   if (error) throw error;
   res.redirect('/admin');
  })

  // res.sendFile(__dirname+'/public/index1.html');



});


// req.params -> /monlien-:id
// req.body -> POST
// req.query -> monlien?id=1

// GET /admin/delete-product
router.get('/delete-product/:idarticle(\\d+)', function(req, res, next) {
	// Supprimer le produit en recupérant l'id dans la query
console.log('delete');
	connection.query('delete from article where idarticle=?',[req.query.idarticle],function (error, results, fields) {
	  if (error) throw error;
		res.redirect('/admin');
	  //console.log(results);
	});
});


module.exports = router;
