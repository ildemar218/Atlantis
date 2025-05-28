import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Login.vue'
import RegisterView from '../views/Register.vue'
import EvalActivitiesView from '../views/EvalActivitiesView.vue';
import EvalIntroView from '../views/EvalIntroView.vue';
import WelcomeView from '../views/WelcomeView.vue'
import ShowerFormView from '../views/ShowerFormView.vue';
import LaundryFormView from '../views/LaundryFormView.vue';
import DishesFormView from '../views/DishesFormView.vue';
import PlantsFormView from '../views/PlantsFormView.vue';
import CleaningFormView from '../views/CleaningFormView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'inicio-sesion',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'registro',
      component: RegisterView,
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomeView,
    },
    {
      path: '/eval-intro',
      name: 'eval-intro',
      component: EvalIntroView,
    },
    {
      path: '/eval',
      name: 'eval-activities',
      component: EvalActivitiesView,
    },
    {
      path: '/shower',
      name: 'shower-form',
      component: ShowerFormView,
    },
    {
      path: '/laundry',
      name: 'laundry-form',
      component: LaundryFormView,
    },
    {
      path: '/dishes',
      name: 'dishes-form',
      component: DishesFormView,
    },
    {
      path: '/plants',
      name: 'plants-form',
      component: PlantsFormView,
    },
    {
      path: '/cleaning',
      name: 'cleaning-form',
      component: CleaningFormView,
    },
  ],
})

export default router
