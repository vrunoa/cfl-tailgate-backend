'use strict'
var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

var Parse = require('parse/node').Parse;
Parse.initialize("O42EnlSusAV8acWyShmFdjQywzf93LHLcn3XHX3Q", "iD9gt1OVWdSulRVKiXl1de7NAdYEqvfT2QM40hVJ");

var challenge, currentQuestion = 0;
if(!challenge) {
  var query = new Parse.Query("Question");
  query.find({
    success: function(questions) {
      challenge = {};
      challenge.questions = questions;
    }
  });
}

io.on('connection', function(socket){

  var launchChallenge = function(socket) {
    socket.broadcast.emit("launch");
    setTimeout(function(){
      prepareChallenge(socket);
    }, 10000);
  }

  var prepareChallenge = function(socket){
    socket.broadcast.emit("prepare")
    setTimeout(function(){
      showQuestion(socket)
    }, 3000);
  }

  var showQuestion = function(socket) {
    if(currentQuestion == 4) {
      showFinalResults(socket);
      return;
    }
    var parseQ = challenge.questions[currentQuestion];
    var parseA = parseQ.get("correct_asnwer")

    var question = {
      id: parseQ.id, 
      q: parseQ.get("question"),
      a: parseQ.get("answers"),
      c: parseA.id
    };
    socket.broadcast.emit("show question", question)
    currentQuestion++
    setTimeout(function(){
      finishQuestion(socket)
    }, 10000);
  }

  var finishQuestion = function(socket) {
    socket.broadcast.emit("finish question")
    socket.emit("show results")
    setTimeout(function(){
      if(currentQuestion <= 3) {
        prepareChallenge(socket)
      }else{
        showFinalResults(socket)
      }
    }, 5000)
  }

  var showFinalResults = function(socket) {
    socket.broadcast.emit("finish challenge")
    socket.emit("finish challenge")
    currentQuestion = 0;
  }

  socket.on('launch', function(){
    console.log("launch");
    launchChallenge(socket);
  })
    
})

http.listen(3000, function(){
	console.log("Server running");
});
