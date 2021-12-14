/*
Xinfei Li Fall 2021
Modified my Assignment 2  and borrowed code from WODs smartphoneproducts 3, as3 example code, and Prof. Port's screencast
*/

var products =
    [
        {
            "type": "mugs",
            "image": "881.jpg", "inventory": 100
        },



        {
            "type": "plate",
            "image": "88.jpg", "inventory": 100
        },



        {
            "type": "spoon",
            "image": "notebook.JPG", "inventory": 100
        },

        {
            "type": "chopsticks",
            "image": "accessories.JPG", "inventory": 100
        }

    ];


var mugs = [

    {
        "name": "Lamb mugs",
        "price": 20.00,
        "image": "333.jpg", "inventory": 100
    },
    {
        "name": "Panda mugs",
        "price": 18.00,
        "image": "444.jpg", "inventory": 100
    },
    {
        "name": "Blue sky mugs",
        "price": 30.00,
        "image": "555.jpg", "inventory": 100
    },
    {
        "name": "Duck mugs",
        "price": 25.00,
        "image": "222.jpg", "inventory": 100
    },
    {
        "name": "Splash-ink mug",
        "price": 30.00,
        "image": "777.jpg", "inventory": 100
    }
];

var plate = [

    {
        "name": "Sky blue plate",
        "price": 10.00,
        "image": "13.jpg", "inventory": 100
    },
    {
        "name": "Deer plate",
        "price": 10.00,
        "image": "26.png", "inventory": 100
    },
    {
        "name": "Petal plate",
        "price": 10.00,
        "image": "027.png", "inventory": 100
    },
    {
        "name": "Lemon plate",
        "price": 10.00,
        "image": "168.png", "inventory": 100
    },
    {
        "name": "Marble plate",
        "price": 10.00,
        "image": "663.jpg", "inventory": 100
    }
];
var spoon = [

    {
        "name": "Stainless Steel(2 pcs)",
        "price": 5.00,
        "image": "711.jpg", "inventory": 100
    },
    {
        "name": "Wooden Spoon(4 pcs)",
        "price": 10.00,
        "image": "722.jpg", "inventory": 100
    },
    {
        "name": "Ceramic Spoon(4 pcs)",
        "price": 10.00,
        "image": "733.jpg", "inventory": 100
    },
    {
        "name": "Japnese Style Spoon(4 pcs)",
        "price": 10.00,
        "image": "744.jpg", "inventory": 100
    },
    {
        "name": "Floral Spoon(4 pcs)",
        "price": 10.00,
        "image": "755.jpg", "inventory": 100
    }
];

var chopsticks = [

    {
        "name": "Bamboo(2 pcs)",
        "price": 8.00,
        "image": "811.jpg", "inventory": 100
    },
    {
        "name": "Line Friends(3 pcs)",
        "price": 15.00,
        "image": "822.jpg", "inventory": 100
    },
    {
        "name": "The Cherry Blossom(5 pcs)",
        "price": 10.00,
        "image": "833.jpg", "inventory": 100
    },
    {
        "name": "Animal(4 pcs)",
        "price": 13.00,
        "image": "844.jpg", "inventory": 100
    },
    {
        "name": "Chinese-Style(5 pcs)",
        "price": 25.00,
        "image": "855.jpg", "inventory": 100
    }
];

var allProducts = {
    "mugs": mugs,
    "plate": plate,
    "spoon": spoon,
    "chopsticks": chopsticks
}

if (typeof exports != 'undefined') { // try to exports this file to server.js
    exports.allProducts = allProducts;
}
