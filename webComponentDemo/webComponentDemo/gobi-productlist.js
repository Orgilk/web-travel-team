// <gobi-productlist></gobi-productlist>
import "./gobi-product.js";

class GobiProductlist extends HTMLElement {
    constructor() {
        super(); // always call super() first in the ctor.
        this.innerHTML = `
        <style> 
        .product-list{
            display:flex;
            flex-direction: ${ this.getAttribute("direction") }; 
            gap:2ch;
            flex-wrap: wrap;}

        .product-list > gobi-product{
            flex: 1 1;
        }
      </style>
    <div class="product-list">
        <gobi-product></gobi-product>
        <gobi-product></gobi-product>
        <gobi-product></gobi-product>
    </div>`;
    }
    connectedCallback() {

    }
    disconnectedCallback() {

    }
    attributeChangedCallback(attrName, oldVal, newVal) {

    }
}

window.customElements.define('gobi-productlist', GobiProductlist);