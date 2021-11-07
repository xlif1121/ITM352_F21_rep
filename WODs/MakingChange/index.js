// put the amout you want to change in pennies here
let amount= 21;
let leftover=amount;
//Get the max number of quarters
let quarters=Math.floor(amount/25);
leftover = leftover % 25;
//Get the max number of dimes from leftover amount
let dimes =Math.floor(leftover/10);
leftover= leftover%10;
//Get the max number nickles from leftover
let nickles =Math.floor(leftover/5);
leftover= leftover%5;
//what is left will be 0-4 pennies
let pennies = leftover;

console.log(amount +" pennies can be divided into " + quarters +" quarters,"
+ dimes +" dimes," +nickles +" nickles, and " + pennies +" pennies.");


