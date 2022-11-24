const express = require("express");
const handlebars = require('express-handlebars')

const app = express();
const PORT = 8080;

let productos = [];

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.engine('handlebars', handlebars.engine())

app.set('views', './views')
app.set('view engine', 'handlebars')

app.get('/productos', (req, res) => {
    let exist = productos.length > 0;
    res.render('productos', { products: productos, listExists: exist});
})

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.redirect('/')
})

const server = app.listen(PORT, () => {
    console.log("Server online on: ", `http://localhost:${PORT}`);
});

server.on("error", (error) => console.log("Error en servidor", error));