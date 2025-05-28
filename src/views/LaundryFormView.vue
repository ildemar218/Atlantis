<template>
  <div class="laundry-form-container d-flex justify-content-center align-items-center min-vh-100 p-3">
    <div class="card card-laundry w-100" style="max-width: 350px; border-radius: 20px; border: 2px solid #2222;">
      <div class="laundry-card p-4 bg-white d-flex flex-column align-items-center" style="border-radius: 20px;">
        <BaseTitle>Atlantis</BaseTitle>
        <img src="https://cdn-icons-png.flaticon.com/128/3322/3322056.png" alt="Lavado de ropa" style="width: 60px; margin: 12px 0;" />
        <h2 class="laundry-section-title mb-3">Lavado de ropa</h2>
        <form class="w-100">
          <FormField label="¿Cuántas veces lavas ropa a la semana?" v-model="laundryPerWeek" type="number" placeholder="1" id="laundry-count" />
          <RadioGroup label="¿Usas lavadora?" v-model="usesWasher" :options="[
            { label: 'Sí', value: 'si' },
            { label: 'No', value: 'no' }
          ]" />
          <RadioGroup v-if="usesWasher === 'si'" label="¿Qué tipo de lavadora?" v-model="washerType" :options="[
            { label: 'Carga superior', value: 'superior' },
            { label: 'Carga frontal', value: 'frontal' },
            { label: 'Manual (a mano)', value: 'manual' }
          ]" direction="column" />
          <RadioGroup label="¿Llenas la lavadora por completo antes de usarla?" v-model="fullLoad" :options="[
            { label: 'Sí', value: 'si' },
            { label: 'No', value: 'no' }
          ]" />
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

const laundryPerWeek = ref('');
const usesWasher = ref('');
const washerType = ref('');
const fullLoad = ref('');
</script>

<style scoped>
.laundry-section-title {
  color: #6ec6ff;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 18px;
}
</style>
