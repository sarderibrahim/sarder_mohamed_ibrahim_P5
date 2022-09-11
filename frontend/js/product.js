let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id);

let displayProducts = function () {
  fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // get data image
      let img = document.querySelector(".item__img");
      img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
      // data.name and title
      let name = document.getElementById("title");
      name.innerHTML = data.name;
      let title = document.querySelector("title");
      title.innerHTML = data.name;
      // price
      let price = document.getElementById("price");
      price.innerHTML = `${data.price}`;
      // description
      let description = document.getElementById("description");
      description.innerHTML = `${data.description}`;
      // colors
      let color = document.getElementById("colors");
      for (i = 0; i < data.colors.length; i++) {
        color.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
      }
    });
};
displayProducts();
let titleProduct = document.getElementById("title");
let priceProduct = document.getElementById("price");
let descriptionProduct = document.getElementById("description");
let colorProduct = document.getElementById("colors");
let imgProduct = document.querySelector(".item__img");

let addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", addToCart);

function addToCart() {
  let panier = JSON.parse(localStorage.getItem("panier"));

  let isExist = false;

  const quantityChoose = parseInt(document.getElementById("quantity").value);
  const colors = document.getElementById("colors");

  const colorSelected = colors.options[colors.selectedIndex].value;

  console.log(quantityChoose, colorSelected);

  if (panier === null || panier === undefined) {
    panier = [];
  } else if (
    panier.find((item) => item.id === id && item.colorSelected == colorSelected)
  ) {
    panier.map((obj) => {
      if (obj.id == id && obj.colorSelected == colorSelected) {
        obj.quantityChoose += parseInt(quantityChoose);

        isExist = true;
      }
    });

    localStorage.setItem("panier", JSON.stringify(panier));

    console.log("Quantité mise à jour");
  }

  if (!isExist) {
    panier.push({
      id,

      quantity: quantityChoose,

      color: colorSelected,
    });

    console.log("Produit ajouté au panier");
  }

  localStorage.setItem("panier", JSON.stringify(panier));
  alert("Le produit a bien été ajouté au panier");
}
