<script setup lang="ts">
import AccountTagTooltip from "./AccountTagTooltip.vue";
</script>

<template>
  <div class="flex items-center justify-center">
    <div
      class="grid grid-cols-[1fr_1fr_1fr_1fr_24px] grid-rows-[auto_1fr] gap-[10px] w-[50%]"
    >
      <div class="flex items-center justify-start gap-3">
        <span>Метки</span>
        <AccountTagTooltip />
      </div>
      <span>Тип записи</span>
      <span>Логин</span>
      <span>Пароль</span>
      <div />
    </div>
  </div>
</template>

<style scoped></style>
