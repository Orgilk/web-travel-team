class MySags extends HTMLElement {
    constructor() {
        super();
        this.zahialga = new Map();
    }

    connectedCallback() {
        this.#render();
    }
    addProduct(baraa) {
        
        let count = 1;
        if (this.zahialga.has(baraa))
            count = this.zahialga.get(baraa) + 1;
        
        this.zahialga.set(baraa, count);
        this.#render();
        }
    #render() { 
        let htmlContent = "";
        const htmlBaraanuud = this.zahialga.forEach((value, key) => htmlContent+=`<article><h3>${key}</h3><p>${value}</p></article>`);
        this.innerHTML = htmlContent;
    }
    disconnectedCallback() {
    
    }

    attributeChangedCallback(name, oldVal, newVal) {
    
    }

    adoptedCallback() {
    
    }

}

window.customElements.define('my-sags', MySags);