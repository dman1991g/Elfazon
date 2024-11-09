// Fetch product data from the Fake Store API
fetch('https://fakestoreapi.com/products')
  .then(response => response.json()) // Convert the response into JSON
  .then(data => {
    // Log the data to check if it's being fetched properly
    console.log(data);

    // Get the product container element where the products will be displayed
    const productContainer = document.getElementById('product-container');

    // Loop through the data and create HTML elements for each product
    data.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');  // Add class for styling

      // Set up the HTML content for each product
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-price">$${product.price}</p>
        <button class="view-button">View Details</button>
      `;

      // Append the product card to the product container
      productContainer.appendChild(productCard);
    });
  })
  .catch(error => console.error('Error fetching products:', error));