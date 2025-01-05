// // utils.js
// export function calculateTotalPrice() {
//     const basePrice = Object.values(this.selectedOptions).reduce((sum, price) => sum + price, 0);
//     const totalPeople = (this.peopleCount.adults || 0) + (this.peopleCount.children || 0);
//     const totalPrice = basePrice * (totalPeople > 0 ? totalPeople : 1);

//     this.shadowRoot.getElementById('totalPrice').textContent = `Нийт үнэ: ${totalPrice.toLocaleString()}₮`;
// }

// export function updatePeopleCount() {
//     const adultCount = Math.max(parseInt(this.shadowRoot.getElementById('adult-count').value) || 0, 0);
//     const childCount = Math.max(parseInt(this.shadowRoot.getElementById('child-count').value) || 0, 0);

//     this.peopleCount.adults = adultCount;
//     this.peopleCount.children = childCount / 2;

//     calculateTotalPrice.call(this);
// }

// export function processBooking() {
//     const direction = this.getAttribute('direction');
//     let bookingList = JSON.parse(localStorage.getItem('bookingList')) || [];
//     if (!Object.values(this.selectedOptions).every(value => value > 0)) {
//         alert('Бүх сонголтоо хийнэ үү!');
//         return;
//     }

//     const sumPrice = Object.values(this.selectedOptions).reduce((sum, price) => sum + price, 0);
//     const totalPrice = sumPrice * ((this.peopleCount.adults || 0) + (this.peopleCount.children || 0));

//     const bookingDetails = {
//         duration: this.shadowRoot.querySelector('.option-card[data-type="duration"].selected')?.textContent.trim() || "",
//         hotel: this.shadowRoot.querySelector('.option-card[data-type="hotel"].selected')?.textContent.trim() || "",
//         meal: this.shadowRoot.querySelector('.option-card[data-type="meal"].selected')?.textContent.trim() || "",
//         transport: this.shadowRoot.querySelector('.option-card[data-type="transport"].selected')?.textContent.trim() || "",
//         adults: this.peopleCount.adults,
//         children: this.peopleCount.children === 0.5 ? 1 : this.peopleCount.children,
//         totalPrice,
//         sumPrice,
//         destination: direction || "huhnuur"
//     };

//     bookingList.push(bookingDetails);
//     localStorage.setItem('bookingList', JSON.stringify(bookingList));
//     alert('Захиалга амжилттай!');

//     fetch('http://localhost:5005/api/trips', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(bookingDetails)
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Захиалга нэмэгдлээ:', data);
//             alert('Захиалга амжилттай нэмэгдлээ!');
//             updateCartCount();
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('An error occurred while saving the booking.');
//         });
//     localStorage.setItem('bookingList', JSON.stringify(bookingList));
//     updateCartCount();
// }
