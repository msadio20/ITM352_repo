document.addEventListener("DOMContentLoaded", function () {
    // Function to parse query parameters from the URL
    function getQueryParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // This gets the selected products data from the URL query parameters
    const selectedProductsJSON = getQueryParameter("selectedProducts");

    // This checks if selectedProductsJSON is not empty and parse it
    if (selectedProductsJSON) {
        const selectedProducts = JSON.parse(decodeURIComponent(selectedProductsJSON));

        // Select the table body where product information should be added
        let invoiceTableBody = document.getElementById('invoiceTableBody');

        if (invoiceTableBody) {
            // Initialize total price, subtotal, delivery fee, and tax
            let totalPrice = 0;
            let subtotal = 0;

            // Loop through the selected products and dynamically create table rows
            selectedProducts.forEach(function (selectedProduct) {
                let product = selectedProduct.product;
                let quantity = selectedProduct.quantity;

                // Calculate the total price for the selected product
                let productTotal = product.price * quantity;

                // Update the total price and subtotal
                totalPrice += productTotal;
                subtotal += productTotal;

                // Create a new table row for the selected product
                let row = createTableRow(product, quantity, productTotal.toFixed(2));

                // Append the row to the table body
                invoiceTableBody.appendChild(row);
            });

            // Create rows for subtotal, delivery fee, tax, and total value
            let subtotalRow = createTotalRow("Subtotal", "$" + subtotal.toFixed(2));

            // Calculate delivery fee based on subtotal
            let deliveryFee = 0;
            if (subtotal <= 29.99) {
                deliveryFee = 3.00;
            } else if (subtotal <= 49.99) {
                deliveryFee = 2.00;
            } else {
                deliveryFee = subtotal * 0.02;
            }

            // Calculate tax (4.5% of subtotal to recognize Hawaii State Tax)
            let tax = subtotal * 0.045;

            // Calculate the total including tax and delivery fee
            totalPrice = subtotal + tax + deliveryFee;

            let deliveryFeeRow = createTotalRow("Delivery Fee", "$" + deliveryFee.toFixed(2));
            let taxRow = createTotalRow("Tax", "$" + tax.toFixed(2));
            let totalRow = createTotalRow("Total", "$" + totalPrice.toFixed(2));

            totalRow.style.fontWeight = 'bold';

            // Append the rows for subtotal, delivery fee, tax, and total value
            invoiceTableBody.appendChild(subtotalRow);
            invoiceTableBody.appendChild(deliveryFeeRow);
            invoiceTableBody.appendChild(taxRow);
            invoiceTableBody.appendChild(totalRow);
        } else {
            // Sends an error message which makes it easier to find errors in the code
            console.error("Error: 'invoiceTableBody' element not found in the DOM.");
        }
    } else {
        console.error("Error: No selected products data found in the URL.");
    }
});

// Function to create a table row for a selected product
function createTableRow(product, quantity, productTotal) {
    let row = document.createElement('tr');

    // Create table cell for the product icon (image) and item name
    let iconAndItemCell = document.createElement('td');
    iconAndItemCell.style.verticalAlign = 'middle';         // Align content vertically in the middle
    iconAndItemCell.style.display = 'flex';                 // Use flex display for horizontal alignment

    // Create an anchor element to wrap the image for the tooltip
    let iconLink = document.createElement('a');
    iconLink.href = '#';                                    // Set a dummy href for the anchor
    iconLink.className = 'product-icon-link';               // Add the custom CSS class
    iconLink.setAttribute('data-bs-toggle', 'tooltip');     // Add Bootstrap tooltip attributes
    iconLink.setAttribute('data-bs-placement', 'top');      // Set tooltip placement so that it is visible from the top
    iconLink.setAttribute('title', product.description);    // Set tooltip content

    // Create an image element for the product icon
    let icon = document.createElement('img');
    icon.src = product.image;
    icon.alt = product.item;
    icon.className = 'product-icon';
    icon.style.maxWidth = '150px';                          // Set a maximum width for the image so they're not giant

    // Create a heading for the item name with padding
    let itemHeading = document.createElement('h5');
    itemHeading.textContent = product.item;
    itemHeading.style.marginLeft = '30px';                  // Add left margin for better spacing otherwise the items looked bunched up

    // Append the icon and item name to the anchor element
    iconLink.appendChild(icon);

    // Append the anchor element and item name to the cell
    iconAndItemCell.appendChild(iconLink);
    iconAndItemCell.appendChild(itemHeading);               // Add the item heading directly to the cell

    // Create table cell for the quantity
    let quantityCell = document.createElement('td');
    quantityCell.textContent = quantity;
    quantityCell.style.textAlign = 'center';                // Align content to the center

    // Create table cell for 'remaining inventory'
    let inventoryCell = document.createElement('td');
    inventoryCell.textContent = product.available; // Set the content to 'available'
    inventoryCell.style.textAlign = 'center'; // Align content to the center

    // Create table cell for the price of a single product
    let priceCell = document.createElement('td');
    priceCell.textContent = "$" + product.price.toFixed(2);
    priceCell.style.textAlign = 'center';                   // Align content to the center

    // Create table cell for the extended price of the selected product
    let extendedPriceCell = document.createElement('td');
    extendedPriceCell.textContent = "$" + productTotal;
    extendedPriceCell.style.textAlign = 'center';           // Align the content to the right

    // Append the cells to the row
    row.appendChild(iconAndItemCell);
    row.appendChild(quantityCell);
    row.appendChild(inventoryCell); // Add the 'remaining inventory' cell
    row.appendChild(priceCell);
    row.appendChild(extendedPriceCell);

    // Initialize Bootstrap tooltips
    let tooltips = new bootstrap.Tooltip(iconLink);

    return row;
}
// Function to create a row for subtotal, delivery fee, tax, and total
function createTotalRow(label, value) {
    let row = document.createElement('tr');

    // Create table cell for the label
    let labelCell = document.createElement('td');
    labelCell.textContent = label;

    // Create empty table cells for the 2nd, 3rd, and 4th columns so that the values align with that of 'Extended Price'
    let emptyCell1 = document.createElement('td');
    let emptyCell2 = document.createElement('td');
    let emptyCell3 = document.createElement('td');

    // Create table cell for the value and align it to the right
    let valueCell = document.createElement('td');
    valueCell.textContent = value;
    valueCell.style.textAlign = 'center';

    // Add label, empty cells, and value cell to the row
    row.appendChild(labelCell);
    row.appendChild(emptyCell1);
    row.appendChild(emptyCell2);
    row.appendChild(emptyCell3);
    row.appendChild(valueCell);

    return row;
}