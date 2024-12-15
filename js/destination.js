document.addEventListener("DOMContentLoaded", () => {
    // Fetch the JSON file
    fetch("./filters.json")
        .then(response => response.json())
        .then(data => {
            const filterContainer = document.getElementById("filterContainer");

            // Generate radio buttons from JSON
            data.radioContainer.forEach(filter => {
                // Create input element
                const input = document.createElement("input");
                input.type = "radio";
                input.id = filter.id;
                input.name = filter.name;
                input.value = filter.value;
                if (filter.checked) input.checked = true;

                // Create label element
                const label = document.createElement("label");
                label.htmlFor = filter.id;
                label.textContent = filter.label;

                // Append to container
                filterContainer.appendChild(input);
                filterContainer.appendChild(label);
            });

            // Attach event listeners after radio buttons are created
            const radioButtons = document.querySelectorAll('input[name="sort"], input[name="price"]');
            const searchNameInput = document.getElementById('searchName');
            const searchPlacesInput = document.getElementById('searchPlaces');

            searchNameInput.addEventListener('input', async () => {
                const selectedRegion = document.querySelector('input[name="sort"]:checked')?.value || 'All';
                const selectedPrice = document.querySelector('input[name="price"]:checked')?.value || 'All';
                const selectedRating = document.getElementById('ratingFilter').value || 'All';
                await renderArticles(selectedRegion, searchNameInput.value, searchPlacesInput.value, selectedPrice, selectedRating);
            });
            
            searchPlacesInput.addEventListener('input', async () => {
                const selectedRegion = document.querySelector('input[name="sort"]:checked')?.value || 'All';
                const selectedPrice = document.querySelector('input[name="price"]:checked')?.value || 'All';
                const selectedRating = document.getElementById('ratingFilter').value || 'All';
                await renderArticles(selectedRegion, searchNameInput.value, searchPlacesInput.value, selectedPrice, selectedRating);
            });
            radioButtons.forEach(button => {
                button.addEventListener('change', async () => {
                    const selectedRegion = document.querySelector('input[name="sort"]:checked')?.value || 'All';
                    const selectedPrice = document.querySelector('input[name="price"]:checked')?.value || 'All';
                    const selectedRating = document.getElementById('ratingFilter').value || 'All';
                    await renderArticles(selectedRegion, searchName.value, searchPlaces.value, selectedPrice, selectedRating);
                });
            });

            searchInput.addEventListener('input', async () => {
                const selectedRegion = document.querySelector('input[name="sort"]:checked')?.value || 'All';
                const selectedPrice = document.querySelector('input[name="price"]:checked')?.value || 'All';
                await renderArticles(selectedRegion, searchInput.value, selectedPrice);
            });

            document.getElementById('ratingFilter').addEventListener('change', async () => {
                const selectedRegion = document.querySelector('input[name="sort"]:checked')?.value || 'All';
                const selectedPrice = document.querySelector('input[name="price"]:checked')?.value || 'All';
                const selectedRating = document.getElementById('ratingFilter').value || 'All';
                await renderArticles(selectedRegion, '', selectedPrice, selectedRating);
            });            

            document.getElementById('searchButton').addEventListener('click', async () => {
                const searchPlaces = document.getElementById('searchPlaces').value || '';
                const searchName = document.getElementById('searchName').value || '';
                const selectedRegion = document.querySelector('input[name="sort"]:checked')?.value || 'All';
                const selectedPrice = document.querySelector('input[name="price"]:checked')?.value || 'All';
                const selectedRating = document.getElementById('ratingFilter').value || 'All';
            
                await renderArticles(selectedRegion, searchName, searchPlaces, selectedPrice, selectedRating);
            });
            
            
            // Initial render with default filters
            const selectedRegion = document.querySelector('input[name="sort"]:checked')?.value || 'All';
            const selectedPrice = document.querySelector('input[name="price"]:checked')?.value || 'All';
            renderArticles(selectedRegion, '', selectedPrice);
        })
        .catch(error => console.error("Error loading filters:", error));
});

