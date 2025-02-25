<script setup lang="ts">
import { useAccountsStore } from "@entities/account";

const accountsStore = useAccountsStore();
const { saveAccount, editAccount } = accountsStore;
</script>

<template>
  <slot
    :save-account="saveAccount"
    :edit-account="editAccount"
  />
</template>

<style scoped></style>
