// Declare variables per Lab 5.1 instructions
let age = 20;
let fav_num = 7;
let day_of_birth = 17;
let month_of_birth = 9;

// Define calculation
let calc1 = age + fav_num / day_of_birth * month_of_birth;
let calc2 = (age + fav_num) / day_of_birth * month_of_birth;

//Output calc1 and calc2 to the DOM
document.getElementById("result1").innerHTML = calc1;
document.getElementById("result2").innerHTML = calc2;