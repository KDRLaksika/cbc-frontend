export function getCart() {
    let cart = localStorage.getItem("cart");
    
    if (cart == null) {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
    } else{
      cart = JSON.parse(cart);  
    }
    return cart;
}

export function removeFromCart(productId) {
    let cart = getCart();
    
    const newcart = cart.filter((item) => {
        return item.productId != productId;
    });
    localStorage.setItem("cart", JSON.stringify(newcart));
}

export function addToCart(product,qty){
    let cart = getCart();

    let index = cart.findIndex((item) => {
        return item.productId == product.productId;
    });

    if (index == -1) {
        cart[cart.length] = {
            productId: product.productId,
            name: product.name,
            price: product.price,
            labelledPrice: product.labelledPrice,
            image: product.images[0],
            qty: qty
        };
    } else {
        const newQty = cart[index].qty + qty;
        if (newQty <= 0) {
            removeFromCart(product.productId);
            return;
        }else{
            cart[index].qty = newQty;
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

export function gettotal(){

    let cart = getCart();
    let total = 0;
    
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].qty;
    }
    return total;
}