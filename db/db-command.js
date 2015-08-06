var redis = require('redis');
var config = require('../config/default.yaml')
var client = redis.createClient(config.db.port,config.db.redisServer);
var extend = require('util')._extend;
var util = require('util');


function createCommand(keyName,req){

    var client = redis.createClient(config.db.port, config.db.redisServer);
    client.on('connect', function (err, reply) {
        if (!err) {

            //get the last object in the row to get the latest recipeId & increment it
            client.get(keyName + '-' + req.id, function (errGet, replyGet) {
                if (!errGet) {
                    var lastId = 0;
                    if (replyGet == null) // first time that has no object in db
                        lastId = 0;
                    else lastId = (JSON.parse(replyGet)).id;
                    //var resource= req.a127.resource('dbCache');
                    //console.log('resource '+resource);
                    client.incr(lastId, function (errIncrement, replyIncrement) {
                        if (!errIncrement) {
                            req.id = replyIncrement;
                            // deep clone req object to return back to response before
                            //var copyRequest= JSON.parse(JSON.stringify(req));

                            client.set(keyName + '-' + req.id, JSON.stringify(req), function (err, reply) {

                                if (!err)
                                {
                                    console.log("create success");


                                }

                                else {

                                    console.log("error while creating the object. more detail: " + err);
                                    return JSON.parse(err);
                                }
                                util.format('Here you are %j',getCommand(keyName,req.id));
                            });

                        }
                        else console.log("error while incrementing the id: " + errIncrement);
                    });
                }
                else   console.log("error while getting the last id : " + errGet);
            });
        }
        else console.log("error while connecting to database. more detail: " + err);
    });
}

function getCommand(keyName,id){
    var client = redis.createClient(config.db.port,config.db.redisServer);
    client.on('connect',function(err, reply)
    {
        if(!err)
        {
            client.get(keyName+'-'+id, function (err1, object)
            {
                if(!err1) return JSON.parse(object);
                else  console.log("error while getting the object. more detail: "+err1);
            });
        }else console.log("error while connecting to database. more detail: "+err);

    });

}


function deleteCommand(keyName,id){
    var client = redis.createClient(config.db.port,config.db.redisServer);
    client.on('connect',function(err, reply){
        if(!err)
        {
            client.exists(keyName + '-' + id,function(err,isKeyExistReply)
                {
                    // if exist
                    if (isKeyExistReply === 1) {
                        client.del(keyName + '-' + id, function (err1, reply)
                        {
                            if (!err1) console.log("Delete successfully");
                            else console.log("error while deleting the object. more detail: " + err);
                        });
                    }
                    else console.log('The object does\'t exist');
                    if (err) console.log("error while deleting the object. more detail: " + err);
                }
            );
        }else console.log("error while connecting to database. more detail: "+err);
    });

}

module.exports = {
    createCommand:createCommand,
    getCommand:getCommand,
    deleteCommand:deleteCommand
}
function test(){
    client.set('id','122');
    client.get('id',function(err,reply){
        console.log('value for id is ='+reply);
    });


    client.hmset('frameworks', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');

    client.hgetall('frameworks', function(err, object) {
        console.log(object);
    });



    client.sadd(['tags', 'angularjs', 'backbonejs', 'emberjs'], function(err, reply) {
        console.log("set= " +reply); // 3
    });

    client.quit();

    //client.set("string key", "string val", redis.print);
    //client.hset("hash key", "hashtest 1", "some value", redis.print);
    //client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
    //client.hkeys("hash key", function (err, replies) {
    //    console.log(replies.length + " replies:");
    //    replies.forEach(function (reply, i) {
    //        console.log("    " + i + ": " + reply);
    //    });
    //    client.quit();
    //});
}