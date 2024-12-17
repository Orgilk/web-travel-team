class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <header class="nav-bar">
            <ul class="navigation-list">
               <li class="logo-list">
                   <a href="./"><img src="assets/advent.png" alt="logo" class="small-image"></a>
               </li>
                <li class="category"><a href="./index.html">Home</a></li>
                <li class="company-info"><a href="./about.html">About us</a></li>
                <li class="company-info"><a href="./destinations.html">Destinations</a></li>
                <li class="company-info"><a href="./news.html">News</a></li>
                <li class="signup"><a href="./login.html">Login</a></li>
                <li class="cart" style="display: flex; flex-direction:column; width:50px;">
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
                        <span id="cartItemCount">0</span> items
                    </a>
                </li>
            </ul>
        </header>
        `;

        // Call the updateCartCount function after the header is rendered
        this.updateCartCount();
    }

    // Move the fetchData function outside and make it part of the class.
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

            // Update the cart item count
            const cartItemCountElement = this.querySelector('#cartItemCount');
            if (cartItemCountElement) {
                cartItemCountElement.textContent = data.length; // Display the number of items in the cart
            }

            console.log("data: ", data);
        } catch (error) {
            console.error('API call failed:', error.message);
        }
    }
}

window.customElements.define('header-nav', Header);
