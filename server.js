// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use('/public', express.static(process.cwd() + '/public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/whoami", function (request, response) {
  var startIndex = request.headers['user-agent'].indexOf("(") + 1;
  var lastIndex = request.headers['user-agent'].indexOf(")");
  
  var resObj = {
    'ipadress': request.headers['x-forwarded-for'].split(',')[0],
    'language': request.headers['accept-language'].split(',')[0],
    'software': request.headers['user-agent'].slice(startIndex, lastIndex),
  }
  
  response.json(resObj);
});

app.get("/", function (request, response) {
  response.sendFile(process.cwd() + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
