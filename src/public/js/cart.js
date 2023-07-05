let isCartExist = localStorage.getItem('cartId') || null;

function navigateTo() {
    window.location.href = '/products/';
}


async function deleteItemCart(element){
    const product = element.closest(".productCart");
    const idItem = product.querySelector("#idItem").textContent;
if(isCartExist){
   const isDelete = await deleteItemCartDB(isCartExist,idItem)
   if(isDelete){
    product.remove();
   }
}

}


const deleteItemCartDB = async (cid, pid) => {

    const rs = await fetch(`/carts/${cid}/product/${pid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `${document.cookie['coderCookieToken']}`
        }   
    });
    const response = await rs.json();

    return response

}


const deleteCart = async () => {
    if(isCartExist){
const isDeleteCart = await deleteCartDB(isCartExist);
if(isDeleteCart){
    const product = document.getElementById("cards");
    product.remove();
}
    }
}


const deleteCartDB = async (cid) => {

    const rs = await fetch(`/carts/${cid}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `${document.cookie['coderCookieToken']}`
        }   
    });
    const response = await rs.json();

    return response

}