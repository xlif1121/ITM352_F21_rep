/*
Xinfei Li Fall 2021
Modified my Assignment 1  and borrowed code from WODs smartphoneproducts 3,and Prof. Port's screencast
*/

var products =
    [
        {
            "type": "mugs",
            "image": "881.jpg"
        },



        {
            "type": "plate",
            "image": "88.jpg"
        },



        {
            "type": "spoon",
            "image": "notebook.JPG"
        },

        {
            "type": "chopsticks",
            "image": "accessories.JPG"
        }

    ];


var mugs = [

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

var plate = [

    {
        "name": "Sky blue plate",
        "price": 10.00,
        "image": "13.jpg"
    },
    {
        "name": "Deer plate",
        "price": 10.00,
        "image": "26.png"
    },
    {
        "name": "Petal plate",
        "price": 10.00,
        "image": "027.png"
    },
    {
        "name": "Lemon plate",
        "price": 10.00,
        "image": "168.png"
    },
    {
        "name": "Marble plate",
        "price": 10.00,
        "image": "663.jpg"
    }
];
var spoon = [

    {
        "name": "Stainless Steel Spoon(2 pcs)",
        "price": 5.00,
        "image": "711.jpg"
    },
    {
        "name": "Wooden Spoon(4 pcs)",
        "price": 10.00,
        "image": "722.jpg"
    },
    {
        "name": "Ceramic Spoon(4 pcs)",
        "price": 10.00,
        "image": "733.jpg"
    },
    {
        "name": "Japnese Style Spoon(4 pcs)",
        "price": 10.00,
        "image": "744.jpg"
    },
    {
        "name": "Floral Spoon(4 pcs)",
        "price": 10.00,
        "image": "755.jpg"
    }
];

var chopsticks = [

    {
        "name": "Bamboo Chopsticks(2 pcs)",
        "price": 8.00,
        "image": "811.jpg"
    },
    {
        "name": "Line Friends Chopsticks(3 pcs)",
        "price": 15.00,
        "image": "822.jpg"
    },
    {
        "name": "The Cherry Blossom Chopsticks(5 pcs)",
        "price": 10.00,
        "image": "833.jpg"
    },
    {
        "name": "Animal Chopsticks(4 pcs)",
        "price": 13.00,
        "image": "844.jpg"
    },
    {
        "name": "Chinese-Style Chopsticks(5 pcs)",
        "price": 25.00,
        "image": "855.jpg"
    }
];

var allProducts = {
    "mugs": mugs,
    "plate": plate,
    "spoon": spoon,
    "chopsticks": chopsticks
}

if (typeof exports != 'undefined') { // try to exports this file to server.js
    exports.products = products;
}
