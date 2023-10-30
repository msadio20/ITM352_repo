function formSubmission() {
    // Get the value from the form textbox, convert it to a number and assign it to something easy to type
    let quantity = Number(document.querySelector('input[name="qty_textbox"]').value);

    let validationMessage = validateQuantity(quantity);

    if (validationMessage!=="") {
        document.getElementById("invalidQuantity").innerHTML = validationMessage;
    } else{
        let message = `Thank you for ordering ${quantity} things!`;
        document.body.innerHTML = message;
    }
    return false; // By returning false, this prevents a form submission.. we ar redirecting instead
}

function validateQuantity(quantity) {
    let errorMessage = "";

    switch (true) {
        case isNaN(quantity):
            errorMessage = "Not a number. Please enter a non-negative quantity to order.";
            break;
        case quantity <= 0 && !Number.isInteger(quantity):
            errorMessage = "Negative inventory and not an Integer. Please enter a non-negative quantity to order.";
        case quantity <= 0:
            errorMessage = "Negative inventory. Please enter a non-negative quantity to order.";
            break;
        case !Number.isInteger(quantity):
            errorMessage = "Not an Integer. Please enter a non-negative quantity to order.";
            break;
        default:
            errorMessage = ""; // There are NO errors
            break;
    }
    return errorMessage;
}