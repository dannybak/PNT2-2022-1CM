<template>

  <!-- FORM - Buscar por Nombre -->
  <div class="container mt-4">
    <form v-on:submit.prevent="onSubmit" class="border border-2 rounded-3 text-center">
      <div class="row text-dark justify-content-center">

        <div class = "col-3">
          <div class="mb-3 mx-3 my-3">
            <label for="" class="form-label">Buscar por Nombre<span class="text-danger">*</span></label>
            <input type="text" class="form-control" v-model="form.name">
          </div>

          <div class="d-grid gap-2 mx-3 my-3">
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

  <!-- CARDS DE POKEMONES-->
  <div class="container">
    <div class="row mb-4 text-dark" id="cards" >
      <div :key="p.name" v-for="p in results" class = "col-4 mt-4">
          <Pokemon :pokemon="p" />
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from "axios";
import Pokemon from "./Pokemon.vue";

export default {
  name: "HelloWorld",
  data() {
    return {
      results: [],
      prev: null,
      next: null,
      img: null,
      form: {
        name: null,
      }
    };
  },
  components: {
    Pokemon,
  },

  methods: 
  { 
    async loadCharacters(page = "https://pokeapi.co/api/v2/pokemon/") {
      const response = await axios.get(page); 
      const { results, prev, next} = await response.data; 
      this.results = results;
      this.next = next;
      this.prev = prev;
      // document.getElementById("prev").disabled = !this.prev;
      // document.getElementById("next").disabled = !this.next;
    }, 

    async loadCharacter(page) {
      const response = await axios.get(page); 
      this.results = [response.data];
    }, 

    prevPage(){
      this.loadCharacters(this.prev)
    },
    nextPage() {
      this.loadCharacters(this.next)
    },

    onSubmit() {
        let url = "https://pokeapi.co/api/v2/pokemon/"
        this.form.name ? (url = url + this.form.name) : null;
        this.loadCharacter(url);
    },
  },
  created() { 
      this.loadCharacters();
  },
};
</script>