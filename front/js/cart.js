//je récupére les données dans le localStorage
let cart = JSON.parse(localStorage.getItem('produit')) || [];

//j'affiche le contenu dans la console 
console.log(cart);

document.getElementById("totalQuantity").innerHTML = 0;
document.getElementById("totalPrice").innerHTML = 0;
let i = 0;

for (i=0; i < cart.length; i++){
    let color = cart[i].colors;
    let quantity = cart[i].quantity;
    fetch('http://localhost:3000/api/products/'+cart[i]._id)
    .then(function(response){
        if(response){
            return response.json();
        }
    })
    .then(function(product){
        let price = product.price;
        let name = product.name;
        let picture = product.imageUrl;
        let description = product.description;
        console.log(name, price, color, description);

        let displayCart = `
    
        <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
    
            <div class="cart__item__img">
                <img src="${picture}" alt="${description}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${name}</h2>
                    <p>${color}</p>
                    <p>${price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>`

        let cartHtmlCode = document.getElementById('cart__items');
        cartHtmlCode.innerHTML += displayCart;

        const productSum = document.getElementById("totalQuantity");
        productSum.innerHTML = parseInt(productSum.textContent) + quantity;

        const sumProductPrice = document.getElementById("totalPrice");
        sumProductPrice.innerHTML = parseInt(sumProductPrice.textContent)+price*quantity;

        eventDeleteItem();
        eventUpdateItem();
    })
    .catch(function(error){
        console.log("une erreur est survenue ", error);
    });
    validUserData();

    function eventDeleteItem(){
        let deleteItems = document.getElementsByClassName('deleteItem');

        let i = 0;
            for(let deleteItem of deleteItems){
                deleteItem.id = i;
                i++;

        deleteItem.addEventListener('click', (event) => {
            let deleteItem = event.target;

            console.log('target', event.target);
            console.log('target', event.target.id);

            console.log(parseInt(deleteItem.id));
            cart.splice(parseInt(deleteItem.id),1);

            localStorage.setItem('produit', JSON.stringify(cart))
            alert('Article supprimé avec succès');
            window.location.reload();
        });
    };
};
    function eventUpdateItem() {

        const itemQuantityList =document.getElementsByClassName('itemQuantity');

        let index = 0;
        for (let itemQuantity of itemQuantityList) {

            itemQuantity.id = index;
            index++;

            itemQuantity.addEventListener('change', (event => {

            const itemQuantity = event.target;
            console.log(itemQuantity);
            const indexProduct = itemQuantity.id;
            let quantity = itemQuantity.value;
    
            if( quantity <= 0 ){
                alert('La quantité doit est strictement comprise entre 1 et100');
    
            quantity=1
            }

            if (quantity > 100) {
                alert('La quantité doit est strictement comprise entre 1 et100');
    
            quantity=100
            }

            let cart = JSON.parse(localStorage.getItem('produit'));

            cart[indexProduct].quantity = parseInt(quantity);
            console.log(cart);
            localStorage.setItem('produit', JSON.stringify(cart))
            window.location.reload();
            }));
        }
    };
    // Formulaire
    function validUserData() {
        const form = document.querySelector('.cart__order__form');
        console.log(form);

    // console.log(form);
    for (input of form){

    //console.log(input);
    input.addEventListener('change', (e) =>{
        validText();
        validAddress();
        validEmail();
        })
    };
}

function validText() {

    let letterAndSymbols = /^[a-zA-ZÀ-ÄÈ-ÏÑ-ÖÙ-Ýà-äè-öù-ÿ'-\s]+$/;

    //Controle Prénom
    const firstNameContent = document.getElementById('firstName');
    // console.log(firstNameContent);
    const errorFName = document.getElementById('firstNameErrorMsg');

    if (letterAndSymbols.test(firstNameContent.value)){
        errorFName.innerHTML = 'Valide';

    }else{
        errorFName.innerHTML= 'Invalide: Les chiffres ne sont pas acceptés';
    };

    // Controle nom de famille
    const lastNameContent = document.getElementById('lastName');
    // console.log(lastsNameContent);
    const errorLName = document.getElementById('lastNameErrorMsg');

    if (letterAndSymbols.test(lastNameContent.value)){
        errorLName.innerHTML = 'Valide';
    }else{
    errorLName.innerHTML = 'Invalide: Les chiffres ne sont pas acceptés';
    };

    //Controle nom de la ville
    const cityContent = document.getElementById('city');
    const errorCity = document.getElementById('cityErrorMsg');

    if (letterAndSymbols.test(cityContent.value)){
        errorCity.innerHTML = 'Valide';
    }else{
        errorCity.innerHTML = 'Invalide: Les chiffres ne sont pas acceptés';
    };
}

function validAddress (){
    const address = document.getElementById('address');
    const errorAddress = document.getElementById('addressErrorMsg');
    const validTempers = /^[a-zA-Z0-9',\s]+$/;

    if (validTempers.test(address.value)){
        errorAddress.innerHTML = 'Valide';
    }else{
        errorAddress.innerHTML= 'Invalide: Ne pas utiliser de caractères spéciaux';
    };
};

function validEmail(){
    const email= document.getElementById('email');
    const error = document.getElementById('emailErrorMsg');

    const emailText =/^[a-zA-Z0-9.-]+[@]{1}[a-zA-Z0-9.-]+[.]{1}[a-z]{2,10}$/;

    if (emailText.test(email.value)){
        error.innerHTML = 'Valide';
    }else{
        error.innerHTML= 'Invalide: veuillez respecter l\'exemple suivante exemple@exemple.fr';
    };
};

    const order = document.getElementById("order");
    order.addEventListener("click", function(e){
    e.preventDefault();
    let products = JSON.parse(localStorage.getItem("produit"));

    if(products === null || products.length < 1){
        alert("Votre panier est vide, veuillez ajouter des articles pourles commander. ");
    }
    else{
        const productsId = [];
        products.forEach((product) => {
        productsId.push(product._id);
    });

    const order = {
        contact: {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
        },
        products: productsId,
    };
    orderProduct(order);
    }
});

function orderProduct(order) {
    // j'appelle l'API
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
            // J'envoie l'Objet JSON
            body: JSON.stringify(order),
        })
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })

        .then(function (value) {
            window.location =`./confirmation.html?orderId=${value.orderId}`;

            localStorage.clear();
        })
        //
        .catch(function (err) {
            console.log(err);
            alert("Veuillez nous excuser, votre commande n'a pas pu être transmise.");
        });
    }
};