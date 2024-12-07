export default class Product {
    constructor(prod) {     
        this.id = prod.id;
        this.name = prod.title;
        this.price = prod.price;
        this.desc = prod.description;
    }
    renderCompact() { 
        return `<div>${this.name}</div>`;
    }

    render() { 
        return `<div style="width:25vw; border:1px #ccc solid; margin:2vh; padding:2vw;">
                    <h3>${this.name}</h3>
                    <p>${this.price}</p>
                    <p>${this.desc}</p>
                    <button onclick="app.cart.addProduct(${this.id}); app.refreshCart();">🛒</button>
                </div>`;
    }
}

const orderHistory = new Set();
