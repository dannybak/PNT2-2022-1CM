<template>
  <div class="container">
    <div class="row mb-4 text-dark" id="cards">
      <div :key="personaje.id" v-for="personaje in results" class="col-4 mt-4">
        <Personaje :personaje="personaje" />
      </div>
      <!-- <div class="col-4 mt-4">
        <Personaje :personaje="personaje" />
      </div> -->
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