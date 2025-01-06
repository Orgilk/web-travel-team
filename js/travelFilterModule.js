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

    async init() {
        try {
            const filters = await this.fetchFilters();
            renderFilters(filters, this.filterContainer);
            addFilterEventListeners(this.searchNameInput, this.searchPlacesInput, () => this.handleFilters());
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

    async handleFilters() {
        const selectedRegion = document.querySelector('input[name="sort"]:checked')?.value || "All";
        const selectedPrice = document.querySelector('input[name="price"]:checked')?.value || "All";
        const selectedRating = document.getElementById("ratingFilter").value || "All";

        await this.renderArticles(selectedRegion, this.searchNameInput.value, this.searchPlacesInput.value, selectedPrice, selectedRating);
    }

    async renderArticles(filterRegion = "All", searchName = "", searchPlaces = "", filterPrice = "All", filterRating = "All") {
        this.cityGrid.innerHTML = "";
        // baazaas medeelel avchirch bga
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
