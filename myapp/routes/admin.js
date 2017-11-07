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




// GET /admin/   Afficher la liste des produits de la table 'articles'
router.get('/', function(req, res, next) {
  if (req.session.connect) {
      connection.query(`SELECT a.idarticle, a.title, a.text, c.name, m.thumbnailName
  FROM article a
  LEFT JOIN article_has_category ac
  ON a.idarticle = ac.article_idarticle
  LEFT JOIN category c
  ON ac.category_idcategory = c.idcategory
  LEFT JOIN media m
  ON a.idarticle = m.article_idarticle
  WHERE (m.featured=1 OR m.featured IS NULL)
  AND c.idcategory = 1
  GROUP BY a.idarticle,c.name, m.thumbnailName`, function (error, results, fields) {

      if (error) throw error;
      connection.query(`SELECT a.idarticle, a.title, a.text, c.name, m.thumbnailName
      FROM article a
      LEFT JOIN article_has_category ac
      ON a.idarticle = ac.article_idarticle
      LEFT JOIN category c
      ON ac.category_idcategory = c.idcategory
      LEFT JOIN media m
      ON a.idarticle = m.article_idarticle
      WHERE (m.featured=1 OR m.featured IS NULL)
      AND c.idcategory = 2
      GROUP BY a.idarticle,c.name, m.thumbnailName`, function (error, results2, fields) {

          if (error) throw error;
          console.log(results)
          res.render('admin-index', {
            articles:results,
            press: results2
          });
          //console.log(results);
        });

      //console.log(results);
    });
  }
  else {
    res.render('login');
  }
});





// GET /admin/create-article
router.get('/create-article', function(req, res, next) {
	if (req.session.connect) {
    res.render('admin-create');
  }
  else {
    res.render('login');
  }
});


// POST /admin/create-article
router.post('/create-article', upload.array('article_sourceName', 6), function(req, res, next) {
  // Ajouter un produit dans la table 'articles'
  if (req.session.connect) {
    connection.query('insert into article values(null, ?, ?, NOW());',[req.body.title,req.body.text],
    function (error, results, fields) {
      if (error) throw error;
      connection.query(`INSERT INTO article_has_category values(?, ?)`, [results.insertId, req.body.category], function (error, results, fields) {
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
    console.log(req.body);
  }
  else {
    res.render('login');
  }



});

//GET/admin/  edition article
router.get('/edit-article/:idarticle(\\d+)', function(req, res) {
  //console.log('editer un produit');
  if (req.session.connect) {
    connection.query('select * from article where idarticle=?', [req.params.idarticle], function(error, results) {
      if (error) throw error;
      connection.query('select * from media where article_idarticle=?', [req.params.idarticle], function(error, results2) {
        res.render('admin-edit', {
          article:results[0],
          media:results2
        });
      });
console.log(results);
    });
  }
  else {
    res.render('login');
  }



});

router.post('/edit-article/:idarticle(\\d+)', upload.array('article_sourceName', 6), function(req, res) {
  if (req.session.connect) {
    connection.query('update article set title = ?, text = ? where idarticle=?',[req.body.title, req.body.text, req.params.idarticle], function(error) {
      console.log(req.body)
     if (error) throw error;
     connection.query('delete from media where idmedia in(?)', [req.body.suppr], function(error){
       console.log(this.sql);
       if (error) throw error;
     });
     connection.query('update media set featured = (idmedia=?) where article_idarticle=?', [req.body.featured, req.params.idarticle], function(error){
       console.log(this.sql);
       if (error) throw error;
     });

     connection.query('select count(*) AS nbImage from media where article_idarticle=?', [req.params.idarticle], function(error, results) {
       console.log(results);
       let nbImage = results[0].nbImage;
       req.files.forEach(function(f, index){
         if (f.size < (3*1024*1024) && (f.mimetype == 'image/png' || f.mimetype == 'image/jpg' || f.mimetype == 'image/jpeg'))
         {
           fs.rename(f.path,'public/img/'+f.originalname);
           connection.query("insert into media values(null, 'img', '', 'legend', ?, ?, ?, ?)",
           [f.originalname, f.originalname, req.params.idarticle, index==0 && nbImage==0], function (error, results, fields) {
             if (error) throw error;
           });
         } else {
           res.send('Vous avez fait une erreur dans le téléchargement du fichier' + f.originalname)
         }
       });
     });

      console.log(error);
     res.redirect('/admin')

    });
  }
  else {
    res.render('login');
  }

  // res.sendFile(__dirname+'/public/index1.html');



});


// req.params -> /monlien-:id
// req.body -> POST
// req.query -> monlien?id=1

// GET /admin/delete-article
router.get('/delete-article/:idarticle(\\d+)', function(req, res, next) {
	// Supprimer le produit en recupérant l'id dans la query
  if (req.session.connect) {
      connection.query('delete from article where idarticle=?',[req.params.idarticle],function (error, results, fields) {
        if (error) throw error;
        res.redirect('/admin');
        //console.log(results);
      });
    }
    else {
      res.render('login');
    }

});


module.exports = router;
