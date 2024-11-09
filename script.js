// script.js

document.addEventListener('DOMContentLoaded', function() {
    // The URL of the Fake Store API
    const apiUrl = 'https://fakestoreapi.com/products';

    // Fetch the product data
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayProducts(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

// Function to display products on the page
function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = ''; // Clear any existing content

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        // Add product image
        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.title;
        productDiv.appendChild(productImage);

        // Add product title
        const productTitle = document.createElement('h2');
        productTitle.textContent = product.title;
        productDiv.appendChild(productTitle);

        // Add product price
        const productPrice = document.createElement('p');
        productPrice.textContent = `$${product.price}`;
        productDiv.appendChild(productPrice);

        // Optionally, add a 'view details' button or other interactivity
        const viewButton = document.createElement('button');
        viewButton.textContent = 'View Details';
        viewButton.onclick = () => alert(`You clicked on ${product.title}`);
        productDiv.appendChild(viewButton);

        // Append the product to the products container
        productsContainer.appendChild(productDiv);
    });
}