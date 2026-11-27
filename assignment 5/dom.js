
const products = [
    {
        name: "Headphones",
        category: "Electronics",
        price: 1999,
        rating: 4.5,
        description: "Comfortable headphones with great sound quality.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30b?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Smart Watch",
        category: "Accessories",
        price: 2999,
        rating: 4.2,
        description: "Smart watch with fitness and health features.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Laptop",
        category: "Electronics",
        price: 49999,
        rating: 4.8,
        description: "Powerful laptop for work and everyday use.",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a8b4?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Shoes",
        category: "Fashion",
        price: 2499,
        rating: 4.3,
        description: "Stylish shoes suitable for everyday wear.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Camera",
        category: "Electronics",
        price: 35999,
        rating: 4.7,
        description: "Capture your favourite moments in high quality.",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Backpack",
        category: "Accessories",
        price: 1499,
        rating: 4.1,
        description: "A spacious backpack for college and travel.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80"
    }
];


const container = document.getElementById("product-container");


products.forEach(function(product) {


    const card = document.createElement("div");
    card.className = "card";


    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;


    const name = document.createElement("h2");
    name.textContent = product.name;


    const category = document.createElement("p");
    category.textContent = "Category: " + product.category;


    const price = document.createElement("p");
    price.className = "price";
    price.textContent = "₹" + product.price;


    const rating = document.createElement("p");
    rating.className = "rating";
    rating.textContent = "⭐ " + product.rating;


    const description = document.createElement("p");
    description.textContent = product.description;


    const button = document.createElement("button");
    button.textContent = "Buy Now";

    button.addEventListener("click", function() {
        alert("You clicked Buy Now for " + product.name);
    });


    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(category);
    card.appendChild(price);
    card.appendChild(rating);
    card.appendChild(description);
    card.appendChild(button);


    container.appendChild(card);
});
