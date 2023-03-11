const host = document.querySelector('#host').value
function sendOrder() {
    const url = `${host}/order`;
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
                    allowEscapeKey: false
                });
                window.location.reload()
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}