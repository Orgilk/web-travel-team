// // api.js
// export async function updateCartCount() {
//     try {
//         const response = await fetch('http://localhost:5005/api/trips', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (!response.ok) {
//             throw new Error(`Error: ${response.status} ${response.statusText}`);
//         }

//         const data = await response.json();
//         const cartItemCountElement = document.getElementById('cartItemCount');
//         cartItemCountElement.textContent = data.length;

//     } catch (error) {
//         console.error('API call failed:', error.message);
//     }
// }
