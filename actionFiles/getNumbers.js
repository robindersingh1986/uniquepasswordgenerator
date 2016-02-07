var express = require("express"),
	http = require("http"),
	_=require("underscore"),
	favicon=require("serve-favicon"),
	bodyParser=require("body-parser"),
	app=express(),
	cookieParser=require("cookie-parser"),
	session=require("express-session"),
	routes=require("../routes"),
	async=require("async"),
    fs=require("fs"),
    redis=require("redis"),redisClient;

var num_of_sets_len=[],onepassphraslen=[];words_len=[],i=1,j=1,words_arr='',oneword_arr='',digits=5,pp='',dig_arr=[];
onepassphraslen.push(1,2,3,4,5);
redisClient = redis.createClient();

var getNumbers = function(req,res,fn){

    var delim = req.params.delimiter;
    if(delim=='space') { delim=' '; }
    var num_of_sets = req.params.num_of_sets;
    while(j<=num_of_sets) { num_of_sets_len.push(i); j++; }
    while(i<=req.params.words_len) { words_len.push(i); i++; }

    if(words_len.length == req.params.words_len) // && num_of_sets_len.length == num_of_sets)
    { 
                words_arr='';
                console.log("start reading numbers from anu \n ");
                async.eachSeries(words_len, function(num,internal_fn1){
                    var times=5;
                    async.eachLimit(onepassphraslen,5, function(pplen,internal_fn2){
                    var base = 'http://qrng.anu.edu.au/form_handler.php?numofsets=1&min_num=1&max_num=6&repeats=yes&num_per_set=1';
                    http.get(base , function (res) {
                        var body = '';
                        res.on('error', function (err) {
                          if(err) { console.log(new Error(err)); }
                          });
                        
                        res.on('data', function (chunk) {
                          body+=chunk;
                        });
                        
                        res.on('end', function () {
                            var numbers = body.split('<');
                            var gen_num=''; gen_num.replace('','/s');
                            _.each(numbers,function(nums){
                                var thenum = nums.split(':');
                                var gen_num = thenum[1];
                                if(gen_num != null  && gen_num!='' && gen_num>0) { dig_arr.push(gen_num); }
                            });
                        internal_fn2();                          
                        })
                    });
                    },
                    function(err){  
                        if(!err) { 
                                    console.log('number : ', JSON.stringify(dig_arr)); var pentanum='';
                                    _.each(dig_arr,function(item){ pentanum = pentanum+item; })
                                    pentanum=pentanum.replace(/\s/g, '');
                                    console.log(pentanum);
                                    redisClient.get(pentanum, function (err, rep) {
                                        if(err) { console.log(err); }
                                        var reply = rep.replace(/(\r\n|\n|\r)/gm,"");
                                        console.log(reply);
                                        if(words_arr==''){ words_arr = reply; } else { words_arr=words_arr+delim+reply; }
                                        oneword_arr=''; 
                                        console.log(' internal_fn1 called -- one number/word created');
                                        dig_arr=[]; pentanum='';
                                        internal_fn1(); 
                                    });
                            }
                    });
                },
                function(err){  
                    if(!err) { 
                                console.log(' internal_fn called -- one set created');
                                fn(null,words_arr); 
                              }
                });
    }
}

exports.getNumbers = getNumbers;