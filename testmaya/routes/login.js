var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

/* Connexion utilisateur */
router.post('/connect', function(req, res, next) {
    users= {
        "users" :[
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
        ] 
    };

    var mail = req.query.mail;
    var mdp = req.query.mdp;


    var userFound = users.users.filter(function(user) {
        return user.mail == mail;
    });

    if (userFound.length == 0) {
        res.status(400).send([]);  
    }else{

        bcrypt.compare(mdp, userFound[0].mdp, function(error, response) {
            if(response) {
                res.status(200).send(userFound[0]);
            } else {
                res.status(400).send([]);
            } 
        }); 
        
    }

});

module.exports = router;