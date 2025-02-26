<script setup lang="ts">
import AccountTagTooltip from "./AccountTagTooltip.vue";
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="grid grid-cols-4 grid-rows-[auto_1fr] gap-[5px] w-[50%]">
      <div class="flex items-center justify-start gap-3">
        <span>Метки</span>
        <AccountTagTooltip />
      </div>
      <span>Тип записи</span>
      <span>Логин</span>
      <span>Пароль</span>
    </div>
  </div>
</template>

<style scoped></style>
