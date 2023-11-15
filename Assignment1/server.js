const express = require('express');
const app = express();
const path = require('path'); // Import the path module
const qs = require('querystring');

app.use(express.json());

// Middleware to log all requests
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
 });

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server; listen on port 8080 for incoming HTTP requests
app.listen(8080, () => console.log(`listening on port 8080`));

app.get('/test', function (req, res) {
   res.send('app.get for test was executed');
   console.log('app.get for test was executed');
});

// Load product data from products.json
let products = require(__dirname + '/products.json');


// Define a route for serving product data as JavaScript
app.get('/products.js', function (request, response, next) {
   response.type('.js');
   const products_str = `let products = ${JSON.stringify(products)};`;
   response.send(products_str);
});

app.use(express.urlencoded({ extended: true }));

// Add a 'sold' variable for each product
for (let i in products) {
    products.forEach((products, i) => {products.sold = 0})
}

// POST route to handle form submission
app.post('/submit', function (req, res) {
    let POST = req.body;

    let quantitySelect = false;

    let errors = {};

    for (let i in products) {
        let value = POST[`quantitySelect${[i]}`];
        quantitySelect = quantitySelect || (value > 0);
     
        // Validate usig the updated validateQuantity function    
        let errorMessages = validateQuantity(value, products[i].available);

        // Store the error messages if there are any
        if (errorMessages.length > 0) {
            errors[`value${[i]}error`] = errorMessages.join(',');
        }
    }
    if (quantitySelect == false && Object.keys(errors).length == 0) {
        // Redirect to the productsDisplay page if there is an 'error'
        res.redirect("./productsDisplay.html?error");
    }
    else if (quantitySelect == true && Object.keys(errors).length == 0) {
        // Update the product quantities and redirect to the invoice page with valid data
        for (let i in products) {
            let value = POST[`quantitySelect${[i]}`];
            // Update the quantity sold and quantity available for the current product
            products[i].sold += Number(value);
            products[i].available = products[i].available - Number(value);
        }
        console.log(products);
        // Redirect to the invoice page with valid data in the URL
        res.redirect("./invoice.html?valid&" + qs.stringify(POST));
    }
    // If there is an input error (not including no input)
    else if (Object.keys(errors).length > 0) {
        // Redirect to the productsDisplay page with an error message in the URL
        res.redirect("./products.html?" + qs.stringify(POST) + '&inputError');
    }
});

// Function to validate the quantity
function validateQuantity(value, maxAvailable) {
    let errorMessage = [];

    value = Number(value);
    
    switch (true) {
        case isNaN(value):
            errorMessage = "Not a number. Please enter a non-negative quantity to order.";
            break;
        case parseInt(value) !== value && value !== 0:
            errorMessage = "Please enter an integer value."
            break;
        case value < 0 && !Number.isInteger(value):
            errorMessage = "Negative inventory and not an Integer. Please enter a non-negatove quantity to order.";
            break;
        case value < 0:
            errorMessage = "Negative inventory. Please enter a non-negative quantity to order.";
            break;
        case !Number.isInteger(value):
            errorMessage = "Not an Integer. Please enter a non-negative quantity to order."
            break;
            case value > maxAvailable:
            errorMessage = `We do not have ${value} in stock. Please enter a quantity no greater than the listed availability.`;
            break;
        default:
            errorMessage = "";      // The empty string indicates no errors are present.
            break;
    }
    return errorMessage;
}