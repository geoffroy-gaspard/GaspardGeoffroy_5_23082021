// fonction de executé au chargement de la page
(async function () {
    const teddyId = getTeddyId()
    const teddy = await getTeddy(teddyId)
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
            _id: teddy._id,
            name: teddy.name,
            imageUrl: teddy.imageUrl,
            description: teddy.description,
            teddyPrice: teddy.price / 100,
            color: colorChoice.value,
            quantity: quantity.value,
            totalCost: (quantity.value) * (teddy.price / 100)
        }

        // Stockage des valeures dans le local storage
        let products = JSON.parse(localStorage.getItem("products"));
        // Fonction d'ajout de produit dans le local storage
        const teddyLocalStorage = () => {
            // Ajout du produit avec les values choisies par l'utilisateur
            products.push(teddyOrder);
            // Transformation en format JSON et envoi à la key "products" du local storage
            localStorage.setItem("products", JSON.stringify(products));
        };

        // Fenetre pop-up de confirmation
        const popUpConfirm = () => {
            window.alert(`Vous avez ajouté ${quantity.value} ${teddyOrder.name} de couleur ${colorChoice.value} à votre panier`);
            window.location.href = "index.html";
        }

        // S'il y a déjà des produits dans le local storage
        if (products) {
            // Vérifie si le produit est déja présent
            let isAlreadyThere = false;
            let indexModification;
            for (teddy of products) {
                switch (teddy.name) {
                    case (teddyOrder.name):
                        isAlreadyThere = true;
                        indexModification = products.indexOf(teddy);
                }
            }
            // Si le produit est déjà présent dans le local storage on incrémente seulement la quantité et  on recalcule le prix total
            if (isAlreadyThere) {
                products[indexModification].quantity = +products[indexModification].quantity + +teddyOrder.quantity;
                products[indexModification].totalCost = +products[indexModification].totalCost + +teddyOrder.totalCost;
                localStorage.setItem("products", JSON.stringify(products));
                popUpConfirm();
                // Si le produit n'est pas déjà présent on l'ajoute au local storage
            } else {
                teddyLocalStorage();
                popUpConfirm();
            }
        }

        // S'il n'y a pas de produits enregistré dans le local storage
        else {
            products = [];
            teddyLocalStorage();
            popUpConfirm();
        }


    });
}

// fonction de mise en place du formulaire du choix de couleur
function colorOptions(teddy) {
    const colorChoice = document.querySelector(".teddy__color");
    for (let colors of teddy.colors) {
        colorChoice.innerHTML += "<option value=" + colors + ">" + colors + "</option>";
    }
}

// Selection de l'id du formulaire
const idForm = document.querySelector("#quantity");

// Selection du bouton ajouter au panier
const btnAddCart = document.querySelector("#btnAddBasket")