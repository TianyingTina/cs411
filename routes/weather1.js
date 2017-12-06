/**
 * Created by wangdayuan on 12/2/17.
 */
const express = require('express')
const router = express.Router();

var weather = require('weather-js');

router.get('/:location', function(req,res, next){
    let searchkey = req.params.location;
    weather.find({ search: searchkey, degreeType:'F'}, function(err, result){
        if(err) console.log(err)
        console.log(JSON.stringify(result, null, 2));
        res.send(JSON.stringify(result, null, 2))
    })
})


module.exports = router;