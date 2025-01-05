// export class Destination {
//     async fetchDestinations(baseUrl, filterRating = "All", searchPlaces = "") {
//         try {
//             const url = new URL(baseUrl);
//             if (filterRating !== "All") url.searchParams.append("rating", filterRating);
//             if (searchPlaces) url.searchParams.append("name", searchPlaces);
//             const response = await fetch(url.toString());
//             if (!response.ok) throw new Error("Failed to fetch destinations");
//             return await response.json();
//         } catch (error) {
//             console.error("Error:", error);
//             return [];
//         }
//     }

//     getPriceRange(priceRange) {
//         const priceRanges = {
//             "0-150000": [0, 150000],
//             "150000-250000": [150000, 250000],
//             "250000-350000": [250000, 350000],
//             "350000+": [350000, Infinity],
//         };
//         return priceRanges[priceRange] || [0, Infinity];
//     }

//     createArticle(item, cityGrid) {
//         const article = document.createElement("article");
//         article.setAttribute("data-region", item.region);

//         const stars = "★".repeat(item.rating) + "☆".repeat(5 - item.rating);
//         article.innerHTML = `
//             <div class="flip-card">
//                 <div class="flip-card-front">
//                     <img src="${item.image}" alt="${item.name}">
//                     <h4>${item.name}</h4>
//                     <div class="rating" title="${item.rating} out of 5 stars">
//                         <span class="stars">${stars}</span>
//                     </div>
//                     <p>Үнэ: <span class="price">${item.price}</span></p>
//                 </div>
//                 <div class="flip-card-back">
//                     <div class="favorite" data-id="${item.id}">
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="70" height="30">
//                             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="currentColor" stroke-width="2"/>
//                         </svg>
//                     </div>
//                     <h4>${item.name}</h4>
//                     <p>${item.description}</p>
//                     <p>Region: ${item.region}</p>
//                     <a href="${item.link}" class="learn-more">Цааш үзэх</a>
//                 </div>
//             </div>
//         `;

//         cityGrid.appendChild(article);
//     }

//     addToFavorites(destination) {
//         let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
//         if (!favorites.some(fav => fav.name === destination.name)) {
//             favorites.push(destination);
//             localStorage.setItem("favorites", JSON.stringify(favorites));
//             alert(`${destination.name} аялал дуртай газрын тоонд нэмэгдлээ`);
//         } else {
//             alert(`${destination.name} аль хэдийн дуртай газрын тоонд байна`);
//         }
//     }
// }