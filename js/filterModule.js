// export class Filter {
//     constructor(filterContainerId, searchNameId, searchPlacesId) {
//         this.filterContainer = document.getElementById(filterContainerId);
//         this.searchNameInput = document.getElementById(searchNameId);
//         this.searchPlacesInput = document.getElementById(searchPlacesId);
//         this.cityGrid = document.querySelector(".city-grid");
//     }

//     async fetchFilters(url) {
//         const response = await fetch(url);
//         if (!response.ok) throw new Error("Failed to fetch filters");
//         return await response.json();
//     }

//     renderFilters(filters) {
//         filters.radioContainer.forEach(filter => {
//             const input = document.createElement("input");
//             input.type = "radio";
//             input.id = filter.id;
//             input.name = filter.name;
//             input.value = filter.value;
//             if (filter.checked) input.checked = true;

//             const label = document.createElement("label");
//             label.htmlFor = filter.id;
//             label.textContent = filter.label;

//             this.filterContainer.appendChild(input);
//             this.filterContainer.appendChild(label);
//         });
//     }

//     addEventListeners(callbacks) {
//         this.searchNameInput.addEventListener("input", () => callbacks.handleFilters());
//         this.searchPlacesInput.addEventListener("input", () => callbacks.handleFilters());
//     }
// }