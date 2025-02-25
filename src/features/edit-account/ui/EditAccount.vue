<script setup lang="ts">
import { useAccountsStore } from "@entities/account";

const accountsStore = useAccountsStore();
const { saveAccount, editAccount, deleteAccount } = accountsStore;
</script>

<template>
  <slot
    :save-account="saveAccount"
    :edit-account="editAccount"
    :delete-account="deleteAccount"
  />
</template>

<style scoped></style>
