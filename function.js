const url = "http://localhost:3000/api/teddies";
const basket = JSON.parse(localStorage.getItem("teddies")) || [];

class Product {
    constructor(id, name, description, price, option, quantity, imgurl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = +price;
        this.option = option;
        this.quantity = +quantity;
        this.imgurl = imgurl;
    }
}

function convertPrice(productPrice) {
    let price = `${productPrice}`;
    price = Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
    }).format(price / 100);
    return price;
}

function displayTotalBasket() {
    let totalBasket = 0;
    basket.forEach((teddy) => {
        totalBasket = totalBasket + teddy.price * teddy.quantity;
    });
    return totalBasket;
}

function totalPrice() {
    const totalPrice = document.getElementById("totalPrice");
    totalPrice.innerHTML += `${convertPrice(displayTotalBasket())}`;
}

function basketPreview() {
    if (basket.length == 0) {
    } else {
        let addBasketPreview = document.getElementById("basketPreview");
        let calculBasketPreview = 0;
        for (product of basket) {
            calculBasketPreview += product.quantity;
        }
        addBasketPreview.innerHTML = `Panier <span class="badge rounded-pill bg-secondary align-middle my-auto">${calculBasketPreview}</span>`;
    }
}

function clearBasket() {
    localStorage.clear();
}