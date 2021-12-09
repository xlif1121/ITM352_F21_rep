/*Modified my Assignment 1 server and borrowed code from w3resource, and W3school, Lab 14, assignment 2 code examples ,and Prof. Port's screencast*/
//Borrowed from Lab 13
var express = require('express');
var app = express();
var myParser = require("body-parser");
// Professor Port helped me with the code below
// get products.js
var data = require('./public/products.js');
var products = data.products;
// loads starts up fs system actions
var fs = require('fs');
//set filename equal to user data.json
var filename = './user_data.json';
//set how many products quantities we have in stock
products.forEach((prod, i) => { prod.inventory = 100; });
var querystring = require("querystring");
// used to store quantity data from products disiplay page
var temp_qty_data = {};

// Routing 

// monitor all requests
//Borrowed from Lab 13
app.all('*', function (request, response, next) {
  console.log(request.method + ' to ' + request.path);
  next();
});
// Professor Port helped me with this code
// Use GET to (get)convert my products.js file
app.get('/products.js', function (request, response, next) {
  response.type('.js');
  var products_str = `var products = ${JSON.stringify(products)};`;
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
//this process the login form
app.post("/process_login", function (req, res) {
  // Process login form POST and redirect to logged in page if ok, back to login page if not
  var the_username = req.body.username.toLowerCase(); //username in lowercase

  if (typeof user_data[the_username] != 'undefined') { //matching username
    if (user_data[the_username].password == req.body.password) { //if all the info is correct, then redirect to the invoice page
      // Put the stored quanity data into the query
      //add username to query to know who's login
      //to get the username and email from the informaation that user entered, and store it in the temp_qty_data
      temp_qty_data['username'] = the_username;
      temp_qty_data['email'] = user_data[the_username].email;
      let params = new URLSearchParams(temp_qty_data); //put the temp_qty_data inside the params
      res.redirect('/invoice.html?' + params.toString());//if good to go, send to invoice page with the username and email to the string
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

  var errors = {};
  // assume no quantities from the start, so set no quantities error 
  // Professor Port helped me with the code below
  //if user enter empty quantities, show this text
  errors['no_quantities'] = 'Please enter some quantities';

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
  QString = querystring.stringify(POST); //in order to stringing the query
  if (JSON.stringify(errors) === '{}') {
    // remove purchased items from inventory
    for (i = 0; i < products.length; i++) {
      products[i].inventory -= Number(POST['quantity' + i]); // remove quantity for i'th product from inventory 
    }
    // keep the quanity data on server until needed for invoice
    temp_qty_data = req.body;
    res.redirect("./login.html?" + `    `); // if it is valid, send to login page
  } else {
    let errObj = { 'error': JSON.stringify(errors) }; // show what is the errors
    QString += '&' + querystring.stringify(errObj);
    res.redirect("./products_display.html?" + QString); // if it is incorrect, send to products display html
  }
});


// route all other GET requests to files in public 
app.use(express.static('./public'));

// start server
app.listen(8080, () => console.log(`listening on port 8080`));