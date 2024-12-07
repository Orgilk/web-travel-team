class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <header class="nav-bar">
            <ul class="navigation-list">
                <li class="logo-list"><a href="#"><img src="assets/advent.png" alt="logo" class="small-image"></a></li>
                <li class="category"><a href="#">Сургалт</a></li>
                <li class="search-bar">
                    <img src="./icons/search.png" alt="search-icon" height="15px">
                    <input type="search" placeholder="Хайлт...">
                </li>
                <li class="cart"><a href="#"><img src="./icons/shopping-cart-outline-svgrepo-com.svg" alt="cart"></a></li>
                <li class="company-info"><a href="#">Холбогдох</a></li>
                <li class="login"><a href="#">Нэвтрэх</a></li>
                <li class="signup"><a href="#">Бүртгүүлэх</a></li>
            </ul>
        </header>
        `;
    }
}


window.customElements.define('header-nav', Header);