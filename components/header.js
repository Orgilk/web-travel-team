class Header extends HTMLElement {
    constructor() {
        super();
        this.state = {
            cartItemCount: 0
        };
    }

    connectedCallback() {
        this.innerHTML = `
            <link rel="stylesheet" href="../css/header.css">
            <header class="nav-bar">
                <ul class="navigation-list">
                    <li class="logo-list">
                        <a href="./"><img src="../assets/advent.png" alt="logo" class="small-image"></a>
                    </li>
                    <li><a href="./index.html">Home</a></li>
                    <li><a href="./about.html">About us</a></li>
                    <li><a href="./destinations.html">Destinations</a></li>
                    <li><a href="./news.html">News</a></li>
                    <li class="cart-item">
                        <a href="payment.html">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                width="24" 
                                height="24" 
                                class="cart-icon" 
                                id="cartIcon">
                                <path 
                                    d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7 16c.55 0 1.05-.45 1.05-1H16V5H4.21L3.27 2H0v2h2l3.6 7.59-1.35 2.44c-.15.27-.25.57-.25.91 0 1.1.9 2 2 2h12v-2H7.42c-.14-.32-.42-.68-.42-1zM5.23 6h10.1l-.66 3H6.36L5.23 6z" 
                                    fill="currentColor">
                                </path>
                            </svg>
                            <span id="cartItemCount" class="cart-icon-text">0</span> 
                            <p class="cart-icon-items">items</p>
                        </a>
                    </li>
                    <li>
                    <div id="theme-toggle" class="theme-button">
                        <img src="../assets/light.png" alt="Theme Toggle" class="toggle-image">
                        </div>
                        <a href="./favorite.html"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="70"
                                height="30">
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                    fill="none" stroke="currentColor" stroke-width="2" />
                            </svg></a>
                    </li>
                </ul>
            </header>
        `;

        this.updateCartCount();
        this.setupThemeToggle();
        window.addEventListener("scroll", () => {
            var header = this.querySelector("header");
            if (header) {
                header.classList.toggle("sticky", window.scrollY > 500);
            }
        });
    }
    //state ashiglaj kart dotorh item-n toog real time haruulna
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.updateCartCount();
    }
    //cart dotor bga item-n toog baazaas backend-r damjuulj avch haruulna
    async updateCartCount() {
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
            const cartItemCountElement = this.querySelector('#cartItemCount');
            const cartIcon = this.querySelector('#cartIcon');
            //cart dotorh item-n toonoos hamaarch kart icon-i ungu uurchlugduhiig state ashiglaj shiidsen
            if (cartItemCountElement) {
                const count = data.length;
                this.setState({ cartItemCount: count });

                cartItemCountElement.textContent = this.state.cartItemCount;
                cartIcon.classList.toggle('cart-highlight', this.state.cartItemCount > 0);
            }
        } catch (error) {
            console.error('API call failed:', error.message);
        }
    }

    // darl light icon-g switch hiij bga heseg
    setupThemeToggle() {
        const toggleButton = this.querySelector('#theme-toggle');
        const body = document.body;
        const darkImage = '../assets/dark.png';
        const lightImage = '../assets/light.png';
        const themeImage = toggleButton.querySelector('img');

        toggleButton.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');

            // Update the image based on the theme
            themeImage.src = isDarkMode ? lightImage : darkImage;

            // Save the theme preference
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });

        // Load the saved theme preference on page load
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            themeImage.src = lightImage;
        } else {
            themeImage.src = darkImage;
        }
    }

}

window.customElements.define('header-nav', Header);
