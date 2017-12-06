/**
 * Created by tianyingzhang on 10/24/17.
 */
const express = require('express');
const router = express.Router();

const request = require("request");

let clientId = require('../config/yelp').clientId
let clientSecret = require('../config/yelp').clientSecret
//let clientId = 'O5oe5_YFjvUmjIONuChAlA';
//let clientSecret = 'L13J6OpSFFg4EpxlBU5xnXnrqWydCB7BgHhukz7RGp8zuCpmH7J6AM8rDGFWURcV';
'use strict';

const yelp = require('yelp-fusion');
router.get('/:location', function(req, res, next) {
    let searchkey = req.params.location;
    yelp.accessToken(clientId, clientSecret).then(response => {
        const client = yelp.client(response.jsonBody.access_token);

        client.search({
            //term: 'Four Barrel Coffee',
            location: searchkey
        }).then(response => {
            var result = response.jsonBody.businesses.slice(0,10)
            console.log(result);
            res.json(result)
        });
    }).catch(e => {
        console.log(e);
    });
})

module.exports = router;


