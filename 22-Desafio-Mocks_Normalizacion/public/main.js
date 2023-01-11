const socket = io();

const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
});

let formProducts = document.getElementById("productForm");
let formMessages = document.getElementById("messageForm");

formProducts.addEventListener('submit', (event)=>{
    event.preventDefault();
    const product = {
        title: document.querySelector('[name="title"]').value,
        price: document.querySelector('[name="price"]').value,
        thumbnail: document.querySelector('[name="thumbnail"]').value
    }
    formProducts.reset();
    socket.emit('newProduct', product);
})

formMessages.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = {
        author : {
            mail: document.querySelector('[name="mail"]').value,
            name: document.querySelector('[name="name"]').value,
            surname: document.querySelector('[name="surname"]').value,
            age: document.querySelector('[name="age"]').value,
            alias: document.querySelector('[name="alias"]').value,
            avatar: document.querySelector('[name="avatar"]').value
        },
        date: new Date().toLocaleString().replace(',', ''),
        text : document.querySelector('[name="text"]').value
    }
    socket.emit('newMessage', message);
    document.querySelector('[name="message"]').value = '';
})




socket.on('products', data => {
    let html;
    if (data.length > 0) {
        html = data.map(product => {
                return `<tr>
                        <td>${product.title}</td>
                        <td> ${formatterPeso.format(product.price)}</td>
                        <td><img style="width: 60px" src="${product.thumbnail}" alt="${product.title}"></td>
                    </tr>`
            })
            .join(" ")
    } else {
        html = `
                <tr>
                    <td scope="row" colspan="4" style="text-align:center;">HO HAY PRODUCTOS</td>
                </tr>`;

    }
    document.getElementById("tbody").innerHTML = html;
});

socket.on('messages', data => {
    const data = denormalize(dataNormalized);
    document.getElementById('compression').innerHTML = `<p style="color: crimson;" class="text-center"> Comprensión de archivo: ${dataNormalized.compression} % </p>`
    let html;
    if(data.length > 0) {
        html = data.map(
                (e, i) => `
            <div>
                <strong style="color: blue;">${e.author.mail}</strong>
                <strong style="color: brown;">[${e.date}]:</strong>
                <em style="color: green">${e.text}</em>
                <im style="width: 40px; border-radius:30% src="${e.author.avatar}" alt="${e.author.name}">
            </div>
        `
            )
            .join(" ");
        document.getElementById("mensajes").innerHTML = html;
    }
});

function denormalize(data) {
    
    ////  DEFINO SCHEMAS  ////

    //  Defino un schema autor
    const authorSchema = new normalizr.schema.Entity('author', {}, { idAttribute: 'mail'});

    //Defino un schema de mensaje
    const messageSchema = new normalizr.schema.Entity('message', {
        author: authorSchema,
    });

    //Defino un schema de mensajes
    const messagesSchema = new normalizr.schema.Entity('messages', {
        messages: [messageSchema]
    });

    return normalizr.denormalize(data.normalized.result, messagesSchema, data.normalized.entities);
}