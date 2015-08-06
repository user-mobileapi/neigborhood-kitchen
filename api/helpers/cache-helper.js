/**
 * Created by chkim on 6/11/2015.
 */

var util = require('util');
function addCache(keyName,objectToCache, req,res){

    var cache= req.a127.resource('myCache');
    console.log('resource in controller'+util.format('%j',cache));

    //if (cache) {
    //    cache.clear(function (err) {
    //        if (err) {
    //            res.status(500).send(err);
    //        }
    //        else {
    //            res.status(200).send('cache successfully cleared');
    //        }
    //    })
    //}
    //
    //else {
    //    cache.set(keyName,objectToCache, function (err,data){
    //        if(err){
    //            console.log('Error while caching' +err)
    //        }
    //        else {
    //            console.log('Cache is set for object');
    //        }
    //    })
    //
    //    res.status(500).send('cache not found');
    //}
}

module.exports  = {
    addCache: addCache
}