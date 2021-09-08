(async function () {
    const products = await getProducts()
    displayProducts(products)
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

function displayProducts() {
    let affichage = "<div>";
    for (let teddy of products) {
        affichage += "<h3>${teddies.name}</h3>";
    }
    affichage += "</div>";
    document.getElementsByClassName("products").innerHTML = affichage;
    }