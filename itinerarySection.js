class ItinerarySection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentSlideIndex = 0;
        this.itenary = new Map(); 
    }

    connectedCallback() {
        this.loadStyles();
        const itineraryData = this.getAttribute('data-days')
            ? JSON.parse(this.getAttribute('data-days'))
            : this.getDefaultItinerary();

        // Populate the Map with itinerary data
        itineraryData.forEach((slide, index) => {
            this.itenary.set(index + 1, slide); // Use the day number as the key
        });

        this.render();
        this.addEventListeners();
    }

    loadStyles() {
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './css/styles.css');
        this.shadowRoot.appendChild(link);
    }

    // Default itinerary data
    getDefaultItinerary() {
        return [
            { img: 'assets/huwsgul.jpg', title: '1-р өдөр - Хүрэлцэн ирэх', description: 'Хөвсгөл нуурт хүрэлцэн ирж, амрах байранд буудаллана.' },
            { img: 'assets/hikHuwsgul.jpg', title: '2-р өдөр - Нуурын аялал', description: 'Нуурын тойрон аялал, хөтөч гидтэй танилцах.' },
            { img: 'assets/huwsg.png', title: '3-р өдөр - Соёлын танилцуулга', description: 'Өрхийн уламжлалт амьдралтай танилцах.' },
        ];
    }

    // Render the itinerary
    render() {
        let slidesHTML = '';
        
        this.itenary.forEach((slide, key) => { 
            slidesHTML += `
                <div class="day-card">
                    <img src="${slide.img}" alt="${slide.title}">
                    <div class="day-details">
                        <h3>${slide.title}</h3>
                        <p>${slide.description}</p>
                    </div>
                </div>
            `;
        });

        this.shadowRoot.innerHTML += `
            <section class="itinerary-section">
                <h2>Аяллын Хөтөлбөр</h2>
                <div class="slider-container">
                    <button class="slider-btn prev">←</button>
                    <div class="day-cards">
                        ${slidesHTML}
                    </div>
                    <button class="slider-btn next">→</button>
                </div>
            </section>
        `;
    }

    // Add event listeners for navigation
    addEventListeners() {
        const prevBtn = this.shadowRoot.querySelector('.prev');
        const nextBtn = this.shadowRoot.querySelector('.next');
        const cardsContainer = this.shadowRoot.querySelector('.day-cards');

        prevBtn.addEventListener('click', () => this.moveSlide(-1, cardsContainer));
        nextBtn.addEventListener('click', () => this.moveSlide(1, cardsContainer));
    }

    // Move through slides
    moveSlide(direction, container) {
        this.currentSlideIndex += direction;
        if (this.currentSlideIndex < 0) {
            this.currentSlideIndex = this.itenary.size - 1; // Use 'itenary' here instead of 'card'
        } else if (this.currentSlideIndex >= this.itenary.size) {
            this.currentSlideIndex = 0;
        }

        const offset = -this.currentSlideIndex * 100;
        container.style.transform = `translateX(${offset}%)`;
    }
}

customElements.define('itinerary-section', ItinerarySection);
