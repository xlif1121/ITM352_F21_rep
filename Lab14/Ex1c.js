//var userdata = require('./user_data.json');
//const fs=require('fs');
//var filename = 'user_data.json';
//var user_data_str=fs.readFileSync(filename, 'utf-8');
//console.log(user_data_str, typeof user_data_str
//);
// this convert to string

//const fs=require('fs');
//var filename = 'user_data.json';
//var user_data_str=fs.readFileSync(filename, 'utf-8');
//var user_data_obj =JSON.parse(user_data_str)
//console.log(user_data_obj, typeof user_data_obj
//);
// this convert to object


const fs=require('fs');
var filename = 'user_data.json';
var user_data_str=fs.readFileSync(filename, 'utf-8');
var user_data_obj =JSON.parse(user_data_str)
console.log(user_data_obj["itm352"]["password"]
);
//this will show the information of itm352