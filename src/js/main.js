//we should install nodejs to use "npm" to use database of "json server"
// http://localhost:3000/items

// ============================== selects ==============================
const searchInput = document.querySelector("#search");
const productsDOM = document.querySelector(".products");
const btns = document.querySelectorAll(".btn");

// ============================== qlobal variables ==============================
const URL = "http://localhost:3000/items";
let allProductsData = [];
const filters = {
  searchItem: "",
}; // ?

// ============================== event listeners ==============================

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get(URL)
    .then((res) => {
      allProductsData = res.data;
      // render all products to DOM
      renderProducts(allProductsData, filters);
    })
    .catch((err) => console.log(err.message));
});

// filter input
searchInput.addEventListener("input", (e) => {
  filters.searchItem = e.target.value;
  // render products when searching in input
  renderProducts(allProductsData, filters);
});

// filter categories
btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const filter = e.target.dataset.filter;

    filters.searchItem = filter;
    // render products when selected category
    renderProducts(allProductsData, filters); // ?
  });
});

// ============================== functions ==============================
//render products to DOM
function renderProducts(_products, _filters) {
  const filteredProducts = _products.filter((p) => {
    return p.title.includes(_filters.searchItem); // ?
  });

  // render filter products on DOM
  productsDOM.innerHTML = "";

  filteredProducts.forEach((item, index) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
    <div class="product-img">
            <img src="./assets/img/backgrand product img/blob-haikei.png" alt="" class="bg-product">
            <img src="${
              item.image
            }" alt="${index}" srcset="" class="img-product"/>
        </div>
        <div class="product-desc">
          <div class="product-desc-header">
            <h3 class="product-title">${item.title}</h3>
            <i class="fa-solid fa-heart"></i>
          </div>
        <p class="product-price">${item.price} ريال</p>
        <h3 class="product-info">توضیحات</h3>
        <p class="product-info-desc">${
          item.discription.slice(0, 100) + "..."
        }</p>
    </div>
    <button class="add-to-cart">اضافه به سبد خرید</button>
  `;

    productsDOM.append(productDiv);

  });

  const hearts = document.querySelectorAll(".fa-heart");
  hearts.forEach(heart => {
    heart.addEventListener("click", (e) => {
      const red = e.target
      red.classList.add("red");
    })
  })
}

// Separating three digits from numbers in JavaScript
// function separate(Number) {
//   Number += "";
//   Number = Number.replace(",", "");
//   let x = Number.split(".");
//   let y = x[0];
//   let z = x.length > 1 ? "." + x[1] : "";
//   var rgx = /(\d+)(\d{3})/;
//   while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
//   return y + z;
// }
