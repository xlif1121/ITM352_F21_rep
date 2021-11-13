const { response } = require('express');
var express = require('express');
var app = express();

// Routing 

// monitor all requests
app.all('*', function (request, response, next) {
   console.log(request.method + ' to ' + request.path);
   next();
});

// process purchase request (validate quantities, check quantity available)
app.get('./public/invoice.html', function (req, res, next) {

    function isNonNegInt(q, return_errors = false) {
        errors = []; // assume no errors at first
        if (q == '') q = 0; // handle blank inputs as if they are 0
        if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); // Check if string is a number value
        if (q > 100) errors.push('<font color="red">Only 100 in stock</font>');
        if (q < 0) errors.push('<font color="red">Negative value!</font>'); // Check if it is non-negative
        if (parseInt(q) != q) errors.push('<font color="red">Not an integer!</font>'); // Check that it is an integer
        return return_errors ? errors : (errors.length == 0);
    }

    data = require('./public/product.js');
    products = data.products;
});

// route all other GET requests to files in public 
app.use(express.static('./public'));

// start server
var listener = app.listen(8080, () => { console.log('server started listening on port ' + listener.address().port) });