<script setup lang="ts">
import { useAccountsStore } from "@entities/account";
import AccountForm from "./form/AccountForm.vue";

import { storeToRefs } from "pinia";

const accountsStore = useAccountsStore();
const { accounts } = storeToRefs(accountsStore);
</script>

<template>
  <AccountForm
    v-for="account in accounts"
    :key="account.id"
    :account="account"
  />
</template>

<style scoped></style>
