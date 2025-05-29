<template>
  <form @submit.prevent="handleRegister" class="w-100">
    <FormField
      label="Nombre completo:"
      v-model="name"
      type="text"
      placeholder="Tu nombre"
      id="register-name"
    />
    <FormField
      label="Correo electrónico:"
      v-model="email"
      type="email"
      placeholder="example@gmail.com"
      id="register-email"
    />
    <FormField
      label="Contraseña:"
      v-model="password"
      type="password"
      placeholder="********"
      id="register-password"
    />
    <FormField
      label="Confirmar contraseña:"
      v-model="confirmPassword"
      type="password"
      placeholder="********"
      id="register-confirm-password"
    />
    <div class="d-flex justify-content-center mt-3">
      <BaseButton type="submit" style="width: 100%; max-width: 200px;">
        Registrarse
      </BaseButton>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AuthService } from '../../firebase/auth';
import Swal from 'sweetalert2';

import BaseButton from '../../assets/atoms/BaseButton.vue';
import FormField from '../../assets/molecules/FormField.vue';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();

const handleRegister = async () => {
  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
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
      title: 'Error de validación',
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

    const response = await AuthService.register({
      email: email.value,
      password: password.value,
      userData: { nombre: name.value }
    });

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
    }
  } catch (error) {
    Swal.close();
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message || 'No se pudo registrar el usuario.',
      confirmButtonText: 'OK'
    });
  }
};
</script> 