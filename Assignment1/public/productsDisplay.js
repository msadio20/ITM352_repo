// CLIENT-SIDE validation
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

// Function to handle form submission CLIENT-SIDE
function submitForm(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Clear any previous error messages
    const alertContainer = document.querySelector('.alert-container');
    alertContainer.innerHTML = '';

    // Collect the selected products and quantities
    const selectedProducts = [];
    const form = document.getElementById("productForm");

    for (let i = 0; i < products.length; i++) {
        const quantityInput = document.getElementById(`quantitySelect${i}`);
        const quantityValue = parseInt(quantityInput.value);

        if (quantityValue > 0) {
            const validationMessage = validateQuantity(quantityValue, products[i].available);

            if (validationMessage === "") {
                selectedProducts.push({ product: products[i], quantity: quantityValue });
            } else {
                // Display the validation error message
                const validationMessageSpan = quantityInput.nextElementSibling;
                validationMessageSpan.textContent = validationMessage;
            }
        }
    }

    // Check if there are any validation errors
    if (selectedProducts.length === 0) {
        // Display a Bootstrap alert with the error message
        const alertContainer = document.querySelector('.alert-container');
        const alertMessage = "Please correct the quantity input errors before submitting the form.";

        // An alert that appears when there is an error with the quantity inputs. The alert appears red to catch the client's attention
        const alertHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${alertMessage}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        // The 'alert-container' is for the message that pops up when data is invalid
        alertContainer.innerHTML = alertHTML;

        return;
    }

    // Convert the selectedProducts array to a JSON string
    const selectedProductsJSON = JSON.stringify(selectedProducts);

    // Redirect to the invoice.html page with selected products data as query parameter
    window.location.href = `/invoice.html?selectedProducts=${encodeURIComponent(selectedProductsJSON)}`;
}

document.addEventListener("DOMContentLoaded", function () {
    
    // Select the 'div' where product details should be displayed
    let productDetailsDiv = document.getElementById('productDetails');

    // Check if the productDetailsDiv exists before proceeding
    if (productDetailsDiv) {
        // Create a row div to contain the columns
        let row = document.createElement("div");
        row.className = "row card-group";                               // The 'card-group' class to creates cards that are equal size

        // Array to store selected products
        let selectedProducts = [];

        // Loop through the 'products' array and create column divs for each product
        for (let i = 0; i < products.length; i++) {
            let product = products[i];

            // Create a Bootstrap column for each product (col-md-4)
            let column = document.createElement("div");
            column.className = "col-md-4 mb-4";

            // Create a card element for the product
            let card = document.createElement("div");
            card.className = "card h-100";                              // Add the 'h-100' class to make all cards the same height even whent he 'descriptions' are opened

            // Create the card's price element (top right of the card)
            let price = document.createElement("h4");
            price.className = "card-price";
            price.textContent = "$" + product.price.toFixed(2);

            // Create the card's image
            let image = document.createElement("img");
            image.className = "card-img-top";
            image.src = product.image;
            image.alt = product.item;

            // Create a card body container using Bootstrap flex
            let cardBodyContainer = document.createElement("div");
            cardBodyContainer.className = "d-flex flex-column justify-content-between h-100";

            // Create a card's sold and availability details container to keep them in-line -- aesthetic purpose
            let soldAvailableContainer = document.createElement("div");
            soldAvailableContainer.className = "d-flex justify-content-between";

            // Create the card's availability element
            let available = document.createElement("h4");
            available.className = "card-text";
            available.textContent = "Available: " + product.available;

            // Create the card's sold element (to the right of available)
            let sold = document.createElement("h4");
            sold.className = "card-text";
            sold.textContent = "Sold: " + product.sold;

            // Create a card title element -- product name
            let cardTitle = document.createElement("h2");
            cardTitle.className = "card-title text-center";
            cardTitle.textContent = product.item;

            // Create a button to toggle the description collapse to avoid bulkiness in the card
            let toggleButton = document.createElement("button");
            toggleButton.className = "btn btn-outline-dark btn-sm";    // Add Bootstrap button classes
            toggleButton.setAttribute("data-bs-toggle", "collapse");
            toggleButton.setAttribute("data-bs-target", `#descriptionCollapse${i}`);
            toggleButton.textContent = "Show Description";

            // Prevent the default behavior of the button click event
            toggleButton.addEventListener("click", function (event) {
                event.preventDefault();
            });

            // Create a collapsible description container
            let descriptionCollapse = document.createElement("div");
            descriptionCollapse.id = `descriptionCollapse${i}`;
            descriptionCollapse.className = "collapse";
            descriptionCollapse.textContent = product.description;

            // Create a select menu for quantity selection
            let quantitySelect = document.createElement("input");
            quantitySelect.className = "form-control";                  // Add Bootstrap form-control class
            quantitySelect.setAttribute("type", "number");
            quantitySelect.setAttribute("min", "0");                    // Set minimum value to 0
            quantitySelect.setAttribute("max", product.available);
            quantitySelect.setAttribute("id", `quantitySelect${i}`);  // Add a unique ID
            quantitySelect.setAttribute("name", `quantitySelect${i}`);    
            quantitySelect.value = "0";                                 // Set the starting value to 0

            // Function to handle quantity input change event
            function handleQuantityChange() {
                console.log(Number(quantitySelect.value));
                let quantityValue = Number(quantitySelect.value);
                let validationMessage = validateQuantity(quantityValue, product.available);

                // Update the validation message span
                validationMessageSpan.textContent = validationMessage;

                // Update the selected products array
                /*
                if (validationMessage === "" && quantityValue > 0) {
                    selectedProducts[i] = { product: product, quantity: quantityValue };

                    // Decrease the availability and increase the sold quantity
                    product.available -= quantityValue;
                    product.sold += quantityValue;
                } else {
                    delete selectedProducts[i];
                }
                */
            }

            // Add an event listener for the quantity input change event
            quantitySelect.addEventListener("input", handleQuantityChange);

            // Create a span to display validation messages
            let validationMessageSpan = document.createElement("span");
            validationMessageSpan.className = "text-danger";

            // Append elements to the card body container
            cardBodyContainer.appendChild(cardTitle);
            cardBodyContainer.appendChild(soldAvailableContainer);
            soldAvailableContainer.appendChild(price);
            soldAvailableContainer.appendChild(available);
            soldAvailableContainer.appendChild(sold);
            cardBodyContainer.appendChild(toggleButton);
            cardBodyContainer.appendChild(descriptionCollapse);
            cardBodyContainer.appendChild(quantitySelect);
            cardBodyContainer.appendChild(validationMessageSpan);

            // Create the card's body
            let cardBody = document.createElement("div");
            cardBody.className = "card-body text-center";

            // Append the card body container to the card body
            cardBody.appendChild(cardBodyContainer);

            card.appendChild(image);
            card.appendChild(cardBody);

            column.appendChild(card);

            // Append the column to the row
            row.appendChild(column);
        }

        // Append the row to the productDetailsDiv
        productDetailsDiv.appendChild(row);

        // Add a submit button click event listener
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.addEventListener("click", submitForm);
    } else {
        console.error("Error: 'productDetails' element not found in the DOM.");
    }
});