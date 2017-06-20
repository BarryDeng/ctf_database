import Vue from 'vue'
import VueRouter from 'vue-router'
import Score from '../Score.vue'
import Competition from '../Competition.vue'
import Player from '../Player.vue'
import Team from '../Team.vue'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/competition/:id',
            name: '2',
            component: Competition
        },
        {
            path: '/',
            name: '5',
            component: Score
        },
        {
            path: '/player/:id',
            name: '4',
            component: Player
        },
        {
            path: '/team/:id',
            name: '3',
            component: Team
        }
    ]
})