<script setup lang="ts">
import { useAccountsStore } from "@entities/account";

const accountsStore = useAccountsStore();
const { saveAccount } = accountsStore;
</script>

<template>
  <slot :save-account="saveAccount" />
</template>

<style scoped></style>
