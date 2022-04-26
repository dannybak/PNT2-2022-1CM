<template>

  <!-- FILTRACION y BUSQUEDA -->
  <div class="container mt-4">

    <!--  -->
    <form v-on:submit.prevent="onSubmit" class="border border-2 rounded-3 text-center">
      <div class="row text-dark justify-content-center">

        <!-- Buscar por ID -->
        <div class = "col-3">
          <div class="mb-3 mx-3 my-3">
            <label for="" class="form-label">Buscar por ID<span class="text-danger">*</span></label>
            <input type="number" class="form-control" v-model="form.id">
          </div>

          <div class="d-grid gap-2 mx-3 my-3">
              <!-- <button class="btn btn-primary" type="button">Buscar</button> -->
            <input class="btn btn-info text-white" type="submit" value="Buscar"/>
          </div>
        </div>

        <!-- Buscar por Nombre -->
        <div class = "col-3">
          <div class="mb-3 mx-3 my-3">
            <label for="" class="form-label">Buscar por Nombre<span class="text-danger">*</span></label>
            <input type="text" class="form-control" v-model="form.name">
          </div>

          <div class="d-grid gap-2 mx-3 my-3">
              <!-- <button class="btn btn-primary" type="button">Buscar</button> -->
            <input class="btn btn-info text-white" type="submit" value="Buscar"/>
          </div>
        </div>

        <!-- Buscar por Estado -->
        <div class = "col-3">
          <label for="" class="form-label mt-3">Buscar por Estado</label><br>
          <select class="mt-3" name="select" v-model="form.status">
              <option value="selectEstado" selected>-- Seleccione un estado --</option>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="unknown">unknown</option>
          </select>
          <div class="d-grid gap-2 mx-3 my-3">
            <!-- <button class="btn btn-primary" type="button">Filtrar</button> -->
            <input class="btn btn-info text-white" type="submit" value="Buscar"/>
          </div>
        </div>

        <!-- Buscar por Especie -->
        <div class = "col-3">
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
            <!-- <button class="btn btn-primary" type="button">Buscar</button> -->
            <input class="btn btn-info text-white" type="submit" value="Buscar"/>
          </div>
        </div>

      </div>
    </form>
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
      <div :key="personaje.id" v-for="personaje in results" class = "col-4 mt-4">
          <Personaje :personaje="personaje" />
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from "axios";
import Personaje from "./Personaje.vue";

export default {
  name: "HelloWorld",
  data() { //--> Datos globales que queremos que devuelvan dentro del componente (debemos usar this.)
    return {
      results: [],
      info: {},
      form: 
      {
        id: null,
        status: null,
        name: null,
        species: null
      },
    };
  },

  //--> Propiedades que se le pasan al componente
  // props: {
  //   msg: String,
  // },

  //--> Declaro componentes que voy a usar en este componente
  components: {
    Personaje
  },

  //--> Aca van a las funciones
  methods: 
  { 
    async loadCharacters(page = "https://rickandmortyapi.com/api/character") {
      const response = await axios.get(page); 
      const { results, info } = await response.data; 

      this.results = results;
      this.info = info;

      // document.getElementById("prev").disabled = !this.paginator.prev
      // document.getElementById("next").disabled = !this.paginator.next
    }, //--> Aca termina loadCharacters()

    async loadCharacter(page) {
      const response = await axios.get(page); 
      this.results = [response.data];
    }, //--> Aca termina loadCharacter()

    prevPage(){
      this.loadCharacters(this.info.prev)
    },
    nextPage() {
      this.loadCharacters(this.info.next)
    },

    // mensajeError(msgPersonalizado){
    //   const msg = `<p>${msgPersonalizado}</p>`
    //   document.getElementById("cards").innerHTML = ""; 
    //   document.getElementById('cards').insertAdjacentHTML('beforeend', msg);
    // },

    onSubmit() {
      if (this.form.id) {
        this.loadCharacter("https://rickandmortyapi.com/api/character/" + this.form.id);
      } 
      else {
        let url = "https://rickandmortyapi.com/api/character?";
        this.form.name ? (url = url + "name=" + this.form.name) : null;
        this.form.status ? (url = url + "status=" + this.form.status) : null;
        this.form.species ? (url = url + "species=" + this.form.species) : null;
        console.log(url);
        this.loadCharacters(url);
      }
    }
  },
  created() { //--> Esto es como el start() al hacer window.onload. Se ejecuta cuando se crea el commponente
      this.loadCharacters();
  },
};
</script>