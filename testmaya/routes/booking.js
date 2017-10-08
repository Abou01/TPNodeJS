var express = require('express');
var router = express.Router();
var jsonQuery = require('json-query');
var mailrequest = require('request');

/* Bookings */
router.post('/', function(req, res, next) {

    bookings = {
        "bookings":[
            {
                "annonceId" : "1",
                "userId" : "1"
            },
            {
                "annonceId" : "4",
                "userId" : "2"
            }
        ]
    };

    currentUsers= {
        "id" : "1",
        "lastname" : "DUKURAY",
        "firstname" : "Aboulaye",
        "mail" : "abou@gmail.com",
        //123456
        "mdp" : "$2a$10$MwokeL22j8pcsuAIR6cco.sd8U42BXDlS2uIrSzcqgy/ru1KEqVoG"
    };
    
    var annonceId = req.query.annonceId;
    var result = getAnnonceByID(annonceId);

    if(result){
        console.log("isbooked: " + result.isBooked);
        if(result.isBooked){
            res.status(400).send("L'annonce à déja été réservé par un autre utilisateur.");
        }else{
            
            newBooking = {
                "annonceId" : annonceId,
                "userId" : currentUsers.id
            };

            bookings.bookings.push(newBooking);

            result.isBooked = true;
            console.log(bookings);
            console.log(result);

            testResponse = {
                "mail":[
                ],
                "bookings":[
                ],
                "annonce":[
                ]
            };
            testResponse.bookings.push(bookings.bookings);
            testResponse.annonce.push(result);
            
            sendConfirmationMail(currentUsers.mail);

            testResponse.mail.push("L'url de preview de la simulation du mail (ethereal) est dans la console.");

            res.status(201).send(testResponse);
        }
    }else{
        res.status(404).send("Cette annonce n'existe pas");
    }

});

function sendConfirmationMail(to){
    to = to;
    subject = "Confirmation";
    text = "Bonjour, \nNous vous confirmons votre réservervation. \nCordialement.";
    var MailResponse = {};

    mailrequest.post('http://localhost:8000/mail/send?subject='+ subject +'&to='+ to +'&body='+ text, function (error, response, body) {
          
        if (!error && response.statusCode == 200) {
            console.log("Mail response :");
            console.log(body);
        }
    });

}

function getAnnonceByID(annonceId) {

    annonces= {
        "annonces" :[
            {
                "annonceId" : "1",
                "country" : "France",
                "city" : "Paris",
                "address" : "334 Rue Saint Honoré, 75001 Paris",
                "isBooked" : true
            },
            {
                "annonceId" : "2",
                "country" : "France",
                "city" : "lyon",
                "address" : "16 Rue Antoine Salles",
                "isBooked" : false
            },
            {
                "annonceId" : "3",
                "country" : "England",
                "city" : "Manchester",
                "address" : "98 King St",
                "isBooked" : false
            },
            {
                "annonceId" : "4",
                "country" : "England",
                "city" : "London",
                "address" : "2 Spring Gardens",
                "isBooked" : true
            },
            {
                "annonceId" : "5",
                "country" : "France",
                "city" : "Paris",
                "address" : "13 Rue Riblette, 75020 Paris",
                "isBooked" : false
            }
        ] 
    };
    var result = jsonQuery('annonces[**][*annonceId='+ annonceId +']', {data: annonces}).value;

    return result[0];
}

module.exports = router;