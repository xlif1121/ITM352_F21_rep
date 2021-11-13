//express takes querystring and turns into an obj
var express = require('express');
var app = express();

app.use(myParser.urlencoded({ extended: true }));

app.post('/process_form', function (request, response, next) {
    //server can't get order_page.html because it's not programmed to do that
    //this server has no route to give me that file
    response.send('in POST /test' + JSON.stringify(request.body));
    next();
});

//any request
app.all('*', function (request, response, next) {
    //server can't get order_page.html because it's not programmed to do that
    //this server has no route to give me that file
    console.log(request.method + ' to path ' + request.path + ' query string ' + JSON.stringify(request.query));
    /* respond.end(); //"called and hung up the phone" */
    next(); //pass it onto the next thing
});

//go into public directory and look for the path, get the file, then send it back -- based on extension

app.use(express.static('./public'));

//route to a get (it HAS to be lowercase; method of the express)
//always begin with slash because that's the beginnning of path



//sudo npm install express -g to install
//then run node info_server_Ex2a.js
