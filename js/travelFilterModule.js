import { fetchDestinations, getPriceRange, createArticle } from "./destinationModule.js";
import { renderFilters, addFilterEventListeners } from "./filterModule.js";

export class TravelFilter {
    constructor() {
        this.filterContainer = document.getElementById("filterContainer");
        this.searchNameInput = document.getElementById("searchName");
        this.searchPlacesInput = document.getElementById("searchPlaces");
        this.cityGrid = document.querySelector(".city-grid");
        this.init();
    }
    setRadioButtonValue(groupName, value) {
        const radioButtons = document.querySelectorAll(`input[name="${groupName}"]`);
        radioButtons.forEach(button => {
            if (button.value === value) {
                button.checked = true;
            }
        });
    }
    
    async init() {
        try {
            const filters = await this.fetchFilters();
            renderFilters(filters, this.filterContainer);
            addFilterEventListeners(this.searchNameInput, this.searchPlacesInput, () => this.handleFilters());
    
            // parameteriig URL-aas unshina
            const urlParams = new URLSearchParams(window.location.search);
            const regionFromUrl = urlParams.get("region") || "All";
            const priceFromUrl = urlParams.get("price") || "All";
            const ratingFromUrl = urlParams.get("rating") || "All";
            const searchNameFromUrl = urlParams.get("searchName") || "";
            const searchPlacesFromUrl = urlParams.get("searchPlaces") || "";
    
    
            // Set radio buttons based on URL parameters
            this.setRadioButtonValue('sort', regionFromUrl);  // For region filter
            this.setRadioButtonValue('price', priceFromUrl);  // For price filter
            document.getElementById("ratingFilter").value = ratingFromUrl; // Set rating filter
    
            // Trigger filter rendering based on URL parameters
            await this.renderArticles(regionFromUrl, searchNameFromUrl, searchPlacesFromUrl, priceFromUrl, ratingFromUrl);
    
            // Call handleFilters to apply any filters if needed (if they haven't been applied already)
            this.handleFilters();
    
        } catch (error) {
            console.error("Error:", error);
        }
    }
    

    async fetchFilters() {
        const response = await fetch("./filters.json");
        if (!response.ok) throw new Error("Failed to fetch filters");
        return await response.json();
    }
    async handleFilters() {
        // Read parameters from the URL
        const urlParams = new URLSearchParams(window.location.search);
        console.log("urlParams: ", urlParams)
        const selectedRegion = urlParams.get("region") || "All";
        const selectedPrice = urlParams.get("price") || "All";
        const selectedRating = urlParams.get("rating") || "All";
        const searchName = this.searchNameInput.value || "";
        const searchPlaces = this.searchPlacesInput.value || "";
    
        // Call renderArticles with these parameters
        await this.renderArticles(selectedRegion, searchName, searchPlaces, selectedPrice, selectedRating);
    }
    
    async renderArticles(filterRegion = "All", searchName = "", searchPlaces = "", filterPrice = "All", filterRating = "All") {
        this.cityGrid.innerHTML = "";
        // Fetch data with the current filters
        const data = await fetchDestinations(filterRating, searchPlaces);
        const [minPrice, maxPrice] = getPriceRange(filterPrice);
    
        const filteredData = data.filter(item => {
            const matchesRegion = filterRegion === "All" || item.region === filterRegion;
            const matchesName = searchName === "" || item.name.toLowerCase().includes(searchName.toLowerCase());
            const matchesPrice = filterPrice === "All" || (item.price >= minPrice && item.price <= maxPrice);
            const matchesRating = filterRating === "All" || item.rating >= parseInt(filterRating);
            return matchesRegion && matchesPrice && matchesName && matchesRating;
        });
    
        filteredData.forEach(item => createArticle(item, this.cityGrid, this.addToFavorites.bind(this)));
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
