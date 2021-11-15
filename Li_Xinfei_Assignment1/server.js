var express = require('express');
var app = express();
var myParser = require("body-parser");
// get products.js
var data =require('./public/products.js');
var products = data.products;
//set how many products quantities we have in stock
products.forEach( (prod, i) => {prod.inventory = 100;});

var querystring = require("querystring");
// Routing 

// monitor all requests
app.all('*', function (request, response, next) {
   console.log(request.method + ' to ' + request.path);
   next();
});
app.get('/products.js', function (request, response, next) {
    response.type('.js');
   var products_str = `var products = ${JSON.stringify(products)};`;
   response.send(products_str);
 });

    function isNonNegInt(q, return_errors = false) {
        errors = []; // assume no errors at first
        if (q == '') q = 0; // handle blank inputs as if they are 0
        if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); // Check if string is a number value
        if (q < 0) errors.push('<font color="red">Negative value!</font>'); // Check if it is non-negative
        if (parseInt(q) != q) errors.push('<font color="red">Not an integer!</font>'); // Check that it is an integer
        return return_errors ? errors : (errors.length == 0);
    }

    app.use(myParser.urlencoded({ extended: true })); 
// process purchase request (validate quantities, check quantity available)
    app.post("/process_form", function (req, res, next) {
    // check the quantity, if it is not valid, send it to the products display page in order to repurchase
    let POST = req.body;

    var errors = {};
    // assume no quantities from the start, so set no quantities error 
    errors['no_quantities'] = 'Please enter some quantities'; 

    for (i = 0; i < products.length; i++) {
        qua = POST['quantity' + i]; 
        if (isNonNegInt(qua) == false) { 
            errors['quantity' + i] = `Please enter valid quantities for ${products[i].name}`; 
        }
        // if we have quantities, unset the error, and remove from inventory
        if (qua > 0) { 
            delete errors['no_quantities'];
            // check if quanty wanbted is available in inventory 
            if(qua > products[i].inventory) {
                errors['inventory' + i] = `${qua} of ${products[i].name} not available. Only ${products[i].inventory} available.`; 
            } 
        }
    }

    QString = querystring.stringify(POST); //in order to stringing the query
    if (JSON.stringify(errors) === '{}') { 
        // remove purchased items from inventory
        for (i = 0; i < products.length; i++)  {
            products[i].inventory -= Number(POST['quantity' + i]); // remove quantity for i'th product from inventory 
        }
        res.redirect("./invoice.html?" + QString); // if it is valid, send to invoice
    } else { 
        let errObj = {'error': JSON.stringify(errors)};
        QString += '&' + querystring.stringify(errObj);
        res.redirect("./products_display.html?" + QString); // if it is incorrect, send to products display html
    }
 });


// route all other GET requests to files in public 
app.use(express.static('./public'));

// start server
app.listen(8080, () => console.log(`listening on port 8080`));