
let url = 'http://localhost:5050/plants?'
let plantList = document.querySelector('.products__row')

let filterPrice = document.querySelector('.select-price')
let price = ''

let filterType = document.querySelector('.select-type')
let type = ''



// Вывод продукта из базы
const getPlants = () => {
    plantList.innerHTML = ''
    fetch(url + `${price.length ? '_sort=price&_order=' + price + '&' : ''}${type.length ? 'type=' + type : ''}`)
        .then((res) => res.json())
        .then((res) => {
            res.forEach((item) => {
                plantList.innerHTML += `
                <div class="product__card">
                        <img class="product__img" src="${item.images}" alt="">
                        <p class="product__title">${item.title}</p>
                        <p class="product__type">${item.type}</p>
                        <p class="product__desc">${item.desc}</p>
                        <p class="product__price">${item.price}₽</p>                                          
                    </div>        
                `
            })
        })


        .catch((err) => console.log(err))


}

// Фильтрация по цене
filterPrice.addEventListener('change', (e) => {
    price = e.target.value
    getPlants()
})

filterType.addEventListener('change', (e) => {
    type = e.target.value
    getPlants()
})


getPlants();



//User

const user = document.querySelector(".user");
const userName = document.querySelector(".userName");
const userEmail = document.querySelector(".userEmail");
const userImg = document.querySelector(".userImg");
const userInfo = document.querySelector(".userInfo");
const logOut = document.querySelector(".logOut");

window.addEventListener("load", () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    userName.innerHTML += user.name;
    userEmail.innerHTML += user.email;
    userImg.src = user.image;

    if (localStorage.getItem("access_token") === "false") {
        window.open("../pages/auth.html", "_self")
    }
})

user.addEventListener("click", (e) => {
    e.preventDefault()
    userInfo.classList.toggle("active");
    user.classList.toggle("userIcon");
})

logOut.addEventListener("click", () => {
    localStorage.setItem("access_token", "false");
    window.open("../pages/auth.html", "_self")
})



/*swiper*/
new Swiper(".swiper", {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
    },
    grabCursor: true,
    mousewheel: {
        sensitivity: 1,
    },
    slidesPerView: 3,
    loop: true,
})