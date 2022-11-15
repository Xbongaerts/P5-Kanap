const parsedUrl = new URL(window.location.href);

const id = parsedUrl.searchParams.get("id");

let nodeMainHTML = document.querySelector(".item__img")

function getData (id){ 
    fetch("http://localhost:3000/api/products/"+id)
    .then((res) => res.json())
    .then((data) => { 

         //gestion et affichage de l'image
        let image = document.getElementsByClassName("item__img");
        let displayImage = `<img src="${data.imageUrl}" alt ="${data.altTxt}" />`;
        image[0].innerHTML = displayImage;
      
        //gestion et affichage du nom
        let name = document.getElementById('title');
        let nameProduct = document.getElementById('titre');
        nameProduct.innerHTML = data.name;
        name.innerHTML = data.name;

        //gestion et affichage du prix du produit
        let price = document.getElementById('price');
        price.innerHTML = data.price;

        //gestion et affichage de la description du produit 
        let description = document.getElementById('description');
        description.innerHTML = data.description;

        //gestion et affichage des couleurs 
        let colors = document.getElementById('colors');
        for ( colorsOptions of data.colors){
            colors.innerHTML += `<option value="${colorsOptions}"> ${colorsOptions}</option> `;
        };    

    })
}
//Gestion du LocalStorage

//Récupération de l'évènement bouton html 
const addToCartButton = document.getElementById('addToCart');
addToCartButton.addEventListener('click', (event) => {

    //récupération de la couleur choisie 
    const productOptions = document.getElementById('colors').value;
    
    //récupération de la quantité totale
    const productQuantity = parseInt(document.getElementById('quantity').value);

    if((productQuantity <= 0 || productQuantity > 100) || productOptions ==""){
        alert('Veillez renseigner les informations manquantes');
        return;
    }

    let userDataStorage = localStorage.getItem('produit');
    if(userDataStorage){
        let userDataChoose = JSON.parse(userDataStorage);
        console.log(userDataChoose);
        let modifyStorage = false;
        for(product of userDataChoose){
            if(product._id === id && product.colors === productOptions){
                product.quantity = parseInt(product.quantity, 10)+parseInt(productQuantity,10);
                modifyStorage=true;
            }
        }
        if(modifyStorage === false){
            userDataChoose.push({
                _id: id, 
                color: productOptions, 
                quantity: productQuantity
            });
            console.log('hors for ', userDataChoose);
        }
        localStorage.setItem('produit', JSON.stringify(userDataChoose));
    }else{
        let userDataChoose = [{
            _id: id,
            colors: productOptions, 
            quantity: productQuantity
        }];
        console.log(userDataChoose);
        localStorage.setItem('produit', JSON.stringify(userDataChoose));
    };
    alert('Article ajouté au panier');
});
getData(id);
