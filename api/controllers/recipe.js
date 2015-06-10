/**
 * Created by chkim on 6/6/2015.
 */
var db = require('../../db/recipe-db.js');
function createRecipe(req,res, next){


    // this sends back a JSON response which is a single string

    //console.log("name = "+req.swagger.params.body.value.recipeCountry);
    //req.rank= "N/A";
    var resObject = {
        "id": 0,
        "name": "Source soup2",
        "category": "soup",
        "rank": "NA",
        "recipeCountry": "Cambodia"
    }

    console.log(db.recipe('recipeId',req));
    //b.getRecipe()

    res.json('Not implemented');
}
module.exports ={
    createRecipe: createRecipe
}