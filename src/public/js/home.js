const socket = io();

const list = document.getElementById('lista-productos');

socket.on('products', products => {
    console.log(products);
    products.forEach( product => {
        const item = document.createElement('li');
        item.innerHTML = product.title;
        list.appendChild(item);
    });
});