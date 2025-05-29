<template>
    <img :src="src" :alt="alt" :style="style" />
</template>

<script setup>
const props = defineProps({
    src: String,
    alt: String,
    style: String,
});
</script>
