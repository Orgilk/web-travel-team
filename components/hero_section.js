class HeroSection extends HTMLElement {
    constructor() {
        super();
        this.bgImages = [];
        this.currentIndex = 0;
    }

    connectedCallback() {
        // Add HTML structure inside the custom element
        this.innerHTML = `
             <header id="hero-section" class="home-main" data-bg-images="assets/back.jpg,assets/back1.jpeg,assets/back2.jpeg"> <section class="destination-overview">
                <h1 style="font-size: 60px;color: white;">Хөвсгөл Нуур</h1>
            </header>
         
        `;

        // Get background images from the data attribute
        const bgImagesAttr = this.getAttribute('data-bg-images');
        if (bgImagesAttr) {
            this.bgImages = bgImagesAttr.split(',');
        }

        // Apply the first image
        this.style.backgroundImage = `url(${this.bgImages[this.currentIndex]})`;
        this.style.backgroundSize = 'cover';
        this.style.backgroundPosition = 'center';
        this.style.height = '100vh';
        this.style.width = '100%';
        this.style.display = 'block';

        // Preload images
        this.bgImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });

        // Periodically change the background
        setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.bgImages.length;
            this.style.backgroundImage = `url(${this.bgImages[this.currentIndex]})`;

            // Optional: Add animation class
            this.classList.add('animate-bg');
            setTimeout(() => {
                this.classList.remove('animate-bg');
            }, 500); // Match CSS animation duration
        }, 5000); // Every 5 seconds
    }
}

// Define the custom element
window.customElements.define('hero-section', HeroSection);
