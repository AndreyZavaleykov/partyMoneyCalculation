const PRODUCTS=[];

document.forms.publish.onsubmit = function () {
    const product = {
        name: this.product.value,
        amount: this.amount.value,
        price: this.price.value,
    };
    PRODUCTS.push(product);
    console.table(PRODUCTS);
    return false;
};
