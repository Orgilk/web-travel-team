export default class Data {
    constructor(dataUrl) {
        this.productURL = dataUrl;
        this.products = [];
    }

    async refreshData() {
        const result = await fetch(this.productURL);
        if (result.ok)
        {
            const productsData = await result.json();
            this.products = productsData.products;
            return new Map(this.products.map( p=> [p.id, p] ));
        }
    }
}
