<template>
  <div class="login-container d-flex justify-content-center align-items-center min-vh-100 p-3">
    <div class="card card-login w-100" style="max-width: 400px; border-radius: 20px; border: 2px  ;">
      <div class="login-card p-4 bg-white d-flex flex-column align-items-center" style="border-radius: 20px;">
        <BaseTitle>Atlantis</BaseTitle>
        <BaseIcon :src="atlantisIcon" alt="Icono Atlantis" style="width: 100px; margin-bottom: 24px;" />

        <form @submit.prevent="handleLogin" class="w-100">
          <FormField
            label="Correo electrónico:"
            v-model="email"
            type="email"
            placeholder="example@gmail.com"
            id="login-email"
          />
          <FormField
            label="Contraseña:"
            v-model="password"
            type="password"
            placeholder="********"
            id="login-password"
          />

          <div class="d-flex justify-content-center mt-3">
            <!-- Aquí está el cambio importante: type="submit" -->
            <BaseButton type="submit" style="width: 100%; max-width: 200px;">
              Iniciar sesión
            </BaseButton>
          </div>
        </form>

        <p class="mt-3 text-center text-muted">
          ¿No tienes cuenta?
          <router-link to="/register">Regístrate aquí</router-link>
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

import BaseTitle from '../components/atoms/BaseTitle.vue';
import BaseIcon from '../components/atoms/BaseIcon.vue';
import BaseButton from '../components/atoms/BaseButton.vue';
import FormField from '../components/molecules/FormField.vue';
import atlantisIcon from '@/assets/icon.jpg';

const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
  if (!email.value || !password.value) {
    Swal.fire({
      title: '¡Error!',
      text: 'Debes llenar todos los campos.',
      icon: 'error',
    });
    return;
  }

  try {
    const result = await AuthService.login({ email: email.value, password: password.value });

    if (result.success) {
      Swal.fire({
        title: '¡Bienvenido!',
        text: 'Has iniciado sesión correctamente.',
        icon: 'success',
        confirmButtonText: 'Continuar'
      }).then(() => {
        router.push("/welcome");
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
.login-container {
  background-color: #f8f9fa;
}
</style>
