import { computed, ref } from "vue";

import type { IAccount } from "./types";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useAccountsStore = defineStore("accounts", () => {
  const savedAccounts = ref<IAccount[]>([
    {
      id: uuidv4(),
      tag: "TAG1",
      recordType: "Локальная",
      login: "1234",
      password: "qwer",
    },
    {
      id: uuidv4(),
      tag: "TAG2",
      recordType: "LDAP",
      login: "2345",
      password: "wert",
    },
  ]);
  const draftAccounts = ref<IAccount[]>([]);

  const allAccounts = computed(() => [
    ...savedAccounts.value,
    ...draftAccounts.value,
  ]);

  const addDraftAccount = () => {
    draftAccounts.value.push({
      id: uuidv4(),
      tag: "",
      recordType: "",
      login: "",
      password: "",
    });
  };

  return {
    allAccounts,
    addDraftAccount,
  };
});
