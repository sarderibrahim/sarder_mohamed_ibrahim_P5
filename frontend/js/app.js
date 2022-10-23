/*All the necessary functions to use*/

/* A function to save the cart in the localStorage */
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* A function to get the cart from the localStorage */
function getCart() {
  let cart = localStorage.getItem("cart");
  
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

/* Creating a function to add products to the cart */
function addToCart(product) {
  let cart = getCart();
  let productFound = cart.find(
    (p) => p.id === product.id && p.color === product.color
  );
  if (productFound != undefined) {
    productFound.quantity += product.quantity;
  } else {
    cart.push(product);
  }
  saveCart(cart);
}

/* Creating a function to remove products from cart */
function removeFromCart(product) {
  let cart = getCart();
  cart = cart.filter((p) => p.id != product.id || p.color != product.color);
  saveCart(cart);
}

/* Creating a function to clear the cart when order form is submitted */
function clearCart() {
  let cart = getCart();
  for (let product of cart) {
    removeFromCart(product);
  }
}

/* Creating a function to get the total amount of products in the cart */
function getNumberOfProducts() {
  let cart = getCart();
  let numberOfProduct = 0;
  for (let product of cart) {
    numberOfProduct += product.quantity;
  }
  return numberOfProduct;
}

/* Creating a function to get the total price of cart */
function getTotalPrice(product, quantity) {
  totalCartPrice += product.price * quantity;
  return totalCartPrice;
}

/* Creating a function to modify product quantity */
function modifyQuantity(product, quantity) {
  let cart = getCart();
  let productFound = cart.find(
    (p) => p.id == product.id && p.color == product.color
  );
  if (productFound != undefined) {
    productFound.quantity = quantity;
    if (quantity <= 0) {
      document.location.reload();
      removeFromCart(productFound);
      alert("L'article a été retiré de votre panier");
    } else if (quantity > 100) {
      document.location.reload();
      alert("La quantité est limitée à 100 pièces");
    } else {
      saveCart(cart);
    }
  }
}

/* Creating a function to modify total price */
function modifyTotalPrice(product, oldQuantity, newQuantity) {
  if (newQuantity > oldQuantity) {
    totalCartPrice += product.price * (newQuantity - oldQuantity);
    return totalCartPrice;
  } else if (newQuantity < oldQuantity) {
    totalCartPrice -= product.price * (oldQuantity - newQuantity);
    return totalCartPrice;
  }
}


/* Creating a function to check validity of the text inputs (firstName, LastName) and display a message (succes or error) */
function textValidity(input) {
  let nameRegExp = /^[a-zéèôöîïûùü' -]{2,50}$/gi;
  let test = nameRegExp.test(input.value);
  if (test == true) {
    input.nextElementSibling.textContent = "Champ valide";
  } else {
    input.nextElementSibling.textContent =
      "Vous ne pouvez utiliser que des lettres, espaces, - et ' ";
  }
}

/* Creating a function to check validity of the text/number inputs (City) and display a message (succes or error) */
function cityValidity(input) {
  let cityRegExp = /^[0-9]{5}[a-zéèôöîïûùü' -]{2,50}$/gi;
  let test = cityRegExp.test(input.value);
  if (test == true) {
    input.nextElementSibling.textContent = "Champ valide";
  } else {
    input.nextElementSibling.textContent =
      "Veuillez respecter le format CODE POSTAL (5 CHIFFRES) suivi du nom de la VILLE. Exemple : 75012 Paris";
  }
}

/* Creating a function to check validity of the text/number (address) inputs and display a message (succes or error) */
function adressValidity(input) {
  let adressRegExp = /^[a-z0-9éèôöîïûùü' -]{2,50}$/gi;
  let test = adressRegExp.test(input.value);
  if (test == true) {
    input.nextElementSibling.textContent = "Champ valide";
  } else {
    input.nextElementSibling.textContent =
      "Vous ne pouvez utiliser que des chiffres, lettres, espaces, - et ' ";
  }
}

/* Creating a function to check validity of the email input and display a message (succes or error) */
function emailValidity(input) {
  let emailRegExp = /^[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,10}$/gi;
  test = emailRegExp.test(input.value);
  if (test === true) {
    input.nextElementSibling.textContent = "Champ valide";
  } else {
    input.nextElementSibling.textContent =
      "Veuillez saisir une adresse email valide";
  }
}
