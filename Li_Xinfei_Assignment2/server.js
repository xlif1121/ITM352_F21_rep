//Borrowed from Lab 13
var express = require('express');
var app = express();
var myParser = require("body-parser");
// Professor Port helped me with the code below
// get products.js
var data = require('./public/products.js');
var products = data.products;
//set how many products quantities we have in stock
products.forEach((prod, i) => { prod.inventory = 100; });
var querystring = require("querystring");
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
app.use(myParser.urlencoded({ extended: true }));
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
    // Professor Port helped me with the codes below
    QString = querystring.stringify(POST); //in order to stringing the query
    if (JSON.stringify(errors) === '{}') {
        // remove purchased items from inventory
        for (i = 0; i < products.length; i++) {
            products[i].inventory -= Number(POST['quantity' + i]); // remove quantity for i'th product from inventory 
        }
        res.redirect("./invoice.html?" + QString); // if it is valid, send to invoice
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