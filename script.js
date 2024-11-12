const apiKey = 'AIzaSyCVMu_wlh_fWOugBr4LJ8fOALFVZZ75NvA'; // Replace with your API key
const cseId = 'd345275afe92f4720'; // Replace with your Custom Search Engine ID

// Function to fetch products from Google Custom Search Engine
async function fetchProducts(query) {
    try {
        const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${cseId}&key=${apiKey}&num=10`;
        const response = await fetch(url);
        const data = await response.json();
        displayProducts(data.items);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Function to display products on the page (showing only images initially)
function displayProducts(products) {
    const container = document.getElementById('product-container');
    container.innerHTML = ''; // Clear any existing content

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        // Create the image element and hide details initially
        const productImage = document.createElement('img');
        productImage.src = product.pagemap.cse_image[0].src; // Image source from CSE result
        productImage.alt = product.title;
        productImage.classList.add('product-image');
        productImage.addEventListener('click', () => {
            // Show full details when image is clicked
            displayFullDetails(product, productDiv);
        });

        // Append the image to the product div
        productDiv.appendChild(productImage);
        container.appendChild(productDiv);
    });
}

// Function to display full product details when image is clicked
function displayFullDetails(product, productDiv) {
    const productDetails = document.createElement('div');
    productDetails.classList.add('product-details');
    
    // Product title
    const title = document.createElement('h3');
    title.textContent = product.title;
    productDetails.appendChild(title);

    // Product description
    const description = document.createElement('p');
    description.textContent = product.snippet;
    productDetails.appendChild(description);

    // Price (if available)
    if (product.pagemap.price) {
        const price = document.createElement('p');
        price.textContent = `Price: ${product.pagemap.price[0].price}`;
        productDetails.appendChild(price);
    }

    // Link to the product
    const link = document.createElement('a');
    link.href = product.link;
    link.target = '_blank';
    link.textContent = 'View Product';
    productDetails.appendChild(link);

    // Replace image with product details
    productDiv.innerHTML = ''; // Remove image
    productDiv.appendChild(productDetails);
}

// Function to handle search input
function handleSearch() {
    const query = document.getElementById('search').value;
    if (query.trim()) {
        fetchProducts(query); // Fetch products based on the search query
    }
}

// Initialize search functionality
document.getElementById('search').addEventListener('input', handleSearch);