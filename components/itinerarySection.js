class ItinerarySection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentSlideIndex = 0;
        this.slides = [];
    }

    connectedCallback() {
        this.loadStyles();

        const itineraryData = this.getAttribute('data-days') 
            ? JSON.parse(this.getAttribute('data-days')) 
            : this.getDefaultItinerary();

        this.slides = itineraryData;

        this.render();
        this.addEventListeners();
    }

    loadStyles() {
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './css/styles.css'); // Path to your CSS file
        this.shadowRoot.appendChild(link);
    }
    //urdaas data ireegu bol haruulna
    getDefaultItinerary() {
        return [
            { img: 'assets/huwsgul.jpg', title: '1-р өдөр - Хүрэлцэн ирэх', description: 'Хөвсгөл нуурт хүрэлцэн ирж, амрах байранд буудаллана.' },
            { img: 'assets/hikHuwsgul.jpg', title: '2-р өдөр - Нуурын аялал', description: 'Нуурын тойрон аялал, хөтөч гидтэй танилцах.' },
            { img: 'assets/huwsg.png', title: '3-р өдөр - Соёлын танилцуулга', description: 'Өрхийн уламжлалт амьдралтай танилцах.' },
        ];
    }
    //damjij irsen datag set hiij haruuj bga
    render() {
        const slidesHTML = this.slides
            .map(slide => `
                <div class="day-card">
                    <img src="${slide.img}" alt="${slide.title}">
                    <div class="day-details">
                        <h3>${slide.title}</h3>
                        <p>${slide.description}</p>
                    </div>
                </div>
            `)
            .join('');

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
    //uragshaa hoishoo guilgehiig handle hiij bga
    addEventListeners() {
        const prevBtn = this.shadowRoot.querySelector('.prev');
        const nextBtn = this.shadowRoot.querySelector('.next');
        const cardsContainer = this.shadowRoot.querySelector('.day-cards');

        prevBtn.addEventListener('click', () => this.moveSlide(-1, cardsContainer));
        nextBtn.addEventListener('click', () => this.moveSlide(1, cardsContainer));
    }

    moveSlide(direction, container) {
        this.currentSlideIndex += direction;
        if (this.currentSlideIndex < 0) {
            this.currentSlideIndex = this.slides.length - 1;
        } else if (this.currentSlideIndex >= this.slides.length) {
            this.currentSlideIndex = 0;
        }

        const offset = -this.currentSlideIndex * 100;
        container.style.transform = `translateX(${offset}%)`;
    }
}

customElements.define('itinerary-section', ItinerarySection);
