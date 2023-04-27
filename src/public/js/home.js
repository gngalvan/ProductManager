const socket = io();

document.addEventListener('DOMContentLoaded', function() {

    const list = document.getElementById('lista-productos');    

    socket.on('products', products => {
        products.forEach( product => {
            const item = document.createElement('li');
            item.innerHTML = product.title;
            list.appendChild(item);
        });
    });


    if (window.location.pathname === '/realtimeproducts') {

        const addProd = document.getElementById('formAdd');

        addProd.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.getElementById('title').value;
            const price = Number(document.getElementById('price').value);
            const description = document.getElementById('description').value;
            const thumbnails = document.getElementById('thumbnails').value;
            const code = document.getElementById('code').value;
            const category = document.getElementById('category').value;
            const stock = Number(document.getElementById('stock').value);
            const status = document.getElementById('status').checked;

            const prod = {
                title,
                description,
                price,    
                code,    
                status,    
                thumbnails,
                stock,  
                category            
            };

            socket.emit('addProduct', prod);

            addProd.reset();
        });

        socket.on('rendProd', prod => {
            const item = document.createElement('li');
            item.innerHTML = prod.title;
            list.appendChild(item);
        });

        const deleteProd = document.getElementById('formDelete');

        deleteProd.addEventListener('submit', (e) => {
            e.preventDefault();

            socket.emit('deleteProduct', e.target[0].value);

            deleteProd.reset();
        });
    };

});