/*Xinfei Li Fall 2021*/
/*Modified my Assignment 1 server and borrowed code from w3resource, and W3school, Lab 14, assignment 2 code examples,
assignment 3 code examples and Prof. Port's screencast*/
//Borrowed from Lab 13
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//var myParser = require("body-parser");
// Professor Port helped me with the code below
// get products.js
var data = require('./products.js');
var allProducts = data.allProducts;
// loads starts up fs system actions
var fs = require('fs');
//set filename equal to user data.json
var filename = './user_data.json';
var querystring = require("querystring");
// used to store quantity data from products disiplay page
var temp_qty_data = {};
var session = require('express-session');
const { request } = require('express');
app.use(session({ secret: "MySecretKey", resave: true, saveUninitialized: true }));
// Routing 

// monitor all requests
//Borrowed from Lab 13
app.all('*', function (request, response, next) {
  console.log(request.method + ' to ' + request.path);
  next();
});


//app.post("/get_products_data", function (request, response) {
//response.json(data);
//});

//To set up shopping cart---incomplete
app.get("/add_to_cart", function (request, response) {
  var product_key = request.query['prod_key']; // get the product key sent from the form post
  var quantities = request.query['quantities'].map(Number); // Get quantities from the form post and convert strings from form post to numbers
  request.session.cart[product_key] = quantities; // store the quantities array in the session cart object with the same products_key. 
  response.redirect('./cart.html');
});

//microservice return the shopping cart data from current session
app.post("/get_cart", function (req, res) {
  if (typeof req.session.cart == 'undefined') {
    req.session.cart = {};
  }
  res.json(req.session.cart);
});

//to checkout the items in cart

//app.get("/confirm", function (request, response) {}

// send user to the invoice.html if they login

//send them to the login.html if they is not login


// Professor Port helped me with this code
// Use GET to (get)convert my products.js file
app.get('/products.js', function (request, response, next) {
  response.type('.js');
  var products_str = `var allProducts = ${JSON.stringify(allProducts)};`;
  response.send(products_str);
});


// Borrowed and modified from Lab 12 order_page.html
function isNonNegInt(q, return_errors = false) {
  errors = []; // assume no errors at first
  if (q == '') q = 0; // handle blank inputs as if they are 0
  if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); // Check if string is a number value
  if (q < 0) errors.push('<font color="red">Negative value!</font>'); // Check if it is non-negative
  if (parseInt(q) != q) errors.push('<font color="red">Not an integer!</font>'); // Check that it is an integer
  return return_errors ? errors : (errors.length == 0);
}
//Borrowed and modified from Lab 13
app.use(express.urlencoded({ extended: true }));
// borrowed from Lab 14 
//check if the file already exists in the given path or not
if (fs.existsSync(filename)) {
  var data = fs.readFileSync(filename, 'utf-8');
  var user_data = JSON.parse(data);
  //if the file does not exists, the console willl show the nme of the file, and tell the file is not exist.
} else {
  console.log(`${filename} does not exist!`);
}


// -------------- Login -------------------- //
app.get('/login.html', function (req, res, next) {
  // save reffering page, unless it's login.html
  if(!req.header('Referrer').includes('login.html')) { 
    req.session.login_refferer =  req.header('Referrer');
  }
  next();
});

//this process the login form
app.post("/process_login", function (req, res) {
  // Process login form POST and redirect to logged in page if ok, back to login page if not
  var the_username = req.body.username.toLowerCase(); //username in lowercase

  if (typeof user_data[the_username] != 'undefined') { //matching username
    if (user_data[the_username].password == req.body.password) { //if all the info is correct, then redirect to the referer paage
      // send the user a login cookies, and expire after 10 mins
      res.cookie('login',the_username,{maxAge: 10*60*1000});
      res.redirect(req.session.login_refferer);//if good to go, send to invoice page with the username and email to the string
      return;

    } else { //if the password has error, push an error
      req.query.username = the_username;
      req.query.LoginError = 'Invalid Password';
    }
  } else { //if the username has error, push an error 
    req.query.LoginError = 'Invalid Username';

  }
  params = new URLSearchParams(req.query);
  res.redirect('./login.html?' + params.toString());//redirect to login page if there is a error
});


//-------------Logout------------//
//app.get("/logout", function (req, res, next) {
 // response.clearCookie("");
//});


//-------------Password Encryption------------//

  //loop through the passwords and save the new password as encrypted
 

