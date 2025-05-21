<template>
    <div class="login-container d-flex justify-content-center align-items-center min-vh-100">
      <div class="card card-login w-100" style="max-width: 600px;">
        
        <div class="login-card p-5 shadow-sm rounded-3 bg-white">
          <h1 class="text-center mb-4 fw-bold">Iniciar Sesión</h1>
          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label class="form-label">Correo electrónico</label>
              <input type="email" class="form-control" v-model="email" />
            </div>
            <div class="mb-3">
              <label class="form-label">Contraseña</label>
              <input type="password" class="form-control" v-model="password" />
            </div>
            <div class="d-grid">
              <button type="submit" class="btn btn-dark">Iniciar Sesión</button>
            </div>
          </form>
          <p class="mt-3 text-center">
            ¿No tienes cuenta? <router-link to="/registro">Regístrate aquí</router-link>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AuthService } from '../firebase/auth.js';
import Swal from 'sweetalert2';

const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
  if (!email.value || !password.value) {
    //alerta de sweetalert2
    Swal.fire({
      title: '¡Error!',
      text: 'Debes llenar todos los campos.',
      icon: 'error',
    });

    return;
  }

  try {
    // Llamar al servicio de autenticación para iniciar sesión
    const result = await AuthService.login({ email: email.value, password: password.value });

    // Verificar si la autenticación fue exitosa
    if (result.success) {
      Swal.fire({
        title: '¡Bienvenido!',
        text: 'Has iniciado sesión correctamente.',
        icon: 'success',
        confirmButtonText: 'Continuar'
      }).then(() => {
        router.push("/create-game");
      });
    } else {
      Swal.fire({
        title: '¡Error!',
        text: result.error,
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo'
      });
    }

  } catch (error) {
    console.error("Error al iniciar sesión:", error);

    Swal.fire({
      title: 'Error',
      text: error.message.includes('auth/user-not-found')
        ? 'El usuario no existe.'
        : error.message.includes('auth/wrong-password')
          ? 'Contraseña incorrecta.'
          : 'No se puede iniciar sesión.',
      icon: 'error',
      confirmButtonText: 'Intentar de nuevo'
    });
  }
};

</script>

<style scoped>
</style>