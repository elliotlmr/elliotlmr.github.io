//Fonctions globales
const orderConfirmation = document.getElementById('order-confirmation');

//Au chargement de la page Confirmation.
document.body.onload = function () {
    let currentId = JSON.parse(localStorage.getItem('orderId'));
    let currentPrice = JSON.parse(localStorage.getItem('orderPrice'));

    //Fonction permettant d'afficher un résumé + code de commande orderId.
    //Creation des éléments composant la confirmation.
    const addConfirm = document.createElement('div');
    const addText = document.createElement('p');
    const addPrice = document.createElement('h3');
    const addId = document.createElement('h4');

    //Définition des classes de chaque élément.
    addConfirm.setAttribute('class', '');
    addText.setAttribute('class', 'text-center mb-5 h5');
    addPrice.setAttribute('class', 'text-center mt-5');
    addId.setAttribute('class', 'text-center font-weight-normal');

    //Ajout du contenu de chaque élément.
    addText.textContent = "L'équipe d'Orinoco vous remercie pour votre confiance. N'hésitez pas à nous contacter en cas de problème, ou pour nous faire part de votre avis.";
    addPrice.textContent = 'Coût total de la commande : ' + currentPrice;
    addId.textContent = "Numéro d'identification de votre commande : " + currentId;

    //Répartition des différents éléments composant la confirmation.
    orderConfirmation.appendChild(addConfirm);
    addConfirm.appendChild(addText);
    addConfirm.appendChild(addPrice);
    addConfirm.appendChild(addId);
}