class HeroSection extends HTMLElement {
    constructor() {
        super();
        this.bgImages = [];
        this.currentIndex = 0;
        this.name=""
    }

    connectedCallback() {
        // Add the link to the stylesheet
        const styleLink = document.createElement('link');
        styleLink.setAttribute('rel', 'stylesheet');
        styleLink.setAttribute('href', './css/styles.css');
        this.appendChild(styleLink);  // Make sure to append it to the custom element
    
        // Get background images and name from attributes
        const bgImagesAttr = this.getAttribute('data-bg-images');
        const nameAttr = this.getAttribute('name');
    
        if (bgImagesAttr) {
            this.bgImages = bgImagesAttr.split(',');
        }
        if (nameAttr) {
            this.name = nameAttr;  // Set the name attribute
        }
    
        // Add the inner HTML structure
        this.innerHTML = `
            <header id="hero-section" class="home-main" data-bg-images="${bgImagesAttr}">
                <section class="destination-overview">
                    <h1 style="font-size: 60px; color: white;">${this.name}</h1> <!-- Display passed name -->
                </section>
            </header>
        `;
    
        // Apply the first background image
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
    
        // Periodically change the background image
        setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.bgImages.length;
            this.style.backgroundImage = `url(${this.bgImages[this.currentIndex]})`;
    
            // Optional: Add animation class
            this.classList.add('animate-bg');
            setTimeout(() => {
                this.classList.remove('animate-bg');
            }, 500); // Match CSS animation duration
        }, 5000); // Change background every 5 seconds
    }
    
}

// Define the custom element
window.customElements.define('hero-section', HeroSection);
