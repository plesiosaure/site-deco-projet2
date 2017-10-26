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

});

router.get('/presse', function(req, res, next) {
  //res.sendFile(__dirname+'/public/realisations.html');
  res.render('presse',{menu_index: 3});
});

router.get('/contact', function(req, res, next) {
  //res.sendFile(__dirname+'/public/realisations.html');
  res.render('contact',{menu_index: 4});
});

router.get('/login', function(req, res, next) {
  //res.sendFile(__dirname+'/public/realisations.html');
  res.render('login');
});



router.get('/test', function(req, res, next) {
  //res.sendFile(__dirname+'/public/realisations.html');
  res.render('test',{presse: true});
});






module.exports = router;
