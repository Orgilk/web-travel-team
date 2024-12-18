let selectedOptions = { duration: 0, hotel: 0, meal: 0, transport: 0 };
let peopleCount = { adults: 0, children: 0 };
// // function updateCartCount() {
//     const bookingList = JSON.parse(localStorage.getItem('bookingList')) || [];
//     const cartItemCountElement = document.getElementById('cartItemCount');
//     cartItemCountElement.textContent = bookingList.length;
// }
async function updateCartCount() {
    try {
        const response = await fetch('http://localhost:5005/api/trips', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        // Update the cart item count
        const cartItemCountElement = document.getElementById('cartItemCount');
        cartItemCountElement.textContent = data.length;

    } catch (error) {
        console.error('API call failed:', error.message);
    }
}
// Handle option card selections
document.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', function () {
        const type = this.getAttribute('data-type');
        const price = parseInt(this.getAttribute('data-price')) || 0;

        // Deselect other cards of the same type
        document.querySelectorAll(`.option-card[data-type="${type}"]`).forEach(otherCard => {
            otherCard.classList.remove('selected');
        });

        // Select this card
        this.classList.add('selected');
        selectedOptions[type] = price;

        calculateTotalPrice();
    });
});

// Update the people count
function updatePeopleCount() {
    const adultCount = Math.max(parseInt(document.getElementById('adult-count').value) || 0, 0);
    const childCount = Math.max(parseInt(document.getElementById('child-count').value) || 0, 0);

    peopleCount.adults = adultCount;
    peopleCount.children = childCount / 2;

    calculateTotalPrice();
}

// Calculate the total price
function calculateTotalPrice() {
    const basePrice = Object.values(selectedOptions).reduce((sum, price) => sum + price, 0);
    const totalPeople = (peopleCount.adults || 0) + (peopleCount.children || 0);
    const totalPrice = basePrice * (totalPeople > 0 ? totalPeople : 1);

    document.getElementById('totalPrice').textContent = `Нийт үнэ: ${totalPrice.toLocaleString()}₮`;
}

// Add event listeners for people count inputs
document.getElementById('adult-count').addEventListener('input', updatePeopleCount);
document.getElementById('child-count').addEventListener('input', updatePeopleCount);


// Process booking
function processBooking() {

    let bookingList = JSON.parse(localStorage.getItem('bookingList')) || []; // Retrieve existing bookings from localStorage
    if (!Object.values(selectedOptions).every(value => value > 0)) {
        alert('Бүх сонголтоо хийнэ үү!');
        return;
    }

    const totalPrice = Object.values(selectedOptions).reduce((sum, price) => sum + price, 0) *
        ((peopleCount.adults || 0) + (peopleCount.children || 0));
    const sumPrice = Object.values(selectedOptions).reduce((sum, price) => sum + price, 0);

    const bookingDetails = {
        duration: document.querySelector('.option-card[data-type="duration"].selected')?.textContent.trim() || "",
        hotel: document.querySelector('.option-card[data-type="hotel"].selected')?.textContent.trim() || "",
        meal: document.querySelector('.option-card[data-type="meal"].selected')?.textContent.trim() || "",
        transport: document.querySelector('.option-card[data-type="transport"].selected')?.textContent.trim() || "",
        adults: peopleCount.adults || 0,
        children: peopleCount.children == 0.5 ? 1 : peopleCount.children || 0,
        sumPrice,
        totalPrice,
        destination: "huhnuur"
    };
    console.log("bookingDe: ", bookingDetails)
    bookingList.push(bookingDetails);

    fetch('http://localhost:5005/api/trips', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingDetails)  // Convert the bookingDetails object to JSON format
    })
        .then(response => response.json())
        .then(data => {
            console.log('Trip added:', data);
            alert('Your booking has been successfully added!');
            updateCartCount();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while saving the booking.');
        });
    // Save the updated bookingList to localStorage
    localStorage.setItem('bookingList', JSON.stringify(bookingList));
    updateCartCount();


    // window.location.href = 'payment.html';
}
