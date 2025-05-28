<template>
    <div class="eval-activities-container d-flex justify-content-center align-items-center min-vh-100 p-3">
        <div class="card card-eval w-100" style="max-width: 350px; border-radius: 20px; border: 2px solid #2222;">
            <div class="eval-card p-4 bg-white d-flex flex-column align-items-center" style="border-radius: 20px;">
                <BaseTitle>Atlantis</BaseTitle>
                <p class="eval-activities-title text-center mt-3 mb-3">¿Qué actividades realizas?</p>
                <div class="w-100 mb-4">
                    <ActivityOption v-for="activity in activities" :key="activity.id" v-model:checked="activity.checked"
                        :icon="activity.icon" :label="activity.label" />
                </div>
                <BaseButton class="w-100" style="max-width: 220px;" @click="goToNext">Continuar</BaseButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseTitle from '../components/atoms/BaseTitle.vue';
import BaseButton from '../components/atoms/BaseButton.vue';
import ActivityOption from '../components/molecules/ActivityOption.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
function goToNext() {
    router.push('/eval-next'); // Cambia '/eval-next' por la ruta real de la siguiente vista
}

const activities = ref([
    {
        id: 'ducha',
        label: 'Ducha',
        icon: 'https://cdn-icons-png.flaticon.com/128/11318/11318313.png',
        checked: false,
    },
    {
        id: 'lavado-ropa',
        label: 'Lavado de ropa',
        icon: 'https://cdn-icons-png.flaticon.com/128/3322/3322056.png',
        checked: false,
    },
    {
        id: 'lavar-platos',
        label: 'Lavar platos',
        icon: 'https://cdn-icons-png.flaticon.com/128/994/994953.png',
        checked: false,
    },
    {
        id: 'riego-plantas',
        label: 'Riego de plantas',
        icon: 'https://cdn-icons-png.flaticon.com/128/3319/3319229.png',
        checked: false,
    },
    {
        id: 'limpieza-hogar',
        label: 'Limpieza del hogar',
        icon: 'https://cdn-icons-png.flaticon.com/128/1059/1059219.png',
        checked: false,
    },
    {
        id: 'otra',
        label: 'Otra:',
        icon: '',
        checked: false,
    },
]);
</script>

<style scoped>
.eval-activities-title {
    color: #222;
    font-size: 1.1rem;
    font-weight: 500;
}
</style>
