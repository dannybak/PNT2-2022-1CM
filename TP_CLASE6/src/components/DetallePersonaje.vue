<template>
  <!-- <p>{{ $route.params.id }}</p> -->

  <!-- <div class="container mt-4">
    <form v-on:submit.prevent="onSubmit" class="border border-2 rounded-3 text-center">
      <div class="row text-dark justify-content-center">

        <div class="col-3">
          <div class="mb-3 mx-3 my-3">
            <label for="" class="form-label">Buscar por ID<span class="text-danger">*</span></label>
            <input type="number" class="form-control"/>
          </div>

          <div class="d-grid gap-2 mx-3 my-3">
            <input class="btn btn-info text-white" type="submit" value="Buscar"/>
          </div>
        </div>

      </div>
    </form>
  </div> -->

  <!-- CARDS -->
  <div class="container">
    <div class="row mb-4 text-dark" id="cards">
      <div :key="personaje.id" v-for="personaje in results" class="col-4 mt-4">
        <Personaje :personaje="personaje" />
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import Personaje from "./Personaje.vue";

export default {
  name: "DetallePersonaje",
  data() {
    return {
      results: [],
      info: {},
      id: this.$route.params.id,
    };
  },
  components: {
    Personaje,
  },
  methods: {
    async loadCharacter() {
      const response = await axios.get("https://rickandmortyapi.com/api/character/" + this.id);
      this.results = [response.data];
      console.log(this.results);
    },
  },
  created() {
    // console.log("created", this.id);
    this.loadCharacter();
  },
};
</script>