// Product Data for UGGs

let item1 = 'Tasman Slipper';
let quantity1 = 7;
let price1 = 110.00;
let extended_price1 = quantity1 * price1;

let item2 = 'Disquette';
let quantity2 = 4;
let price2 = 110.00;
let extended_price2 = quantity2 * price2;

let item3 = 'Classic Ultra Mini';
let quantity3 = 2;
let price3 = 150.00;
let extended_price3 = quantity3 * price3;

let item4 = 'Classic Heritage Bow';
let quantity4 = 13;
let price4 = 170.00;
let extended_price4 = quantity4 * price4;

let item5 = 'Bailey Bow II';
let quantity5 = 9;
let price5 = 200.00;
let extended_price5 = quantity5 * price5;

// Calculate the subtotal
let subtotal = extended_price1 + extended_price2 + extended_price3 + extended_price4 + extended_price5;

// Calculate the sales tax
let taxRate = 0.0575; // this is equivalent to a 5.75% tax rate
let taxAmount = subtotal * taxRate;

// Calculate the total
let total = subtotal + taxAmount;

// Fill the table rows
let table = document.getElementById('invoiceTable');

let row = table.insertRow(); // this creates a new row for each item
    row.insertCell(0).innerHTML = `${item1}`;
    row.insertCell(1).innerHTML = `${quantity1}`;
    row.insertCell(2).innerHTML = '$'+`${price1}`;
    row.insertCell(3).innerHTML = ('$'+`${extended_price1}`);

    row = table.insertRow(); // this creates a new row for each item
    row.insertCell(0).innerHTML = `${item2}`;
    row.insertCell(1).innerHTML = `${quantity2}`;
    row.insertCell(2).innerHTML = '$'+`${price2}`;
    row.insertCell(3).innerHTML = ('$'+`${extended_price2}`);
    
    row = table.insertRow(); // this creates a new row for each item
    row.insertCell(0).innerHTML = `${item3}`;
    row.insertCell(1).innerHTML = `${quantity3}`;
    row.insertCell(2).innerHTML = '$'+`${price3}`;
    row.insertCell(3).innerHTML = ('$'+`${extended_price3}`);
    
    row = table.insertRow(); // this creates a new row for each item
    row.insertCell(0).innerHTML = `${item4}`;
    row.insertCell(1).innerHTML = `${quantity4}`;
    row.insertCell(2).innerHTML = '$'+`${price4}`;
    row.insertCell(3).innerHTML = ('$'+`${extended_price4}`);
    
    row = table.insertRow(); // this creates a new row for each item
    row.insertCell(0).innerHTML = `${item5}`;
    row.insertCell(1).innerHTML = `${quantity5}`;
    row.insertCell(2).innerHTML = '$'+`${price5}`;
    row.insertCell(3).innerHTML = ('$'+`${extended_price5}`);
    
// Set the cells for : subtotal, tax, and total
document.getElementById('subtotal_cell').innerHTML = '$' + subtotal.toFixed(2);
document.getElementById('tax_cell').innerHTML = '$' + taxAmount.toFixed(2);
document.getElementById('total_cell').innerHTML = '$' + total.toFixed(2);