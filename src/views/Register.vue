<template>
  <div class="login-container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card card-login w-100" style="max-width: 350px; border-radius: 20px; border: 2px solid #2222;">
      <div class="login-card p-4 bg-white d-flex flex-column align-items-center" style="border-radius: 20px;">
        <BaseTitle>Atlantis</BaseTitle>
        <BaseIcon :src="atlantisIcon" alt="Icono Atlantis" style="width: 100px; margin-bottom: 24px;" />
        <form @submit.prevent="handleRegister" class="w-100">
          <FormField label="mail:" v-model="email" type="email" placeholder="example@gmail.com" id="register-email" />
          <FormField label="password:" v-model="password" type="password" placeholder="********" id="register-password" />
          <FormField label="Confirm Password:" v-model="confirmPassword" type="password" placeholder="********" id="register-confirm-password" />
          <div class="d-flex justify-content-center">
            <BaseButton style="width: 100%; max-width: 200px;">register</BaseButton>
          </div>
        </form>
        <p class="mt-3 text-center">
          ¿Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link>
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
const confirmPassword = ref('');
const router = useRouter();

const handleRegister = async () => {
  if (!email.value || !password.value || !confirmPassword.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Campos incompletos',
      text: 'Todos los campos son obligatorios.',
      confirmButtonText: 'OK'
    });
    return;
  }
  if (password.value !== confirmPassword.value) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Las contraseñas no coinciden.',
      confirmButtonText: 'OK'
    });
    return;
  }
  try {
    Swal.fire({
      title: 'Registrando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    const response = await AuthService.register({ email: email.value, password: password.value });
    if (response.success) {
      await Swal.fire({
        icon: "success",
        title: "Registrado",
        text: "Usuario registrado correctamente.",
        confirmButtonText: "OK",
      });
      Swal.close();
      router.push("/login");
    } else {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar el usuario',
        text: response.error || "Error al registrar. Inténtalo de nuevo.",
        confirmButtonText: 'OK'
      });
      return;
    }
  } catch (error) {
    Swal.close();
    // handleAuthError(error.code); // Si tienes una función para manejar errores específicos
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message || 'No se pudo registrar el usuario.',
      confirmButtonText: 'OK'
    });
  }
};
</script>