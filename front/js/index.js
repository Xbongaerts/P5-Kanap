// Déclaration variable et sélection

let nodeMainHTML = document.querySelector(".items")

//Fonction allant chercher les infos
function getData(){ 
  fetch("http://localhost:3000/api/products") //<- ici on on vient chercher le data sur le localhost
  .then((res) => res.json())
  .then((data) => {
    for(let i = 0; i< data.length; i ++){ // <- lancement de la boucle
      // déclarations de toutes les variables nécéssaire pour afficher et attribuer leur valeurs dynamiquement
      let id = data[i]._id;
      let name = data[i].name;
      let description = data[i].description;
      let price = data[i].price;
      let imageUrl = data[i].imageUrl;
      let altTxt = data[i].altTxt;

      let article = // <- variable ou l'on ecrit le modèl HTML
        `<a href="./product.html?id=${id}">
          <article>
            <img src="${imageUrl}" alt="${altTxt}" />
            <h3 class="productName">${name}</h3>
            <p class="productDescription">${description}</p>
            <p class="produtctPrice">Prix : ${price} Euros</p>
          </article>
        </a>`

      nodeMainHTML.innerHTML += article; // Intégration au Html
    }
  })  
  .catch((err) => { // En cas d'erreur on affiche l'erreur sur la console
    alert(err);
  })
}
getData(); //<- Appel de la fonction getData



