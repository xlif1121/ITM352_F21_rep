/*Xinfei Li Fall 2021*/ 
/*Modified my Assignment 1  and borrowed code from WODs smartphoneproducts 3,and Prof. Port's screencast*/

var products =
    [
        {
            "name": "Lamb mugs",
            "price": 20.00,
            "image": "333.jpg"
        },
        {
            "name": "Panda mugs",
            "price": 18.00,
            "image": "444.jpg"
        },
        {
            "name": "Blue sky mugs",
            "price": 30.00,
            "image": "555.jpg"
        },
        {
            "name": "Duck mugs",
            "price": 25.00,
            "image": "222.jpg"
        },
        {
            "name": "Splash-ink mug",
            "price": 30.00,
            "image": "777.jpg"
        }
    ];

if (typeof exports != 'undefined') { // try to exports this file to server.js
    exports.products = products;
}
