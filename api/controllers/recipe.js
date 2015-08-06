/**
 * Created by chkim on 6/6/2015.
 */
var db = require('../../db/recipe-db.js');
var util = require('util');

var cache_helper  = require('../helpers/cache-helper');
function createRecipe(req,res, next){

    // this sends back a JSON response which is a single string
    cache_helper.addCache(req);
    //console.log("name = "+req.swagger.params.body.value.recipeCountry);
    //req.rank= "N/A";
    var resObject = {
        "id": 0,
        "name": "Sour soup2",
        "category": "soup",
        "rank": "NA",
        "recipeCountry": "Cambodia"
    }
    db.createRecipe('recipeId',resObject);
    res.json('Not implemented');
}
module.exports ={
    createRecipe: createRecipe
}