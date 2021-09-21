// Récupération l'id de la commande enregistrée dans le localStorage
let orderId = localStorage.getItem("orderId");
console.log(orderId);
// Récupération du prix total de la commande enregistrée dans le localStorage
let totalPrice = localStorage.getItem("totalPrice");
console.log(totalPrice);
// Injection de l'id et du prix total dans le HTML5
document.getElementById("products__order__cost").innerHTML = totalPrice + ",00 €";
document.getElementById("products__order__id").innerHTML = "Merci pour votre commande, votre numéro de commande est le :" + orderId;

// On vide le localStorage pour les futurs commandes
localStorage.clear();