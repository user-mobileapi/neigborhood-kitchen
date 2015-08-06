/**
 * Created by chkim on 6/23/2015.
 */

function getTest(req,res, next){
    var method  = req.swagger.params.method.value;
    res.json(method);
}
module.exports ={
    getTest: getTest
}