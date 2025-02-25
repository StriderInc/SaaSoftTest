<script setup lang="ts">
import { EditAccount } from "@features/edit-account";
import { useAccountsStore } from "@entities/account";
import AccountItem from "./AccountItem.vue";

import { storeToRefs } from "pinia";

const accountsStore = useAccountsStore();
const { accounts } = storeToRefs(accountsStore);
</script>

<template>
  <EditAccount v-slot="{ saveAccount }">
    <AccountItem
      v-for="account in accounts"
      :key="account.id"
      :account="account"
      @save-account="saveAccount"
    />
  </EditAccount>
</template>

<style scoped></style>
