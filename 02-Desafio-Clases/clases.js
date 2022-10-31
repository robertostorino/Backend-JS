//Declaro la clase
class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    //Retorna el nombre completo del usuario
    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    //Toma el nombre de una mascota y lo agrega al array de mascotas
    addMascota(nombreMascota) {
        this.mascotas.push(nombreMascota);
    }

    //Retorna la cantidad de mascotas que tiene el usuario
    countMascotas() {
        return this.mascotas.length;
    }

    //Recibe un string 'nombre' y un string 'autor', 
    // y agrega el objeto { nombre: String, autor: String } al array de libros
    addBook(nombreLibro, autorLibro) {
        this.libros.push(
                {
                    title: nombreLibro, 
                    author: autorLibro
                });
    }
    
    //Retorna un array con solo los nombres del array de libros del usuario
    getBookNames() {
        return this.libros.map(
                                lib => (`Title: ${lib.title}`)
                            );
    }
}


const books = [
    {
        title: "Harry Potter 1",
        author: "J. K. Rowling"
    },
    {
        title: "El Alquimista",
        author: "Pablo Coelo"
    },
    {
        title: "El arte de la Guerra",
        author: "Sun-Tzu"
    }
]


const rober = new Usuario (
            "Roberto", 
            "Storino", 
            books,
            [
                "Timon",
                "Pumba"
            ]
        );


console.log(`Fullname: ${rober.getFullName()}`);

rober.addMascota('Lola');
rober.addMascota('Morti');

console.log(`Cantidad de Mascotas: ${rober.countMascotas()}`);

rober.addBook("La Odisea", "Homero");

const libs = rober.getBookNames();

console.log("Libros:")
console.log(libs);


