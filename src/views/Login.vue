<template>
  <div class="login-container d-flex justify-content-center align-items-center min-vh-100 p-3">
    <div class="card card-login w-100" style="max-width: 400px; border-radius: 20px; border: 2px;">
      <div class="login-card p-4 bg-white d-flex flex-column align-items-center" style="border-radius: 20px;">
        <BaseTitle>Atlantis</BaseTitle>
        <BaseIcon :src="atlantisIcon" alt="Icono Atlantis" style="width: 100px; margin-bottom: 24px;" />

        <LoginForm />

        <p class="mt-3 text-center text-muted">
          ¿No tienes cuenta?
          <router-link to="/register">Regístrate aquí</router-link>
        </p>

         <p class="mt-3 text-center text-muted">
          ¿Olvidaste tu contrasena?
          <router-link to="/recover-password">Recuperar Contraseña</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseTitle from '../assets/atoms/BaseTitle.vue';
import BaseIcon from '../assets/atoms/BaseIcon.vue';
import LoginForm from '../components/login/LoginForm.vue';
import atlantisIcon from '@/assets/icon.jpg';
</script>

<style scoped>
.login-container {
  background-color: #f8f9fa;
}
</style>
