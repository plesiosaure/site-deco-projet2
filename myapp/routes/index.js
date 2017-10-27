var express = require('express');
var router = express.Router();

const mysql = require('mysql');


 const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'mydb'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.sendFile(__dirname+'/public/index1.html');
  res.render('index',{menu_index: 1});
});

router.get('/realisations', function(req, res, next) {
  //res.sendFile(__dirname+'/public/realisations.html');
  res.render('real',{menu_index: 2});
});

router.get('/realisations/:id(\\d+)', function(req, res, next) {
  connection.query(`select * from article where idarticle= ? ` ,[req.params.id], function (error, results, fields) {
   if (results.length==0) {
    res.send("Erreur");
   }else{
    res.render('real1', {menu_index: 2, article: results[0]});

   }
   
  });  
  console.log(results);

});

router.get('/presse', function(req, res, next) {
  //res.sendFile(__dirname+'/public/realisations.html');
  res.render('presse',{menu_index: 3});
});

//route formulaire de contact
router.get('/contact', function(req, res, next) {
  //res.sendFile(__dirname+'/public/realisations.html');
  res.render('contact',{menu_index: 4});
});

router.post('/contact', function(req, res, next) {
  //res.sendFile(__dirname+'/public/realisations.html');
  res.render('contact-confirm',{menu_index: 4});
});

router.get('/login', function(req, res, next) {
  //res.sendFile(__dirname+'/public/realisations.html');
  res.render('login');
});

router.get('/produit-id:id(\\d+)', function(req, res, next) {
  //res.sendFile(__dirname+'/public/realisations.html');
  connection.query('select * from products',function(error, results){

  res.render('produit');{ informations: products}
});
});



router.get('/test', function(req, res, next) {
  //res.sendFile(__dirname+'/public/realisations.html');
  res.render('test',{presse: true});
});


router.get('/login', function(req, res, next) {
  // Hello session !
  // res.send(req.session.connect);
  // Si la personne est connectée on affiche la page
  // Si la personne n'est pas connectée on le redirige sur la page de connexion
  res.render('login')
  if(req.session.connect) {
    res.redirect('/admin-index');
  }
});

router.post('/login', function(req, res, next) {
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
              req.session.connect=true;
        res.redirect("/admin");
            }
     });
});


module.exports = router;
