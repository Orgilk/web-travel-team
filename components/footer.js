class Footer extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
           <link rel="stylesheet" href="../css/footer.css">
            <footer class="footer">
                <div class="container">
                    <div class="content">
                        <div class="footer-col">
                            <h4>Ерөнхий</h4>
                            <ul>
                                <li><a href="#">Бидний тухай</a></li>
                                <li><a href="#">Аялалын чиглэл</a></li>
                                <li><a href="#">Нууцлалын бодлого</a></li>
                                <li><a href="#">Үйлчилгээний нөхцөл</a></li>
                            </ul>
                        </div>
                        <div class="footer-col">
                            <h4>Тусламж</h4>
                            <ul>
                                <li><a href="#">Түгээмэл асуулт</a></li>
                                <li><a href="#">Төлбөрийн нөхцөл</a></li>
                                <li><a href="#">Тусламж үйлчилгээ</a></li>
                                <li><a href="#">Оператортой холбогдох</a></li>
                            </ul>
                        </div>
                        <div class="footer-col">
                            <h4>Холбоо барих</h4>
                            <ul>
                                <li>
                                    <p>Утас:</p>
                                    <a href="tel:+97680404239">+976 99111199</a>
                                </li>
                                <li>
                                    <p>Мэйл:</p>
                                    <a href="mailto:orgioW1.gmail.com">orgioW1.gmail.com</a>
                                </li>
                                <li>
                                    <p>Хаяг:</p>
                                    <a href="#" style="font-size: small;">
                                        Монгол Улсын Их Сургууль<br>
                                        Их сургуулийн гудамж - 1, бага тойруу , Сүхбаатар дүүрэг, Улаанбаатар хот
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="footer-col">
                            <h4>Цахим хуудас</h4>
                            <div class="social-links">
                                <a href="#"><img src="assets/facebook.png" alt="Facebook"></a>
                                <a href="#"><img src="assets/instagram.png" alt="Instagram"></a>
                                <a href="#"><img src="assets/twitter.png" alt="Twitter"></a>
                                <a href="#"><img src="assets/linkedin.png" alt="LinkedIn"></a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

window.customElements.define('footer-component', Footer);
