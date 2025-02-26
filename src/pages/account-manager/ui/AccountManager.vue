<script setup lang="ts">
import { AddAccount } from "@features/add-account";
import AccountBody from "./AccountBody.vue";
import AccountHeader from "./AccountHeader.vue";
</script>

<template>
  <div>
    <AddAccount />
    <AccountHeader />
    <AccountBody />
  </div>
</template>

<style scoped></style>
