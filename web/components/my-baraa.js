class MyBaraa extends HTMLElement {
    constructor() {
        super();

    }

    connectedCallback() {
        this.baraaniiNer = this.getAttribute("ner");
        this.price = this.getAttribute("une") || "unegui";
        this.small = this.getAttribute("compact") || false;
        this.mode = this.getAttribute("mode") || "normal";
        this.sagsid = this.getAttribute("sagsid") || "cart";
        this.#render();
        if(this.mode==="normal")
            this.querySelector("button").addEventListener("click", this.AddProductToCart.bind(this))
    }

    AddProductToCart(e) {
        const sags = document.getElementById(this.sagsid);
        sags.addProduct(this.baraaniiNer);
     }
    #render() {

        let tmpl = "";
        switch (this.mode) {
            case "full": tmpl =
                `<article>
                    <h2>${this.baraaniiNer}</h2>
                    <p> ${ this.price }</p>
                </article>`;
                break;

            case "compact":
                tmpl =
                    `<article>
                    <h2>${this.baraaniiNer}</h2>
                </article>`;
                break;

            default:
                tmpl =
                    `<article>
                    <h2>${this.baraaniiNer}</h2>
                    <p> ${this.price}</p>
                    <button>🛒</button>
                </article>`;
                break;
        }
        this.innerHTML = tmpl;
    }
    full() {
        return `<p>${this.price}</p>`;
    }
    disconnectedCallback() {

    }

    attributeChangedCallback(name, oldVal, newVal) {

    }

    adoptedCallback() {

    }

}

window.customElements.define('my-baraa', MyBaraa);