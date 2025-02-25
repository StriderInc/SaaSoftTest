<script setup lang="ts">
import type { IAccount } from "@entities/account";

interface AccountFormProps {
  account: IAccount;
}

defineProps<AccountFormProps>();
</script>

<template>
  <div>
    {{ account.tag }}
  </div>
</template>

<style scoped></style>
