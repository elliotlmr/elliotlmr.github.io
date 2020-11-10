//Fonctions globales
const itemDisplay = document.getElementById('item-display');
var pathId = location.hash.substr(1);

//Au chargement de la page Produit, depuis la séléction de la page accueil.
document.body.onload = function () {
    //Initialisation de la requete fetch.
    fetch('http://localhost:3000/api/cameras', {
        method: 'GET',
        headers: { 'content-type': 'application/json' }
    }).then(function (response) {
        return response.json();
    }).then(function (json) {
        let item = json.map(select(_id == (pathId)));
        displayItem(item);
        //Fonction permettant de récuperer l'id de l'objet souhaité dans l'URL, et d'afficher le contenu en conséquence.
        function displayItem(item) {
            //Création des éléments constituant le contenu de la page.
            const addItem = document.createElement('div');
            const imageHolder = document.createElement('div');
            const addImage = document.createElement('img');
            const descriptionHolder = document.createElement('div');
            const addName = document.createElement('h3');
            const addText = document.createElement('p');
            const addLense = document.createElement('div');
            const footerHolder = document.createElement('div');
            const addPrice = document.createElement('h4');
            const addButton = document.createElement('button');

            //Définition des classes pour chaque parties composant un article.
            addItem.setAttribute('class', 'row store-item shadow');
            imageHolder.setAttribute('class', 'col-12 col-lg-4');
            descriptionHolder.setAttribute('class', 'col-12 col-lg-8 item-description');
            footerHolder.setAttribute('class', 'footer-holder');
            addButton.setAttribute('class', 'btn btn-dark float-right option-btn');
            addButton.setAttribute('type', 'submit');
            addButton.setAttribute('id', item._id);

            //Ajout du contenu, des titres et descriptions des articles.
            addName.textContent = item.name;
            addText.textContent = item.description;
            addPrice.textContent = 'Prix : ' + item.price + ' €';
            addButton.innerHTML = 'Ajouter au panier';

            //Création des attributs, src et alt des images.
            addImage.src = item.imageUrl;
            addImage.alt = item.name;
            addImage.setAttribute('width', '100%');

            //Répartition des différents éléments composant un article.
            itemDisplay.appendChild(addItem);
            addItem.appendChild(imageHolder);
            addItem.appendChild(descriptionHolder);
            imageHolder.appendChild(addImage);
            descriptionHolder.appendChild(addName);
            descriptionHolder.appendChild(addText);
            descriptionHolder.appendChild(addLense);
            descriptionHolder.appendChild(footerHolder);
            footerHolder.appendChild(addPrice);
            footerHolder.appendChild(addButton);
        }
    }).catch(function (err) {
        itemDisplay.innerHTML = "Aucun produit sélectionné. Veuillez choisir un article depuis la page";
    });
}


