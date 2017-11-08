var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const nodemailer = require('nodemailer');

var app = express();



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mydb'
});

//Creation de la méthode de transport
var smtpTransport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0af485a2b6541e",
    pass: "f8d918cc0ad711"
  }
});


/* GET home page. */
router.get('/', function (req, res, next) {
  // res.sendFile(__dirname+'/public/index1.html');
  connection.query(`SELECT a.idarticle, a.title, a.text, m.thumbnailName
FROM article a
LEFT JOIN article_has_category ac
ON a.idarticle = ac.article_idarticle
LEFT JOIN category c
ON ac.category_idcategory = c.idcategory
LEFT JOIN media m
ON a.idarticle = m.article_idarticle
WHERE m.featured = 1
AND c.idcategory = 1
GROUP BY a.idarticle, m.thumbnailName
LIMIT 6` , function (error, results, fields) {
      if (results.length == 0) {
        res.send("Erreur");
      } else {

  res.render('index', { menu_index: 1, articles: results  });
}

    });


});

router.get('/realisations', function (req, res, next) {
  //res.sendFile(__dirname+'/public/realisations.html');
  connection.query(`SELECT a.idarticle, a.title, a.text, m.thumbnailName
FROM article a
LEFT JOIN article_has_category ac
ON a.idarticle = ac.article_idarticle
LEFT JOIN category c
ON ac.category_idcategory = c.idcategory
LEFT JOIN media m
ON a.idarticle = m.article_idarticle
WHERE m.featured = 1
AND c.idcategory = 1
GROUP BY a.idarticle, m.thumbnailName` , function (error, results, fields) {
      if (results.length == 0) {
        res.send("Erreur");
      } else {
        res.render('real', { menu_index: 2, articles: results });

      }

    });


});

router.get('/realisations/:id(\\d+)', function (req, res, next) {
  connection.query(`SELECT a.idarticle, a.title, a.text, m.thumbnailName
FROM article a
LEFT JOIN article_has_category ac
ON a.idarticle = ac.article_idarticle
LEFT JOIN media m
ON a.idarticle = m.article_idarticle
WHERE idarticle = ? 
GROUP BY a.idarticle, m.thumbnailName, m.featured 
ORDER by m.featured DESC` , [req.params.id], function (error, results, fields) {
      if (results.length == 0) {
        res.send("Erreur");
      } else {
        res.render('real1', { menu_index: 2, articles: results });

      }

    });


});

router.get('/presse', function (req, res, next) {
  //res.sendFile(__dirname+'/public/realisations.html');
  connection.query(`SELECT a.idarticle, a.title, a.text, m.thumbnailName, m.url
  FROM article a
  LEFT JOIN article_has_category ac
  ON a.idarticle = ac.article_idarticle
  LEFT JOIN category c
  ON ac.category_idcategory = c.idcategory
  LEFT JOIN media m
  ON a.idarticle = m.article_idarticle
  WHERE m.featured = 1 
  AND c.idcategory = 2
  GROUP BY a.idarticle, m.thumbnailName, m.url` , function (error, results, fields) {
        if (results.length == 0) {
          res.send("Erreur");
        } else {
          res.render('presse', { menu_index: 3, articles: results });
  
        }
  
      });
});

//route formulaire de contact
router.get('/contact', function (req, res, next) {
  //res.sendFile(__dirname+'/public/realisations.html');
  res.render('contact', { menu_index: 4 });
});

router.post('/contact', function (req, res, next) {

  smtpTransport.sendMail({
    from: req.body.name + " <" + req.body.email + ">", // Expediteur
    to: "alexis.ducerf@homesweethome.com", // Destinataires
    subject: req.body.subject, // Sujet
    text: req.body.text // plaintext body
  }, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: " + response.message);
    }
  });

  res.render('contact-confirm', { menu_index: 4 });
});




router.get('/test', function (req, res, next) {
  //res.sendFile(__dirname+'/public/realisations.html');
  res.render('test', { presse: true });
});


router.get('/login', function (req, res, next) {
  // Hello session !
  // res.send(req.session.connect);
  // Si la personne est connectée on affiche la page
  // Si la personne n'est pas connectée on le redirige sur la page de connexion
  if (req.session.connect) {
    res.redirect('/admin');
  }
  else {
    res.render('login',{login:true});
  }

});

router.post('/login', function (req, res, next) {
  // Ici on gère les informations de l'utilisateur

  // Tester si l'utilisateur existe en BDD  -> Comparer le nom (login) / le password
  let login = req.body.login;
  let password = req.body.password;

  connection.query(`select * from user where pseudo= ? and password= ?`, [login, password], function (error, results, fields) {
    if (results.length == 0) {
      res.render('login' ,{message:"Erreur d'identification"});
    } else {
      req.session.connect = true;
      res.redirect("/admin");
    }
  });
});


module.exports = router;