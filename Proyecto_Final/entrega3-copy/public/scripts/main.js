// Me devuelve el origen, por ejemplo:  'http://localhost:8080'
const host = window.location.origin;

function addToCart(element) {
    const productId = element.dataset.id;
    const cartId = document.querySelector('#cart').value;
    const URL = `${host}/api/carrito/${cartId}/productos/${productId}`;
    console.log("URL")
    console.log(URL)
    fetch(URL, { method: 'POST' })
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
};