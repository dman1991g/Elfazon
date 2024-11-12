// Array to hold fetched products
let products = [];

// Function to fetch products from Google Custom Search API
async function fetchProduct(searchQuery) {
  const apiKey = 'AIzaSyCVMu_wlh_fWOugBr4LJ8fOALFVZZ75NvA'; // Your API Key
  const cseId = 'd345275afe92f4720'; // Your CSE ID
  const searchUrl = `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&key=${apiKey}&cx=${cseId}`;

  try {
    const response = await fetch(searchUrl);

    // Check if the response is okay (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Check if products are found
    if (data.items) {
      products = data.items;
      displayProducts(products);
    } else {
      alert("No products found for your search.");
    }
  } catch (error) {
    console.error("Error occurred while fetching product:", error);
    alert("Error occurred while fetching product. Please try again later.");
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
      <a href="${product.link}" target="_blank">View Product</a>
    `;
    container.appendChild(productDiv);
  });
}

// Function to filter products based on search query
function filterProducts() {
  const searchQuery = document.getElementById('search').value.trim();
  if (searchQuery.length >= 3) { // Start searching after 3 characters
    fetchProduct(searchQuery); // Fetch products when search query is valid
  } else {
    alert("Please enter at least 3 characters to search.");
  }
}

// Initial function to load all products and set up event listeners
function init() {
  // Set up event listener for search bar
  document.getElementById('search').addEventListener('input', filterProducts);
}

// Initialize the app
init();