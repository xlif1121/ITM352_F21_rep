const fs=require('fs');
var filename = 'user_data.json';
if(fs.existsSync(filename)){
var user_data_str=fs.readFileSync(filename, 'utf-8');
var user_data_obj =JSON.parse(user_data_str) ;
console.log(user_data_obj["itm352"]["password"]);
}else{
  console.log(`hey! ${filename} does not exist!`)  
}

