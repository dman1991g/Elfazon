// Replace with your actual API key and CSE ID
const API_KEY = "AIzaSyCVMu_wlh_fWOugBr4LJ8fOALFVZZ75NvA";
const CSE_ID = "d345275afe92f4720";

// Function to fetch search results
async function fetchProducts(query) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CSE_ID}&q=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    console.log(data); // Log API response to the page (for debugging)
    
    if (data.items) {
      displayProducts(data.items);
    } else {
      document.getElementById('product-container').innerHTML = "<p>No products found</p>";
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    document.getElementById('product-container').innerHTML = "<p>Error fetching products</p>";
  }
}

// Function to display products on the page
function displayProducts(products) {
  const container = document.getElementById('product-container');
  container.innerHTML = ''; // Clear current products

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
      <img src="${product.pagemap?.cse_image?.[0]?.src || 'placeholder.jpg'}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.snippet}</p>
      <a href="${product.link}" target="_blank">View Product</a>
    `;
    container.appendChild(productDiv);
  });
}

// Set up event listener for search
document.getElementById('search').addEventListener('input', (event) => {
  const query = event.target.value;
  if (query) {
    fetchProducts(query);
  }
});