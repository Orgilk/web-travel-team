class TravelFilter {
    constructor() {
        this.filterContainer = document.getElementById("filterContainer");
        this.searchNameInput = document.getElementById("searchName");
        this.searchPlacesInput = document.getElementById("searchPlaces");
        this.cityGrid = document.querySelector(".city-grid");
        this.init();
    }
  // json file-s filter-n medeelliig avchirch bga heseg
    async init() {
        try {
            const filters = await this.fetchFilters();
            this.renderFilters(filters);
            this.addEventListeners();
            await this.renderArticles();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async fetchFilters() {
        const response = await fetch("./filters.json");
        if (!response.ok) throw new Error("Failed to fetch filters");
        return await response.json();
    }

     //une bolon bairshliin neriig radio button bolgoj uusgej bga heseg
    renderFilters(filters) {
        filters.radioContainer.forEach(filter => {
            const input = document.createElement("input");
            input.type = "radio";
            input.id = filter.id;
            input.name = filter.name;
            input.value = filter.value;
            if (filter.checked) input.checked = true;

            const label = document.createElement("label");
            label.htmlFor = filter.id;
            label.textContent = filter.label;

            this.filterContainer.appendChild(input);
            this.filterContainer.appendChild(label);
        });
    }

    addEventListeners() {
        const radioButtons = document.querySelectorAll('input[name="sort"], input[name="price"]');

        this.searchNameInput.addEventListener("input", () => this.handleFilters());
        this.searchPlacesInput.addEventListener("input", () => this.handleFilters());

        radioButtons.forEach(button => {
            button.addEventListener("change", () => this.handleFilters());
        });

        document.getElementById("ratingFilter").addEventListener("change", () => this.handleFilters());
    }

    async handleFilters() {
        const selectedRegion = document.querySelector('input[name="sort"]:checked')?.value || "All";
        const selectedPrice = document.querySelector('input[name="price"]:checked')?.value || "All";
        const selectedRating = document.getElementById("ratingFilter").value || "All";

        await this.renderArticles(selectedRegion, this.searchNameInput.value, this.searchPlacesInput.value, selectedPrice, selectedRating);
    }
//gazruudiin medeelliig baazaas avch irj bga heseg
    async fetchDestinations(filterRating = "All", searchPlaces = "") {
        try {
             // baazaas ugugdul haihdaa rating bolon name-r haina
            const url = new URL("http://localhost:5005/api/destinations");

            if (filterRating !== "All") {
                url.searchParams.append("rating", filterRating);
            }

            if (searchPlaces) {
                url.searchParams.append("name", searchPlaces);
            }
              // request
            const response = await fetch(url.toString());
            if (!response.ok) throw new Error("Failed");

            return await response.json();
        } catch (error) {
            console.error("Error:", error);
            return [];
        }
    }

    getPriceRange(priceRange) {
        const priceRanges = {
            "0-150000": [0, 150000],
            "150000-250000": [150000, 250000],
            "250000-350000": [250000, 350000],
            "350000+": [350000, Infinity],
        };
        return priceRanges[priceRange] || [0, Infinity];
    }

    async renderArticles(filterRegion = "All", searchName = "", searchPlaces = "", filterPrice = "All", filterRating = "All") {
        this.cityGrid.innerHTML = "";
       // baazaas medeelel avchirch bga
        const data = await this.fetchDestinations(filterRating, searchPlaces);
        const [minPrice, maxPrice] = this.getPriceRange(filterPrice);

        const filteredData = data.filter(item => {
            const matchesRegion = filterRegion === "All" || item.region === filterRegion;
            const matchesName = searchName === "" || item.name.toLowerCase().includes(searchName.toLowerCase());
            const matchesPrice = filterPrice === "All" || (item.price >= minPrice && item.price <= maxPrice);
            const matchesRating = filterRating === "All" || item.rating >= parseInt(filterRating);
            return matchesRegion && matchesPrice && matchesName && matchesRating;
        });

        filteredData.forEach(item => this.createArticle(item));
    }

    // une bolon region-oor url gargaj baiga heseg
    addEventListeners() {
        const radioButtons = document.querySelectorAll('input[name="sort"], input[name="price"]');
    
        this.searchNameInput.addEventListener("input", () => this.handleFilters());
        this.searchPlacesInput.addEventListener("input", () => this.handleFilters());
    
        radioButtons.forEach((button) => {
            button.addEventListener("change", () => {
                const selectedRegion = document.querySelector('input[name="sort"]:checked')?.value || "All";
                const selectedPrice = document.querySelector('input[name="price"]:checked')?.value || "All";
    
                // Update URL songoltooro
                const url = new URL(window.location.href);
                url.searchParams.set("region", selectedRegion);
                url.searchParams.set("price", selectedPrice);
                window.history.pushState({}, '', url);
    
                this.handleFilters(); // Update articles url uurchilsni daraa 
            });
        });
    
        document.getElementById("ratingFilter").addEventListener("change", () => this.handleFilters());
    }
    
    
    // irsen gazruudiin medeelliig urj bga heseg
    createArticle(item) {
        const article = document.createElement("article");
        article.setAttribute("data-region", item.region);

        const stars = "★".repeat(item.rating) + "☆".repeat(5 - item.rating);
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

        this.cityGrid.appendChild(article);

        const favoriteButton = article.querySelector(".favorite");
        favoriteButton.addEventListener("click", () => this.addToFavorites(item));
    }

    addToFavorites(destination) {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (!favorites.some(fav => fav.name === destination.name)) {
            favorites.push(destination);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            alert(`${destination.name} аялал дуртай газрын тоонд нэмэгдлээ`);
        } else {
            alert(`${destination.name} аль хэдийн дуртай газрын тоонд байна`);
        }
    }
}

// Dom achaalagdsan ued class-iig ehluulne
document.addEventListener("DOMContentLoaded", () => {
    new TravelFilter();
});