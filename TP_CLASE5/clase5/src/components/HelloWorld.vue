<template>

  <!-- FILTRACION y BUSQUEDA -->
  <div class="container">
    <div class="row mt-4 text-dark justify-content-center">

    <div class = "col-4 mt-4">
      <form class="border border-2 rounded-3 text-center">
        <label for="" class="form-label mt-3">Buscar por Estado</label><br>

          <select class="mt-3" name="select" v-model="form.status">
              <option value="selectEstado" selected>-- Seleccione un estado --</option>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="unknown">unknown</option>
          </select>

        <div class="d-grid gap-2 mx-3 my-3">
          <button class="btn btn-primary" @click="filtrarPorEstado()" type="button">Filtrar</button>
        </div>
      </form>
    </div>

    <div class = "col-4 mt-4">
      <form class="border border-2 rounded-3 text-center">
              <div class="mb-3 mx-3 my-3">
                  <label for="" class="form-label">Buscar por Nombre</label>
                  <input type="text" class="form-control" id="buscarNombre" v-model="form.name">
              </div>

              <div class="d-grid gap-2 mx-3 my-3">
                  <button class="btn btn-primary" @click="buscarPorNombre()" type="button">Buscar</button>
              </div>
      </form>
    </div>

    <div class = "col-4 mt-4">
      <form class="border border-2 rounded-3 text-center">
          <label for="" class="form-label mt-3">Buscar por Especie</label><br>
          
          <select class="mt-3" name="select" v-model="form.species">
              <option value="selectEstado" selected>-- Seleccione una especie --</option>
              <option value="Alien">Alien</option>
              <option value="Animal">Animal</option>
              <option value="Cronenberg">Cronenberg</option>
              <option value="Disease">Disease</option>
              <option value="Human">Human</option>
              <option value="Humanoid">Humanoid</option>
              <option value="Mythological Creature">Mythological Creature</option> 
              <option value="Poopybutthole">Poopybutthole</option>
              <option value="Robot">Robot</option>
              <option value="unknown">unknown</option>
            </select>

            <div class="d-grid gap-2 mx-3 my-3">
              <button class="btn btn-primary" @click="buscarPorEspecies()" type="button">Buscar</button>
          </div>
      </form>
    </div>

    </div>
  </div>

  <!-- PAGINATION -->
  <div class="container mt-4">
      <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center" id="paginator">
            <button id="prev" class="page-item border border-2" @click="prevPage">Previous</button>
            <button id="next" class="page-item border border-2" @click="nextPage">Next</button>
          </ul>
      </nav>
  </div>

  <!-- CARDS -->
  <div class="container">
    <div class="row mb-4 text-dark" id="cards" >
      <!-- Hace un for each en el div (JS en HTML) -->
      <!-- <div :key="personaje.id" v-for="personaje in results" > 
        <div class = "col-4 mt-4">
          <div class="card" style="width: 18rem;">
            <img :src="personaje.image" class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">{{personaje.name}}</h5>
                <p class="card-text">Origen : {{personaje.origin.name}}.</p>
                <p class="card-text">Estado : {{personaje.status}}.</p>
                <p class="card-text">Especie : {{personaje.species}}.</p>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>

  <!-- EJEMPLO PROFE (CLASE 11/04) -->
  <!-- <button @click="onClick">Enviar</button>

  <form v-on:submit.prevent="onSubmit">
    <input type="number" v-model="form.id"/>
    <input type="submit" value="Enviar"/>
  </form> -->

</template>


<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  data() { //--> Datos que queremos que devuelvan
    return {
      results: [],
      info: [],
      paginator: null,
      form: 
      {
        id: null,
        status: null,
        name: null,
        species: null
      },
    };
  },
  props: {
    msg: String,
  },

  //--> Aca van a las funciones
  methods: 
  { 
    async loadCharacters(page = "https://rickandmortyapi.com/api/character") {
      await this.setApi(page);
      this.buildCards(this.results)
      document.getElementById("prev").disabled = !this.paginator.prev
      document.getElementById("next").disabled = !this.paginator.next
    }, //--> Aca termina loadCharacters()

    async setApi(page){
      const response = await axios.get(page); 
      const { results, info } = await response.data; 

      this.results = results;
      this.info = info;
      this.paginator = {next: info.next, prev: info.prev};
    },

    async prevPage(){
      document.getElementById("cards").innerHTML = "";
      this.loadCharacters(this.paginator.prev)
    },
    async nextPage() {
      document.getElementById("cards").innerHTML = "";
      this.loadCharacters(this.paginator.next)
    },

    buildCards(personajes){
      personajes.forEach((personaje) => {
        this.buildCard(personaje);
      })
    }, //--> Aca termina buildCards()

    buildCard(result){
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
    }, //--> Aca termina buildCard()

    mensajeError(msgPersonalizado){
      const msg = `<p>${msgPersonalizado}</p>`
      document.getElementById("cards").innerHTML = ""; 
      document.getElementById('cards').insertAdjacentHTML('beforeend', msg);
    },

    async buscarPorNombre(){
      document.getElementById("cards").innerHTML = ""; 
      let encontrado = null;
      let i = 0;
      while(i <= this.info.pages && encontrado == null){
        await this.setApi(`https://rickandmortyapi.com/api/character?page=${i}`);
        i++;
        encontrado = this.results.find(x => x.name == this.form.name);
      }
      encontrado != null ? this.buildCard(encontrado) : this.mensajeError("NO SE PUDO ENCONTRAR DICHO PERSONAJE");
    }, //--> Aca termina buscarPorNombre()

    async filtrarPorEstado(){
      document.getElementById("cards").innerHTML = ""; 
      let personajesPorPagina = null;
      let i = 0;
      while(i <= this.info.pages){
        await this.setApi(`https://rickandmortyapi.com/api/character?page=${i}`);
        i++;
        personajesPorPagina = this.results.filter(x => x.status == this.form.status);
        this.buildCards(personajesPorPagina)
      }
    }, //--> Aca termina filtrarPorEstado()

    async buscarPorEspecies (){
      document.getElementById("cards").innerHTML = ""; 
      let personajesPorPagina = null;
      let i = 0;
      while(i <= this.info.pages){
        await this.setApi(`https://rickandmortyapi.com/api/character?page=${i}`);
        i++;   
        personajesPorPagina = this.results.filter(x => x.species == this.form.species);
        this.buildCards(personajesPorPagina)
      }
    }, //--> Aca termina buscarPorEspecies()

    // onClick() {
    //   this.results = [];
    //   console.log("Hola soy el onclick");
    // },
    // onSubmit() {
    //   if (this.id <= 0) {
    //     alert("EL ID TIENE QUE SER MAYOR A 0!");
    //     return;
    //   }
    // }
  },
  created() { //--> Esto es como el start() al hacer window.onload
      this.loadCharacters();
  },
};
</script>