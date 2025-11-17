
let loadCategory = () => {
  fetch(" https://taxi-kitchen-api.vercel.app/api/v1/categories")
    .then(res => res.json())
    .then(json => {
      // console.log(json.categories)
      displayCategory(json.categories);
    })
}


// Remove Active

let removeActive = () => {

  let allBtns = document.querySelectorAll(".all-btn")

  allBtns.forEach((allBtn) => {
    allBtn?.classList?.remove("active");
  })
}


// loadCategoryId

let loadCategoryId = (id) => {

  document.getElementById("food-container").classList.add("hidden");
  document.getElementById("loading-spinner").classList.remove("hidden");


  fetch(` https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`)
    .then(res => res.json())
    .then(json => {

      removeActive();
      let categoryBtn = document.getElementById(`category-btn-${id}`)
      categoryBtn?.classList?.add("active");
      // console.log(json.foods)
      displayCategoryId(json.foods);
    })
}


// loadRandomData

let loadRandomData = () => {
  fetch(" https://taxi-kitchen-api.vercel.app/api/v1/foods/random")
    .then(res => res.json())
    .then(json => {
      // console.log(json.foods)
      displayCategoryId(json.foods);
    })
}


// loadFoodDetails

let loadFoodDetails = (id) => {
  fetch(`https://taxi-kitchen-api.vercel.app/api/v1/foods/${id}`)
    .then(res => res.json())
    .then(json => {
      // console.log(json.details);
      displayDetails(json.details);
    })
}

let displayDetails = (details) => {
  let detailsContainer = document.getElementById("details-container");

  detailsContainer.innerHTML = `
            <h2 class="text-3xl font-bold">${details.title}</h2>
            <br>
              <div>
                <img src="${details.foodImg}" alt="">
              </div>
              <br>
              <div class="badge badge-warning">
                ${details.category}
              </div>
              <br>
              <br>
              <a class="btn btn-warning" href="">Watch Video</a>
    `

  document.getElementById("my_modal_5").showModal();

}

loadFoodDetails();


let card = [];
let total = 0;

let displayCategoryId = (foods) => {

  let foodContainer = document.getElementById("food-container");
  foodContainer.innerHTML = "";

  foods.forEach((food) => {

    let div = document.createElement("div");

    div.innerHTML = `
        <div onclick="loadFoodDetails(${food.id})" class="p-5 bg-white flex gap-3 shadow-lg rounded-xl mt-5 cursor-pointer hover:scale-105 hover:transition duration-300">
            <div class="img flex-1">
              <img
                src="${food.foodImg}"
                alt=""
                class="w-[160px] rounded-xl h-[160px] object-cover food-img"
              />
            </div>
            <div class="flex-2">
              <h1 class="text-xl font-bold food-title">
                ${food.title}
              </h1>

              <div class="badge badge-warning">${food.category}</div>

              <div class="divider divider-end">
                <h2 class="text-yellow-600 font-semibold">
                  $ <span class="price food-price">${food.price}</span> BDT
                </h2>
              </div>

              <button onclick="addToCart(this)" class="btn btn-warning">
                <i class="fa-solid fa-square-plus"></i>
                Add This Item
              </button>
            </div>
        </div>
        `

    foodContainer.append(div);

  })

  document.getElementById("food-container").classList.remove("hidden");
  document.getElementById("loading-spinner").classList.add("hidden");

}

loadRandomData();
loadCategoryId();



let displayCategory = (categories) => {

  let categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = "";

  categories.forEach(category => {

    let div = document.createElement("div");

    div.innerHTML = `
            <button id="category-btn-${category.id}" onclick="loadCategoryId(${category.id})" class="btn btn-block shadow btn-category justify-start all-btn">
                <img
                    src="${category.categoryImg}"
                alt=""
                class="w-10"
                />${category.categoryName}
            </button>
        `

    categoryContainer.append(div)

  })
}

loadCategory();

let addToCart = (btn) => {

  let cart = btn.parentNode.parentNode;
  let foodTitle = cart.querySelector(".food-title").innerText;
  let foodImg = cart.querySelector(".food-img").src;
  let foodPrice = parseInt(cart.querySelector(".food-price").innerText);

  let selectedItem = {
    title: foodTitle,
    img: foodImg,
    price: foodPrice,
  }
  card.push(selectedItem);
  total = total + foodPrice;
  displayAddCart(card);
  displayTotal(total);
}


let displayTotal = (value) => {

  document.getElementById("total-price").innerText = value;

}


displayAddCart = (carts) => {
  let cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";

  for (let cart of carts) {

    let div = document.createElement("div");

    div.innerHTML = `
    <div class="p-1 bg-white flex gap-3 shadow-lg rounded-xl relative mt-2">
            <div class="img">
              <img
                src="${cart.img}"
                alt=""
                class="w-[50px] rounded-xl h-[50px] object-cover"
              />
            </div>
            <div class="flex-1">
              <h1 class="text-xs font-bold">
                ${cart.title}
              </h1>

              <div class="">
                <h2 class="text-yellow-600 font-semibold">
                  ৳ <span class="price">${cart.price}</span> BDT
                </h2>
              </div>
            </div>
            <div
              class="w-6 h-6 flex justify-center items-center bg-red-600 rounded-full absolute -top-1 -right-1 text-white cursor-pointer"
            >
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
    `

    cartContainer.append(div);

  }
}

addToCart();