const quantityInputs = document.getElementsByClassName('quantityInput');
const reduceButtons = document.getElementsByClassName('reduceQuantity');
const incrementButtons = document.getElementsByClassName('incrementQuantity');
const addToCartButtons = document.getElementsByClassName('addToCart');

const addToCart = async (pid, quantity) => {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
        const response = await updateQuantityProd(cartId, pid, quantity);
        if (response.status === 'failed') {
            await AddToCartDB(cartId, pid, quantity);
        }
    } else {
        const newCart = await createCart();
        localStorage.setItem('cartId', newCart.payload);
        await AddToCartDB(newCart.payload, pid, quantity);
    }
    updateCartBadge();
};

const updateQuantityProd = async (cartId, productId, quantity) => {
    const response = await fetch(`/carts/${cartId}/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            quantity: quantity
        })
    });
    return response.json();
};

const createCart = async () => {
    const response = await fetch('/carts/', {
        method: 'POST'
    });
    return response.json();
};

const AddToCartDB = async (cartId, productId, quantity) => {
    const response = await fetch(`/carts/${cartId}/products/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            quantity: quantity
        })
    });
    return response.json();
};

const updateCartBadge = async () => {
    const cartId = localStorage.getItem('cartId');
    if (cartId) {
        const response = await fetch(`/carts/${cartId}`);
        const cart = await response.json();
        const badge = document.getElementById('quantityBadge');
        badge.textContent = cart.products.length;
    }
};

for (let i = 0; i < reduceButtons.length; i++) {
    reduceButtons[i].addEventListener('click', function() {
        const quantityInput = this.parentNode.querySelector('.quantityInput');
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            currentValue--;
            quantityInput.value = currentValue;
        }
    });
}

for (let i = 0; i < incrementButtons.length; i++) {
    incrementButtons[i].addEventListener('click', function() {
        const quantityInput = this.parentNode.querySelector('.quantityInput');
        let currentValue = parseInt(quantityInput.value);
        currentValue++;
        quantityInput.value = currentValue;
    });
}

for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', function() {
        const productId = this.getAttribute('data-pid');
        const quantityInput = this.parentNode.querySelector('.quantityInput');
        const quantity = parseInt(quantityInput.value);
        addToCart(productId, quantity);
    });
}

updateCartBadge();
