import { postData } from "../app.js";

export function calculateTotalPrice(element) {
    if (!element) return; 

    const basePrice = Object.values(element.selectedOptions).reduce((sum, price) => sum + price, 0);
    const totalPeople = (element.peopleCount.adults || 0) + (element.peopleCount.children || 0);
    if (totalPeople === 0) {
        element.shadowRoot.getElementById('totalPrice').textContent = `Нийт үнэ: 0₮`;
        return;
    }
    const totalPrice = basePrice * totalPeople;
    element.shadowRoot.getElementById('totalPrice').textContent = `Нийт үнэ: ${totalPrice.toLocaleString()}₮`;
}



export async function updateCartCount() {
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
        const cartItemCountElement = document.getElementById('cartItemCount');
        cartItemCountElement.textContent = data.length;

    } catch (error) {
        console.error('API call failed:', error.message);
    }
}


export function handleOptionCardClick(event, context) {
    const card = event.currentTarget;
    const type = card.getAttribute('data-type');
    const price = parseInt(card.getAttribute('data-price')) || 0;

    context.shadowRoot.querySelectorAll(`.option-card[data-type="${type}"]`).forEach(otherCard => {
        otherCard.classList.remove('selected');
        const imgSection = otherCard.querySelector('.booking-selection');
        if (imgSection) imgSection.style.display = 'none'; 
    });

    card.classList.add('selected');
    const imgSection = card.querySelector('.booking-selection');
    if (imgSection) imgSection.style.display = 'block'; 

    context.selectedOptions[type] = price;
    calculateTotalPrice(context);

}

export function updatePeopleCount(context) {
    const adultCount = Math.max(parseInt(context.shadowRoot.getElementById('adult-count').value) || 0, 0);
    const childCount = Math.max(parseInt(context.shadowRoot.getElementById('child-count').value) || 0, 0);

    context.peopleCount.adults = adultCount;
    context.peopleCount.children = childCount / 2;
    calculateTotalPrice(context);

}
export function processBooking(context) {
    const direction = context.getAttribute('direction');
    let bookingList = JSON.parse(localStorage.getItem('bookingList')) || [];
    
    if (!Object.values(context.selectedOptions).every(value => value > 0)) {
        alert('Бүх сонголтоо хийнэ үү!');
        return;
    }

    const sumPrice = Object.values(context.selectedOptions).reduce((sum, price) => sum + price, 0);
    const totalPrice = sumPrice * ((context.peopleCount.adults || 0) + (context.peopleCount.children || 0));

    const bookingDetails = {
        duration: context.shadowRoot.querySelector('.option-card[data-type="duration"].selected')?.textContent.trim() || "",
        hotel: context.shadowRoot.querySelector('.option-card[data-type="hotel"].selected')?.textContent.trim() || "",
        meal: context.shadowRoot.querySelector('.option-card[data-type="meal"].selected')?.textContent.trim() || "",
        transport: context.shadowRoot.querySelector('.option-card[data-type="transport"].selected')?.textContent.trim() || "",
        adults: context.peopleCount.adults,
        children: context.peopleCount.children === 0.5 ? 1 : context.peopleCount.children,
        totalPrice,
        sumPrice,
        destination: direction || "huhnuur"
    };

    bookingList.push(bookingDetails);
    localStorage.setItem('bookingList', JSON.stringify(bookingList));
    alert('Захиалга амжилттай!');

    // Use the postData helper function to send data to the API
    postData('trips', bookingDetails)
        .then(data => {
            console.log('Захиалга нэмэгдлээ:', data);
            alert('Захиалга амжилттай нэмэгдлээ!');
            updateCartCount();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while saving the booking.');
        });

    updateCartCount();
}