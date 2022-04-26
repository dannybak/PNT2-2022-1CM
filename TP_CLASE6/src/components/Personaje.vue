<template>
  <div >
    <div class="card" style="width: 18rem;">
      <img :src= "personaje.image" class="card-img-top" alt="...">
      <div class="card-body">
          <h5 class="card-title"> {{personaje.name}} </h5>
          <p class="card-text">Origen : {{personaje.origin.name}}</p>
          <p class="card-text">Estado : {{personaje.status}}</p>
          <p class="card-text">Especie : {{personaje.species}}</p>
          <p class="card-text">Creado: {{ personaje.created }}</p>
      </div>
    </div>          
  </div>

</template>

<script>
export default {
  name: "Personaje",
  props: {
    // propiedades que se le pasa al componente
    personaje: Object,
  },
};
</script>
