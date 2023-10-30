function updateQuantityMessage(textbox) {
    let quantityMessage = document.getElementById('qty_textbox_message');

    // Validate the quantity entered
    let validationMessage = validateQuantity(Number(textbox.value));

    // If there are validation errors, display an error message
    if (validationMessage !=="") {
        quantityMessage.innerHTML = validationMessage;
    } else{
        quantityMessage.innerHTML = textbox.value;
    }
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

function displayPurchase() {
    let quantity = Number(document.getElementById('qty_textbox').value);

    // You can redefine validationMessage because the one above is validated inside a function instead of like below which is defined globally.
    let validationMessage = validateQuantity(quantity);

    if(validationMessage == "") {
        let message = `Thank you for ordering ${quantity} things!`;
        document.body.innerHTML = message;
    } else {
        alert(validationMessage + " Please enter a positive integer for quantity.")
        document.getElementById('qty_textbox').value = "";
    }
}