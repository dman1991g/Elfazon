// Array to hold fetched products
let products = [];

// Function to fetch products from the Fake Store API
async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    products = await response.json();
    displayProducts(products); // Display all products initially
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Function to display products on the page
function displayProducts(filteredProducts) {
  const container = document.getElementById('product-container');
  container.innerHTML = '';  // Clear current products

  filteredProducts.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <p>Price: $${product.price.toFixed(2)}</p>
      <button onclick="viewDetails(${product.id})">View Details</button>
    `;
    container.appendChild(productDiv);
  });
}

// Function to filter products based on search query
function filterProducts() {
  const searchQuery = document.getElementById('search').value.toLowerCase();
  const filteredProducts = products.filter(product => {
    return product.title.toLowerCase().includes(searchQuery) || 
           product.description.toLowerCase().includes(searchQuery);
  });
  displayProducts(filteredProducts); // Display filtered products
}

// Initial function to load all products and set up event listeners
function init() {
  fetchProducts(); // Fetch products when the page loads

  // Set up event listener for search bar
  document.getElementById('search').addEventListener('input', filterProducts);
}

// Placeholder for handling the "View Details" button click
function viewDetails(id) {
  const product = products.find(item => item.id === id);
  if (product) {
    alert(`Details for ${product.title}:\n\n${product.description}\nPrice: $${product.price}`);
  }
}

// Initialize the app
init();