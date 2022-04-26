import {createRouter, createWebHistory} from 'vue-router';
import HelloWorld from "../components/HelloWorld.vue";
import DetallePersonaje from "../components/DetallePersonaje.vue";

const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/DetallePersonaje/:id',
        name: 'DetallePersonaje',
        component: DetallePersonaje
    }
];

const router = createRouter({
    history: createWebHistory(''),
    routes,
});

export default router;