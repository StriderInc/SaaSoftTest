<script setup lang="ts">
import { useAccountsStore } from "@entities/account";
import { Button } from "@shared/ui/shadcn/button";
import { Plus } from "lucide-vue-next";

const accountsStore = useAccountsStore();
const { addDraftAccount } = accountsStore;
</script>

<template>
  <div class="flex items-center justify-center gap-4 w-full my-2">
    <div class="text-xl font-medium">Учетные Записи</div>
    <Button
      variant="outline"
      @click="addDraftAccount"
    >
      <Plus />
    </Button>
  </div>
</template>

<style scoped></style>