const fetchDestinations = async (filterRating = 'All', searchName = '') => {
    try {
        // Construct the URL with query parameters
        const url = new URL('http://localhost:5000/api/destinations');
        if (filterRating !== 'All') {
            url.searchParams.append('rating', filterRating);
        }
        if (searchName) {
            url.searchParams.append('name', searchName);
        }

        // Make the request
        const response = await fetch(url.toString());
        if (!response.ok) throw new Error('Failed to fetch destinations');

        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

const getPriceRange = (priceRange) => {
    const priceRanges = {
        '0-150000': [0, 150000],
        '150000-250000': [150000, 250000],
        '250000-350000': [250000, 350000],
        '350000+': [350000, Infinity],
    };
    return priceRanges[priceRange] || [0, Infinity];
};
const renderArticles = async (filterRegion = 'All', searchName = '',searchPlaces='', filterPrice = 'All', filterRating = 'All') => {
    const cityGrid = document.querySelector('.city-grid');
    cityGrid.innerHTML = ''; // Clear grid

    // Pass searchName and other filters to fetchDestinations
    const data = await fetchDestinations(filterRating, searchPlaces);

    const [minPrice, maxPrice] = getPriceRange(filterPrice); // Get price range for filtering

    const filteredData = data.filter(item => {
        const matchesRegion = filterRegion === 'All' || item.region === filterRegion;
        const matchesName = searchName === 'All' || item.name.toLowerCase().includes(searchName.toLowerCase());
        const matchesPrice = filterPrice === 'All' || (item.price >= minPrice && item.price <= maxPrice);
        return matchesRegion && matchesPrice && matchesName;
    });
    filteredData.forEach(item => {
        const article = document.createElement('article');
        article.setAttribute('data-region', item.region);

        const stars = '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating);
        article.innerHTML = `
            <div class="flip-card">
                <div class="flip-card-front">
                    <img src="${item.image}" alt="${item.name}">
                    <h4>${item.name}</h4>
                    <div class="rating" title="${item.rating} out of 5 stars">
                        <span class="stars">${stars}</span>
                    </div>
                    <p>Price: <span class="price">${item.price}</span></p>
                </div>
                <div class="flip-card-back">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                    <p>Region: ${item.region}</p>
                    <a href="${item.link}" class="learn-more">Learn More</a>
                    <div class="favorite" data-id="${item.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="70" height="30">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </div>
                </div>
            </div>
        `;
        cityGrid.appendChild(article);

        // Add click event listener to the favorite button
        const favoriteButton = article.querySelector('.favorite');
        favoriteButton.addEventListener('click', () => {
            addToFavorites(item);
        });
    });
};


// const renderArticles = async (filterRegion = 'All', searchTerm = '', filterPrice = 'All') => {
//     const cityGrid = document.querySelector('.city-grid');
//     cityGrid.innerHTML = ''; // Clear grid

//     const data = await fetchDestinations(); // Fetch data from API
//     const [minPrice, maxPrice] = getPriceRange(filterPrice); // Get price range for filtering

//     const filteredData = data.filter(item => {
//         const matchesRegion = filterRegion === 'All' || item.region === filterRegion;
//         const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesPrice = filterPrice === 'All' || (item.price >= minPrice && item.price <= maxPrice);
//         return matchesRegion && matchesSearch && matchesPrice;
//     });

//     filteredData.forEach(item => {
//         const article = document.createElement('article');
//         article.setAttribute('data-region', item.region);

//         const stars = '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating);
//         article.innerHTML = `
//             <div class="flip-card">
//                 <div class="flip-card-front">
//                     <img src="${item.image}" alt="${item.name}">
//                     <h4>${item.name}</h4>
//                     <div class="rating" title="${item.rating} out of 5 stars">
//                         <span class="stars">${stars}</span>
//                     </div>
//                     <p>Price: <span class="price">${item.price}</span></p>
//                 </div>
//                 <div class="flip-card-back">
//                     <h4>${item.name}</h4>
//                     <p>${item.description}</p>
//                     <p>Region: ${item.region}</p>
//                     <a href="${item.link}" class="learn-more">Learn More</a>
//                     <div class="favorite" data-id="${item.id}">
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="70" height="30">
//                             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="currentColor" stroke-width="2"/>
//                         </svg>
//                     </div>
//                 </div>
//             </div>
//         `;
//         cityGrid.appendChild(article);

//         // Add click event listener to the favorite button
//         const favoriteButton = article.querySelector('.favorite');
//         favoriteButton.addEventListener('click', () => {
//             addToFavorites(item);
//         });
//     });
// };

const addToFavorites = (destination) => {
    // Get the current favorites from localStorage or an empty array if none exists
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check if the destination is already in favorites
    if (!favorites.some(fav => fav.name === destination.name)) {
        favorites.push(destination); // Add to favorites
        localStorage.setItem('favorites', JSON.stringify(favorites)); // Save to localStorage
        alert(`${destination.name} has been added to your favorites!`);
    } else {
        alert(`${destination.name} is already in your favorites.`);
    }
};
