<template>
    <div class="eval-container d-flex justify-content-center align-items-center min-vh-100 p-3">
        <div class="card card-eval w-100" style="max-width: 350px; border-radius: 20px; border: 2px solid #2222;">
            <div class="eval-card p-4 bg-white d-flex flex-column align-items-center" style="border-radius: 20px;">
                <BaseTitle>Atlantis</BaseTitle>
                <p class="eval-subtitle text-center mt-3 mb-2">Ayúdanos a estimar tu consumo de agua</p>
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Icono Evaluación"
                    style="width: 80px; margin: 16px 0;" />
                <p class="eval-desc text-center mb-4">Tomara solo unos minutos y nos permitirá darte mejores
                    recomendaciones</p>
                <BaseButton class="w-100" style="max-width: 220px;" @click="goToEval">comenzar evaluacion</BaseButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import BaseTitle from '../components/atoms/BaseTitle.vue';
import BaseButton from '../components/atoms/BaseButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
function goToEval() {
    router.push('/eval'); // Cambia '/eval' por la ruta real de la siguiente vista
}
</script>

<style scoped>
.eval-subtitle {
    color: #222;
    font-size: 1.1rem;
}

.eval-desc {
    color: #222;
    font-size: 1rem;
}
</style>
