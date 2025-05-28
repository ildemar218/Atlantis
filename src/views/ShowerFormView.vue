<template>
    <div class="shower-form-container d-flex justify-content-center align-items-center min-vh-100 p-3">
        <div class="card card-shower w-100" style="max-width: 350px; border-radius: 20px; border: 2px solid #2222;">
            <div class="shower-card p-4 bg-white d-flex flex-column align-items-center" style="border-radius: 20px;">
                <BaseTitle>Atlantis</BaseTitle>
                <img src="https://cdn-icons-png.flaticon.com/128/11318/11318313.png" alt="Ducha"
                    style="width: 60px; margin: 12px 0;" />
                <h2 class="shower-section-title mb-3">Ducha</h2>
                <form class="w-100">
                    <FormField label="¿Cuántas duchas tomas al día?" v-model="showersPerDay" type="number"
                        placeholder="1" id="shower-count" />
                    <FormField label="¿Cuánto tiempo dura cada ducha (en minutos)?" v-model="showerDuration"
                        type="number" placeholder="10" id="shower-duration" />
                    <RadioGroup label="¿Qué tipo de ducha usas?" v-model="showerType" :options="[
                        { label: 'Convencional', value: 'convencional' },
                        { label: 'Eficiente / ahorradora', value: 'eficiente' }
                    ]" direction="column" />
                    <RadioGroup label="¿Tu ducha tiene aireador o restrictor de flujo?" v-model="hasAerator" :options="[
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

// Preguntas del formulario de ducha
const showersPerDay = ref('');
const showerDuration = ref('');
const showerType = ref('');
const hasAerator = ref('');
</script>

<style scoped>
.shower-section-title {
    color: #222;
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 18px;
}
</style>
