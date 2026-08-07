// Target the DOM elements
const productSelect = document.getElementById("productSelect");
const getPriceBtn = document.getElementById("getPriceBtn");
const priceDisplay = document.getElementById("priceDisplay");

// Step 2: Fetch and populate the dropdown (API 1)
document.addEventListener("DOMContentLoaded", function () {
    axios
        .get("api.php?action=products")
        .then(function (response) {
            // response.data is the array of products
            const products = response.data;

            // Add each product as an <option>
            products.forEach(function (product) {
                const option = document.createElement("option");
                option.value = product.product_id; // value = product id
                option.textContent = product.product_name; // shown text
                productSelect.appendChild(option);
            });
        })
        .catch(function (error) {
            console.error("Error loading products:", error);
        });
});

// Step 3 & 4: Handle button click and fetch/display the price (API 2)
getPriceBtn.addEventListener("click", function () {
    // Step 3: Get the selected product id
    const selectedId = productSelect.value;

    // If no product selected, show default and return
    if (!selectedId) {
        priceDisplay.textContent = "Price : P 0.00";
        return;
    }

    // Step 4: Fetch the price for the selected product
    axios
        .get("api.php?action=price&id=" + selectedId)
        .then(function (response) {
            const price = response.data.price;

            // Format to two decimal places
            const formatted = Number(price).toFixed(2);

            // Update the DOM
            priceDisplay.textContent = "Price : P " + formatted;
        })
        .catch(function (error) {
            console.error("Error fetching price:", error);
            priceDisplay.textContent = "Price : P 0.00";
        });
});
