<template>

  <div>
    <div class="container mt-4 ">
      <div class="row justify-content-center">
        <div class="col text-center">
          <h1 class="d-inline text-white bg-dark row rounded">{{ pokemon.name }}</h1><br>
          <img :src="frontImg" class="rounded mx-auto" alt="Responsive image" style="width: 30%"/>
          <img :src="backImg" class="rounded mx-auto" alt="Responsive image" style="width: 30%"/>
        </div>
      </div>
    </div>
  </div>

    <div class="container mt-4 mb-4">
      <div class="row text-dark justify-content-center">

        <div class="col-2">
          <h5 class="text-success">Tipo</h5>
          <p :key="type.name" v-for="type in types" class="card-text">
            > {{ type.type.name }}
          </p>
        </div>

        <div class="col-2">
          <h5 class="text-success">Habilidades</h5>
          <p :key="ability.name" v-for="ability in abilities" class="card-text">
            > {{ ability.ability.name }}
          </p>
        </div>

        <div class="col-2">
            <h5 class="text-success">Movimientos</h5>
            <p :key="move.name" v-for="move in moves" class="card-text">
            > {{ move.move.name }}
            </p>
        </div>

        <div class="col-2">
            <h5 class="text-success">Estadisticas</h5>
            <p :key="stat.name" v-for="stat in stats" class="card-text">
            > {{ stat.stat.name }}
            </p>
        </div>

        <div class="col-2">
            <h5 class="text-success">Especies</h5>
            <p>> {{species.name}}</p>
            <p> {{species.url}}</p>
        </div>

      </div>
    </div>

</template>

<script>
import axios from "axios";

export default {
  name: "PersonajePokemon",
  data() {
    return {
      id: this.$route.params.id,
      frontImg: null,
      backImg: null,
      types: [],
      name: "",
      abilities: [],
      moves: [],
      stats: [],
      species: [],
      pokemon: Object,
    };
  },
  methods: {
    async getPokemonData() {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
      this.pokemon = response.data;
      this.frontImg = this.pokemon.sprites.front_default;
      this.backImg = this.pokemon.sprites.back_default;
      this.types = this.pokemon.types;
      this.abilities = this.pokemon.abilities;
      this.moves = this.pokemon.moves;
      this.stats = this.pokemon.stats;
      this.species = this.pokemon.species;
    },
  },
  created() {
    this.getPokemonData();
  },
};
</script>