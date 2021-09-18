// fonction de executé au chargement de la page
(async function () {
    const teddyId = getTeddyId()
    const teddy = await getTeddy(teddyId)
    console.log(teddy)
    displayTeddy(teddy)
    colorOptions(teddy)
})
()

// fonction de récupération d'id des produits
function getTeddyId() {
    return new URL(location.href).searchParams.get("id")
}

// fonction de fetch de l'api en fonction de l'id
function getTeddy(teddyId) {
    return fetch("http://localhost:3000/api/teddies/" + teddyId)
        .then(function (httpBodyResponse) {
            return httpBodyResponse.json()
        })
        .then(function (teddies) {
            return teddies
        })
        .catch(function (error) {
            alert(error)
        })
}


// fonction en charge de la mise en page de l'ours en peluche
function displayTeddy(teddy) {
    document.querySelector(".teddy__pic").src = teddy.imageUrl;
    document.querySelector(".teddy__name").innerHTML = teddy.name;
    document.querySelector(".teddy__description").innerHTML = teddy.description;
    document.querySelector(".teddy__price").innerHTML = teddy.price / 100 + ".OO €";

    // Ecouter le bouton ajouter au panier
    btnAddCart.addEventListener("click", (event) => {
        event.preventDefault();

        // Variable désignant le choix de l'utilisateur
        const choiceForm = idForm.value;
        const colorChoice = document.querySelector(".teddy__color");

        // Récupération des valeures du formulaire
        let teddyOrder = {
            id: teddy._id,
            name: teddy.name,
            picUrl: teddy.imageUrl,
            description: teddy.description,
            unitPrice: teddy.price / 100,
            color: colorChoice.value,
            quantity: quantity.value
        }
        console.log(teddyOrder);
    });
}

// fonction de mise en place du formulaire du choix de couleur
function colorOptions(teddy) {
    const colorChoice = document.querySelector(".teddy__color");
    for (let colors of teddy.colors) {
        colorChoice.innerHTML += "<option value=" + colors +">" + colors + '</option>';
    }
    console.log(colorChoice);
}

// Selection de l'id du formulaire
const idForm = document.querySelector("#quantity");

// Selection du bouton ajouter au panier
const btnAddCart = document.querySelector("#btnAddBasket")