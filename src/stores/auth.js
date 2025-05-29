import { ref } from 'vue'
import { defineStore } from 'pinia'
import { AuthService } from '../firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const profile = ref(null)
  const isAuthenticated = ref(false)

  async function checkAuth() {
    try {
      const currentUser = await AuthService.getCurrentUser()
      if (currentUser) {
        const userProfile = await AuthService.getUserProfile(currentUser.uid)
        user.value = currentUser
        profile.value = userProfile
        isAuthenticated.value = true
      } else {
        user.value = null
        profile.value = null
        isAuthenticated.value = false
      }
    } catch (error) {
      console.error('Error al verificar autenticación:', error)
      user.value = null
      profile.value = null
      isAuthenticated.value = false
      throw error
    }
  }

  async function login(email, password) {
    try {
      const result = await AuthService.login({ email, password })
      if (result.success) {
        user.value = result.user
        profile.value = result.profile
        isAuthenticated.value = true
      }
      return result
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      throw error
    }
  }

  async function logout() {
    try {
      const result = await AuthService.logout()
      if (result.success) {
        user.value = null
        profile.value = null
        isAuthenticated.value = false
      }
      return result
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      throw error
    }
  }

  return {
    user,
    profile,
    isAuthenticated,
    checkAuth,
    login,
    logout
  }
}) 