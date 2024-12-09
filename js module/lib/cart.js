import Product from "./product.js";
export let count = 0;
export default class Cart {

    constructor() {
        this.cart = new Map();
    }

    render() {
        let sagsString = ``;
        if (this.cart.size > 0)
            this.cart.forEach(
                (value, key) =>
                sagsString += `<div style="width:40ch;display:flex;flex-direction:row; justify-content:space-between;"><div>${(new Product(app.products.get(key))).renderCompact()} </div><div>${value}</div></div>`
            );

        return sagsString;
    }

    addProduct(productId) {
        let count = 1;

        if (this.cart.has(productId))
            count = Number(this.cart.get(productId)) + 1;

        this.cart.set(productId, count);
        count++;
    }
}

