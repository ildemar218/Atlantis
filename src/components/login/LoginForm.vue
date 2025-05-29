<template>
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
      <BaseButton type="submit" style="width: 100%; max-width: 200px;">
        Iniciar sesión
      </BaseButton>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import Swal from 'sweetalert2';

import BaseButton from '../../assets/atoms/BaseButton.vue';
import FormField from '../../assets/molecules/FormField.vue';

const email = ref('');
const password = ref('');
const router = useRouter();
const authStore = useAuthStore();

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
    const result = await authStore.login(email.value, password.value);

    if (result.success) {
      Swal.fire({
        title: '¡Bienvenido!',
        text: 'Has iniciado sesión correctamente.',
        icon: 'success',
        confirmButtonText: 'Continuar'
      }).then(() => {
        router.push("/MainMenu");
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