var products= 
[
{  
"name":"Lamb mugs",  
"price": 20.00,  
"image": "333.jpg"
},
{  
"name":"Panda mugs",  
"price": 18.00,  
"image": "444.jpg"
},
{  
    "name":"Blue sky mugs",  
    "price": 30.00,  
    "image": "555.jpg"
    },
    {  
        "name":"Duck mugs",  
        "price": 25.00,  
        "image": "222.jpg"
        },
        {  
            "name":"Splash-ink mug",  
            "price": 30.00,  
            "image": "777.jpg"
            }
];
//Professor Port helped me with the codes below
if(typeof exports != 'undefined') { // try to export this file to server.js
exports.products = products;
}
