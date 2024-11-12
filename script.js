// Initialize Google Custom Search variables
const apiKey = "AIzaSyCVMu_wlh_fWOugBr4LJ8fOALFVZZ75NvA";
const cseId = "d345275afe92f4720";

// Function to search using Google Custom Search API
async function searchProducts(query) {
  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${cseId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.items) {
      displayProducts(data.items);
    } else {
      displayError("No products found. Try a different search term.");
    }
  } catch (error) {
    displayError("Error occurred while fetching products.");
  }
}

// Function to display product images and titles initially
function displayProducts(products) {
  const container = document.getElementById("product-container");
  container.innerHTML = ""; // Clear current products

  products.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    
    // Only show image and title by default
    productDiv.innerHTML = `
      <img src="${product.pagemap?.cse_image?.[0]?.src || ''}" alt="${product.title}" onclick="showDetails('${product.link}', '${product.title}', '${product.snippet}')">
      <h3>${product.title}</h3>
    `;

    container.appendChild(productDiv);
  });
}

// Function to show detailed info in an alert when image is clicked
function showDetails(link, title, description) {
  alert(`Product: ${title}\n\n${description}\n\nLink: ${link}`);
}

// Display error message
function displayError(message) {
  const container = document.getElementById("product-container");
  container.innerHTML = `<p>${message}</p>`;
}

// Event listener for search input
document.getElementById("search").addEventListener("input", (event) => {
  const query = event.target.value.trim();
  if (query) {
    searchProducts(query);
  } else {
    displayError("No search term entered.");
  }
});