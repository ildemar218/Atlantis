<template>
    <div class="welcome-container d-flex justify-content-center align-items-center min-vh-100 p-3">
        <div class="card card-welcome w-100" style="max-width: 350px; border-radius: 20px; border: 2px solid #2222;">
            <div class="welcome-card p-4 bg-white d-flex flex-column align-items-center" style="border-radius: 20px;">
                <BaseTitle>Atlantis</BaseTitle>
                <BaseIcon :src="atlantisIcon" alt="Icono Atlantis" style="width: 100px; margin-bottom: 24px;" />
                <p class="welcome-text text-center mt-3 mb-0">
                    "Welcome to Atlantis! Your app for home water management.<br>
                    Immerse yourself in a new lifestyle where every drop counts."
                </p>
                <div class="d-flex justify-content-end w-100 mt-4">
                    <BaseButton style="width: 48px; height: 48px; border-radius: 50%; font-size: 1.5rem; padding: 0;"
                        @click="goNext">
                        <span style="font-size: 2rem; line-height: 1;">→</span>
                    </BaseButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import BaseTitle from '../components/atoms/BaseTitle.vue';
import BaseIcon from '../components/atoms/BaseIcon.vue';
import BaseButton from '../components/atoms/BaseButton.vue';
import atlantisIcon from '@/assets/icon.jpg';
import { useRouter } from 'vue-router';

const router = useRouter();
function goNext() {
    router.push('/eval-intro'); // Cambia '/next-step' por la ruta real de la siguiente vista
}
</script>

<style scoped>
.welcome-text {
    color: #6ec6ff;
    font-size: 1.2rem;
    font-weight: 500;
    margin-top: 16px;
    margin-bottom: 0;
}
</style>
