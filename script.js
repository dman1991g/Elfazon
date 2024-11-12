// API Key and CSE ID
const apiKey = "AIzaSyCVMu_wlh_fWOugBr4LJ8fOALFVZZ75NvA";
const cseId = "d345275afe92f4720";

// Function to search products using Google Custom Search
async function searchProducts(query) {
  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${cseId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Check if results were returned
    if (data.items) {
      displayProducts(data.items);
    } else {
      displayError("No products found. Please try another search.");
    }
  } catch (error) {
    displayError("Error occurred while fetching products.");
  }
}

// Function to display products on the page
function displayProducts(products) {
  const container = document.getElementById("product-container");
  container.innerHTML = ""; // Clear any previous results

  products.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    const imgSrc = product.pagemap?.cse_image?.[0]?.src || 'default-image.jpg';
    const productTitle = product.title;
    const productLink = product.link;

    productDiv.innerHTML = `
      <a href="${productLink}" target="_blank">
        <img src="${imgSrc}" alt="${productTitle}" />
        <h3>${productTitle}</h3>
      </a>
    `;

    container.appendChild(productDiv);
  });
}

// Function to display an error message
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
    displayError("Please enter a search term.");
  }
});