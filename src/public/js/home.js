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

const addProd = document.getElementById('formAdd');

addProd.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const thumbnails = document.getElementById('thumbnails').value;
    const code = document.getElementById('code').value;
    const category = document.getElementById('category').value;
    const stock = document.getElementById('stock').value;
    const status = document.getElementById('status').value;

    const prod = {
        title,
        price,
        description,
        thumbnails,
        category,
        code,
        stock,
        status
    };

    socket.emit('addProduct', prod);

    addProd.reset();
})

socket.on('rendProd', prod => {
    const li = document.createElement('li');
    li.innerText = prod;
    list.appendChild(li);
})