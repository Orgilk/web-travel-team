import Product from "./product.js";
import Cart, { count as sagsandBaigaaBaraaniiToo} from "./cart.js";
import Data from "./data.js";

const sags = new Cart();
app.cart = sags;

const data = new Data("https://dummyjson.com/products");
app.products = await data.refreshData();

let productsHTML = "";
app.products.forEach(
    (product, productId) =>productsHTML += (new Product(product)).render());

document.getElementById("prodSection").innerHTML=productsHTML;

if(sagsandBaigaaBaraaniiToo>0)
    document.getElementById("cart").innerHTML= sags.render();

app.refreshCart = _=> document.getElementById("cart").innerHTML = app.cart.render();
