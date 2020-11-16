//Fonctions globales
const cartContent = document.getElementById('cart-content');
const cartItems = localStorage.getItem('items');

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
      cartContent.innerHTML = "Impossible d'afficher les articles.";
    });
}

//Fonction permettant d'afficher les articles du panier.
function initialize(items) {
    items.map(item => updateCart(item));
    map(select(_id == (localStorage.getItem))) //comment recuperer un par un les items ?
  
    //Fonction permettant d'actualiser l'affichage des articles.
    function updateCart(item) {
      //Création des éléments constituant un Item.
      const addItem = document.createElement('div');
      const addName = document.createElement('h3');
      const addLense = document.createElement('h4');
      const addPrice = document.createElement('h4');
      const addButton = document.createElement('button');
  
      //Définition des classes pour chaque parties composant un article.
      addItem.setAttribute('class', 'row shadow');
      addButton.setAttribute('class', 'btn btn-dark float-right delete-btn');
      addButton.setAttribute('type', 'submit');
      addButton.setAttribute('id', item._id);
  
      //Ajout du contenu, des titres et descriptions des articles.
      addName.textContent = item.name;
      addPrice.textContent = item.price + ' €';
      addButton.innerHTML = '<i class="fas fa-times"></i>';
  
      //Répartition des différents éléments composant un article.
      cartContent.appendChild(addItem);
      addItem.appendChild(addName);
      addItem.appendChild(addLense);
      addItem.appendChild(addPrice);
      addItem.appendChild(addButton);
    }
}

//Fonction de la case delete afin de supprimer un objet du panier.

var deleteButtons = document.querySelectorAll('.delete-btn');

deleteButtons.forEach(deleteButton => deleteButton.addEventListener('click', function() {
    let currentItems = JSON.parse(localStorage.getItem('items'));
    currentItems = (currentItems ? currentItems : []).concat(deleteButton.id);
    localStorage.removeItem('items', JSON.stringify(currentItems));
}));