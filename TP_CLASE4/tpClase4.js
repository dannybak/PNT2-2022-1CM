let _info = {};
let _results = {};

const setApi = async (page) => {
    const response = await fetch(page);
    const {info, results} = await response.json();
    _info = info;
    _results = results;
    return {
        info, results
    }
}

const getApi = async () => {
    return {
        _info, _results
    }
}

/***************************************************************************************/
const start = async (page) => {
    try{
        const results = (await setApi(page)).results;
        buildCards(results)
        return results;
    }
    catch(err){
        console.error(err);
    }
}

const nextPage = async () => {
    document.getElementById("cards").innerHTML = "";
    const {next} = (await getApi())._info;
    const results = (await setApi(next)).results;
    results != null ? buildCards(results) : console.log("NO EXISTE SIGUIENTE PAGINA")
}

const prevPage = async () =>{
    document.getElementById("cards").innerHTML = "";
    const {prev} = (await getApi())._info;
    const results = (await setApi(prev)).results;
    results != null ? buildCards(results) : alert("NO EXISTE SIGUIENTE PREVIA")
}


const buscarPorNombre = async () => {
    document.getElementById("cards").innerHTML = ""; 
    const nombreABuscar = document.getElementById("buscarNombre").value;
    const {pages} = (await getApi())._info;
    let i = 0;
    let encontrado;
    while(i <= pages && encontrado == null){
        let results = (await setApi(`https://rickandmortyapi.com/api/character?page=${i}`)).results;
        let encontrado = results.find(x => x.name == nombreABuscar);    
        if(encontrado != null){
            buildCard(encontrado)
        }
        i++;
    }
}

const filtrarPorEstado = async () => {
    document.getElementById("cards").innerHTML = ""; 
    const estadoABuscar = document.getElementById("idEstado").value;
    const {pages} = (await getApi())._info;
    let i = 1;
    while(i <= pages){
        let results = (await setApi(`https://rickandmortyapi.com/api/character?page=${i}`)).results;
        let encontrado = results.filter(x => x.status == estadoABuscar);    
        buildCards(encontrado)
        i++
    }
}

const buscarPorEspecies = async () => {
    document.getElementById("cards").innerHTML = ""; 
    const especieABuscar = document.getElementById("idEspecie").value;
    const {pages} = (await getApi())._info;
    let i = 0;
    let encontrado;
    while(i <= pages && encontrado == null){
        let results = (await setApi(`https://rickandmortyapi.com/api/character?page=${i}`)).results;
        let encontrado = results.find(x => x.species == especieABuscar);    
        if(encontrado != null){
            buildCard(encontrado)
        }
        i++;
    }
}

/***************************************************************************************/
const buildCards = (results) => {
    try{
    results.forEach((character) => {
        const card = `
            <div class = "col-4 mt-4">
                <div class="card" style="width: 18rem;">
                    <img src="${character.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${character.name}</h5>
                        <p class="card-text">Origen : ${character.origin.name}.</p>
                        <p class="card-text">Estado : ${character.status}.</p>
                        <p class="card-text">Especie : ${character.species}.</p>
                    </div>
                </div>
            </div>`;
        document.getElementById('cards').insertAdjacentHTML('beforeend', card);
        })
    }
    catch(err){
        console.error(err);
    }
}

const buildCard = (result) => {
    try{
    const card = `
        <div class = "col-4 mt-4">
            <div class="card" style="width: 18rem;">
                <img src="${result.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${result.name}</h5>
                    <p class="card-text">Origen : ${result.origin.name}.</p>
                    <p class="card-text">Estado : ${result.status}.</p>
                    <p class="card-text">Especie : ${result.species}.</p>
                </div>
            </div>
        </div>`;
    document.getElementById('cards').insertAdjacentHTML('beforeend', card);
    }
    catch(err){
        console.error(err);
    }
}
/***************************************************************************************/

window.onload = start("https://rickandmortyapi.com/api/character");