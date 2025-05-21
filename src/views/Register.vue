<template>
  <div class="login-container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card card-login w-100" style="max-width: 600px;">
      <div class="login-card p-5 shadow-sm rounded-3 bg-white">
        <h1 class="text-center mb-4 fw-bold">Registro</h1>
        <form @submit.prevent="handleRegister">
          <div class="mb-3">
            <label class="form-label">Nombre de usuario</label>
            <input type="text" class="form-control" v-model="name" />
          </div>
          <div class="mb-3">
            <label class="form-label">Correo electrónico</label>
            <input type="email" class="form-control" v-model="email" />
          </div>
          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input type="password" class="form-control" v-model="password" />
          </div>
          <div class="d-grid">
            <button type="submit" class="btn btn-primary">Registrarse</button>
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

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const handleRegister = async () => {
  if (!name.value || !email.value || !password.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Campos incompletos',
      text: 'Todos los campos son obligatorios.',
      confirmButtonText: 'OK'
    });
    return;
  }

  try {
    // Mostrar loading mientras se valida
    Swal.fire({
      title: 'Registrando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const response = await AuthService.register({ email: email.value, password: password.value, userData: { nombre: name.value } });
    console.log(response);

    if (response.success) {
      // Mostrar alerta de éxito y redirigir al login después del OK
      await Swal.fire({
        icon: "success",
        title: "Registrado",
        text: "Usuario registrado correctamente.",
        confirmButtonText: "OK",
      });
      Swal.close(); // Cerrar loading
      router.push("/login");
    } else {
      Swal.close(); // Cerrar loading
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar el usuario',
        text: response.error || "Error al registrar. Inténtalo de nuevo.",
        confirmButtonText: 'OK'
      });
      return;
    }

  } catch (error) {
    Swal.close(); // Cerrar loading si hay error
    handleAuthError(error.code);
  }
};
</script>