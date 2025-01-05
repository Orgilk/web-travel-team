// // render.js
// export function loadOptionsData() {
//     try {
//         this.render();
//         this.attachEventListeners();
//     } catch (error) {
//         console.error('Error loading JSON data:', error);
//     }
// }

// export function createBookingSection(title, type, options) {
//     return `
//         <div class="booking-section">
//             <h2>${title}</h2>
//             <div class="option-grid">
//                 ${options.map(option => `
//                     <div class="option-card" data-type="${type}" data-price="${option.price}">
//                         <h3>${option.text}</h3>
//                         <p>${option.desc}</p>
//                         <p>Үнэ: ${option.price.toLocaleString()}₮</p>
//                         <div class="booking-selection" style="display: none;">
//                             ${option.images ? option.images.map(image => `
//                                 <img src="${image}" alt="Option image" class="booking-image">
//                             `).join('') : ''}
//                         </div>
//                     </div>
//                 `).join('')}
//             </div>
//         </div>
//     `;
// }
