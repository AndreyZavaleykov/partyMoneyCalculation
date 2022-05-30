const PRODUCTS = [];
let PEOPLES = [];
let productsPeople = [];

document.forms.publish.onsubmit = function () {
    const product = {
        name: this.product.value,
        price: this.price.value,
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
    if (PRODUCTS.length >= 2 && PEOPLES.length >= 2) {
        PEOPLES.forEach((people, indexPeople) =>
            PRODUCTS.forEach(product => {
                let checkboxe = document.querySelector(`.${people.name}_${product.name}:checked`) !== null;
                // console.log(checkboxe);
                // console.log(PEOPLES);
                checkboxe ? PEOPLES[indexPeople].products.push(product) : '';
            })
        );
    }
    document.querySelector('table').innerHTML = `<caption>
    Список продуктов
    </caption>
    <th>Продукт/Имя</th>
    <tfoot><th>Итого</th></tfoot>`;
    // console.table(PEOPLES, PRODUCTS);
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
            if (people.products.find(item => (element.name = item.name == element.name))) {
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
    PEOPLES.map(people => {
        let summ = 0;
        if (people.products.length > 0) {
            summ = people.products.map(item => (summ += +item.price));
        }
        document.querySelector(`.${people.name}`).innerHTML += ` 
            <td>Сумма для ${people.name} : ${summ}</td>`;
            summ=0;
    });
}
