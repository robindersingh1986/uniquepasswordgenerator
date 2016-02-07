"use strict"

var path = require('path'),
	fs = require('fs'),
	getNumbers = require('../actionFiles/getNumbers');


exports.index = function(req,res) {
		res.render('index', { title : 'UniquePasswordGenerator' } );
}	


exports.getRndNum = function(req,res) {
	getNumbers.getNumbers(req,res,function(err,data){
		res.send(data);
	});
}	