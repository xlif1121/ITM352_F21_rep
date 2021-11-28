/*Modified my Assignment 1 server and borrowed code from Lab 14, Prof. Port's screencast*/
//Borrowed from Lab 13
var express = require('express');
var app = express();
var myParser = require("body-parser");
// Professor Port helped me with the code below
// get products.js
var data = require('./public/products.js');
var products = data.products;
//to get the user data.json
var filename = './user_data.json';
var fs = require('fs');
const { request, response } = require('express');
//set how many products quantities we have in stock
products.forEach((prod, i) => { prod.inventory = 100; });
var querystring = require("querystring");

var temp_qty_data; // used to store quantity data from products disiplay page

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


//this process the login form
app.post("/process_login", function (req, res) {
  // Process login form POST and redirect to logged in page if ok, back to login page if not
  var the_username = req.body.username.toLowerCase(); //username in lowercase

  if (typeof user_data[the_username] != 'undefined') { //matching username
    if (user_data[the_username].password == req.body.password) { //if all the info is correct, then redirect to the invoice page
      // Put the stored quanity data into the query
      req.query = temp_qty_data;
      //add username to query to know who's login
      req.query['loginName'] = the_username;
      res.redirect('/invoice.html?' + querystring.stringify(req.query));
      return;

    } else { //if the password has error, push an error
      req.query.username = the_username;
      req.query.LoginError = 'Invalid Password';
    }
  } else { //if the username has error, push an error 
    req.query.LoginError = 'Invalid Username';

  }
  res.redirect('./login.html?' + querystring.stringify(req.query));//redirect to login page
});


//this process the register form
app.post("/process_register", function (req, res) {
  // process a simple register form
  var reg_username = req.body.username.toLowerCase(); //username in lowercase

  // check is username taken
  if (typeof user_data[reg_username] != 'undefined') {
    errors['username_taken'] = `This ${reg_username} username is already registered!`;
  }
  if (req.body.password != req.body.repeat_password) {
    errors['password_mismatch'] = `Repeat password not the same as password!`;
  }
  if (req.body.reg_username == '') {
    errors['no_username'] = `You need to select a username!`;
  }


  // If no errors then save new user and redirect to invoice, otherwise back to registration form and note errors

  username = req.body["username"];
  user_data[username] = {};
  user_data[username]["name"] = req.body['fullname'];
  user_data[username]["password"] = req.body['password'];
  user_data[username]["email"] = req.body['email'];


  fs.writeFileSync(filename, JSON.stringify(user_data), "utf-8");

  // Put the stored quanity data into the query
  req.query = temp_qty_data;
  res.redirect('/invoice.html?' + querystring.stringify(req.query));// if good to go, send the user to invoice page with query string

});



// process purchase request (validate quantities, check quantity available)
app.post("/process_form", function (req, res, next) {
  // check the quantity, if it is not valid, send it to the products display page in order to repurchase
  let POST = req.body;

  var errors = {};
  // assume no quantities from the start, so set no quantities error 
  // Professor Port helped me with the code below
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