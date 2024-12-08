class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <header class="nav-bar">
            <ul class="navigation-list">
               <li class="logo-list">
    <a href="./"><img src="assets/advent.png" alt="logo" class="small-image"></a></li>
                <li class="category"><a href="./index.html">Home</a></li>
                <li class="cart"><a href="#"><img src="./icons/shopping-cart-outline-svgrepo-com.svg" alt="cart"></a></li>
                <li class="company-info"><a href="./about.html">About us</a></li>
                 <li class="company-info"><a href="./destinations.html">Destinations</a></li>
                  <li class="company-info"><a href="./news.html">News</a></li>
                <li class="signup"><a href="./login.html">Login</a></li>
            </ul>
        </header>
        `;
    }
}


window.customElements.define('header-nav', Header);