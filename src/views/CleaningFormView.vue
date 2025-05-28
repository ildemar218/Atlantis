<template>
  <div class="cleaning-form-container d-flex justify-content-center align-items-center min-vh-100 p-3">
    <div class="card card-cleaning w-100" style="max-width: 350px; border-radius: 20px; border: 2px solid #2222;">
      <div class="cleaning-card p-4 bg-white d-flex flex-column align-items-center" style="border-radius: 20px;">
        <BaseTitle>Atlantis</BaseTitle>
        <img src="https://cdn-icons-png.flaticon.com/128/1059/1059219.png" alt="Limpieza del hogar" style="width: 60px; margin: 12px 0;" />
        <h2 class="cleaning-section-title mb-3">Limpieza del hogar</h2>
        <form class="w-100">
          <FormField label="¿Con qué frecuencia limpias usando agua?" v-model="frequency" type="text" placeholder="Ej: 2 veces por semana" id="cleaning-frequency" />
          <div class="mb-3">
            <label class="form-label mb-2" style="color: #6ec6ff; font-weight: bold;">¿Qué áreas limpias con agua? (selecciona todas las que correspondan)</label>
            <div class="d-flex flex-column gap-2">
              <label class="form-check-label">
                <input type="checkbox" class="form-check-input me-2" value="pisos" v-model="areas" /> Pisos
              </label>
              <label class="form-check-label">
                <input type="checkbox" class="form-check-input me-2" value="ventanas" v-model="areas" /> Ventanas
              </label>
              <label class="form-check-label">
                <input type="checkbox" class="form-check-input me-2" value="cocina" v-model="areas" /> Cocina
              </label>
              <label class="form-check-label">
                <input type="checkbox" class="form-check-input me-2" value="bano" v-model="areas" /> Baño
              </label>
            </div>
          </div>
          <RadioGroup label="¿Usas balde o manguera para limpiar?" v-model="method" :options="[
            { label: 'Balde', value: 'balde' },
            { label: 'Manguera', value: 'manguera' }
          ]" />
          <BaseButton class="w-100" style="max-width: 220px;">Finalizar</BaseButton>
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
const areas = ref([]);
const method = ref('');
</script>

<style scoped>
.cleaning-section-title {
  color: #6ec6ff;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 18px;
}
</style>
