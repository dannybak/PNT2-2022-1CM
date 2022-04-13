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

let pages = null;

/***************************************************************************************/
const start = async (url = "https://rickandmortyapi.com/api/character") => {
    try{
        const response = (await fetch(url));
        const {info, results} = await response.json();
        pages = {next: info.next, prev: info.prev}
        buildCards(results)
        return results;
        // document.getElementById("prev").disabled = !pages.prev
        // document.getElementById("next").disabled = !pages.next
    }
    catch(err){
        console.error(err);
    }
}

const nextPage = async () => {
    try {
        document.getElementById("cards").innerHTML = "";
        start(pages.next)
        // const {next} = (await getApi())._info;
        // const results = (await setApi(next)).results;
        // pages.next != null ? buildCards(pages.next) : console.log("NO EXISTE SIGUIENTE PAGINA")
    } 
    catch (err) {
        console.log(err);
    }
}

const prevPage = async () =>{
    try{
        // const {prev} = (await getApi())._info;
        // const results = (await setApi(prev)).results;
        // results != null ? buildCards(results) : console.log("NO EXISTE SIGUIENTE PREVIA")
        document.getElementById("cards").innerHTML = "";
        start(pages.prev)
    }
    catch(err){
        console.log(err);
    }
}


const buscarPorNombre = async () => {
    try {
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
    } catch (error) {
        console.log(error);
    }
}

const filtrarPorEstado = async () => {
    try {
        const estadoABuscar = document.getElementById("idEstado").value;
        const {pages} = (await getApi())._info;
        let i = 1;
        while(i <= pages){
            let results = (await setApi(`https://rickandmortyapi.com/api/character?page=${i}`)).results;
            let encontrado = results.filter(x => x.status == estadoABuscar);    
            buildCards(encontrado)
            i++
        }
    } catch (error) {
        console.log(error);
    }
}

const buscarPorEspecies = async () => {
    try {
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
    } catch (error) {
        console.log(error);
    }
}

/***************************************************************************************/
const buildCards = (results) => {
    try{
    document.getElementById("cards").innerHTML = ""; 
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
    document.getElementById("cards").innerHTML = ""; 
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

window.onload = start();