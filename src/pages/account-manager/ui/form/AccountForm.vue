<script setup lang="ts">
import type { IAccount } from "@entities/account";
import { AutoForm } from "@shared/ui/shadcn/auto-form";

interface IAccountFormProps {
  account: IAccount;
}

defineProps<IAccountFormProps>();
</script>

<template>
  <AutoForm schema=""> </AutoForm>
  <div>
    {{ account.tag }}
  </div>
</template>

<style scoped></style>
