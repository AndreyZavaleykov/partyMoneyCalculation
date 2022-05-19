const PRODUCTS = [];
const PEOPLE = [];

document.forms.publish.onsubmit = function () {
    const product = {
        name: this.product.value,
        price: this.price.value,
    };
    PRODUCTS.push(product);
    renderTable(PRODUCTS, PEOPLE);
    return false;
};
document.forms.people.onsubmit = function () {
    const people = this.people.value;
    PEOPLE.push(people);
    renderTable(PRODUCTS, PEOPLE);
    return false;
};

function renderTable(PRODUCTS, PEOPLE) {
    document.querySelector("table").innerHTML = `<caption>
    Список продуктов
    </caption>
    <th>Продукт/Имя</th>
    <tfoot><th>Итого</th></tfoot>`;
    console.table(PEOPLE, PRODUCTS);
    PRODUCTS.forEach(product => {
        document.querySelector("body > table > tbody:nth-child(2) > tr").innerHTML += ` 
        <th>${product.name}</th>`;
        document.querySelector("body > table > tfoot > tr").innerHTML += ` 
        <th>${product.price}</th>`;
    });
    PEOPLE.forEach(people => {
        document.querySelector("body > table > tbody").innerHTML += ` 
        <tr class="${people}"> 
        <td>${people}</td>
        </tr>`;
        PRODUCTS.forEach(
            Element =>
                (document.querySelector(`body > table > tbody > .${people}`).innerHTML += ` 
                <td> <input type="checkbox" class="${Element.name}"></td>`)
        );
    });
    document.querySelector("body > table > tbody:nth-child(2) > tr").innerHTML += ` 
    <th>Итого</th>`;
    PEOPLE.map(
        e =>
            (document.querySelector(`.${e}`).innerHTML += ` 
            <td>Сумма для ${e}</td>`)
    );
}
