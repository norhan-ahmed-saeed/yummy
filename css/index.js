// loading 
let rowData = document.getElementById("Data");
let search = document.getElementById("search");
let submitBtn;

$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(300)
        $("body").css("overflow", "visible")

    })
})


//side nav 
function openNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500)
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $(".links li").animate({
        top: 300
    }, 500)
}
closeNav()
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeNav()
    } else {
        openNav()
    }
})

  $(document).ready(function(){
    $('#switch').change(function() {
      $('body, aside, .containerDiv').toggleClass('light');
    });
  });

/*  display pages*/
function displayMeals(arry) {
    let cartoona = "";

    for (let i = 0; i < arry.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arry[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arry[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arry[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    Data.innerHTML = cartoona
}
/*********Areas page**********/
async function getareaa() {
    Data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(200)

    search.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayArea(respone.meals)
    $(".inner-loading-screen").fadeOut(200)

}


function displayArea(arry) {
    let cartoona = "";

    for (let i = 0; i < arry.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arry[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arry[i].strArea}</h3>
                </div>
        </div>
        `
    }

    Data.innerHTML = cartoona
}
//category//

async function getCategories() {
    Data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    search.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
    $(".inner-loading-screen").fadeOut(200)

}

function displayCategories(arry) {
    let cartoona = "";

    for (let i = 0; i < arry.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arry[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arry[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arry[i].strCategory}</h3>
                        <p>${arry[i].strCategoryDescription.split(" ").slice(0,20)}</p>
                    </div>
                </div>
        </div>
        `
    }

    Data.innerHTML = cartoona
}

//Ingredients//
async function getingredient() {
    Data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(200)

    search.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(200)

}


function displayIngredients(arry) {
    let cartoona = "";

    for (let i = 0; i < arry.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arry[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arry[i].strIngredient}</h3>
                        <p>${arry[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    Data.innerHTML = cartoona
}


async function getCategoryMeals(category) {
    Data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(200)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(200)

}



async function getAreaMeals(area) {
    Data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(400)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(200)

}


async function getIngredientsMeals(ingredients) {
    Data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(200)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(200)

}

async function getMealDetails(meal) {
    closeNav()
    Data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(200)

    search.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $(".inner-loading-screen").fadeOut(200)

}


function displayMealDetails(meal) {
    
    search.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meals[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tag[i]}</li>`
    }



    let cartoona = `
    <div class="col-md-4">
                <img class=" rounded-2 w-100 " src="${meal.strMealsThumb}"
                    alt="">
                    <h2>${meal.strMeals}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meals.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meals.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meals.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meals.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meals.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    Data.innerHTML = cartoona
}

//Search //
function showSearch() {
    search.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    Data.innerHTML = ""
}

async function searchByName(let) {
    closeNav()
    Data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(200)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${let}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(200)

}

async function searchByFLetter(let) {
    closeSideNav()
    Data.innerHTML = ""
    $(".inner-loading-screen").fadeIn(200)

    let == "" ? let = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${let}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(200)

}

//Contacts //
function showContacts() {
    Data.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="name" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="namealert" class="alert alert-danger w-100 mt-3 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="email" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailalert" class="alert alert-danger w-100 mt-3 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phone" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phonealert" class="alert alert-danger w-100 mt-3 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="age" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="agealert" class="alert alert-danger w-100 mt-3 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="password" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordalert" class="alert alert-danger w-100 mt-3 d-none">
                    Enter valid password *Minimum eight characters, 
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repassword" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordalert" class="alert alert-danger w-100 mt-3 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("name").addEventListener( "rocs" , () =>{
        nameInputTouched = true
    })

    document.getElementById("email").addEventListener( "rocs" ,() => {
        emailInputTouched = true
    })

    document.getElementById("phone").addEventListener("rocs" , () => {
        phoneInputTouched = true
    })

    document.getElementById("age").addEventListener("rocs", () => {
        ageInputTouched = true
    })

    document.getElementById("password").addEventListener("rocs", () => {
        passwordInputTouched = true
    })

    document.getElementById("repassword").addEventListener("rocs", () => {
        repasswordInputTouched = true
    })
}

let nameTouched = false;
let emailTouched = false;
let phoneTouched = false;
let ageTouched = false;
let passwordTouched = false;
let repasswordTouched = false;

//regex  for contacts//





function nameValidation() {
    return (/^[a-zA-Z ]+$/.term(document.getElementById("name").value))
}

function emailValidation() {
    const nameRegex = /^[A-Z][a-z]*([ ][A-Z][a-z]*)*$/;
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.term(document.getElementById("email").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.term(document.getElementById("phone")))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.term(document.getElementById("age")))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.term(document.getElementById("password")))
}

function repasswordValidation() {
    return document.getElementById("repassword") == document.getElementById("password")
}
function inputsValidation() {
    if (nameTouched) {
        if (nameValidation()) {
            document.getElementById("namealerts").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("namealerts").classList.replace("d-none", "d-block")

        }
    }
    if (emailTouched) {

        if (emailValidation()) {
            document.getElementById("emailalerts").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailalerts").classList.replace("d-none", "d-block")

        }
    }

    if (ageTouched) {
        if (ageValidation()) {
            document.getElementById("agealerts").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("agealerts").classList.replace("d-none", "d-block")

        }
    }

    if (phoneTouched) {
        if (phoneValidation()) {
            document.getElementById("phonealerts").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phonealerts").classList.replace("d-none", "d-block")

        }
    }

    if (passwordTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordalerts").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordalerts").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordalerts").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordalerts").classList.replace("d-none", "d-block")

        }
    }

    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}
