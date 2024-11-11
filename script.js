// Array to hold fetched products
let products = [];

// Your provided API key and CSE ID
const API_KEY = 'AIzaSyCVMu_wlh_fWOugBr4LJ8fOALFVZZ75NvA';
const CSE_ID = 'd345275afe92f4720';

// Function to fetch products using Google Custom Search API
async function fetchProducts() {
  try {
    const query = 'toys'; // Default search query (you can adjust this to allow user input)
    const response = await fetch(`https://www.googleapis.com/customsearch/v1?q=${query}&key=${API_KEY}&cx=${CSE_ID}`);
    const data = await response.json();
    console.log('Fetched Products:', data);  // Check the fetched products
    products = data.items || []; // Store the search results
    displayProducts(products); // Display the products
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
      <img src="${product.pagemap.cse_image[0].src}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.snippet}</p>
      <p><a href="${product.link}" target="_blank">Buy Now</a></p>  <!-- Link to product -->
    `;
    container.appendChild(productDiv);
  });
}

// Function to filter products based on search query
function filterProducts() {
  if (!products.length) {
    console.log('No products available yet.');
    return;  // Avoid search if products aren't loaded
  }

  const searchQuery = document.getElementById('search').value.toLowerCase();
  const filteredProducts = products.filter(product => {
    return product.title.toLowerCase().includes(searchQuery) || 
           product.snippet.toLowerCase().includes(searchQuery);
  });

  displayProducts(filteredProducts);  // Display filtered products
}

// Initial function to load all products and set up event listeners
function init() {
  fetchProducts(); // Fetch products when the page loads

  // Set up event listener for search bar
  document.getElementById('search').addEventListener('input', filterProducts);
}

// Initialize the app
init();