// Déclaration variable et sélection

let nodeMainHTML = document.querySelector(".items")

//Fonction fetch allant chercher les infos

function getData(){
  fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => {
    for(let i = 0; i< data.length; i ++){
      let id = data[i]._id;
      let name = data[i].name;
      let description = data[i].description;
      let price = data[i].price;
      let imageUrl = data[i].imageUrl;
      let altTxt = data[i].altTxt;

      let article = 
        `<a href="./product.html?id=${id}">
          <article>
            <img src="${imageUrl}" alt="${altTxt}" />
            <h3 class="productName">${name}</h3>
            <p class="productDescription">${description}</p>
            <p class="produtctPrice">Prix : ${price} Euros</p>
          </article>
        </a>`

      nodeMainHTML.innerHTML += article;
    }
  })  
  .catch((err) => {
    alert(err);
  })
}
getData();



