var express = require('express');
var router = express.Router();
var jsonQuery = require('json-query');

/* Recherche multi-critère */
router.get('/', function(req, res, next) {
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

    var annonceId = req.query.annonceId;
    var country = req.query.country;
    var city = req.query.city;
    var isBooked = req.query.isBooked;
    
    var query = 'annonces[**]';

    if(annonceId){query += '[*annonceId='+ annonceId +']';}
    if(country){query += '[*country='+ country +']';}
    if(city){query += '[*city='+ city +']';}
    if(isBooked){query += '[*isBooked='+ isBooked +']';}

    var result = jsonQuery(query, {data: annonces}).value;
    
    res.status(200).send(result);

});

module.exports = router;