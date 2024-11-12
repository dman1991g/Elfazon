// Function to search products using the Google Custom Search API
async function searchProducts(query) {
  const searchUrl = `https://www.googleapis.com/customsearch/v1?q=${query}&key=AIzaSyCVMu_wlh_fWOugBr4LJ8fOALFVZZ75NvA&cx=d345275afe92f4720`;

  try {
    console.log('Search query:', query);  // Log the search query to see what is being searched
    const response = await fetch(searchUrl);
    const data = await response.json();

    console.log('API response:', data);  // Log the response to see what the API is returning

    // Check if items are returned
    if (data.items && data.items.length > 0) {
      displayProducts(data.items);
    } else {
      console.log('No products found for', query);  // Log when no products are found
      alert('No products found');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('An error occurred while fetching products');
  }
}

// Function to display the products on the page
function displayProducts(products) {
  const container = document.getElementById('product-container');
  container.innerHTML = '';  // Clear any existing products

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <img src="${product.pagemap.cse_image[0].src}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.snippet}</p>
      <a href="${product.link}" target="_blank">Buy Now</a>
    `;
    container.appendChild(productDiv);
  });
}

// Event listener for the search bar
document.getElementById('search').addEventListener('input', (e) => {
  const query = e.target.value.trim();
  if (query.length > 0) {
    searchProducts(query);  // Search for products based on input
  } else {
    document.getElementById('product-container').innerHTML = '';  // Clear the product display if search is empty
  }
});