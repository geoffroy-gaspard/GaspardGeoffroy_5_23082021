(async function () {
    const products = await getProducts()

    for (product of products) {
    displayProduct(product)
    }
})()

function getProducts() {
    return fetch ("http://localhost:3000/api/teddies")
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json()
        })
        .then(function(products) {
            console.log(products)
        })
        .catch(function(error) {
            alert(error)
        })
}

let product = document.getElementsByClassName("products");

function displayProducts() {
    let affichage = "<div>";
    for (let teddies of product) {
        affichage += "<h3>${teddies.name}</h3>";
    }
    affichage += "</div>";
    document.getElementsByClassName("products").innerHTML = affichage;
    }