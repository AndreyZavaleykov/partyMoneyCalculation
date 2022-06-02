const PRODUCTS = [];
let PEOPLES = [];
let productsPeople = [];

document.forms.publish.onsubmit = function () {
    const product = {
        name: this.product.value,
        price: this.price.value,
        count: '0',
    };
    PRODUCTS.push(product);
    renderTable(PRODUCTS, PEOPLES);
    return false;
};

document.forms.people.onsubmit = function () {
    const people = { name: this.people.value, products: [] };
    PEOPLES.push(people);
    renderTable(PRODUCTS, PEOPLES);
    return false;
};

function renderTable(PRODUCTS, PEOPLES) {
    PRODUCTS.forEach(product => {
        product.count = 0;
    });
    if (PRODUCTS.length >= 2 && PEOPLES.length >= 2) {
        PEOPLES.forEach((people, indexPeople) => {
            PEOPLES[indexPeople].products.length = 0;
            PRODUCTS.forEach(product => {
                let checkboxe = document.querySelector(`.${people.name}_${product.name}:checked`) !== null;
                if (checkboxe) {
                    PEOPLES[indexPeople].products.push(product);
                    product.count++;
                }
            });
        });
    }
    document.querySelector('table').innerHTML = `<caption>
    Список продуктов
    </caption>
    <th>Продукт/Имя</th>
    <tfoot><th>Итого</th></tfoot>`;
    PRODUCTS.forEach(product => {
        document.querySelector('body > table > tbody:nth-child(2) > tr').innerHTML += ` 
        <th>${product.name}</th>`;
        document.querySelector('body > table > tfoot > tr').innerHTML += ` 
        <th>${product.price}</th>`;
    });
    PEOPLES.forEach(people => {
        document.querySelector('body > table > tbody').innerHTML += ` 
        <tr class="${people.name}"> 
        <td>${people.name}</td>
        </tr>`;
        PRODUCTS.forEach(element => {
            if (people.products.some(item => item.name == element.name)) {
                document.querySelector(`body > table > tbody > .${people.name}`).innerHTML += ` 
                <td> <input type="checkbox" class="${people.name}_${element.name}"checked></td>`;
            } else {
                document.querySelector(`body > table > tbody > .${people.name}`).innerHTML += `
                <td> <input type="checkbox" class="${people.name}_${element.name}"></td>`;
            }
        });
    });
    document.querySelector('body > table > tbody:nth-child(2) > tr').innerHTML += ` 
    <th>Итого</th>`;
    PEOPLES.forEach(people => {
        let summ = 0;
        if (people.products.length > 0) {
            summ = people.products.reduce((result, item) => result + +item.price / item.count, 0).toFixed(0);
        }
        document.querySelector(`.${people.name}`).innerHTML += ` 
            <td>Сумма для ${people.name} : ${summ}</td>`;
    });
}
