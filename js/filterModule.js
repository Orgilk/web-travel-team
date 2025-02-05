export function renderFilters(filters, filterContainer) {
    // une bolon bairshliin neriig radio button bolgoj uusgej bga heseg
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

        filterContainer.appendChild(input);
        filterContainer.appendChild(label);
    });
}
// deed taliin search heseg deer songoson url-iig haruulna 
export function addFilterEventListeners(searchNameInput, searchPlacesInput, filterCallback) {
    const radioButtons = document.querySelectorAll('input[name="sort"], input[name="price"]');

    searchNameInput.addEventListener("input", filterCallback);
    searchPlacesInput.addEventListener("input", filterCallback);

    radioButtons.forEach(button => {
        button.addEventListener("change", () => {
            const selectedRegion = document.querySelector('input[name="sort"]:checked')?.value || "All";
            const selectedPrice = document.querySelector('input[name="price"]:checked')?.value || "All";

            // Update URL
            const url = new URL(window.location.href);
            url.searchParams.set("region", selectedRegion);
            url.searchParams.set("price", selectedPrice);

            // songoltoor
            url.searchParams.set("searchName", searchNameInput.value);
            url.searchParams.set("searchPlaces", searchPlacesInput.value);

            window.history.pushState({}, '', url);

            filterCallback(); // shuusen ur dung calback-aar renderlene
        });
    });

    document.getElementById("ratingFilter").addEventListener("change", filterCallback);
}
