const scaloneta = 
    [
        {
            id: 23,
            nombreCompleto: 'Damián Emiliano Martinez',
            posicion: 'Arquero',
            edad: 29
        },
        {
            id: 3,
            nombreCompleto: 'Nicolás Alejandro Tagliafico',
            posicion: 'Defensor',
            edad: 29
        },
        {
            id: 13,
            nombreCompleto: 'Cristian Gabriel Romero',
            posicion: 'Defensor',
            edad: 23
        },
        {
            id: 19,
            nombreCompleto: 'Nicolás Otamendi',
            posicion: 'Defensor',
            edad: 34
        },
        {
            id: 8,
            nombreCompleto: 'Marcos Javier Acuña',
            posicion: 'Defensor',
            edad: 30
        },
        {
            id: 7,
            nombreCompleto: 'Rodrigo Javier De Paul',
            posicion: 'Mediocampista',
            edad: 27
        },
        {
            id: 5,
            nombreCompleto: 'Leandro Daniel Paredes',
            posicion: 'Mediocampista',
            edad: 27
        },
        {
            id: 20,
            nombreCompleto: 'Giovani Lo Celso',
            posicion: 'Mediocampista',
            edad: 25
        },
        {
            id: 11,
            nombreCompleto: 'Ángel Fabián Di María',
            posicion: 'Delantero',
            edad: 34
        },
        {
            id: 10,
            nombreCompleto: 'Lionel Andrés Messi',
            posicion: 'Delantero',
            edad: 34
        },
        {
            id: 22,
            nombreCompleto: 'Lautaro Javier Martinez',
            posicion: 'Delantero',
            edad: 24
        }
    ]

//--> I) Mostrar por consola todos el array
console.log(scaloneta)

//--> II) Hacer una busqueda por id con el html y mostrar el objeto encontrado por consola
const buscarPorId = () => {
    const idAComparar = document.getElementById("idJugador").value;

    let idEncontrado = scaloneta.find(jug => jug.id == idAComparar);

    idEncontrado ? console.log(idEncontrado.nombreCompleto) : console.log("No se encontró dicho jugador");
}

//--> III) Hacer un nuevo array solo con los nombres de los objetos y mostrar por consola
const nombresCompletos = scaloneta.map(j => j.nombreCompleto);
console.log(nombresCompletos)

//--> IV) Hacer un promedio de edades/anios
const edades = scaloneta.map(j => j.edad);
const promedio = edades.reduce((a, b) => a + b, 0) / scaloneta.length;
console.log(promedio)

//--> V) Hacer un nuevo array solo con los objetos de cierto tipo
const delanteros = scaloneta.filter(pos => pos.posicion == "Delantero")  
console.log(delanteros)