// Déclaration de la variable de stockage des valeures dans le local storage
let products = JSON.parse(localStorage.getItem("products"));

// Selection de l'element recevant l'injection du HTML
const basketCard = document.querySelector("#products");

// Fonction d'affichage des produits stocké dans le local storage en HTML5

// Dans le cas où le panier est vide
if (products === null || products == 0) {
    document.querySelector(".empty").innerHTML = "Votre panier est vide";
} else {
    // Si le panier n'est pas vide, affichage des produits stocké dans le local storage
    let teddyBasket = [];

    for (i = 0; i < products.length; i++) {
        console.log(products.length)

        teddyBasket = teddyBasket + `<div class="product__card">
            <div class="product__card__pic"><img class="teddy__pic" src="${products[i].imageUrl}"/></div>
            <h5 class="product__card__name">${products[i].quantity} ours en peluche ${products[i].name}</h5>
            <p class="product__card__description">${products[i].description}</p>
            <div class="product__card__options">
            <p>${(products[i].teddyPrice)*(products[i].quantity)}.00 €</p>
            <button class="btn__delete">supprimer l'article</button>
            </div>
    </div>`;



    }
    if (i == products.length) {
        basketCard.innerHTML = teddyBasket;
    }
}

// Sélection des références de tous les btn__delete
let btnDelete = document.querySelectorAll(".btn__delete");

for (let j = 0; j < btnDelete.length; j++) {
    btnDelete[j].addEventListener("click", (event) => {
        event.preventDefault();

        // Sélection de l'id du produit à supprimer au moment du clic sur le bouton
        let teddySelectedSuppressed = products[j]._id;

        // Méthode filter en inverse (!==) afin de supprimer l'élément où le bouton à été cliqué
        products = products.filter(el => el._id !== teddySelectedSuppressed);

        // Envoi de la variable à supprimer au le local storage
        localStorage.setItem("products", JSON.stringify(products));

        // Alert pour avertir de la suppression d'un produit et rechargement de la page
        alert("Cette peluche à bien été supprimée du panier");
        window.location.href = "panier.html";
    });
}

// Bouton pour vider le panier
const btnCancel = document.querySelector(".btn__cancel");

// Suppression de la key "products" du local storage pour vider entièrement le panier
btnCancel.addEventListener("click", (e) => {
    e.preventDefault();

    // On utilise .removeitem pour vider le local storage
    localStorage.removeItem("products");

    // Alerte de panier vidé et rechargement de la page
    alert("Le panier a été vidé");
    window.location.href = "panier.html";
});

// Déclaration de la variable de calcul du prix total
let calculTotalPrice = [];

// Récupération des valeures de prix dans le panier
for (let k = 0; k < products.length; k++) {
    let teddyPrice = products[k].totalCost;

    // Injection des prix dans la variable "calculTotalPrice"
    calculTotalPrice.push(teddyPrice)
}

// Calcul des prix dans la variable "totalPrice"
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = calculTotalPrice.reduce(reducer, 0);
console.log(totalPrice);

// Injection du prix calculé dans le HTML5
const teddyBill = document.querySelector(".price__total");
teddyBill.innerHTML = totalPrice + ".OO €";


///////////////////////////////////////////////////////////////// Gestion du formulaire /////////////////////////////////////////////////////////////////


// Sélection du bouton de commande
const btnOrderTeddies = document.querySelector(".btn__order__submit");

// On écoute les clicks du bouton de commande
btnOrderTeddies.addEventListener("click", (e) => {
    e.preventDefault();

    // Récupération des valeures du formulaire
    const contact = {
        firstName: document.querySelector("#inlineFormInputName").value,
        lastName: document.querySelector("#input").value,
        address: document.querySelector("#inputAddress").value,
        city: document.querySelector("#inputCity").value,
        email: document.querySelector("#inputEmail4").value
    }

    // Message d'erreur destiné aux erreurs des champs du formulaire
    const textAlert = (value) => {
        return `Veuillez rentrer un(e) ${value} valide`
    }

    const regExNamesCity = (value) => {
        return /^([a-zA-Zàâäéèêëïîôöùûüç']{3,20})?([-]{0,1})?([a-zA-Zàâäéèêëïîôöùûüç']{3,20})$/.test(value);
    }

    function firstNameControl() {
        // Validation du prénom
        const inputFirstName = contact.firstName;
        if (regExNamesCity(inputFirstName)) {
            return true
        } else {
            alert(textAlert("prénom"))
        }
    }

    function lastNameControl() {
        // Validation du nom
        const inputLastName = contact.lastName;
        if (regExNamesCity(inputLastName)) {
            return true
        } else {
            alert(textAlert("nom"))
        }
    }

    function addressControl() {
        // Validation de l'adresse
        const inputAddress = contact.address;
        if (/^([0-9]{1,3}(([,. ]?){1}[a-zA-Zàâäéèêëïîôöùûüç' ]+))$/.test(inputAddress)) {
            return true
        } else {
            alert(textAlert("adresse"))
        }
    }

    function cityControl() {
        // Validation de la ville
        const inputCity = contact.city;
        if (regExNamesCity(inputCity)) {
            return true
        } else {
            alert(textAlert("ville"))
        }
    }

    function emailControl() {
        // Validation de l'email
        const inputEmail = contact.email;
        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputEmail)) {
            return true
        } else {
            alert(textAlert("email"))
        }
    };

    // Controle de la validité du formulaire avant envoie dans le local storage
    if (firstNameControl() && lastNameControl() && cityControl() && emailControl() && addressControl()) {
        // Mettre l'objet "contact" dans le local storage
        localStorage.setItem("contact", JSON.stringify(contact));
        
    // On récupère notre panier
    let basket = JSON.parse(localStorage.getItem("products"));
    // On initialise un tableau qui contiendra les id des produits acheté et qu'on enverra au back
    let products = [];

    // Pour chaque produits dans le panier
    basket.forEach(function (product) {
        // On push l'id dans le tableau à envoyer
        products.push(product._id);
    });

    // Mettre les valeures du formulaire et les produits dans un objet à envoyer vers le serveur
    const sentOrder = {
        contact,
        products
    };

    // Envoi de l'objet "sentOrder" au serveur
    const orderTeddies = {
        method: 'POST',
        body: JSON.stringify(sentOrder),
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
    };

    
    // Envoi de l'objet "sentOrder" vers le serveur
    fetch('http://localhost:3000/api/teddies/order', orderTeddies)
        .then(response => response.json())
        .then(response => {
            let orderId = response.orderId;
            console.log(orderId);
            localStorage.setItem("orderId", orderId);
            localStorage.setItem("totalPrice", totalPrice);
            window.location.href = "order.html";
        })
        .catch(function(error){
            alert("Le serveur rencontre des complications...")
        })
    } else {
        // Alert dans le cas où un champs n'a pas été rempli correctement
        window.alert(`Veuillez remplir le formulaire`);
    };

});