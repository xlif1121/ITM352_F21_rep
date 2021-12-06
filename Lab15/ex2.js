var express = require('express');
var app = express();

// var userdata = require('./user_data.json');
var fs = require('fs');

var filename = './user_data.json';

//var cookieParser = require('cookie-parser');
//app.use(cookieParser());
var session = require('express-session');

app.use(session({ secret: "MySecretKey", resave: true, saveUninitialized: true }));

app.get('/set_cookie', function (request, response) {
    // this will send a cookie to the requester
    response.cookie('name', 'Xinfei', { maxAge: 15 * 1000 });
    response.send('The name cookie has been sent')
});

app.get('/use_cookie', function (request, response) {
    // this will get the name cookie from the requester respond with message
    console.log(request.cookies);
    response.send(`Welcome to the Use Cookie page ${request.cookies.name}`);
});


// no need set session, its automatic
app.get('/use_session', function (request, response) {
    // this will get the name cookie from the requester respond with message
    //console.log(request.cookies);
    response.send(`welcome, your session ID is ${request.session.id}`);
});

if (fs.existsSync(filename)) {
    var stats = fs.statSync(filename);
    console.log(filename + ' has ' + stats["size"] + ' characters');
    // have reg data file, so read data and parse into user_data.json
    let data_str = fs.readFileSync(filename, 'utf-8');
    // or use require:
    // var user_data = require(filename); 
    var user_data = JSON.parse(data_str);
} else {
    console.log(filename + ' does not exist!');
}


app.get("/", function (request, response) {
    response.send('nothing here')
});

// strikethrough = myParser is depreciated, so replace with express
app.use(express.urlencoded({ extended: true }));

app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
        <body>
        <form action="" method="POST">
        <input type="text" name="username" size="40" placeholder="enter username" ><br />
        <input type="password" name="password" size="40" placeholder="enter password"><br />
        <input type="submit" value="Submit" id="submit">
        </form>
        </body>
    `;
    response.send(str);
});

app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
        <body>
        <form action="" method="POST">
        <input type="text" name="username" size="40" placeholder="enter username" ><br />
        <input type="password" name="password" size="40" placeholder="enter password"><br />
        <input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
        <input type="email" name="email" size="40" placeholder="enter email"><br />
        <input type="submit" value="Submit" id="submit">
        </form>
        </body>
    `;
    response.send(str);
});

app.post("/register", function (request, response) {
    // process a simple register form
});

app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    let login_username = request.body['username'] // check if username exists, then check password entered matches password stored
    let login_password = request.body['password']
    if (typeof user_data[login_username] != 'undefined') {
        if (user_data[login_username]["password"] == login_password) { // getting the stored password and matching against login_password
            if (typeof request.session['last login'] != 'undefined') {
                var last_login = request.session['last login'];

            } else {
                //request.session['last login'] = 'first time logging in';
                var last_login = 'first login';
            }
            request.session(['last login'] = new Date()).toISOString() // put login data into session
            response.send(`your last loggin is on ${last_login} is logged in`);
        } else {
            response.redirect('/login');
        }
    }
});

app.listen(8080, () => console.log(`listening on port 8080`));