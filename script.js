// Your API key and Custom Search Engine (CSE) ID
const API_KEY = 'AIzaSyCVMu_wlh_fWOugBr4LJ8fOALFVZZ75NvA';
const CSE_ID = 'd345275afe92f4720';

// Function to fetch search results
async function fetchProducts(query) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${encodeURIComponent(query)}&searchType=image`
    );
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      displayProducts(data.items);
    } else {
      displayNoResults();
    }
  } catch (error) {
    console.error("Error occurred while fetching products:", error);
    displayError();
  }
}

// Function to display search results
function displayProducts(products) {
  const container = document.getElementById('product-container');
  container.innerHTML = ''; // Clear previous results

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <img src="${product.link}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.snippet}</p>
      <a href="${product.image.contextLink}" target="_blank">View on Store</a>
    `;
    container.appendChild(productDiv);
  });
}

// Function to display "no results" message
function displayNoResults() {
  const container = document.getElementById('product-container');
  container.innerHTML = '<p>No products found. Try searching again.</p>';
}

// Function to display error message
function displayError() {
  const container = document.getElementById('product-container');
  container.innerHTML = '<p>Error occurred while fetching products. Please try again later.</p>';
}

// Function to handle search input
function handleSearch() {
  const query = document.getElementById('search').value;
  if (query) {
    fetchProducts(query);
  }
}

// Initial function to set up event listener
function init() {
  document.getElementById('search').addEventListener('input', handleSearch);
}

// Initialize the app
init();