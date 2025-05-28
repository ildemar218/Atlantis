<template>
  <div class="dishes-form-container d-flex justify-content-center align-items-center min-vh-100 p-3">
    <div class="card card-dishes w-100" style="max-width: 350px; border-radius: 20px; border: 2px solid #2222;">
      <div class="dishes-card p-4 bg-white d-flex flex-column align-items-center" style="border-radius: 20px;">
        <BaseTitle>Atlantis</BaseTitle>
        <img src="https://cdn-icons-png.flaticon.com/128/994/994953.png" alt="Lavar platos" style="width: 60px; margin: 12px 0;" />
        <h2 class="dishes-section-title mb-3">Lavar platos</h2>
        <form class="w-100">
          <RadioGroup label="¿Lavas los platos a mano o con lavavajillas?" v-model="washType" :options="[
            { label: 'A mano', value: 'mano' },
            { label: 'Lavavajillas', value: 'lavavajillas' }
          ]" />
          <FormField label="¿Cuántas veces al día lavas los platos?" v-model="timesPerDay" type="number" placeholder="1" id="dishes-count" />
          <RadioGroup v-if="washType === 'mano'" label="¿Abres el grifo continuamente o lo cierras mientras enjabonas?" v-model="faucetUsage" :options="[
            { label: 'Abierto continuamente', value: 'continuo' },
            { label: 'Lo cierro mientras enjabono', value: 'cierro' }
          ]" />
          <RadioGroup v-if="washType === 'lavavajillas'" label="¿El lavavajillas es de bajo consumo?" v-model="isEfficient" :options="[
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

const washType = ref('');
const timesPerDay = ref('');
const faucetUsage = ref('');
const isEfficient = ref('');
</script>

<style scoped>
.dishes-section-title {
  color: #6ec6ff;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 18px;
}
</style>
