// Fetch products from Fake Store API
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    displayProducts(data);  // Call function to display products
  })
  .catch(error => console.error('Error fetching products:', error));

// Function to display products on the page
function displayProducts(products) {
  const productContainer = document.getElementById('product-container');
  
  // Clear any existing content
  productContainer.innerHTML = '';

  // Loop through the products and create product elements
  products.forEach(product => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    
    // Product image
    const productImage = document.createElement('img');
    productImage.classList.add('product-image');
    productImage.src = product.image;
    productItem.appendChild(productImage);

    // Product title
    const productTitle = document.createElement('h2');
    productTitle.classList.add('product-title');
    productTitle.textContent = product.title;
    productItem.appendChild(productTitle);

    // Product price
    const productPrice = document.createElement('p');
    productPrice.classList.add('product-price');
    productPrice.textContent = `$${product.price}`;
    productItem.appendChild(productPrice);

    // View Details button
    const viewDetailsButton = document.createElement('button');
    viewDetailsButton.textContent = 'View Details';
    viewDetailsButton.onclick = () => {
      alert(`You clicked on: ${product.title}`); // Simple interaction for now
    };
    productItem.appendChild(viewDetailsButton);

    // Append the product item to the container
    productContainer.appendChild(productItem);
  });
}