var month = '11';
var day = '21';
var year = 2000;

step1 = year-2000;
step2 = parseInt(step1 / 4);
step3 = step1 + step2;
step4 = 3;
step6 = step4 + step3;
step7 = day+step6;
step8 = step7;
step9 = step8 -1;
step10= step9%7;


console.log(`On ${month} ${21} ${year} is ${step10}`);

