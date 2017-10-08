var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

/* MaJ d'un profile */
router.patch('/update', function(req, res, next) {
  var users= 
  [
    {
      "id" : "1",
      "lastname" : "DUKURAY",
      "firstname" : "Aboulaye",
      "mail" : "abou@gmail.com",
      //123456
      "mdp" : "$2a$10$MwokeL22j8pcsuAIR6cco.sd8U42BXDlS2uIrSzcqgy/ru1KEqVoG"
    },
    {
        "id" : "2",
        "lastname" : "DJIMERA",
        "firstname" : "Cheikhou",
        "mail" : "djim@gmail.com",
        //12345
        "mdp" : "$2a$10$E3TjatWjAgPv4m3KiegaUuOn1a2p.XRLGQsrXJ5v7JX2Yf7iy0Tnm"
    }
  ];

  var user = users.filter(function (anUser) {
      return anUser.id === req.query.id;
  });

  if(user.length > 0){
    user = user[0];

    if(req.query.firstname)
        user.firstname = req.query.firstname;
    if(req.query.lastname)
        user.lastname = req.query.lastname;
    if(req.query.mail)
      user.mail = req.query.mail;
    if(req.query.mdp)
    {
      user.mdp = bcrypt.hashSync(req.query.mdp, 10);
    }

    res.status(200).send(user);
  }
  else{
      res.status(400).send("Requête invalide !");
  }
});

module.exports = router;
