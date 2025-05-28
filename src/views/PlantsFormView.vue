<template>
  <div class="plants-form-container d-flex justify-content-center align-items-center min-vh-100 p-3">
    <div class="card card-plants w-100" style="max-width: 350px; border-radius: 20px; border: 2px solid #2222;">
      <div class="plants-card p-4 bg-white d-flex flex-column align-items-center" style="border-radius: 20px;">
        <BaseTitle>Atlantis</BaseTitle>
        <img src="https://cdn-icons-png.flaticon.com/128/3319/3319229.png" alt="Riego de plantas" style="width: 60px; margin: 12px 0;" />
        <h2 class="plants-section-title mb-3">Riego de plantas</h2>
        <form class="w-100">
          <FormField label="¿Con qué frecuencia riegas las plantas?" v-model="frequency" type="text" placeholder="Ej: 3 veces por semana" id="plants-frequency" />
          <RadioGroup label="¿Qué método usas?" v-model="method" :options="[
            { label: 'Manguera', value: 'manguera' },
            { label: 'Regadera', value: 'regadera' },
            { label: 'Sistema de riego automático', value: 'automatico' }
          ]" direction="column" />
          <RadioGroup label="¿En qué horario sueles regar?" v-model="schedule" :options="[
            { label: 'Mañana', value: 'manana' },
            { label: 'Tarde', value: 'tarde' },
            { label: 'Noche', value: 'noche' }
          ]" direction="column" />
          <FormField label="¿Durante cuánto tiempo riegas normalmente? (minutos)" v-model="duration" type="number" placeholder="10" id="plants-duration" />
          <BaseButton class="w-100" style="max-width: 220px;">Siguiente</BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseTitle from '../components/atoms/BaseTitle.vue';
import BaseButton from '../components/atoms/BaseButton.vue';
import FormField from '../components/molecules/FormField.vue';
import RadioGroup from '../components/molecules/RadioGroup.vue';

const frequency = ref('');
const method = ref('');
const schedule = ref('');
const duration = ref('');
</script>

<style scoped>
.plants-section-title {
  color: #6ec6ff;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 18px;
}
</style>
