<script setup lang="ts">
import { AddAccount } from "@features/add-account";
import { useAccountsStore } from "@entities/account";
import AccountHeader from "./AccountHeader.vue";
import AccountForm from "./form/AccountForm.vue";

import { storeToRefs } from "pinia";

const accountsStore = useAccountsStore();
const { allAccounts } = storeToRefs(accountsStore);
</script>

<template>
  <AddAccount />
  <AccountHeader />
  <AccountForm
    v-for="account in allAccounts"
    :key="account.id"
    :account="account"
  />
</template>

<style scoped></style>
