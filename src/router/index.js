import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../components/Landing.vue'
import BlogList from '../components/BlogList.vue'
import BlogPost from '../components/BlogPost.vue'
import AboutUs from '../components/AboutUs.vue'
import Teams from '../components/Teams.vue'
import PawsBehindTheScenes from '../components/PawsBehindTheScenes.vue'
import DoctorFeature from '../components/DoctorFeature.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Landing
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogList
  },
  {
    path: '/blog/:id',
    name: 'BlogPost',
    component: BlogPost,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: AboutUs
  },
  {
    path: '/teams',
    name: 'Teams',
    component: Teams
  },
  {
    path: '/paws',
    name: 'Paws',
    component: PawsBehindTheScenes
  },
  {
    path: '/doctor-feature',
    name: 'DoctorFeature',
    component: DoctorFeature
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router