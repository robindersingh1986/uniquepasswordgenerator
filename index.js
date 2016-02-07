"use strict"
var express = require("express"),
	http = require("http"),
	_=require("underscore"),
	favicon=require("serve-favicon"),
	bodyParser=require("body-parser"),
	app=express(),
	cookieParser=require("cookie-parser"),
	session=require("express-session"),
	routes=require("./routes"),
	fs=require("fs");

	app.set('port',process.env.PORT || 6868);
	app.set('views','views');
	app.set('view engine','jade');
	app.engine('jade',require('jade').__express);
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(cookieParser("Secret"));
	app.use(session());
	app.use(express.static(__dirname + '/public'));
	app.get('/',routes.index);
	app.get('/getRndNum/:words_len/:num_of_sets/:delimiter',routes.getRndNum);

if(!module.parent) {
	var http = require('http');
	var port = process.env.PORT || 6000;
	var server = http.createServer(app).listen(port,function(err){
		if(err) { return console.error(err); }
		console.log("******* UniquePasswordGenerator ****** running on port : "+port+" Env : "+app.get('env'));
	});
}
module.exports = app;