// -------------- Register --------------------//
//to make sure the user put in valid information
app.post("/process_register", function (req, res) {
  console.log(req.body);
  // assume no register errors from the start, so set no register errors 
  var reg_errors = {};

  var reg_username = req.body.username.toLowerCase(); //register username in lowercase

  // -------------- Full name validation -------------- //
  if (/^[A-Za-z, ]+$/.test(req.body.fullname)) { //check if the fullname is correct
  }
  else {
    reg_errors['fullname'] = 'Only Letters allowed for Full Name (Ex. Alex Smith)';// if there is a error, show this
  }

  if (req.body.fullname.length > 30 && req.body.fullname.length < 1) { //check if the length is less than 1 or greater than 30
    reg_errors['fullname'] = 'Fullname must contain Maximum 30 Characters';// if enter invalid length, put wrong
  }

  // -------------- Username validation -------------- //
  if (req.body.username.length > 10 || req.body.username.length < 4) { //check if the length of username is less than 4 or greater than 10
    reg_errors['username'] = 'Minimum of 4 characters and maximum of 10 characters';// if enter invalid length, put wrong
  }

  if (typeof user_data[reg_username] != 'undefined') { //check if the username is taken or not
    reg_errors['username'] = 'This username is already registered!';//if the username is taken, show this
  }


  if (typeof user_data[reg_username] == '') { //check if the username is empty or not
    reg_errors['username'] = 'You need a username!'; // if invalid, show this
  }

  if (/^[0-9a-zA-Z]+$/.test(req.body.username)) {//username only letter and number
  }
  else {
    reg_errors['username'] = 'Username is Letters and Numbers Only (Ex. Abc123)';//if the user enter a wrong username, show this
  }

  // -------------- Email validation -------------- //
  // Setup email limitations (from w3resource https://www.w3resource.com/javascript/form/email-validation.php)
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.body.email)) {// Email only allows certain character for x@y.z
  }
  else {
    reg_errors['email'] = 'Must enter a valid email (Ex. username@mailserver.domain).';//otherwise, show this to the user
  }

  // -------------- Password validation -------------- //
  if (req.body.password.length < 6) {//password length need to be 6 characters or more
    reg_errors['password'] = 'Minimum: 6 Characters';// otherwise, show this
  }

  // -------------- Repeat Password validation -------------- //
  if (req.body.password !== req.body.repeat_password) {  // check if the repeat password is matching password
    reg_errors['repeat_password'] = 'Repeat password not the same as password!';// if not, show this
  }

  // If no errors then save new user and redirect to invoice, otherwise back to registration form and note errors
  if (Object.keys(reg_errors).length == 0) {
    //If user enterd valid information, then save and store in JSON file 
    console.log('no errors')
    var username = req.body['username'].toLowerCase();
    user_data[username] = {};
    user_data[username]["name"] = req.body['fullname'];
    user_data[username]["password"] = req.body['password'];
    user_data[username]["email"] = req.body['email'];

    fs.writeFileSync(filename, JSON.stringify(user_data), "utf-8");
    // Put the stored quanitiy data into the temp_qty_data
    //get the username and email from the register information
    temp_qty_data['username'] = username;
    temp_qty_data['email'] = user_data[username]["email"];
    let params = new URLSearchParams(temp_qty_data);
    res.redirect('/invoice.html?' + params.toString());// if good to go, send the user to invoice page with query string
  }

  //if error occurs, redirect to register page
  else {
    req.body['reg_errors'] = JSON.stringify(reg_errors);
    let params = new URLSearchParams(req.body);
    res.redirect('register.html?' + params.toString());
  }
});


// -------------- Purchase ----------------- //
// process purchase request (validate quantities, check quantity available)
app.post("/process_form", function (req, res, next) {
  // check the quantity, if it is not valid, send it to the products display page in order to repurchase

  let POST = req.body;

  var product_key = POST["prods_key"];

  var errors = {};
  // assume no quantities from the start, so set no quantities error 
  // Professor Port helped me with the code below
  //if user enter empty quantities, show this text
  errors['no_quantities'] = 'Please enter some quantities';
  products = allProducts[product_key];
  for (i = 0; i < products.length; i++) {
    qua = POST['quantity' + i];
    if (isNonNegInt(qua) == false) { //if the quantity is false, send a alert tht show the error
      errors['quantity' + i] = `Please enter valid quantities for ${products[i].name}`; //it will pop out a alert to warn the user 
    }
    // if we have quantities, unset the error, and remove from inventory
    if (qua > 0) {
      delete errors['no_quantities'];
      // check if quanty wanbted is available in inventory 
      if (qua > products[i].inventory) {
        errors['inventory' + i] = `${qua} of ${products[i].name} not available. Only ${products[i].inventory} available.`;
      }
    }
  }
  // If there are no errors, remove quantities from inventory and redirect to login
  // Professor Port helped me with the codes below

  if (JSON.stringify(errors) === '{}') {
    // keep the quanity data in the sesssion 
    if (typeof req.session.cart == 'undefined') {
      req.session.cart = {};
    }
    req.session.cart[product_key] = req.body;
    console.log(req.session.cart);
    res.redirect(`./cart.html?`); // if it is valid, send to login page
  } else {
    let params = new URLSearchParams(POST);
    params.append('errors', JSON.stringify(errors));
    params.append('prod_key', product_key);

    res.redirect("./products_display.html?" + params.toString()); // if it is incorrect, send to products display html
  }
});

app.post("/confirm", function (req, res) {
console.log(req.cookies);
  // if user not logged in, send them to login
  if(typeof req.cookies["login"] == 'undefined') {
    res.redirect(`./login.html`);
    return;
  }

  // check if quanties in cart are still available. If not, send them back to cart to update.
  //  Othwrwise  remove from inventory, email invoice, and  go to invoice

  var errors = {};
  if (JSON.stringify(errors) === '{}') {
    // remove quantities in cart from inventory


    // email invoice to user
    let username = req.cookies["login"];


    
    // send to invoice.html
    let params = new URLSearchParams();
    params.append('username',username);
    params.append('email', user_data[username].email);
    res.redirect(`./invoice.html?${params.toString()}`);
  } else {
    res.redirect(`./cart.html`);
  }
});




//Creating an 0invoice to both print and email--from as3 code examples---incomplete
//app.get("/checkout", function (request, response) {
  // Generate HTML invoice string

  // Set up mail server. Only will work on UH Network due to security restrictions


// route all other GET requests to files in public 
app.use(express.static('./public'));

// start server
app.listen(8080, () => console.log(`listening on port 8080`));