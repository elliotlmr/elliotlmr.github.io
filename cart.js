//Fonctions globales
const cartContent = document.getElementById('cart-content');
const deleteAllButton = document.getElementById('delete-all-btn');

//Au chargement du Panier.
document.body.onload = function () {
  let currentItems = JSON.parse(localStorage.getItem('items'));

  //Fonction permettant l'affichage des articles dans le panier.
  function updateCart(currentItem) {
    //Création des éléments constituant un Item.
    const addItem = document.createElement('div');
    const addName = document.createElement('h3');
    const addLense = document.createElement('h4');
    const addPrice = document.createElement('h4');
    const addButton = document.createElement('button');

    //Définition des classes pour chaque parties composant un article.
    addItem.setAttribute('class', 'row shadow d-flex justify-content-between p-1');
    addButton.setAttribute('class', 'btn btn-dark float-right delete-btn');
    addButton.setAttribute('type', 'submit');
    addButton.setAttribute('id', currentItem._id);

    //Ajout du contenu, des titres et descriptions des articles.
    addName.textContent = currentItem.name + ' : ' + currentItem.lenses;
    addPrice.textContent = 'Prix : ' + currentItem.price + ' €';
    addButton.innerHTML = '<i class="fas fa-times"></i>';

    //Répartition des différents éléments composant un article.
    cartContent.appendChild(addItem);
    addItem.appendChild(addName);
    addItem.appendChild(addLense);
    addItem.appendChild(addPrice);
    addItem.appendChild(addButton);
  };

  currentItems.map(currentItem => updateCart(currentItem));  
  
  //Fonction de la case delete afin de supprimer un objet du panier.

  var deleteButtons = document.querySelectorAll('.delete-btn');

  deleteButtons.forEach(deleteButton => deleteButton.addEventListener('click', function() {
    localStorage.removeItem('items', JSON.stringify(currentItem));
  }));
}

/*/Fonction de la case delete afin de supprimer un objet du panier.

var deleteButtons = document.querySelectorAll('.delete-btn');

deleteButtons.forEach(deleteButton => deleteButton.addEventListener('click', function() {
    currentItems = (currentItems ? currentItems : []).concat(deleteButton.id);
    localStorage.removeItem('items', JSON.stringify(currentItem));
}));*/

//Fonction permettant de vider entièrement le panier (localStorage clear).

deleteAllButton.onclick = function () {
  window.localStorage.clear();
  window.location.reload();
};

//Fonction permettant de valider la commande et d'envoyer la requete POST.

const validationButton = document.getElementById('validation-btn');
const lastNameForm = document.getElementById('lastNameForm');
const firstNameForm = document.getElementById('firstNameForm');
const emailForm = document.getElementById('emailForm');
const addressForm = document.getElementById('addressForm');
const zipCodeForm = document.getElementById('zipCodeForm');
const cityForm = document.getElementById('cityForm');

validationButton.onclick = function () {

  const newOrder = {
    contact:{
      name: lastNameForm + firstNameForm,
      email: emailForm,
      address: addressForm + zipCodeForm,
      city: cityForm}, 
    products: JSON.parse(localStorage.getItem('items')).map(x => x.id)
  };

  fetch('http://localhost:3000/api/cameras', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(newOrder)
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    console.log(json);
  }).catch(function (error) {
    console.error(error);
  });

  //document.location.href="confirm.html";
};