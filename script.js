/* Constantes et variables globales */
const itemsFetch = fetch('http://localhost:3000/api/cameras');
var itemsStorage = document.getElementById('items-storage'); //Chemin vers la liste des articles de la Boutique.


//Au chargement de la page Boutique.
document.body.onload = function() {
  //Initialisation de la requete fetch.
  fetch('http://localhost:3000/api/cameras', {
    method: 'GET',
    headers: {'content-type': 'application/json'}
  }).then(function(response) {
    return response.json();
  }).then(function(json) {
    let items = json;
    initialize(items);
  }).catch(function(err) {
    itemsStorage.innerHTML = "Impossible d'afficher les articles.";
  });
}

//Fonction globale permettant d'afficher les articles disponibles.
function initialize(items) {
  itemsList = items; //Database globale des articles
  updateItems();
  itemsList = [];

  //Fonction qui crée les chemins d'accès aux images des articles.
  /*
  function fetchBlob(item) {
    let url = 'back-end/images/' + product.image;
    fetch(url).then(function(response) {
      return response.blob();
    }).then(function(blob) {
      let itemPath = URL.createObjectURL(blob);
      updateItems(itemPath, item)
    });
  }*/

  //Fonction permettant d'actualiser l'affichage des articles.
  function updateItems(itemPath, item) {
    //Création des éléments constituant un Item.
    const addItem = document.createElement('div');
    const imageHolder = document.createElement('div');
    const addImage = document.createElement('img');
    const descriptionHolder = document.createElement('div');
    const addName = document.createElement('h3');
    const addText = document.createElement('p');
    const addLense = document.createElement('h4');
    const addPrice = document.createElement('h4');

    //Définition des classes pour chaque div composant un article.
    addItem.setAttribute('class', 'row store-item');
    imageHolder.setAttribute('class', 'col-12 col-lg-4');
    descriptionHolder.setAttribute('class', 'col-12 col-lg-8');

    //Ajout du contenu des titres et descriptions des articles.
    addName.textContent = item.name;
    addText.textContent = item.description;

    //Création des attributs src et alt des images.
    img.src = item.imageUrl;
    img.alt = item.name;

    //Répartition des différents éléments composant un article.
    itemsStorage.appendChild(addItem);
    addItem.appendChild(imageHolder);
    addItem.appendChild(descriptionHolder);
    imageHolder.appendChild(addImage);
    descriptionHolder.appendChild(addName);
    descriptionHolder.appendChild(addText);
    descriptionHolder.appendChild(addLense);
    descriptionHolder.appendChild(addPrice);
  }
}



/*
const getArticle = fetch("http://localhost:3000/api/cameras")
.then(response => response.json())
.then(response => alert(JSON.stringify(response)))
.catch(error => alert("Erreur : " + error));




fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));

// Fetch pour POST un JSON-encoded data

  const data = { username: 'example' };

fetch('https://example.com/profile', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
*/