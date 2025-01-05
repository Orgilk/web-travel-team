// import { Filter } from './filterModule.js';
// import { Destination } from './destinationModule.js';

// export class TravelFilter {
//     constructor() {
//         this.filter = new Filter("filterContainer", "searchName", "searchPlaces");
//         this.destination = new Destination();
//         this.baseUrl = "http://localhost:5005/api/destinations";
//         this.init();
//     }

//     async init() {
//         try {
//             const filters = await this.filter.fetchFilters("./filters.json");
//             this.filter.renderFilters(filters);
//             this.addEventListeners();
//             await this.renderArticles();
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     }

//     addEventListeners() {
//         this.filter.addEventListeners({
//             handleFilters: () => this.handleFilters()
//         });
//     }

//     async handleFilters() {
//         const selectedRegion = document.querySelector('input[name="sort"]:checked')?.value || "All";
//         const selectedPrice = document.querySelector('input[name="price"]:checked')?.value || "All";
//         const selectedRating = document.getElementById("ratingFilter").value || "All";
//         await this.renderArticles(selectedRegion, selectedPrice, selectedRating);
//     }

//     async renderArticles(filterRegion = "All", filterPrice = "All", filterRating = "All") {
//         this.cityGrid.innerHTML = "";
//         const data = await this.destination.fetchDestinations(this.baseUrl, filterRating, this.filter.searchPlacesInput.value);
//         const [minPrice, maxPrice] = this.destination.getPriceRange(filterPrice);

//         const filteredData = data.filter(item => {
//             const matchesRegion = filterRegion === "All" || item.region === filterRegion;
//             const matchesPrice = filterPrice === "All" || (item.price >= minPrice && item.price <= maxPrice);
//             const matchesRating = filterRating === "All" || item.rating >= parseInt(filterRating);
//             return matchesRegion && matchesPrice && matchesRating;
//         });

//         filteredData.forEach(item => this.destination.createArticle(item, this.cityGrid));
//     }
// }