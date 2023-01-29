
let url = 'http://localhost:5050/plants?'
let plantList = document.querySelector('.products__row')

let filterPrice = document.querySelector('.select-price')
let price = ''

let filterType = document.querySelector('.select-type')
let type = ''



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