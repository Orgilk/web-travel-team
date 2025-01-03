document.addEventListener("DOMContentLoaded", () => {
    // json file-s filter-n medeelliig avchirch bga heseg
    fetch("./filters.json")
        .then(response => response.json())
        .then(data => {
            const filterContainer = document.getElementById("filterContainer");

            //une bolon bairshliin neriig radio button bolgoj uusgej bga heseg
            data.radioContainer.forEach(filter => {
                const input = document.createElement("input");
                input.type = "radio";
                input.id = filter.id;
                input.name = filter.name;
                input.value = filter.value;
                if (filter.checked) input.checked = true;

                const label = document.createElement("label");
                label.htmlFor = filter.id;
                label.textContent = filter.label;

                filterContainer.appendChild(input);
                filterContainer.appendChild(label);
            });

            //deer uusgesen radio button-udin ard ni ymar uildel hiigdehiig zaaj ugch bga
            const radioButtons = document.querySelectorAll('input[name="sort"], input[name="price"]');
            const searchNameInput = document.getElementById('searchName');
            const searchPlacesInput = document.getElementById('searchPlaces');
            //search name input-n utgiig sonsoj bn --ene ni baazaas medeelel filter hiij bga
            searchNameInput.addEventListener('input', async () => {
                const selectedRegion = document.querySelector('input[name="sort"]:checked')?.value || 'All';
                const selectedPrice = document.querySelector('input[name="price"]:checked')?.value || 'All';
                const selectedRating = document.getElementById('ratingFilter').value || 'All';
                //ymar negen uildel hiigdeh burt filter hiih uildel ajillana
                await renderArticles(selectedRegion, searchNameInput.value, searchPlacesInput.value, selectedPrice, selectedRating);
            });
            //search place input-n utgiig sonsoj bn  
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
                    await renderArticles(selectedRegion, searchNameInput.value, searchPlacesInput.value, selectedPrice, selectedRating);
                });
            });

            // Rating filter listener
            document.getElementById('ratingFilter').addEventListener('change', async () => {
                const selectedRegion = document.querySelector('input[name="sort"]:checked')?.value || 'All';
                const selectedPrice = document.querySelector('input[name="price"]:checked')?.value || 'All';
                const selectedRating = document.getElementById('ratingFilter').value || 'All';
                await renderArticles(selectedRegion, '', '', selectedPrice, selectedRating);
            });

            const selectedRegion = document.querySelector('input[name="sort"]:checked')?.value || 'All';
            const selectedPrice = document.querySelector('input[name="price"]:checked')?.value || 'All';
            const selectedRating = document.getElementById('ratingFilter').value || 'All';
            renderArticles(selectedRegion, '', '', selectedPrice, selectedRating);
        })
        .catch(error => console.error("Error loading filters:", error));
});

//gazruudiin medeelliig baazaas avch irj bga heseg
const fetchDestinations = async (filterRating = 'All', searchName = '') => {
    console.log("filterrating: ", filterRating)
    try {
        // baazaas ugugdul haihdaa rating bolon name-r haina
        const url = new URL('http://localhost:5005/api/destinations');
        if (filterRating !== 'All') {
            url.searchParams.append('rating', filterRating);
        }
        if (searchName) {
            url.searchParams.append('name', searchName);
        }

        // request
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
const renderArticles = async (filterRegion = 'All', searchName = '', searchPlaces = '', filterPrice = 'All', filterRating = 'All') => {
    const cityGrid = document.querySelector('.city-grid');
    cityGrid.innerHTML = ''; // Clear grid

    // baazaas medeelel avchirch bga
    const data = await fetchDestinations(filterRating, searchPlaces);

    const [minPrice, maxPrice] = getPriceRange(filterPrice); // Get price range for filtering
    //baazaas irsen data deerees hailt hiij bga
    const filteredData = data.filter(item => {
        const matchesRegion = filterRegion === 'All' || item.region === filterRegion;
        const matchesName = searchName === 'All' || item.name.toLowerCase().includes(searchName.toLowerCase());
        const matchesPrice = filterPrice === 'All' || (item.price >= minPrice && item.price <= maxPrice);
        const matchesRating = filterRating === 'All' || item.rating >= parseInt(filterRating); // Compare with the rating
        return matchesRegion && matchesPrice && matchesName && matchesRating;
    });
    // irsen gazruudiin medeelliig urj bga heseg
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
                    <p>Үнэ: <span class="price">${item.price}</span></p>
                </div>
                <div class="flip-card-back">
                 <div class="favorite" data-id="${item.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="70" height="30">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </div>
                      <h4>${item.name}</h4>
                    <p>${item.description}</p>
                    <p>Region: ${item.region}</p>
                    <a href="${item.link}" class="learn-more">Цааш үзэх</a>
                </div>
            </div>
        `;
        cityGrid.appendChild(article);

        const favoriteButton = article.querySelector('.favorite');
        favoriteButton.addEventListener('click', () => {
            addToFavorites(item);
        });
    });
};

//gazriig favorite ru nemehed ashiglana
const addToFavorites = (destination) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!favorites.some(fav => fav.name === destination.name)) {
        favorites.push(destination); 
        localStorage.setItem('favorites', JSON.stringify(favorites)); 
        alert(`${destination.name} аялал дуртай газрын тоонд нэмэгдлээ`);
    } else {
        alert(`${destination.name} аль хэдийн дуртай газрын тоонд байна`);
    }
};
