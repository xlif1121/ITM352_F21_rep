const { response } = require('express');
var express = require('express');
var app = express();
var myParser = require("body-parser");
// get products.js
var products =require('./public/products');
var querystring = require("querystring");
// Routing 

// monitor all requests
app.all('*', function (request, response, next) {
   console.log(request.method + ' to ' + request.path);
   next();
});

    function isNonNegInt(q, return_errors = false) {
        errors = []; // assume no errors at first
        if (q == '') q = 0; // handle blank inputs as if they are 0
        if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); // Check if string is a number value
        if (q > 100) errors.push('<font color="red">Only 100 in stock</font>');
        if (q < 0) errors.push('<font color="red">Negative value!</font>'); // Check if it is non-negative
        if (parseInt(q) != q) errors.push('<font color="red">Not an integer!</font>'); // Check that it is an integer
        return return_errors ? errors : (errors.length == 0);
    }

    app.use(myParser.urlencoded({ extended: true })); 
// process purchase request (validate quantities, check quantity available)
    app.post("/process_form", function (req, res, next) {
    // check the quantity, if it is not valid, send it to the products display page in order to repurchase
    let POST = req.body;
    var validQu=true;
    var purchased =false;

    for (i = 0; i < products.length; i++) {
        qua = POST['quantity' + i]; 
        if (isNonNegInt(qua) == false) { 
            validQu = false; 
        }
        if (qua> 0) { 
            purchased = true; 
        }
    }
    QString = querystring.stringify(POST); //in order to stringing the query
    if (validQu == true && purchased == true) { 
        res.redirect("./invoice.html?" + QString); // if it is valid, send to invoice
    }else { 
        res.redirect("./products_display.html?" + QString); // if it is incorrect, send to products display html
    }
 });


// route all other GET requests to files in public 
app.use(express.static('./public'));

// start server
app.listen(8080, () => console.log(`listening on port 8080`));