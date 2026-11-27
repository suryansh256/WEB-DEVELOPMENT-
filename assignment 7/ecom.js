
// API URL
const API_URL = "https://fakestoreapi.com/products";

// USD to INR conversion rate
const USD_TO_INR = 86;

// HTML Elements
const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortOption = document.getElementById("sortOption");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const loadMoreBtn = document.getElementById("loadMoreBtn");

const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const cartSection = document.getElementById("cartSection");
const cartItems = document.getElementById("cartItems");
const cartPageTotal = document.getElementById("cartPageTotal");

const viewCartBtn = document.getElementById("viewCartBtn");

// Variables
let products = [];
let visibleProducts = 8;

// Load cart from LocalStorage
let cart = [];

try {
    const savedCart = JSON.parse(localStorage.getItem("cart"));

    if (Array.isArray(savedCart)) {
        cart = savedCart.filter(item =>
            Number.isInteger(item.id) &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0
        );
    }
} catch (err) {
    cart = [];
}

// Convert USD to INR
function convertToINR(price) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR"
    }).format(price * USD_TO_INR);
}

// Fetch Products from API
async function fetchProducts() {

    loading.hidden = false;
    error.textContent = "";

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to fetch products");
        }

        products = await response.json();

        // Display categories
        displayCategories();

        // Display products
        displayProducts();

        // Display cart
        displayCart();

    } catch (err) {

        error.textContent = err.message;

    } finally {

        loading.hidden = true;

    }
}

// Display Categories
function displayCategories() {

    const categories = [...new Set(
        products.map(product => product.category)
    )];

    categoryFilter.innerHTML =
        '<option value="">All Categories</option>';

    categories.forEach(category => {

        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryFilter.appendChild(option);

    });

}

// Display Products
function displayProducts() {

    productContainer.innerHTML = "";

    // Search products by name
    let filteredProducts = products.filter(product => {

        return product.title.toLowerCase().includes(
            searchInput.value.toLowerCase()
        );

    });

    // Filter products by category
    if (categoryFilter.value !== "") {

        filteredProducts = filteredProducts.filter(product => {

            return product.category === categoryFilter.value;

        });

    }

    // Sort products
    if (sortOption.value === "low") {

        filteredProducts.sort((a, b) => a.price - b.price);

    }

    else if (sortOption.value === "high") {

        filteredProducts.sort((a, b) => b.price - a.price);

    }

    else if (sortOption.value === "name") {

        filteredProducts.sort((a, b) => {
            return a.title.localeCompare(b.title);
        });

    }

    // Show limited products
    const visible = filteredProducts.slice(0, visibleProducts);

    // Create Product Cards
    visible.forEach(product => {

        const card = document.createElement("div");
        card.className = "product-card";

        // Product Image
        const image = document.createElement("img");

        image.src = product.image;
        image.alt = product.title;
        image.loading = "lazy";

        // Product Name
        const name = document.createElement("h3");

        name.textContent = product.title;

        // Product Price in INR
        const price = document.createElement("p");

        price.className = "price";
        price.textContent = convertToINR(product.price);

        // Product Category
        const category = document.createElement("p");

        category.textContent = "Category: " + product.category;

        // Add to Cart Button
        const button = document.createElement("button");

        button.textContent = "Add to Cart";

        button.addEventListener("click", () => {

            addToCart(product.id);

        });

        // Add elements to card
        card.append(
            image,
            name,
            price,
            category,
            button
        );

        productContainer.appendChild(card);

    });

    // Load More Button
    loadMoreBtn.hidden =
        visible.length >= filteredProducts.length;

    // No products found
    if (filteredProducts.length === 0) {

        productContainer.textContent = "No products found.";

    }

}

// Add Product to Cart
function addToCart(productId) {

    const existingItem = cart.find(item => {

        return item.id === productId;

    });

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            id: productId,
            quantity: 1
        });

    }

    saveCart();
    displayCart();

}

// Save Cart in LocalStorage
function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

}

// Display Cart
function displayCart() {

    cartItems.innerHTML = "";

    // Calculate total items
    const totalItems = cart.reduce((total, item) => {

        return total + item.quantity;

    }, 0);

    // Calculate total price in INR
    const totalPrice = cart.reduce((total, item) => {

        const product = products.find(p => p.id === item.id);

        if (!product) {
            return total;
        }

        return total + (
            product.price * USD_TO_INR * item.quantity
        );

    }, 0);

    // Display cart count and total
    cartCount.textContent = totalItems;

    cartTotal.textContent = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR"
    }).format(totalPrice);

    cartPageTotal.textContent = cartTotal.textContent;

    // Display cart items
    cart.forEach(item => {

        const product = products.find(p => p.id === item.id);

        if (!product) return;

        const div = document.createElement("div");
        div.className = "cart-item";

        // Product Name
        const name = document.createElement("span");

        name.textContent =
            product.title + " x " + item.quantity;

        // Product Price
        const price = document.createElement("span");

        price.textContent = convertToINR(
            product.price * item.quantity
        );

        // Remove Button
        const removeButton = document.createElement("button");

        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";

        removeButton.addEventListener("click", () => {

            removeFromCart(item.id);

        });

        div.append(
            name,
            price,
            removeButton
        );

        cartItems.appendChild(div);

    });

    // Save updated cart
    saveCart();

}

// Remove Product from Cart
function removeFromCart(productId) {

    cart = cart.filter(item => {

        return item.id !== productId;

    });

    saveCart();
    displayCart();

}

// Search Products
searchInput.addEventListener("input", () => {

    visibleProducts = 8;

    displayProducts();

});

// Filter Products
categoryFilter.addEventListener("change", () => {

    visibleProducts = 8;

    displayProducts();

});

// Sort Products
sortOption.addEventListener("change", () => {

    visibleProducts = 8;

    displayProducts();

});

// Load More Products
loadMoreBtn.addEventListener("click", () => {

    visibleProducts += 8;

    displayProducts();

});

// View Cart
viewCartBtn.addEventListener("click", () => {

    cartSection.hidden = !cartSection.hidden;

    if (!cartSection.hidden) {

        cartSection.scrollIntoView({
            behavior: "smooth"
        });

    }

});

// Start Website
async function startWebsite() {

    await fetchProducts();

}

// Run Website
startWebsite();
