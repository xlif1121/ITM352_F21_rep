
function isNonNegInt(q){
    // Checks if a string q is a nondon-neg integer. If returnErrors is true, the array of errors is returned,
    // others returns true if q is a non-neg int.
    errors = []; // assume no errors at first
    if(q=='') q=0;
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer

    return (errors.length == 0);
}

//var checkIt =(item,index) =>{  this way will work 
//function checkIt(item, index) {
 //   console.log(`part ${index} is ${(isNonNegInt(item)?'a':'not a')} quantity`);}
 
attributes  =  "Xinfei;20;20.5;-19.5";
peices = attributes.split(';');

peices.forEach((item,index) => {
    console.log(`part ${index} is ${(isNonNegInt(item)?'a':'not a')} quantity`);}
);
