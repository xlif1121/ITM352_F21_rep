/*Modified my Assignment 1  and borrowed code from WODs smartphoneproducts 3,and Prof. Port's screencast*/

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
        "name": "",
        "price": 5.00,
        "image": ".jpg"
    },
    {
        "name": "",
        "price": 5.00,
        "image": ".jpg"
    },
    {
        "name": "",
        "price": 6.00,
        "image": ".jpg"
    },
    {
        "name": "",
        "price": 5.00,
        "image": ".jpg"
    },
    {
        "name": "",
        "price": 5.00,
        "image": ".jpg"
    }
];

var chopsticks = [

    {
        "name": "",
        "price": 10.00,
        "image": ".jpg"
    },
    {
        "name": "",
        "price": 5.00,
        "image": ".jpg"
    },
    {
        "name": "",
        "price": 5.00,
        "image": ".jpg"
    },
    {
        "name": "",
        "price": 5.00,
        "image": ".jpg"
    },
    {
        "name": "",
        "price": 5.00,
        "image": ".jpg"
    }
];

var allProducts={
    "mugs":mugs,
    "plate":plate,
    "spoon":spoon,
    "chopsticks":chopsticks
}

if (typeof exports != 'undefined') { // try to exports this file to server.js
    exports.products = products;
}
