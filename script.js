// Array to hold fetched products
let products = [];

// Your provided API key and CSE ID
const API_KEY = 'AIzaSyCVMu_wlh_fWOugBr4LJ8fOALFVZZ75NvA';
const CSE_ID = 'd345275afe92f4720';

// Function to display errors or logs on the page
function displayError(message) {
  const container = document.getElementById('product-container');
  container.innerHTML = `<p style="color: red;">Error: ${message}</p>`;
}

// Function to fetch products using Google Custom Search API
async function fetchProducts(query) {
  try {
    const response = await fetch(`https://www.googleapis.com/customsearch/v1?q=${query}&key=${API_KEY}&cx=${CSE_ID}`);
    const data = await response.json();
    
    // Check if there are items in the response
    if (data.items) {
      products = data.items;
      displayProducts(products); // Display the products
    } else {
      displayError('No products found for your search.');
    }
  } catch (error) {
    displayError('Error fetching products: ' + error.message);
  }
}

// Function to display products on the page
function displayProducts(filteredProducts) {
  const container = document.getElementById('product-container');
  container.innerHTML = '';  // Clear current products

  // Check if there are products to display
  if (filteredProducts.length === 0) {
    container.innerHTML = '<p>No products found.</p>';
  } else {
    filteredProducts.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      productDiv.innerHTML = `
        <img src="${product.pagemap.cse_image ? product.pagemap.cse_image[0].src : ''}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.snippet}</p>
        <p><a href="${product.link}" target="_blank">Buy Now</a></p>  <!-- Link to product -->
      `;
      container.appendChild(productDiv);
    });
  }
}

// Function to filter products based on search query
function filterProducts() {
  const searchQuery = document.getElementById('search').value.trim();
  
  // Ensure there's a query before fetching products
  if (searchQuery && products.length === 0) {
    displayError('No products loaded yet.');
    return; // Do nothing if no products are fetched yet
  }

  // Filter products based on search query
  const filteredProducts = products.filter(product => {
    return product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           product.snippet.toLowerCase().includes(searchQuery.toLowerCase());
  });

  displayProducts(filteredProducts);  // Display filtered products
}

// Initial function to load products and set up event listeners
function init() {
  fetchProducts('toys'); // Fetch products with a default query when the page loads

  // Set up event listener for the search bar
  document.getElementById('search').addEventListener('input', filterProducts);
}

// Initialize the app
init();