var express = require("express"),
	http = require("http"),
	_=require("underscore"),
	favicon=require("serve-favicon"),
	bodyParser=require("body-parser"),
	mysql=require("mysql"),
	app=express(),
	cookieParser=require("cookie-parser"),
	session=require("express-session"),
	routes=require("../routes"),
	async=require("async"),
    fs=require("fs"),
    redis=require("redis"),redisClient;

redisClient = redis.createClient();



var dir = __dirname,recordslen=0,k=0;

fs.readFile(dir+'/'+'wordlist.txt','utf8',function(err,data){
if(err) { return console.log(err); }
var arr = data.split('\n');
recordslen=arr.length;
async.each(arr,function(rows,cb){
	k++;
    var objs = rows.split('\t');
    redisClient.set(objs[0],objs[1]);
    //console.log(objs[0]+'='+objs[1]+'--'+k+'=='+recordslen+'\n');
cb();

},function(err){
if(!err) {
	console.log('Write to redis complete');
}
else
{
	console.log('Write to redis failed');
}
	redisClient.end();
	process.exit();
});
});

