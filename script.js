/* Constantes et variables globales */
const itemsFetch = fetch('http://localhost:3000/api/cameras');
var itemsStorage = document.getElementById('items-storage'); //Chemin vers la liste des articles de la Boutique.


//Au chargement de la page Boutique.
document.body.onload = function () {
  //Initialisation de la requete fetch.
  fetch('http://localhost:3000/api/cameras', {
    method: 'GET',
    headers: { 'content-type': 'application/json' }
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    let items = json;
    initialize(items);
  }).catch(function (err) {
    console.log(err);
    itemsStorage.innerHTML = "Impossible d'afficher les articles.";
  });
}

//Fonction globale permettant d'afficher les articles disponibles.
function initialize(items) { //Database globale des articles
  items.map(item => updateItems(item));

  //Fonction permettant d'actualiser l'affichage des articles.
  function updateItems(item) {
    //Création des éléments constituant un Item.
    const addItem = document.createElement('div');
    const imageHolder = document.createElement('div');
    const addImage = document.createElement('img');
    const descriptionHolder = document.createElement('div');
    const addName = document.createElement('h3');
    const addText = document.createElement('p');
    const addLense = document.createElement('h4');
    const addPrice = document.createElement('h4');
    const addButton = document.createElement('button');

    //Définition des classes pour chaque parties composant un article.
    addItem.setAttribute('class', 'row store-item');
    imageHolder.setAttribute('class', 'col-12 col-lg-4');
    descriptionHolder.setAttribute('class', 'col-12 col-lg-8');
    addButton.setAttribute('class', 'btn btn-dark float-right');
    addButton.setAttribute('type', 'submit');

    //Ajout du contenu, des titres et descriptions des articles.
    addName.textContent = item.name;
    addText.textContent = item.description;
    addPrice.textContent = item.price + ' €';
    addButton.innerHTML = 'Ajouter au panier';

    //Création des attributs, src et alt des images.
    addImage.src = item.imageUrl;
    addImage.alt = item.name;
    addImage.setAttribute('width', '100%');

    //Répartition des différents éléments composant un article.
    itemsStorage.appendChild(addItem);
    addItem.appendChild(imageHolder);
    addItem.appendChild(descriptionHolder);
    imageHolder.appendChild(addImage);
    descriptionHolder.appendChild(addName);
    descriptionHolder.appendChild(addText);
    descriptionHolder.appendChild(addLense);
    descriptionHolder.appendChild(addPrice);
    descriptionHolder.appendChild(addButton);
  }
}