'use strict';

var a127 = require('a127-magic');
var express = require('express');
var db = require('./db/recipe-db');
var app = express();

var util = require('util');


module.exports = app; // for testing

// initialize a127 framework
a127.init(function(config) {


  // include a127 middleware
  app.use(a127.middleware(config));

  // ui

  app.use(config['a127.magic'].swaggerTools.swaggerUi(config.ui));

  // listen to client at port # and display more info to connect to ui
  var port = config.server.port;
  // begin listening for client requests
  app.listen(port,function(){
    console.log('app ui: http://localhost:' + port + config.ui.swaggerUi);


  });


  var resObject = {
    "id": 0,
    "name": "Source soup2",
    "category": "soup",
    "rank": "NA",
    "recipeCountry": "Cambodia"
  }
   util.format('format : %j',db.createRecipe('recipeId',resObject));

  //var callback  = function(err,data){
  //  if(err)
  //    return console.log(err);
  //  return console.log(data);
  //}
  //
  //var displayObject = function(callback){
  //  var i= 0;
  //
  //  callback('get it?');
  //
  //};
  //
  //displayObject(callback);


  //]db.createRecipe('recipeId',resObject,function(){
  //
  //});
  //console.log(db.getRecipe('recipeId',7));
  //db.deleteRecipe('recipeId',7);


});