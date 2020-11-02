// Constantes et variables globales
var carouselDisplay = document.getElementById('carousel-display');


//Au chargement de la page Accueil 
document.body.onload = function () {
    //Initialisation de la requête fetch.
    fetch('http://localhost:3000/api/cameras', {
        method: 'GET',
        headers: { 'content-type': 'application/json ' }
    }).then(function (response) {
        return response.json();
    }).then(function (json) {
        let items = json;
        initialize(items);
    }).catch(function (err) {
        console.log(err);
        carouselDisplay.innerHTML = "Une erreur est survenue lors de l'affichage.";
    });
}

//Fonction globale permettant d'afficher le carousel.
function initialize(items) {
    items.map(item => updateDisplay(item));

    //Fonction permettant d'afficher les deux derniers articles dans le carousel.
    function updateDisplay(item) {
        //Création des éléments composant un item du carousel.
        const addItem = document.createElement('div');
        const imageHolder = document.createElement('div');
        const addImage = document.createElement('img');
        const descriptionHolder = document.createElement('div');
        const addName = document.createElement('h3');
        const addButton = document.createElement('button');

        //Définition des classes de chaque élément.
        addItem.setAttribute('class', 'carousel-item');
        imageHolder.setAttribute('class', 'carousel-image-holder');
        descriptionHolder.setAttribute('class', 'carousel-description');
        addButton.setAttribute('class', 'btn btn-dark float-right');
        addButton.setAttribute('type', 'submit');

        //Ajout du contenu des imageHolder.
        addImage.src = item.imageUrl;
        addImage.alt = item.name;
        addImage.setAttribute('width', '100%');

        //Ajout du contenu des descriptionHolder.
        addName.textContent = item.name;
        addButton.innerHTML = "Plus d'infos";

        //Répartition des éléments dans leur item.
        carouselDisplay.appendChild(addItem);
        addItem.appendChild(imageHolder);
        addItem.appendChild(descriptionHolder);
        imageHolder.appendChild(addImage);
        descriptionHolder.appendChild(addName);
        descriptionHolder.appendChild(addButton);
        console.log(err);
    }
}