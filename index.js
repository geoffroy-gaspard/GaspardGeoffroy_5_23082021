main()

// fonction s'executant dès le chargement de la page et reception de la promesse
async function main() {
    const teddies = await getTeddies()

    for (teddy of teddies) {
        displayTeddy(teddy)
    }
}

// fonction permettant de récuperer l'api et de la convertir en .json
function getTeddies() {
    return fetch("http://localhost:3000/api/teddies")
    .then(function(httpBodyResponse) {
        return httpBodyResponse.json()
    })
    .then(function(teddies) {
        console.log(teddies);
        return teddies
    })
    .catch(function(error) {
        alert(error)
    })
}

// fonction en charge de la mise en page des ours en peluche
function displayTeddy(teddy) {
    const templateElt = document.getElementById("templateTeddy");
    const cloneElt = document.importNode(templateElt.content, true);

    cloneElt.querySelector(".product__card__name").innerHTML = teddy.name;
    cloneElt.querySelector(".teddy__pic").src = teddy.imageUrl;
    cloneElt.querySelector(".product__card__description").innerHTML = teddy.description;
    cloneElt.querySelector(".product__card__price").innerHTML = teddy.price/100 + ".OO €";
    cloneElt.querySelector(".product__card__link").href += "?id=" + teddy._id;

    document.querySelector("#products").appendChild(cloneElt);
}