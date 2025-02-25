<script setup lang="ts">
import { AddAccount } from "@features/add-account";
import AccountBody from "./AccountBody.vue";
import AccountHeader from "./AccountHeader.vue";
</script>

<template>
  <AddAccount />
  <AccountHeader />
  <AccountBody />
</template>

<style scoped></style>
