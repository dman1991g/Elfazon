// Your API Key and Custom Search Engine ID
const apiKey = 'AIzaSyCVMu_wlh_fWOugBr4LJ8fOALFVZZ75NvA';
const cseId = 'd345275afe92f4720';  // Your CSE ID

// Function to fetch products from Google Custom Search API
async function fetchProducts(query) {
  const searchUrl = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${cseId}&key=${apiKey}&searchType=image`;

  try {
    const response = await fetch(searchUrl);
    const data = await response.json();
    
    if (data.items) {
      displayProducts(data.items); // Display the products from the search results
    } else {
      alert('No results found.');
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to display search results
function displayProducts(items) {
  const container = document.getElementById('product-container');
  container.innerHTML = '';  // Clear the container before displaying new items

  items.forEach(item => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <img src="${item.pagemap.cse_image[0].src}" alt="${item.title}" />
      <h3>${item.title}</h3>
      <p>${item.snippet}</p>
      <a href="${item.link}" target="_blank">View on ${getSiteName(item.link)}</a>
    `;
    container.appendChild(productDiv);
  });
}

// Helper function to extract site name from the URL
function getSiteName(url) {
  if (url.includes('amazon.com')) {
    return 'Amazon';
  } else if (url.includes('walmart.com')) {
    return 'Walmart';
  } else if (url.includes('target.com')) {
    return 'Target';
  } else {
    return 'Store';
  }
}

// Function to handle search input
function handleSearch() {
  const searchQuery = document.getElementById('search').value.trim();
  if (searchQuery) {
    fetchProducts(searchQuery); // Fetch products based on the search query
  } else {
    alert('Please enter a search term');
  }
}

// Set up the event listener for the search input field
document.getElementById('search').addEventListener('input', handleSearch);

// Initialize the app (optionally fetch products on page load)
function init() {
  // Optionally: Fetch popular products when the page loads or show placeholder
  // fetchProducts('toys'); // Example: Initial search term, you can modify it
}

// Initialize the app
init();