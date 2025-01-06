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

        itineraryData.forEach((slide, index) => {
            this.itenary.set(index + 1, slide); 
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
            this.currentSlideIndex = this.itenary.size - 1; 
        } else if (this.currentSlideIndex >= this.itenary.size) {
            this.currentSlideIndex = 0;
        }

        const offset = -this.currentSlideIndex * 100;
        container.style.transform = `translateX(${offset}%)`;
    }
}

customElements.define('itinerary-section', ItinerarySection);
