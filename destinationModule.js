import { getData } from "../app.js";

export async function fetchDestinations(filterRating = "All", searchPlaces = "") {
    try {
        const params = new URLSearchParams();

        if (filterRating !== "All") {
            params.append("rating", filterRating);
        }

        if (searchPlaces) {
            params.append("name", searchPlaces);
        }

        // Use the getData function with the `destinations` endpoint and search parameters
        const url = `destinations?${params.toString()}`;
        const data = await getData(url); // Fetch data using getData function

        return data;
    } catch (error) {
        console.error("Error fetching destinations:", error);
        return [];
    }
}

export function getPriceRange(priceRange) {
    const priceRanges = {
        "0-150000": [0, 150000],
        "150000-250000": [150000, 250000],
        "250000-350000": [250000, 350000],
        "350000+": [350000, Infinity],
    };
    return priceRanges[priceRange] || [0, Infinity];
}

// irsen gazruudiin medeelliig urj bga heseg
export function createArticle(item, cityGrid, addToFavorites) {
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

    cityGrid.appendChild(article);

    const favoriteButton = article.querySelector(".favorite");
    favoriteButton.addEventListener("click", () => {
        // Call the addToFavorites function
        addToFavorites(item);

        // Dispatch a custom event
        const event = new CustomEvent("favoriteToggled", {
            detail: { item },
        });
        favoriteButton.dispatchEvent(event);
    });
}
