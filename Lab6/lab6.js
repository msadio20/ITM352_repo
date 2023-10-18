// Define a variable for the month entry textbox and assign it the value from the DOM for the element
let monthInput = document.getElementById('monthInput');

// Define a variable for the result to be sent to the DOM and assign it the value from the DOM for that element
let result = document.getElementById('result');

// Add an event listener to the button
document.querySelector('button').addEventListener('click', function() {

    // Define and assign a new month input variable as lowercase of input to make the switch statement easier
    let month = monthInput.value.toLowerCase();

// Initialize num_days to default value of -1
    let num_days = -1;

// Run through a switch statement based on the lowercase month variable
// When the month is January, March, May, July, August, October, or December, set num_days = 31
// When the month is April, June, September, or November, set num_days = 30
// When the month is February, set num_days = 28
// All others, set num_days = -1; This indicates an error in the input


    switch(month) {
        case "january":
        case "march":
        case "may":
        case "july":
        case "august":
        case "october":
        case "december":
            num_days = 31;
            break;
        case "april":
        case "june":
        case "september":
        case "november":
            num_days = 30;
            break;
        case "february":
            num_days = 28; // Leap year would be 29 days
            break;
        default:
            num_days = -1;
            break;
    }

// If num_days = -1, output an error message to the DOM, otherwise send the proper result from the switch statement
    if (num_days === -1) {
        result.textContent = 'Invalid month. Please enter a valid month name.';
    } else {
        result.textContent = `There are ${num_days} days in ${month}.`;
    }
});