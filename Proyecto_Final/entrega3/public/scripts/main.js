
const host = document.querySelector('#host').value
function addToCart(element) {
    const productId = element.dataset.id;
    const cartId = document.querySelector('#cart').value

    const url = `${host}/api/carrito/${cartId}/productos/${productId}`;
    fetch(url, { method: 'POST' })
        .then((response) => response.json())
        .then(response => {
            if(response.error){
                Swal.fire({
                    icon: 'warning',
                    title: `Unable to add the product`,
                    showCancelButton: false,
                    showConfirmButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: `Product added to cart successfully`,
                    showCancelButton: false,
                    showConfirmButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false
                });
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}