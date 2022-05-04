import {createRouter, createWebHistory} from 'vue-router';
import HelloWorld from "../components/HelloWorld.vue";
import PokemonDetalle from "../components/PokemonDetalle.vue";
import Especies from "../components/Especies.vue";

const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/PokemonDetalle/:id',
        name: 'PokemonDetalle',
        component: PokemonDetalle
    },
    {
        path: '/Especies',
        name: 'EspeciesPokemon',
        component: Especies
    }
];

const router = createRouter({
    history: createWebHistory(''),
    routes,
});

export default router;