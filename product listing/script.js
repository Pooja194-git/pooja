document.addEventListener('DOMContentLoaded', () => {
    const productListElement = document.getElementById('productList');
    const categoryFilters = document.querySelectorAll('input[name="category"]');
    const priceRange = document.getElementById('priceRange');
    const priceValueElement = document.getElementById('priceValue');
    const sortOptions = document.getElementById('sortOptions');

    // --- Sample Product Data ---
    // In a real application, this would come from an API
    const allProducts = [
        { id: 1, name: "Laptop Pro", category: "electronics", price: 999.99, rating: 4.7, imageUrl: "https://cdn.mos.cms.futurecdn.net/FUi2wwNdyFSwShZZ7LaqWf-1200-80.jpg" },
        { id: 2, name: "Smartphone X", category: "electronics", price: 750.00, rating: 4.5, imageUrl: "https://opsg-img-cdn-gl.heytapimg.com/epb/202412/19/AceLeaXtntKw1AZf.png" },
        { id: 3, name: "Wireless Headphones", category: "electronics", price: 149.50, rating: 4.8, imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQTR3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1741643688482" },
        { id: 4, name: "Classic T-Shirt", category: "clothing", price: 25.00, rating: 4.2, imageUrl: "data:image/jpeg;base64,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" },
        { id: 5, name: "Running Shoes", category: "clothing", price: 89.90, rating: 4.6, imageUrl: "data:image/jpeg;base64,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" },
        { id: 6, name: "Denim Jeans", category: "clothing", price: 55.00, rating: 4.0, imageUrl: "https://m.media-amazon.com/images/I/81ird6ruikL._AC_UY1100_.jpg" },
        { id: 7, name: "Coffee Maker", category: "home", price: 45.00, rating: 4.3, imageUrl: "https://m.media-amazon.com/images/I/818gyfjYmZL.jpg" },
        { id: 8, name: "Plush Blanket", category: "home", price: 35.99, rating: 4.9, imageUrl: "https://m.media-amazon.com/images/I/81uTbbwaiRL.jpg" },
        { id: 9, name: "Cookware Set", category: "home", price: 120.00, rating: 4.4, imageUrl: "https://5.imimg.com/data5/SELLER/Default/2023/9/339831914/AE/RF/XL/138985375/nonstick-cookware-set.jpg" },
        { id: 10, name: "Sci-Fi Novel", category: "books", price: 15.99, rating: 4.8, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-SFA-wVv1EYQy1EL3rB3_W9jnBQBMpBsNyA&s" },
        { id: 11, name: "History Book", category: "books", price: 22.50, rating: 4.1, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlwETqbaE7UX7terJTLuhDTdxRzVOvgO8XEg&s" },
        { id: 12, name: "Cookbook", category: "books", price: 19.95, rating: 4.5, imageUrl: "https://m.media-amazon.com/images/I/91dxcfnV0mL._AC_UF1000,1000_QL80_.jpg" },
        { id: 13, name: "Gaming Mouse", category: "electronics", price: 60.00, rating: 4.6, imageUrl: "https://images.meesho.com/images/products/388602283/94ceg_512.webp" },
        { id: 14, name: "Winter Jacket", category: "clothing", price: 150.00, rating: 4.7, imageUrl: "https://cdn.shopify.com/s/files/1/0867/4417/0787/files/winter-jacket-for-men_480x480.jpg?v=1725260898" },
        { id: 15, name: "Desk Lamp", category: "home", price: 29.99, rating: 4.2, imageUrl: "https://m.media-amazon.com/images/I/71D2YNJoNNL.jpg" },
    ];

    // --- Function to Display Products ---
    function displayProducts(productsToDisplay) {
        productListElement.innerHTML = ''; // Clear current products

        if (productsToDisplay.length === 0) {
            productListElement.innerHTML = '<p class="no-results-message">No products match your criteria.</p>';
            return;
        }

        productsToDisplay.forEach(product => {
            const productCard = document.createElement('article');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="category">${product.category}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <p class="rating">Rating: ${product.rating} ★</p>
            `;
            productListElement.appendChild(productCard);
        });
    }

    // --- Function to Filter and Sort Products ---
    function filterAndSortProducts() {
        // Get current filter values
        const selectedCategory = document.querySelector('input[name="category"]:checked').value;
        const maxPrice = parseFloat(priceRange.value);
        const sortBy = sortOptions.value;

        // 1. Filtering
        let filteredProducts = allProducts.filter(product => {
            // Category filter
            const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
            // Price filter
            const priceMatch = product.price <= maxPrice;
            return categoryMatch && priceMatch;
        });

        // 2. Sorting
        switch (sortBy) {
            case 'rating_desc':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'price_asc':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price_desc':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name_asc':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'default':
            default:
                // Optional: sort by ID or keep original order if needed
                filteredProducts.sort((a, b) => a.id - b.id);
                break;
        }

        // 3. Display Results
        displayProducts(filteredProducts);
    }

    // --- Event Listeners ---

    // Price range slider update
    priceRange.addEventListener('input', () => {
        priceValueElement.textContent = priceRange.value;
        filterAndSortProducts(); // Re-filter and sort on price change
    });

    // Category filter change
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', filterAndSortProducts);
    });

    // Sort options change
    sortOptions.addEventListener('change', filterAndSortProducts);

    // --- Initial Load ---
    // Set initial price range max based on actual data (optional but good)
    const maxProductPrice = Math.max(...allProducts.map(p => p.price));
    priceRange.max = Math.ceil(maxProductPrice / 10) * 10; // Round up to nearest 10
    priceRange.value = priceRange.max; // Start with max price showing all
    priceValueElement.textContent = priceRange.max;

    // Display all products initially (with default sort)
    filterAndSortProducts();
});