
let loadCategory = () => {
    fetch(" https://taxi-kitchen-api.vercel.app/api/v1/categories")
        .then(res => res.json())
        .then(json => {
            // console.log(json.categories)
            displayCategory(json.categories);
        })
}


// loadCategoryId

let loadCategoryId = (id) => {
    fetch(` https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`)
    .then(res => res.json())
    .then(json => {
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


let displayCategoryId = (foods) => {
    
    let foodContainer = document.getElementById("food-container");
    foodContainer.innerHTML = "";
    
    foods.forEach((food) => {
        
        let div = document.createElement("div");

        div.innerHTML = `
        <div class="p-5 bg-white flex gap-3 shadow-lg rounded-xl mt-5">
            <div class="img flex-1">
              <img
                src="${food.foodImg}"
                alt=""
                class="w-[160px] rounded-xl h-[160px] object-cover"
              />
            </div>
            <div class="flex-2">
              <h1 class="text-xl font-bold">
                ${food.title}
              </h1>

              <div class="badge badge-warning">${food.category}</div>

              <div class="divider divider-end">
                <h2 class="text-yellow-600 font-semibold">
                  $ <span class="price">${food.price}</span> BDT
                </h2>
              </div>

              <button class="btn btn-warning">
                <i class="fa-solid fa-square-plus"></i>
                Add This Item
              </button>
            </div>
        </div>
        `

        foodContainer.append(div);

    })
}

loadRandomData();
loadCategoryId();



let displayCategory = (categories) => {

    let categoryContainer = document.getElementById("category-container");
    categoryContainer.innerHTML = "";

    categories.forEach(category => {

        let div = document.createElement("div");

        div.innerHTML = `
            <button onclick="loadCategoryId(${category.id})" class="btn btn-block shadow btn-category justify-start">
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