
let url = 'http://localhost:5050/plants?'
let plantList = document.querySelector('.products__row')

let filterPrice = document.querySelector('.select-price')
let price = ''

let filterType = document.querySelector('.select-type')
let type = ''

//Корзина
let basketData = [];
let basketList = document.querySelector('.basket__container')

// Вывод продукта из базы
const getPlants = () => {
    plantList.innerHTML = ''
    fetch(url + `${price.length ? '_sort=price&_order='+ price + '&' : ''}${type.length ? 'type='+ type : ''}`)
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
                        <div class="btns">
                        ${
                           basketData.filter((el) => el.id === item.id).length ?
                              `<span  data-id="${item.id}" class="add-cart-active removeCart">
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
<rect width="32" height="32" rx="8" fill="url(#paint0_linear_60_200)"/>
<g clip-path="url(#clip0_60_200)">
<g filter="url(#filter0_d_60_200)">
<path
    d="M19.6567 11.6207C19.8394 11.4363 20.0876 11.3318 20.3471 11.3299C20.6066 11.3279 20.8563 11.4288 21.0416 11.6105C21.227 11.7921 21.3329 12.0398 21.3362 12.2993C21.3395 12.5588 21.24 12.809 21.0594 12.9954L15.8327 19.5294C15.7429 19.626 15.6346 19.7036 15.5141 19.7575C15.3937 19.8114 15.2636 19.8404 15.1317 19.8429C14.9998 19.8454 14.8687 19.8213 14.7463 19.772C14.6239 19.7227 14.5127 19.6492 14.4194 19.556L10.954 16.092C10.7699 15.9078 10.6665 15.6579 10.6665 15.3975C10.6666 15.137 10.7701 14.8872 10.9544 14.703C11.1386 14.5189 11.3885 14.4155 11.6489 14.4155C11.9094 14.4156 12.1592 14.5191 12.3434 14.7034L15.084 17.4447L19.6307 11.6514C19.639 11.6408 19.6479 11.6308 19.6574 11.6214L19.6567 11.6207Z"
    fill="white"/>
</g>
</g>
<defs>
<filter id="filter0_d_60_200" x="10.6665" y="11.3298" width="10.6698" height="10.5132" filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="2"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_60_200"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_60_200" result="shape"/>
</filter>
<linearGradient id="paint0_linear_60_200" x1="16" y1="0" x2="16" y2="32" gradientUnits="userSpaceOnUse">
<stop stop-color="#89F09C"/>
<stop offset="1" stop-color="#3CC755"/>
</linearGradient>
<clipPath id="clip0_60_200">
<rect width="10.6667" height="10.6667" fill="white" transform="translate(10.6667 10.6667)"/>
</clipPath>
</defs>
</svg>

</span>`
                               :
                             `<span data-id="${item.id}"  class="add-cart addCart "> 
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#F2F2F2"/>
<path
    d="M20.6653 15.1312H17.2021V11.6682C17.2021 10.3328 15.1311 10.3328 15.1311 11.6682V15.1312H11.668C10.3329 15.1312 10.3329 17.2022 11.668 17.2022H15.1311V20.6652C15.1311 22.0005 17.2021 22.0005 17.2021 20.6652V17.2022H20.6653C22.0005 17.2022 22.0005 15.1312 20.6653 15.1312Z"
    fill="#D3D3D3"/>
</svg>

                        </span>`
                        }                                            
                        </div>                     
                    </div>        
                `
            })
            // Отображение кнопок при нажатии,  смена кнопок
            let addBasketBtn = document.querySelectorAll('.addCart');
            Array.from(addBasketBtn).forEach((item) => {
                item.addEventListener('click', () => {
                    basketData = [...basketData, res.find((el) => el.id === +item.dataset.id)]
                    getPlants();

                })
            });


            let removeBasketBtn = document.querySelectorAll('.removeCart')
            Array.from(removeBasketBtn).forEach((item) => {
                item.addEventListener('click', () => {
                    basketData = basketData.filter((el) => el.id !== +item.dataset.id)
                    getPlants();

                })
            })

        })


        .catch((err) => console.log(err))


}

// const getBasket = () => {
//     basketList.innerHTML = ''
//     basketData.forEach((item) => {
//         basket.innerHTML += `
//             <div class="basket__card">
//                         <img class="basket__img" src="${item.images}" alt="">
//                         <div class="basket__text">
//                             <p class="basket__title">${item.title}</p>
//                             <p class="basket__type">${item.type}</p>
//                             <p class="basket__desc">${item.desc}</p>
//                             <p class="basket__price">${item.price}₽</p>
//                             <span class="basket__delete">
//                             <img src="../assets/img/delete.png" alt="">
//                             </span>
//                         </div>
//                     </div>
//     `
//     })
// }

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