import * as axios from "axios";

const debug = false

let baseUrl = ""
let instance = axios.create({
    baseURL: '',
})

if (debug) {
    instance = axios.create({
        baseURL: 'http://127.0.0.1:8000/',
    })

    baseUrl = 'http://127.0.0.1:8000/'
}

else {
    instance = axios.create({
        baseURL: 'https://devgang.ru/',
    })

    baseUrl = 'https://devgang.ru/'
}

const getOptions = (mass) => {
    let formdata = new FormData();

    mass.map(m => {
        return formdata.append(m.name, m.value);
    })

    let requestOptions = {
        method: "POST",
        body: formdata,
        redirect: 'follow',
    }
    return requestOptions;
}

export const catalogApi = {

    getCatalogList() { //Список категорий товаров
        return instance.get(`api/categories`)
            .then(response => response)
    },
    getCatalogData(categoriesId, find_by_letters, pageNumber) { //Товары по конкретной категории
        let options = getOptions([{name: 'find_by_letters',value: find_by_letters}])
        return fetch(baseUrl + `api/categories/${categoriesId}?page=${pageNumber}`, options)
            .then(response => response.json())
    },

}
export const productApi = {

    getProductData(productId) { //Информация по товару по id
        return instance.get(`api/products/${productId}`)
            .then(response => response)
    },

}
