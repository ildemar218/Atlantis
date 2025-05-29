<template>
  <div class="container">
    <div class="welcome-section text-center mb-4">
      <h1>¡Bienvenido, {{ userProfile?.nombre_completo || 'Usuario' }}!</h1>
      <p class="text-muted">{{ userProfile?.email }}</p>
    </div>

    <div class="menu-options">
      <!-- Aquí irán las opciones del menú principal -->
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Jugar</h5>
          <p class="card-text">Inicia una nueva partida</p>
          <button class="btn btn-primary">Comenzar</button>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Estadísticas</h5>
          <p class="card-text">Ver tus estadísticas de juego</p>
          <button class="btn btn-info">Ver estadísticas</button>
        </div>
      </div>

      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Configuración</h5>
          <p class="card-text">Ajusta tus preferencias</p>
          <button class="btn btn-secondary">Configurar</button>
        </div>
      </div>
    </div>

    <div class="text-center mt-4">
      <button @click="handleLogout" class="btn btn-danger">
        Cerrar sesión
      </button>
    </div>
  </div>
</template>



<style scoped>
.container {
  max-width: 800px;
  padding: 2rem;
}

.welcome-section {
  margin-bottom: 2rem;
}

.menu-options {
  display: grid;
  gap: 1rem;
}

.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.btn {
  width: 100%;
  margin-top: 1rem;
}
</style>
  <script setup>
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Swal from 'sweetalert2';

const router = useRouter();
const authStore = useAuthStore();

const userProfile = computed(() => authStore.profile);

onMounted(async () => {
  try {
    await authStore.checkAuth();
    if (!authStore.isAuthenticated) {
      router.push('/login');
    }
  } catch (error) {
    console.error('Error al verificar autenticación:', error);
    router.push('/login');
  }
});

const handleLogout = async () => {
  try {
    const result = await authStore.logout();
    if (result.success) {
      Swal.fire({
        title: '¡Hasta pronto!',
        text: 'Has cerrado sesión correctamente.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        router.push('/login');
      });
    }
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    Swal.fire({
      title: 'Error',
      text: 'No se pudo cerrar sesión correctamente.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
};
</script>