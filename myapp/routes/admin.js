var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const multer = require('multer');
const fs = require('fs');

const upload = multer({dest: 'tmp/'});
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
  connection.query(`SELECT a.idarticle, a.title, a.text, c.name, m.thumbnailName
FROM article a
LEFT JOIN article_has_category ac
ON a.idarticle = ac.article_idarticle
LEFT JOIN category c
ON ac.category_idcategory = c.idcategory
LEFT JOIN media m
ON a.idarticle = m.article_idarticle
WHERE m.featured=1 OR m.featured IS NULL
GROUP BY a.idarticle,c.name, m.thumbnailName
 ;`, function (error, results, fields) {

	  if (error) throw error;
	  //console.log(results)
		res.render('admin-index', {
      products:results
    });
	  //console.log(results);
	});
});





// GET /admin/create-product
router.get('/create-product', function(req, res, next) {
	res.render('admin-create');
});


// POST /admin/create-product
router.post('/create-product', upload.array('product_sourceName', 6), function(req, res, next) {
  // Ajouter un produit dans la table 'products'
  console.log(req.files);


  connection.query('insert into article values(null, ?, ?, NOW());',[req.body.title,req.body.text],
  function (error, results, fields) {
    if (error) throw error;
    connection.query(`INSERT INTO article_has_category values(?, 1)`, [results.insertId], function (error, results, fields) {
          if (error) throw error;
        });
    req.files.forEach(function(f, index){
      if (f.size < (3*1024*1024) && (f.mimetype == 'image/png' || f.mimetype == 'image/jpg' || f.mimetype == 'image/jpeg'))
      {
        fs.rename(f.path,'public/img/'+f.originalname);
        connection.query("insert into media values(null, 'img', '', 'legend', ?, ?, ?, ?)",
        [f.originalname, f.originalname, results.insertId, index==0], function (error, results, fields) {
          if (error) throw error;
        });
      } else {
        res.send('Vous avez fait une erreur dans le téléchargement du fichier' + f.originalname)
      }
    });
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

router.post('/edit-product/:idarticle(\\d+)', function(req, res) {
  connection.query('update article set title = ?, text = ? where idarticle=?',[req.body.title, req.body.text, req.params.idarticle], function(error) {
    console.log(req.body)
   if (error);
    console.log(error);
   res.redirect('/admin')

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
	connection.query('delete from article where idarticle=?',[req.params.idarticle],function (error, results, fields) {
	  if (error) throw error;
		res.redirect('/admin');
	  //console.log(results);
	});
});


module.exports = router;
