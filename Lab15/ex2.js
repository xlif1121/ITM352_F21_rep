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

//add the submitted form data to users_reg_data then saves this updated object to user_data.json using JSON.stringify() 
app.get("/login", function (request, response) {
    //check if already logged in by seeing if the username cookies exists
    var welcome_str = 'Welcome! You need to login.';
        if (typeof request.cookies.username !='undefined'){
        welcome_str = `Welcome ${request.cookies.username}! You logged in last on ${request.session.lastLoginTime}`
        }
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

app.post("/register", function (request, response) {
    username = request.body.username;
    // process a simple register form
    if (typeof users_reg_data[username] == 'undefined' && (request.body.password == request.body.repeat_password)) {
        users_reg_data[username] = {};
        users_reg_data[username].password = request.body.password;
        users_reg_data[username].email = request.body.email;

        fs.writeFileSync('./user_data.json', JSON.stringify(users_reg_data));
        response.redirect('./login');
    } else {
        response.redirect('/register');
    }
});

app.post("/login", function (request, response) {


    // Process login form POST and redirect to logged in page if ok, back to login page if not 
    let login_username = request.body['username'];
    let login_password = request.body['password'];
    // check if username exeist, then check password entered match password stored
    if (typeof users_reg_data[login_username] != 'undefined') {
        // take "password" and check if the password in the textbox is right
        if (users_reg_data[login_username]["password"] == login_password) {
            //Get last login time from session if it exists. If not, create first login

            var lastLoginTime = 'first login!';
            if (typeof request.session.last_login != 'undefined') {
                lastLoginTime = request.session.lastLogin;
            }
            //process login form POST and redirect to logged in page if ok, back to login page if not
            login_username = request.body['username'];
            login_password = request.body['password'];
            console.log(lastLoginTime);
            if (typeof users_reg_data[login_username] != 'undefined') {
                if (users_reg_data[login_username].password == login_password) {
                    request.session.lastLogin = new Date();
                    response.cookie('username', login_username);
                    delete
                    response.send(`${login_username} is logged in. You last logged in on ${lastLoginTime}`);
                    return;
                } else {
                    response.redirect('/login');
                }

            }
        };

        //put login date and time into session
        request.session['last login'] = new Date().toISOString();
        response.send(`You last loggin in on ${last_login}`);
        // if matches, 
        response.send(`${login_username} is loged in`);
    } else {
        // if the password doesn't match,             
        response.redirect(`/login`);
    }
});

app.listen(8080, () => console.log(`listening on port 8080`));