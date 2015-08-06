
var command = require ('./db-command.js');
var redis = require('redis');
var config = require('../config/default.yaml')
var client = redis.createClient(config.db.port,config.db.redisServer);


var callback = function (err, data){
    if(err){
        console.log('err');
        return util.format('%j',err);
    }

    else {
        console.log('data');
        util.format('%j,', data);
        return util.format('%j,', data);
    }
}

function createRecipe(keyName,req){

    return command.createCommand(keyName,req);
    //callback('',command.createCommand(keyName,req));
}

function getRecipe(keyName,recipeId){

    return command.getCommand(keyName,recipeId);

}
function deleteRecipe(keyName,recipeId){

    command.deleteCommand(keyName,recipeId);
}

module.exports = {
    createRecipe: createRecipe,
    getRecipe: getRecipe,
    deleteRecipe: deleteRecipe
}


