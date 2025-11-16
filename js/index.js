
let loadCategory = () => {
    fetch(" https://taxi-kitchen-api.vercel.app/api/v1/categories")
        .then(res => res.json())
        .then(json => {
            // console.log(json.categories)
            displayCategory(json.categories);
        })
}

let displayCategory = (categories) => {

    let categoryContainer = document.getElementById("category-container");
    categoryContainer.innerHTML = "";

    categories.forEach(category => {

        let div = document.createElement("div");

        div.innerHTML = `
            <button class="btn btn-block shadow btn-category justify-start">
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