// Lab12 Part 6 -- "order_multiple.js"
// Includes the JavaScript code we extracted from the 'order.html' file.

window.onload = function () {
    // Check the URL for any error parameters and display/use them.
    let params = (new URL(document.location)).searchParams;
    let q = Number(params.get('quantity'));
    let error = params.get('error');

    // If an error exists, alert the user!
    if (error) {
        alert(error);
    }

    // Define a variable that points to the form on the DOM in order to dynamically populate the form.
    const form = document.getElementById('productForm');
    let formHTML = ''; // The blank content of form to add to

    // Write a loop to print the product information AND then add a quantity text input box for every element of the product array
    for (let i in products) {
        formHTML += `<h3>${products[i]["brand"]} at \$${products[i]["price"]} (${products[i]["total_sold"]} sold)</h3>`;
        formHTML += `
        <label for = "quantity_textbox_${i}">Quantity desired: </label>
        <input type = "text" id = "quantity_textbox_${i}" name = "quantity_textbox[${i}]"
        onkeyup = "checkQuantityTextbox(this);">
        <span id = "quantity_textbox[${i}]_message">Enter a quantity</span><br>
        `;
    }

    // Ensure the submit button is part of the forms
    formHTML += `<br> <input type = "submit" value = "Purchase">`;

    // Push the form content to the DOM.
    form.innerHTML = formHTML;
}

    // Add the checkQuantityTextbox( )
    function checkQuantityTextbox(theTextbox) {
        let errs = validateQuantity(theTextbox.value, true);
        document.getElementById(theTextbox.name + '_message').innerHTML = errs;
    }
    
    // Add the validateQuantity( )
    function validateQuantity(quantity) {
        let errorMessage = "";
    
        switch (true) {
            case isNaN(quantity):
                errorMessage = "Not a number. Please enter a non-negative quantity to order.";
                break;
            case quantity < 0 && !Number.isInteger(quantity):
                errorMessage = "Negative inventory and not an Integer. Please enter a non-negatove quantity to order.";
                break;
            case quantity < 0:
                errorMessage = "Negative inventory. Please enter a non-negative quantity to order.";
                break;
            case !Number.isInteger(quantity):
                errorMessage = "Not an Integer. Please enter a non-negative quantity to order."
                break;
            default:
                errorMessage = "";      // No errors
                break;
        }
        return errorMessage;
    }