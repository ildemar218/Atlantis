import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Login.vue'
import RegisterView from '../views/Register.vue'
import MainMenu from '../views/MainMenu.vue'
import { AuthService } from '../firebase/auth'
import { useAuthStore } from '../stores/auth'


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
      path: '/MainMenu',
      name: 'MainMenu',
      component: MainMenu,
      meta: { requiresAuth: true }
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Configurar el título de la página
  document.title = to.meta.title || 'Atlantis'

  // Verificar autenticación solo si la ruta lo requiere
  if (to.meta.requiresAuth) {
    try {
      // Verificar el estado de autenticación
      await authStore.checkAuth()
      
      // Si no está autenticado, redirigir al login
      if (!authStore.isAuthenticated) {
        next({ name: 'inicio-sesion', query: { redirect: to.fullPath } })
      } else {
        // Si está autenticado, permitir el acceso
        next()
      }
    } catch (error) {
      console.error('Error en la verificación de autenticación:', error)
      // En caso de error, redirigir a login
      next({ name: 'inicio-sesion' })
    }
  } else {
    // Rutas públicas sin restricciones
    next()
  }
})

export default router
