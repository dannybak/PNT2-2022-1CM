<template>

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
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title"> {{p.name}}</h5>
          </div>
        </div>
      </div>

    </div>
  </div>
  
</template>

<script>
import axios from "axios";

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

  methods: 
  { 
    async loadCharacters(page = "https://pokeapi.co/api/v2/pokemon-species/") {
      const response = await axios.get(page); 
      const { results, prev, next} = await response.data; 
      this.results = results;
      this.next = next;
      this.prev = prev;
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
  },
  created() { 
      this.loadCharacters();
  },
};
</script>