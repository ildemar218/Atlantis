<template>
  <div class="recuperar-container">
    <h2>Recuperar Contraseña</h2>
    <form @submit.prevent="handleReset">
      <label for="email">Correo electrónico</label>
      <input
        type="email"
        id="email"
        v-model="email"
        required
        placeholder="Ingresa tu correo"
      />

      <button
        type="submit"
        :disabled="loading"
        class="atlantis-btn"
      >
        {{ loading ? 'Enviando...' : 'Enviar correo de recuperación' }}
      </button>

      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { AuthService } from '../firebase/auth'

export default {
  name: 'RecuperarContrasena',
  data() {
    return {
      email: '',
      message: '',
      error: '',
      loading: false
    }
  },
  methods: {
    async handleReset() {
      this.message = ''
      this.error = ''
      this.loading = true
      try {
        const res = await AuthService.resetPassword(this.email)
        if (res.success) {
          this.message = res.message
          this.email = ''
        } else {
          this.error = res.error
        }
      } catch (err) {
        this.error = 'Ocurrió un error inesperado.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.recuperar-container {
  max-width: 400px;
  margin: 60px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f0f8ff; /* un azul muy claro para que contraste con el botón */
  color: #333;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

input {
  width: 100%;
  padding: 10px;
  margin: 12px 0;
  border-radius: 6px;
  border: 1.5px solid #6cb9f2;
  background-color: #fff;
  color: #333;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #4bb3f4;
  box-shadow: 0 0 8px #4bb3f4;
}

.atlantis-btn {
  background-color: #6cb9f2 !important;
  color: #fff !important;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 12px;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
  box-sizing: border-box;
}

.atlantis-btn:hover,
.atlantis-btn:focus {
  background-color: #4bb3f4 !important;
  color: #fff !important;
}

.atlantis-btn:disabled {
  background-color: #a0cffa !important;
  cursor: not-allowed;
}

.success {
  color: #28a745;
  margin-top: 10px;
  font-weight: 600;
}

.error {
  color: #dc3545;
  margin-top: 10px;
  font-weight: 600;
}
</style>
