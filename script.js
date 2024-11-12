const apiKey = 'AIzaSyCVMu_wlh_fWOugBr4LJ8fOALFVZZ75NvA';
const cseId = 'd345275afe92f4720';

// Function to search products
function searchProducts() {
  const query = document.getElementById('search-bar').value;
  if (query) {
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

    // Clear any previous results
    document.getElementById('product-results').innerHTML = '';

    if (data.items) {
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