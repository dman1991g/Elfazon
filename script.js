const apiKey = 'AIzaSyCVMu_wlh_fWOugBr4LJ8fOALFVZZ75NvA'; // Your Google API Key
const cseId = 'd345275afe92f4720'; // Your Custom Search Engine ID

// Function to search products
function searchProducts() {
  const query = document.getElementById('search-bar').value;
  
  // Check if there is a query entered
  if (query) {
    // Clear any previous results, including default products
    document.getElementById('product-results').innerHTML = ''; // Clear search results
    document.getElementById('default-products').style.display = 'none'; // Hide default products section

    // Fetch and display products based on the query
    fetchProducts(query);
  } else {
    alert("Please enter a search term.");
  }
}

// Function to fetch products from Google Custom Search Engine
async function fetchProducts(query) {
  const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${cseId}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Clear any previous results in case of re-searching
    document.getElementById('product-results').innerHTML = '';

    if (data.items) {
      // Display the products from the search result
      data.items.forEach(item => {
        displayProduct(item);
      });
    } else {
      document.getElementById('product-results').innerHTML = 'No products found.';
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    document.getElementById('product-results').innerHTML = 'Error fetching products.';
  }
}

// Function to display a product
function displayProduct(item) {
  const productContainer = document.getElementById('product-results');
  const productDiv = document.createElement('div');
  productDiv.classList.add('product-item');

  productDiv.innerHTML = `
    <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
    <p>${item.snippet}</p>
    <img src="${item.pagemap?.cse_image?.[0]?.src || ''}" alt="${item.title}" width="100">
  `;

  productContainer.appendChild(productDiv);
}