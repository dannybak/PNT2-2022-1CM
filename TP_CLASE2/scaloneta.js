class Seleccion {
    constructor(){
        this.seleccion = [];
    }

    agregar(jugador) {
        this.seleccion.push(jugador); 
    }

    mostrarJugadores() {
        console.log(this.seleccion);
    }

    getSeleccion(){
        return this.seleccion;
    }
}

class Jugador {
    constructor(id, nombreCompleto, posicion, edad) {
        this.id = id;
        this.nombreCompleto = nombreCompleto;
        this.posicion = posicion;
        this.edad = edad;
    }
}

const scaloneta = new Seleccion();

let jugador1 = new Jugador(23, "Damián Emiliano Martinez", "Arquero", 29);
let jugador2 = new Jugador(3, "Nicolás Alejandro Tagliafico ", "Defensor", 29);
let jugador3 = new Jugador(13, "Cristian Gabriel Romero", "Defensor", 23);
let jugador4 = new Jugador(19, "Nicolás Otamendi", "Defensor", 34);
let jugador5 = new Jugador(8, "Marcos Javier Acuña", "Defensor", 30);
let jugador6 = new Jugador(7, "Rodrigo Javier De Paul", "Mediocampista", 27);
let jugador7 = new Jugador(5, "Leandro Daniel Paredes", "Mediocampista", 27);
let jugador8 = new Jugador(20, "Giovani Lo Celso", "Mediocampista", 25);
let jugador9 = new Jugador(11, "Ángel Fabián Di María", "Delantero", 34);
let jugador10 = new Jugador(10, "Lionel Andrés Messi", "Delantero", 34);
let jugador11 = new Jugador(22, "Lautaro Javier Martinez", "Delantero", 24);

scaloneta.agregar(jugador1);
scaloneta.agregar(jugador2);
scaloneta.agregar(jugador3);
scaloneta.agregar(jugador4);
scaloneta.agregar(jugador5);
scaloneta.agregar(jugador6);
scaloneta.agregar(jugador7);
scaloneta.agregar(jugador8);
scaloneta.agregar(jugador9);
scaloneta.agregar(jugador10);
scaloneta.agregar(jugador11);

//--> I) Mostrar por consola todos el array
scaloneta.mostrarJugadores()

//--> II) Hacer una busqueda por id con el html y mostrar el objeto encontrado por consola
const buscarPorId = () => {
    const idAComparar = document.getElementById("idJugador").value;
    let jugadores = scaloneta.getSeleccion()

    let idEncontrado = jugadores.find(jug => jug.id == idAComparar);

    idEncontrado ? console.log(idEncontrado.nombreCompleto) : console.log("No se encontró dicho jugador");
}

//--> III) Hacer un nuevo array solo con los nombres de los objetos y mostrar por consola
const nombresCompletos = scaloneta.getSeleccion().map(j => j.nombreCompleto);
console.log(nombresCompletos)

//--> IV) Hacer un promedio de edades/anios
const edades = scaloneta.getSeleccion().map(j => j.edad);
const cantJugadores = scaloneta.getSeleccion().length;

const promedio = edades.reduce((valPrevio, valActual) => valPrevio + valActual, 0) / cantJugadores;

console.log(promedio)

//--> V) Hacer un nuevo array solo con los objetos de cierrto tipo(especie = alien o genero = terror, etc).
const delanteros = scaloneta.getSeleccion().filter(pos => pos.posicion == "Delantero")  
console.log(delanteros)
