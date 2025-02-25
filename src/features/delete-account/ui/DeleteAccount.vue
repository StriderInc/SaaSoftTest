<script setup lang="ts">
import { Trash2 } from "lucide-vue-next";

const emit = defineEmits(["delete-account"]);
</script>

<template>
  <Trash2
    @click="emit('delete-account')"
    class="cursor-pointer self-center"
  />
</template>

<style scoped></style>
