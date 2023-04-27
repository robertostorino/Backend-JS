// Me devuelve el origen, por ejemplo:  'http://localhost:8080'
const host = window.location.origin
function sendOrder() {
    const url = `${host}/order`;
    console.log(`URL: ${url}`)
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
                    title: response.message,
                    showCancelButton: false,
                    showConfirmButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then(result => {
                    if (result.isConfirmed) {
                        console.log("la respuesta es:")
                        console.log(response)
                        window.location.reload();
                    }
                });
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}