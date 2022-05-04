<template>

  <div >
    <div class="card" style="width: 18rem;">
      <img :src= "imgPokemon" class="card-img-top" alt="...">
      <div class="card-body">
          <router-link :to="url"><h5 class="card-title"> {{pokemon.name}}</h5></router-link>
          <p>Tipo :</p>
          <p :key="type.name" v-for="type in types" class="card-text"> - {{type.type.name}}</p>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: "PersonajePokemon",
  props: {
    pokemon: Object,
  },
  data() {
    return {
      imgPokemon: null,
      types: null,
      id: this.pokemon.id,
      url: "",
      form: {
        name: null,
      }
    };
  },
  methods: 
  { 
    loadCharacter() {
      try {
        this.id != null 
        ? this.getPokemonData(`https://pokeapi.co/api/v2/pokemon/${this.id}`) 
        : this.getPokemonData(this.pokemon.url) 
      } catch (error) {
        console.log(error);
      }
    },
    async getPokemonData(url){
      const response = await axios.get(url); 
      const {sprites, types, id} = response.data;
      this.imgPokemon = sprites.front_default;
      this.url = `/PokemonDetalle/${id}`
      this.types = types;
    }
  },
  created() { 
    this.loadCharacter();
  },
};
</script>