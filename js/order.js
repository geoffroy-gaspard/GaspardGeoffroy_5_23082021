// Récupération l'id de la commande enregistrée dans le localStorage
let orderId = localStorage.getItem("orderId");

// Récupération du prix total de la commande enregistrée dans le localStorage
let totalPrice = localStorage.getItem("totalPrice");

// Injection de l'id et du prix total dans le HTML5
document.getElementById("products__order__cost").innerHTML = "Le prix total revient à " + totalPrice + ",00 €";
document.getElementById("products__order__id").innerHTML = "Votre identifiant de commande est le :" + orderId;

// On vide le localStorage pour les futurs commandes
localStorage.clear();