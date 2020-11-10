//Fonctions globales

//Fonction de la case delete afin de supprimer un objet du panier.
function deleteItem() {
    localStorage.removeItem(item._id)
}

//Fonction permettant d'afficher les articles du panier.