
<script setup>

import { useRouter } from "vue-router";
import BaseTitle from "../components/atoms/BaseTitle.vue";
import BaseButton from "../components/atoms/BaseButton.vue";
import BaseIcon from "../components/atoms/BaseIcon.vue";
import atlantisIcon from '@/assets/icon.jpg';
const router = useRouter();

function goToLogin() {
  router.push("/login");
}
function goToRegister() {
  router.push("/register");
}
</script>

<template>
  <main
    class="d-flex flex-column align-items-center justify-content-center min-vh-100"
  >
    <BaseTitle>Atlantis</BaseTitle>
    <BaseIcon :src="atlantisIcon" alt="Icono Atlantis" style="width: 120px; margin-bottom: 32px;" />
    <BaseButton class="mb-3 px-5" @click="goToLogin">login</BaseButton>
    <BaseButton class="px-5" @click="goToRegister">register</BaseButton>
  </main>
</template>
