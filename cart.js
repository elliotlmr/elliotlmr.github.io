//Fonctions globales
const cartContent = document.getElementById('cart-content');
const deleteAllButton = document.getElementById('delete-all-btn');
const totalPrice = document.getElementById('totalPrice');

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
    addName.textContent = 'Référence : ' + currentItem.name;
    addPrice.textContent = 'Prix : ' + currentItem.price + ' €';
    addButton.innerHTML = '<i class="fas fa-times"></i>';

    //Répartition des différents éléments composant un article.
    cartContent.appendChild(addItem);
    addItem.appendChild(addName);
    addItem.appendChild(addPrice);
    addItem.appendChild(addButton);

    //Fonction du boutton delete afin de supprimer un objet du panier.
    addButton.onclick = function () {
      let newItems = currentItems.filter(x => x._id != currentItem._id);
      localStorage.setItem('items', JSON.stringify(newItems));
      window.location.reload();
    };
  };

  currentItems.map(currentItem => updateCart(currentItem)); 

  //Fonction permettant d'afficher le prix total du panier.
  let sum = 0;
  let itemsPrices = JSON.parse(localStorage.getItem('items')).map(x => x.price);
  for (var i = 0, len = itemsPrices.length; i < len; i++) {
    sum += itemsPrices[i];
  };
  totalPrice.innerHTML = sum + ' €';
}

//Fonction permettant de vider entièrement le panier (localStorage clear).
deleteAllButton.onclick = function () {
  window.localStorage.clear();
  window.location.reload();
};

//Fonction permettant de valider la commande, d'envoyer la requete POST, et de sauvegarder l'orderId et le prix total dans le localStorage.
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
      firstName: firstNameForm.value,
      lastName: lastNameForm.value,
      address: addressForm.value + zipCodeForm.value,
      city: cityForm.value,
      email: emailForm.value
    }, 
    products: JSON.parse(localStorage.getItem('items')).map(currentItem => currentItem._id)
  };

  fetch('http://localhost:3000/api/cameras/order', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(newOrder)
  }).then(function (response) {
    return response.json();
  }).then(function (json) {
    console.log(json);
    if(json.orderId) {
    localStorage.setItem('orderId', JSON.stringify(json.orderId));
    document.location.href="confirm.html";
    }
  }).catch(function (error) {
    console.error(error);
  });
  
  localStorage.setItem('orderPrice', JSON.stringify(totalPrice.innerHTML));
};

//Partie de code permettant de vérifier et de valider les données inscrites
//par l'utilisateur dans le formulaire, avant l'envoi de ce dernier.

lastNameForm.onchange = event => {
  lastNameIsValid(event.target.value)?lastNameForm.setAttribute('class', 'form-control valid-form')+validationButton.removeAttribute('disabled'):lastNameForm.setAttribute('class', 'form-control invalid-form')+validationButton.setAttribute('disabled', '');
};
function lastNameIsValid(value) {
  return /[A-Z]/.test(value);
};

firstNameForm.onchange = event => {
  firstNameIsValid(event.target.value)?firstNameForm.setAttribute('class', 'form-control valid-form')+validationButton.removeAttribute('disabled'):firstNameForm.setAttribute('class', 'form-control invalid-form')+validationButton.setAttribute('disabled', '');
};
function firstNameIsValid(value) {
  return /\b[A-Z][a-z]*\b/.test(value);
};

addressForm.onchange = event => {
  addressIsValid(event.target.value)?addressForm.setAttribute('class', 'form-control valid-form')+validationButton.removeAttribute('disabled'):addressForm.setAttribute('class', 'form-control invalid-form')+validationButton.setAttribute('disabled', '');
};
function addressIsValid(value) {
  return /(\d{1,}) [a-zA-Z0-9\s]+(\.)? [a-zA-Z]/.test(value);
};

zipCodeForm.onchange = event => {
  zipIsValid(event.target.value)?zipCodeForm.setAttribute('class', 'form-control valid-form')+validationButton.removeAttribute('disabled'):zipCodeForm.setAttribute('class', 'form-control invalid-form')+validationButton.setAttribute('disabled', '');
};
function zipIsValid(value) {
  return /^[0-9]{5}$/.test(value);
};

cityForm.onchange = event => {
  cityIsValid(event.target.value)?cityForm.setAttribute('class', 'form-control valid-form')+validationButton.removeAttribute('disabled'):cityForm.setAttribute('class', 'form-control invalid-form')+validationButton.setAttribute('disabled', '');
};
function cityIsValid(value) {
  return /\b[A-Z][a-z]*\b/.test(value);
};

emailForm.onchange = event => {
  emailIsValid(event.target.value)?emailForm.setAttribute('class', 'form-control valid-form')+validationButton.removeAttribute('disabled'):emailForm.setAttribute('class', 'form-control invalid-form')+validationButton.setAttribute('disabled', '');
};
function emailIsValid(value) {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
};